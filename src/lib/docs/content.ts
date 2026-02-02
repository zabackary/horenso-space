import matter from "gray-matter";
import fs from "node:fs/promises";
import path from "node:path";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const docsRoot = path.join(process.cwd(), "content/docs");

export interface DocMeta {
  title: string;
  publishDate?: string;
  author?: string;
  description?: string;
  updatedDate?: string;
  folderName?: string;
}

export interface DocPage {
  lang: string;
  slug: string[];
  meta: DocMeta;
  html: string;
}

export interface DocListingItem {
  lang: string;
  slug: string[];
  meta: DocMeta;
}

export interface DocTreeNode {
  name: string;
  slug: string[];
  meta?: DocMeta;
  children: DocTreeNode[];
  isFolder: boolean;
}

export interface DocLanguageOption {
  lang: string;
  slug: string[];
}

interface DocFile {
  lang: string;
  slug: string[];
  filePath: string;
}

function normalizeSlugParts(parts: string[]) {
  if (parts.length === 1 && parts[0] === "index") {
    return [] as string[];
  }

  return parts;
}

async function walkDocs(dir: string, lang: string): Promise<DocFile[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files: DocFile[] = [];

  await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        files.push(...(await walkDocs(entryPath, lang)));
        return;
      }

      if (!entry.isFile() || !entry.name.endsWith(".md")) {
        return;
      }

      const relativePath = path.relative(path.join(docsRoot, lang), entryPath);
      const parts = relativePath.replace(/\.md$/, "").split(path.sep);
      const slug = normalizeSlugParts(parts);
      files.push({ lang, slug, filePath: entryPath });
    }),
  );

  return files;
}

async function getDocFiles(): Promise<DocFile[]> {
  let langs: string[] = [];
  try {
    langs = await fs.readdir(docsRoot);
  } catch {
    return [];
  }

  const docFiles: DocFile[] = [];
  await Promise.all(
    langs.map(async (lang) => {
      const langPath = path.join(docsRoot, lang);
      const stats = await fs.stat(langPath).catch(() => null);
      if (!stats?.isDirectory()) {
        return;
      }

      docFiles.push(...(await walkDocs(langPath, lang)));
    }),
  );

  return docFiles;
}

function buildLanguageSlugMap(files: DocFile[]) {
  const languageMap = new Map<string, Set<string>>();

  files.forEach((file) => {
    const key = file.slug.join("/");
    const current = languageMap.get(file.lang) ?? new Set<string>();
    current.add(key);
    languageMap.set(file.lang, current);
  });

  return languageMap;
}

function resolveDocPath(lang: string, slug: string[]) {
  if (slug.length === 0) {
    return path.join(docsRoot, lang, "intro.md");
  }

  return `${path.join(docsRoot, lang, ...slug)}.md`;
}

async function readDocFile(filePath: string) {
  const source = await fs.readFile(filePath, "utf-8");
  return matter(source);
}

function ensureMeta(data: Record<string, unknown>, slug: string[]): DocMeta {
  const titleValue = typeof data.title === "string" ? data.title : undefined;

  return {
    title: titleValue ?? slug[slug.length - 1] ?? "Untitled",
    publishDate:
      typeof data.publishDate === "string" ? data.publishDate : undefined,
    author: typeof data.author === "string" ? data.author : undefined,
    description:
      typeof data.description === "string" ? data.description : undefined,
    updatedDate:
      typeof data.updatedDate === "string" ? data.updatedDate : undefined,
    folderName:
      typeof data.folderName === "string" ? data.folderName : undefined,
  };
}

export async function getDocBySlug(
  lang: string,
  slug: string[],
): Promise<DocPage> {
  const filePath = resolveDocPath(lang, slug);
  const { content, data } = await readDocFile(filePath);
  const processed = await remark()
    .use(remarkGfm)
    .use(remarkHtml)
    .process(content);

  return {
    lang,
    slug,
    meta: ensureMeta(data as Record<string, unknown>, slug),
    html: processed.toString(),
  };
}

export async function getDocListing(lang: string): Promise<DocListingItem[]> {
  const files = (await getDocFiles()).filter((file) => file.lang === lang);
  const items = await Promise.all(
    files.map(async (file) => {
      const { data } = await readDocFile(file.filePath);
      return {
        lang: file.lang,
        slug: file.slug,
        meta: ensureMeta(data as Record<string, unknown>, file.slug),
      };
    }),
  );

  return items.sort((a, b) =>
    a.meta.title.localeCompare(b.meta.title, "en", { sensitivity: "base" }),
  );
}

