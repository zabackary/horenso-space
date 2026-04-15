export interface ParsedCsvRow {
  rowNumber: number;
  values: string[];
}

export interface ParsedCsvDocument {
  rows: ParsedCsvRow[];
  maxColumns: number;
}

export interface CsvColumnOption {
  index: number;
  label: string;
  sampleValue: string;
}

export interface CalendarColumnProfile extends CsvColumnOption {
  nonEmptyCount: number;
  dateTimeCount: number;
  dateCount: number;
  timeCount: number;
  textCount: number;
}

export type CalendarImportDateTimeMapping =
  | {
      mode: "datetime";
      columnIndex: number | null;
    }
  | {
      mode: "date-time";
      dateColumnIndex: number | null;
      timeColumnIndex: number | null;
    };

export interface CalendarImportMapping {
  titleColumnIndex: number | null;
  startTime: CalendarImportDateTimeMapping;
  endTime: CalendarImportDateTimeMapping;
  locationColumnIndex: number | null;
  descriptionColumnIndex: number | null;
}

export interface CalendarImportPreviewRow {
  rowNumber: number;
  rawValues: string[];
  title: string;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  startTimeIso: string | null;
  endTimeIso: string | null;
  issues: string[];
}

const HEADER_ALIASES = {
  title: ["title", "event", "eventtitle", "name", "subject", "summary"],
  startDatetime: [
    "start",
    "starttime",
    "startdatetime",
    "begin",
    "begintime",
    "from",
  ],
  startDate: ["startdate", "date", "day", "eventdate"],
  startTime: ["starttime", "time", "clock"],
  endDatetime: ["end", "endtime", "enddatetime", "finish", "totime", "to"],
  endDate: ["enddate"],
  endTime: ["endtime", "finishtime"],
  location: ["location", "place", "venue", "room"],
  description: ["description", "notes", "note", "details", "memo", "comment"],
} as const;

function splitCsvLine(line: string): string[] {
  const fields: string[] = [];
  let currentField = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    const nextCharacter = line[index + 1];

    if (inQuotes) {
      if (character === '"') {
        if (nextCharacter === '"') {
          currentField += '"';
          index += 1;
        } else {
          inQuotes = false;
        }
      } else {
        currentField += character;
      }
      continue;
    }

    if (character === ",") {
      fields.push(currentField.trim());
      currentField = "";
      continue;
    }

    if (character === '"' && currentField.trim().length === 0) {
      inQuotes = true;
      continue;
    }

    currentField += character;
  }

  fields.push(currentField.trim());
  return fields;
}

function normalizeColumnLabel(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
}

function pad(number: number) {
  return number.toString().padStart(2, "0");
}

