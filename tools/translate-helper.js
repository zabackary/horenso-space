#!/usr/bin/env node

import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import readline from "node:readline/promises";

const LOCALES_DIR = path.join(process.cwd(), "src", "locales");
const MAX_CHARS_PER_CHUNK = 5000;

/**
 * Parse a PO file into an array of entry objects
 */
function parsePOFile(content) {
  const entries = [];
  const lines = content.split("\n");
  let currentEntry = null;
  let currentField = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (
      line.startsWith("#:") ||
      line.startsWith("#.") ||
      line.startsWith("#")
    ) {
      // Comment lines - start a new entry if needed
      if (!currentEntry) {
        currentEntry = { comments: [], msgid: "", msgstr: "" };
      }
      currentEntry.comments.push(line);
    } else if (line.startsWith("msgid ")) {
      if (!currentEntry) {
        currentEntry = { comments: [], msgid: "", msgstr: "" };
      }
      currentField = "msgid";
      currentEntry.msgid = line.substring(6).trim().slice(1, -1); // Remove quotes
    } else if (line.startsWith("msgstr ")) {
      currentField = "msgstr";
      currentEntry.msgstr = line.substring(7).trim().slice(1, -1); // Remove quotes
    } else if (line.startsWith('"') && line.endsWith('"')) {
      // Continuation line
      if (currentField && currentEntry) {
        currentEntry[currentField] += line.slice(1, -1);
      }
    } else if (line === "" && currentEntry) {
      // Empty line marks end of entry
      entries.push(currentEntry);
      currentEntry = null;
      currentField = null;
    }
  }

  // Don't forget last entry if file doesn't end with blank line
  if (currentEntry) {
    entries.push(currentEntry);
  }

  return entries;
}

/**
 * Serialize entries back to PO format
 */