export async function getDocsStaticParams() {
  const files = await getDocFiles();
  return files.map((file) => ({
    lang: file.lang,
    slug: file.slug,
  }));
}

export async function getDocLanguageOptions(
  slug: string[],
): Promise<DocLanguageOption[]> {
  const files = await getDocFiles();
  const languageMap = buildLanguageSlugMap(files);
  const slugKey = slug.join("/");

  return Array.from(languageMap.entries())
    .sort(([a], [b]) => a.localeCompare(b, "en", { sensitivity: "base" }))
    .map(([lang, slugs]) => ({
      lang,
      slug: slugs.has(slugKey) ? slug : [],
    }));
}

function buildDocTree(items: DocListingItem[]): DocTreeNode[] {
  const root: DocTreeNode[] = [];
  const folderMap = new Map<string, DocTreeNode>();
  const folderNames = new Map<string, string>();

  // First pass: collect folder names from index.md files
  for (const item of items) {
    if (
      item.slug.length > 0 &&
      item.slug[item.slug.length - 1] === "index" &&
      item.meta.folderName
    ) {
      const folderSlug = item.slug.slice(0, -1);
      const folderKey = folderSlug.join("/");
      folderNames.set(folderKey, item.meta.folderName);
    }
  }

  // Sort items by slug depth and name for consistent tree building
  const sortedItems = [...items].sort((a, b) => {
    if (a.slug.length !== b.slug.length) {
      return a.slug.length - b.slug.length;
    }
    return a.slug.join("/").localeCompare(b.slug.join("/"));
  });

  for (const item of sortedItems) {
    if (item.slug.length === 0) {
      // Root index file
      continue;
    }

    // Skip folder index files (they're only for metadata)
    if (item.slug[item.slug.length - 1] === "index") {
      continue;
    }

    // Create all parent folders if they don't exist
    for (let i = 0; i < item.slug.length - 1; i++) {
      const folderSlug = item.slug.slice(0, i + 1);
      const folderKey = folderSlug.join("/");

      if (!folderMap.has(folderKey)) {
        const defaultName = folderSlug[folderSlug.length - 1];
        const customName = folderNames.get(folderKey);

        const folderNode: DocTreeNode = {
          name: customName ?? defaultName,
          slug: folderSlug,
          children: [],
          isFolder: true,
        };
        folderMap.set(folderKey, folderNode);

        // Add to parent
        if (i === 0) {
          root.push(folderNode);
        } else {
          const parentKey = folderSlug.slice(0, -1).join("/");
          const parent = folderMap.get(parentKey);
          if (parent) {
            parent.children.push(folderNode);
          }
        }
      }
    }

    // Add the file node
    const fileNode: DocTreeNode = {
      name: item.meta.title,
      slug: item.slug,
      meta: item.meta,
      children: [],
      isFolder: false,
    };

    if (item.slug.length === 1) {
      root.push(fileNode);
    } else {
      const parentKey = item.slug.slice(0, -1).join("/");
      const parent = folderMap.get(parentKey);
      if (parent) {
        parent.children.push(fileNode);
      }
    }
  }

  return root;
}

export async function getDocTree(lang: string): Promise<DocTreeNode[]> {
  const listing = await getDocListing(lang);
  return buildDocTree(listing);
}

export interface DocNavigation {
  prev?: {
    slug: string[];
    title: string;
  };
  next?: {
    slug: string[];
    title: string;
  };
}

function flattenTree(nodes: DocTreeNode[]): DocTreeNode[] {
  const result: DocTreeNode[] = [];
  for (const node of nodes) {
    if (!node.isFolder) {
      result.push(node);
    }
    if (node.children.length > 0) {
      result.push(...flattenTree(node.children));
    }
  }
  return result;
}

export async function getDocNavigation(
  lang: string,
  currentSlug: string[],
): Promise<DocNavigation> {
  const tree = await getDocTree(lang);
  const flatDocs = flattenTree(tree);
  const currentKey = currentSlug.join("/");
  const currentIndex = flatDocs.findIndex(
    (doc) => doc.slug.join("/") === currentKey,
  );

  if (currentIndex === -1) {
    return {};
  }

  const prev =
    currentIndex > 0
      ? {
          slug: flatDocs[currentIndex - 1].slug,
          title:
            flatDocs[currentIndex - 1].meta?.title ??
            flatDocs[currentIndex - 1].name,
        }
      : undefined;

  const next =
    currentIndex < flatDocs.length - 1
      ? {
          slug: flatDocs[currentIndex + 1].slug,
          title:
            flatDocs[currentIndex + 1].meta?.title ??
            flatDocs[currentIndex + 1].name,
        }
      : undefined;

  return { prev, next };
}