function formatCalendarDateTime(date: Date) {
  return `${date.getFullYear().toString().padStart(4, "0")}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function parseCsvDocument(content: string): ParsedCsvDocument {
  const rows: ParsedCsvRow[] = [];
  let maxColumns = 0;

  content.split(/\r?\n/).forEach((line, index) => {
    if (line.trim().length === 0) {
      return;
    }

    const values = splitCsvLine(line);
    rows.push({
      rowNumber: index + 1,
      values,
    });
    maxColumns = Math.max(maxColumns, values.length);
  });

  return { rows, maxColumns };
}

export function looksLikeHeaderRow(values: string[]): boolean {
  if (values.some((value) => isTimestampLikeValue(value))) {
    return false;
  }

  const normalizedValues = values.map((value) => normalizeColumnLabel(value));
  const aliasValues = new Set<string>([
    ...HEADER_ALIASES.title,
    ...HEADER_ALIASES.startDatetime,
    ...HEADER_ALIASES.startDate,
    ...HEADER_ALIASES.startTime,
    ...HEADER_ALIASES.endDatetime,
    ...HEADER_ALIASES.endDate,
    ...HEADER_ALIASES.endTime,
    ...HEADER_ALIASES.location,
    ...HEADER_ALIASES.description,
  ]);
  const aliasHits = normalizedValues.filter((value) =>
    aliasValues.has(value),
  ).length;

  if (aliasHits > 0) {
    return true;
  }

  const dateLikeHits = values.filter(
    (value) => parseLooseDateTime(value) !== null,
  ).length;

  if (dateLikeHits > 0) {
    return false;
  }

  return values.every((value) => /[a-zA-Z]/u.test(value));
}

export function getCalendarDataRows(
  document: ParsedCsvDocument,
  useHeaderRow: boolean,
): ParsedCsvRow[] {
  return useHeaderRow ? document.rows.slice(1) : document.rows;
}

export function getCalendarColumnLabels(
  document: ParsedCsvDocument,
  useHeaderRow: boolean,
): string[] {
  const headerValues = useHeaderRow ? (document.rows[0]?.values ?? []) : [];

  return Array.from(
    { length: Math.max(document.maxColumns, headerValues.length) },
    (_, index) => {
      const fallbackLabel = `Column ${index + 1}`;
      const headerLabel = headerValues[index]?.trim();
      return useHeaderRow && headerLabel ? headerLabel : fallbackLabel;
    },
  );
}

export function getCalendarColumnOptions(
  document: ParsedCsvDocument,
  useHeaderRow: boolean,
): CsvColumnOption[] {
  const labels = getCalendarColumnLabels(document, useHeaderRow);
  const dataRows = getCalendarDataRows(document, useHeaderRow);

  return labels.map((label, index) => {
    const sampleValue =
      dataRows
        .find((row) => row.values[index]?.trim().length > 0)
        ?.values[index]?.trim() ?? "";

    return {
      index,
      label,
      sampleValue,
    };
  });
}

function isTimestampLikeValue(value: string): boolean {
  return (
    parseLooseDateTime(value) !== null ||
    parseLooseDate(value) !== null ||
    parseLooseTime(value) !== null
  );
}

export function getCalendarColumnProfiles(
  document: ParsedCsvDocument,
  useHeaderRow: boolean,
): CalendarColumnProfile[] {
  const labels = getCalendarColumnLabels(document, useHeaderRow);
  const rows = getCalendarDataRows(document, useHeaderRow);

  return labels.map((label, index) => {
    const values = rows
      .map((row) => row.values[index]?.trim() ?? "")
      .filter((value) => value.length > 0);
    const sampleValue = values[0] ?? "";
    const nonEmptyCount = values.length;

    return {
      index,
      label,
      sampleValue,
      nonEmptyCount,
      dateTimeCount: values.filter(
        (value) => parseLooseDateTime(value) !== null,
      ).length,
      dateCount: values.filter((value) => parseLooseDate(value) !== null)
        .length,
      timeCount: values.filter((value) => parseLooseTime(value) !== null)
        .length,
      textCount: values.filter((value) => isTextLike(value)).length,
    };
  });
}

export function parseLooseDateTime(value: string): Date | null {
  const trimmed = value.trim();

  if (!trimmed) {
    return null;
  }

  const localMatch = trimmed.match(
    /^(\d{4})-(\d{2})-(\d{2})(?:[T\s](\d{2}):(\d{2})(?::(\d{2}))?)?$/,
  );

  if (localMatch) {
    const [, year, month, day, hours = "00", minutes = "00", seconds = "00"] =
      localMatch;
    return new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hours),
      Number(minutes),
      Number(seconds),
    );
  }

  const parsedDate = new Date(trimmed);

  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  return parsedDate;
}

export function parseLooseDate(value: string): Date | null {
  const trimmed = value.trim();

  if (!trimmed) {
    return null;
  }

  const localDateMatch = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (localDateMatch) {
    const [, year, month, day] = localDateMatch;
    return new Date(Number(year), Number(month) - 1, Number(day));
  }

  const slashDateMatch = trimmed.match(/^(\d{4})\/(\d{2})\/(\d{2})$/);
  if (slashDateMatch) {
    const [, year, month, day] = slashDateMatch;
    return new Date(Number(year), Number(month) - 1, Number(day));
  }

  const parsedDate = parseLooseDateTime(trimmed);
  if (!parsedDate) {
    return null;
  }

  return new Date(
    parsedDate.getFullYear(),
    parsedDate.getMonth(),
    parsedDate.getDate(),
  );
}

export function parseLooseTime(value: string): Date | null {
  const trimmed = value.trim();

  if (!trimmed) {
    return null;
  }

  const timeMatch = trimmed.match(
    /^([01]?\d|2[0-3]):([0-5]\d)(?::([0-5]\d))?(?:\s*([ap]m))?$/i,
  );

  if (timeMatch) {
    const [, hoursText, minutesText, secondsText = "0", meridiem] = timeMatch;
    let hours = Number(hoursText);

    if (meridiem) {
      const normalizedMeridiem = meridiem.toLowerCase();
      if (normalizedMeridiem === "pm" && hours < 12) {
        hours += 12;
      }
      if (normalizedMeridiem === "am" && hours === 12) {
        hours = 0;
      }
    }

    return new Date(
      1970,
      0,
      1,
      hours,
      Number(minutesText),
      Number(secondsText),
    );
  }

  const parsedDate = parseLooseDateTime(trimmed);
  if (!parsedDate) {
    return null;
  }

  return new Date(
    1970,
    0,
    1,
    parsedDate.getHours(),
    parsedDate.getMinutes(),
    parsedDate.getSeconds(),
  );
}

export function combineLocalDateAndTime(
  dateValue: string,
  timeValue: string,
): Date | null {
  const parsedDate = parseLooseDate(dateValue);
  const parsedTime = parseLooseTime(timeValue);

  if (!parsedDate || !parsedTime) {
    return null;
  }

  return new Date(
    parsedDate.getFullYear(),
    parsedDate.getMonth(),
    parsedDate.getDate(),
    parsedTime.getHours(),
    parsedTime.getMinutes(),
    parsedTime.getSeconds(),
  );
}

function resolveColumnValue(
  row: ParsedCsvRow,
  columnIndex: number | null,
): string {
  if (columnIndex === null || columnIndex < 0) {
    return "";
  }

  return row.values[columnIndex]?.trim() ?? "";
}

function resolveDateTimeValue(
  row: ParsedCsvRow,
  mapping: CalendarImportDateTimeMapping,
  fieldName: string,
): { iso: string | null; display: string; issues: string[] } {
  if (mapping.mode === "datetime") {
    const rawValue = resolveColumnValue(row, mapping.columnIndex);

    if (!rawValue) {
      return {
        iso: null,
        display: "",
        issues: [`Missing ${fieldName} column value`],
      };
    }

    const parsed = parseLooseDateTime(rawValue);
    if (!parsed) {
      return {
        iso: null,
        display: rawValue,
        issues: [`Invalid ${fieldName} datetime`],
      };
    }

    return {
      iso: parsed.toISOString(),
      display: formatCalendarDateTime(parsed),
      issues: [],
    };
  }

  const dateValue = resolveColumnValue(row, mapping.dateColumnIndex);
  const timeValue = resolveColumnValue(row, mapping.timeColumnIndex);

  const issues: string[] = [];
  if (!dateValue) {
    issues.push(`Missing ${fieldName} date value`);
  }
  if (!timeValue) {
    issues.push(`Missing ${fieldName} time value`);
  }

  const parsed = combineLocalDateAndTime(dateValue, timeValue);
  if (!parsed) {
    if (dateValue && !parseLooseDate(dateValue)) {
      issues.push(`Invalid ${fieldName} date value`);
    }
    if (timeValue && !parseLooseTime(timeValue)) {
      issues.push(`Invalid ${fieldName} time value`);
    }

    return {
      iso: null,
      display: `${dateValue} ${timeValue}`.trim(),
      issues,
    };
  }

  return {
    iso: parsed.toISOString(),
    display: formatCalendarDateTime(parsed),
    issues,
  };
}

function hasAlias(label: string, aliases: readonly string[]): boolean {
  return aliases.includes(normalizeColumnLabel(label));
}

function findAliasIndex(
  labels: string[],
  aliases: readonly string[],
  excludedIndexes = new Set<number>(),
): number | null {
  for (let index = 0; index < labels.length; index += 1) {
    if (excludedIndexes.has(index)) {
      continue;
    }

    if (hasAlias(labels[index] ?? "", aliases)) {
      return index;
    }
  }

  return null;
}

function isTextLike(value: string): boolean {
  return (
    Boolean(value.trim()) &&
    !parseLooseDateTime(value) &&
    !parseLooseDate(value) &&
    !parseLooseTime(value)
  );
}

function createDateTimeMapping(
  profiles: CalendarColumnProfile[],
  usedIndexes: Set<number>,
): CalendarImportDateTimeMapping {
  const datetimeCandidates = profiles.filter(
    (profile) =>
      !usedIndexes.has(profile.index) &&
      profile.dateTimeCount > 0 &&
      profile.dateTimeCount >= profile.dateCount &&
      profile.dateTimeCount >= profile.timeCount,
  );

  if (datetimeCandidates.length > 0) {
    const selectedIndex = datetimeCandidates[0].index;
    usedIndexes.add(selectedIndex);
    return { mode: "datetime", columnIndex: selectedIndex };
  }

  const dateCandidates = profiles.filter(
    (profile) => !usedIndexes.has(profile.index) && profile.dateCount > 0,
  );
  const timeCandidates = profiles.filter(
    (profile) => !usedIndexes.has(profile.index) && profile.timeCount > 0,
  );

  if (dateCandidates.length >= 2 && timeCandidates.length >= 2) {
    const dateIndex = dateCandidates[0].index;
    const timeIndex = timeCandidates[0].index;
    usedIndexes.add(dateIndex);
    usedIndexes.add(timeIndex);
    return {
      mode: "date-time",
      dateColumnIndex: dateIndex,
      timeColumnIndex: timeIndex,
    };
  }

  if (dateCandidates.length > 0 && timeCandidates.length > 0) {
    const dateIndex = dateCandidates[0].index;
    const timeIndex = timeCandidates[0].index;
    usedIndexes.add(dateIndex);
    usedIndexes.add(timeIndex);
    return {
      mode: "date-time",
      dateColumnIndex: dateIndex,
      timeColumnIndex: timeIndex,
    };
  }

  const fallbackIndex =
    profiles.find(
      (profile) => !usedIndexes.has(profile.index) && profile.nonEmptyCount > 0,
    )?.index ?? 0;
  usedIndexes.add(fallbackIndex);
  return { mode: "datetime", columnIndex: fallbackIndex };
}

export function inferCalendarImportMapping(
  document: ParsedCsvDocument,
  useHeaderRow: boolean,
): CalendarImportMapping {
  const labels = getCalendarColumnLabels(document, useHeaderRow);
  const profiles = getCalendarColumnProfiles(document, useHeaderRow);
  const usedIndexes = new Set<number>();
  const profileByIndex = new Map(
    profiles.map((profile) => [profile.index, profile] as const),
  );

  const titleIndex =
    findAliasIndex(labels, HEADER_ALIASES.title, usedIndexes) ??
    labels.findIndex((label, index) => {
      if (usedIndexes.has(index)) {
        return false;
      }

      const sampleValue = profileByIndex.get(index)?.sampleValue ?? "";
      return (
        isTextLike(sampleValue) &&
        !hasAlias(label, HEADER_ALIASES.location) &&
        !hasAlias(label, HEADER_ALIASES.description)
      );
    });

  if (titleIndex >= 0) {
    usedIndexes.add(titleIndex);
  }

  const startTime = createDateTimeMapping(profiles, usedIndexes);
  const endTime = createDateTimeMapping(profiles, usedIndexes);

  const locationIndex =
    findAliasIndex(labels, HEADER_ALIASES.location, usedIndexes) ??
    labels.findIndex((label, index) => {
      if (usedIndexes.has(index)) {
        return false;
      }

      const sampleValue = profileByIndex.get(index)?.sampleValue ?? "";
      return (
        isTextLike(sampleValue) &&
        !hasAlias(label, HEADER_ALIASES.title) &&
        !hasAlias(label, HEADER_ALIASES.description)
      );
    });

  if (locationIndex >= 0) {
    usedIndexes.add(locationIndex);
  }

  const descriptionIndex =
    findAliasIndex(labels, HEADER_ALIASES.description, usedIndexes) ??
    labels.findIndex((label, index) => {
      if (usedIndexes.has(index)) {
        return false;
      }

      const sampleValue = profileByIndex.get(index)?.sampleValue ?? "";
      return isTextLike(sampleValue);
    });

  if (descriptionIndex >= 0) {
    usedIndexes.add(descriptionIndex);
  }

  return {
    titleColumnIndex: titleIndex >= 0 ? titleIndex : null,
    startTime,
    endTime,
    locationColumnIndex: locationIndex >= 0 ? locationIndex : null,
    descriptionColumnIndex: descriptionIndex >= 0 ? descriptionIndex : null,
  };
}

export function buildCalendarImportPreviewRows(
  document: ParsedCsvDocument,
  useHeaderRow: boolean,
  mapping: CalendarImportMapping,
): CalendarImportPreviewRow[] {
  const dataRows = getCalendarDataRows(document, useHeaderRow);

  return dataRows.map((row) => {
    const title = resolveColumnValue(row, mapping.titleColumnIndex);
    const startTime = resolveDateTimeValue(
      row,
      mapping.startTime,
      "start time",
    );
    const endTime = resolveDateTimeValue(row, mapping.endTime, "end time");
    const location = resolveColumnValue(row, mapping.locationColumnIndex);
    const description = resolveColumnValue(row, mapping.descriptionColumnIndex);

    const issues = [
      ...(title ? [] : ["Missing title"]),
      ...startTime.issues,
      ...endTime.issues,
      ...(startTime.iso &&
      endTime.iso &&
      new Date(startTime.iso) >= new Date(endTime.iso)
        ? ["start_time must be before end_time"]
        : []),
    ];

    return {
      rowNumber: row.rowNumber,
      rawValues: row.values,
      title,
      startTime: startTime.display,
      endTime: endTime.display,
      location,
      description,
      startTimeIso: startTime.iso,
      endTimeIso: endTime.iso,
      issues,
    };
  });
}