function escapePo(text) {
  return text.replace(/"/g, '\\"');
}

/**
 * Check if a translation contains complex features (plurals, variables)
 * Allow simple placeholders like {name} where the inside is strictly alphanumeric.
 */
function hasComplexBraces(text) {
  const braceRegex = /\{([^{}]*)\}/g;
  let match;
  let _foundBrace = false;

  match = braceRegex.exec(text);
  while (match !== null) {
    _foundBrace = true;
    const inner = match[1];
    if (!/^[A-Za-z0-9]+$/.test(inner)) {
      return true;
    }
    match = braceRegex.exec(text);
  }

  // If there were braces but all were simple, it's fine
  return false;
}

/**
 * Extract JSX tags from a string
 */
function extractJSXTags(text) {
  const tags = [];
  const tagRegex = /<(\d+)>.*?<\/\1>|<(\d+)\/>/g;
  let match;
  match = tagRegex.exec(text);
  while (match !== null) {
    tags.push(match[1] || match[2]);
    match = tagRegex.exec(text);
  }
  return tags;
}

/**
 * Validate JSX tag parity (order-insensitive)
 */
function validateJSXTags(original, translated) {
  const originalTags = extractJSXTags(original).sort();
  const translatedTags = extractJSXTags(translated).sort();

  if (originalTags.length !== translatedTags.length) {
    return false;
  }

  for (let i = 0; i < originalTags.length; i++) {
    if (originalTags[i] !== translatedTags[i]) {
      return false;
    }
  }

  return true;
}

/**
 * Check for quote mismatches
 */
function validateQuotes(text) {
  // Check for unescaped quotes that might cause issues
  const doubleQuoteCount = (text.match(/"/g) || []).length;
  return doubleQuoteCount % 2 === 0;
}

function applyTranslations(poContent, updates) {
  const lines = poContent.split("\n");
  let currentId = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("msgid ")) {
      const raw = line.substring(6).trim();
      currentId =
        raw.startsWith('"') && raw.endsWith('"') ? raw.slice(1, -1) : raw;
      continue;
    }

    if (line.startsWith("msgstr ") && currentId) {
      const update = updates.get(currentId);
      if (update !== undefined) {
        lines[i] = `msgstr "${escapePo(update)}"`;
      }
      currentId = null;
      continue;
    }

    if (line === "") {
      currentId = null;
    }
  }

  return lines.join("\n");
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error("Usage: node translate-helper.js <language-id>");
    console.error("Example: node translate-helper.js ja");
    process.exitCode = 1;
    return;
  }

  console.log("Note: This program was written by AI.");

  const tempFiles = [];

  try {
    const languageId = args[0];
    const poFilePath = path.join(LOCALES_DIR, `${languageId}.po`);

    await fs.access(poFilePath);

    console.log(`Processing ${languageId}.po...`);

    const originalContent = await fs.readFile(poFilePath, "utf-8");
    const entries = parsePOFile(originalContent);

    const toTranslate = [];
    const skippedComplex = [];

    for (const entry of entries) {
      if (!entry.msgid) continue;
      if (entry.msgstr) continue;

      if (hasComplexBraces(entry.msgid)) {
        skippedComplex.push(entry.msgid);
        continue;
      }

      toTranslate.push(entry);
    }

    console.log(`Found ${toTranslate.length} entries to translate`);

    if (skippedComplex.length > 0) {
      console.error(
        `\n⚠️  Skipped ${skippedComplex.length} entries with complex placeholders:`,
      );
      for (const text of skippedComplex) {
        console.error(
          `   - ${text.substring(0, 60)}${text.length > 60 ? "..." : ""}`,
        );
      }
    }

    if (toTranslate.length === 0) {
      console.log("\nNo entries to translate. All done!");
      return;
    }

    let chunkLines = [];
    let chunkLength = 0;
    let chunkIndex = 1;

    const flushChunk = async () => {
      if (chunkLines.length === 0) return;
      const tempPath = path.join(
        os.tmpdir(),
        `translate-${languageId}-${Date.now()}-${chunkIndex}.txt`,
      );
      const content = chunkLines.join("\n");
      await fs.writeFile(tempPath, content, "utf-8");
      tempFiles.push(tempPath);
      chunkLines = [];
      chunkLength = 0;
      chunkIndex += 1;
    };

    for (const entry of toTranslate) {
      const text = entry.msgid;
      const additional = (chunkLines.length > 0 ? 1 : 0) + text.length;

      if (
        chunkLength + additional > MAX_CHARS_PER_CHUNK &&
        chunkLines.length > 0
      ) {
        await flushChunk();
      }

      chunkLines.push(text);
      chunkLength += additional;

      // If a single line itself exceeds the limit, flush immediately to isolate it
      if (text.length >= MAX_CHARS_PER_CHUNK) {
        await flushChunk();
      }
    }

    await flushChunk();

    console.log(`\n✓ Created ${tempFiles.length} temporary file(s):`);
    tempFiles.forEach((file, idx) => {
      console.log(`   ${idx + 1}. ${file}`);
    });

    console.log("\nNext steps for each file (in order):");
    console.log("1. Open the file");
    console.log("2. Copy all content");
    console.log("3. Paste into Google Translate or similar service");
    console.log("4. Copy the translated output");
    console.log("5. Replace the content in the same file with translations");
    console.log("6. Save the file");

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    await rl.question(
      "\nPress Enter when ready to proceed (or Ctrl+C to cancel)...",
    );
    rl.close();

    console.log("\nReading translations...");
    const translatedLines = [];

    for (const file of tempFiles) {
      const translatedContent = await fs.readFile(file, "utf-8");
      translatedLines.push(...translatedContent.split("\n"));
    }

    if (translatedLines.length !== toTranslate.length) {
      throw new Error(
        `Expected ${toTranslate.length} translations but got ${translatedLines.length}`,
      );
    }

    const warnings = [];
    const updates = new Map();
    let successCount = 0;

    for (let i = 0; i < toTranslate.length; i++) {
      const entry = toTranslate[i];
      const translated = translatedLines[i];

      if (!validateJSXTags(entry.msgid, translated)) {
        warnings.push(
          `JSX tag mismatch in: "${entry.msgid.substring(0, 40)}..." -> "${translated.substring(0, 40)}..."`,
        );
        continue;
      }

      if (!validateQuotes(translated)) {
        warnings.push(`Quote mismatch in: "${translated.substring(0, 40)}..."`);
        continue;
      }

      updates.set(entry.msgid, translated);
      successCount++;
    }

    if (warnings.length > 0) {
      console.error("\n⚠️  Validation warnings:");
      for (const warning of warnings) {
        console.error(`   - ${warning}`);
      }
    }

    const updatedContent = applyTranslations(originalContent, updates);
    await fs.writeFile(poFilePath, updatedContent, "utf-8");

    console.log(
      `\n✓ Successfully updated ${successCount} translations in ${poFilePath}`,
    );

    if (warnings.length > 0) {
      console.log(
        `\n⚠️  ${warnings.length} translations were skipped due to validation errors.`,
      );
      console.log("Please review and fix them manually.");
    }
  } catch (error) {
    console.error("Error:", error.message);
    process.exitCode = 1;
  } finally {
    for (const file of tempFiles) {
      await fs.rm(file, { force: true }).catch(() => {});
    }
  }
}

await main();
