"use client";

import type { Database } from "@/@types/database.types";
import {
  buildCalendarImportPreviewRows,
  getCalendarColumnOptions,
  inferCalendarImportMapping,
  looksLikeHeaderRow,
  parseCsvDocument,
  type CalendarImportDateTimeMapping,
  type CalendarImportMapping,
  type CalendarImportPreviewRow,
  type ParsedCsvDocument,
} from "@/lib/calendar/csv";
import { createClient } from "@/lib/supabase/client";
import { Trans, useLingui } from "@lingui/react/macro";
import {
  CheckCircledIcon,
  ChevronDownIcon,
  ExclamationTriangleIcon,
  UploadIcon,
} from "@radix-ui/react-icons";
import {
  Button,
  Callout,
  Dialog,
  Flex,
  Popover,
  Select,
  Spinner,
  Text,
  VisuallyHidden,
} from "@radix-ui/themes";
import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./calendar-csv-import-sheet.module.css";

export interface CalendarCsvImportSheetProps {
  clubId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImported: () => void;
}

interface RowImportStatus {
  status: "idle" | "importing" | "imported" | "failed";
  message?: string;
}

const NONE_VALUE = "__none__";

function toSelectValue(index: number | null) {
  return index === null ? NONE_VALUE : index.toString();
}

function fromSelectValue(value: string): number | null {
  return value === NONE_VALUE ? null : Number(value);
}

function updateDateTimeMapping(
  current: CalendarImportDateTimeMapping,
  nextMode: CalendarImportDateTimeMapping["mode"],
): CalendarImportDateTimeMapping {
  if (nextMode === current.mode) {
    return current;
  }

  if (nextMode === "datetime") {
    return {
      mode: "datetime",
      columnIndex:
        current.mode === "datetime"
          ? current.columnIndex
          : (current.dateColumnIndex ?? current.timeColumnIndex),
    };
  }

  return {
    mode: "date-time",
    dateColumnIndex:
      current.mode === "datetime"
        ? current.columnIndex
        : current.dateColumnIndex,
    timeColumnIndex:
      current.mode === "datetime"
        ? current.columnIndex
        : current.timeColumnIndex,
  };
}

function ColumnSelect({
  label,
  value,
  options,
  onChange,
  allowNone = true,
  placeholder,
  showLabel = true,
}: {
  label: string;
  value: number | null;
  options: Array<{ index: number; label: string }>;
  onChange: (value: number | null) => void;
  allowNone?: boolean;
  placeholder: string;
  showLabel?: boolean;
}) {
  return (
    <div className={styles.mappingField}>
      {showLabel ? (
        <Text as="label" size="2" className={styles.mappingLabel}>
          <Trans>Select source CSV column for {label}</Trans>
        </Text>
      ) : null}
      <Select.Root
        value={toSelectValue(value)}
        onValueChange={(nextValue) => onChange(fromSelectValue(nextValue))}
      >
        <Select.Trigger
          placeholder={placeholder}
          className={styles.selectTrigger}
          aria-label={label}
        />
        <Select.Content position="popper">
          {allowNone ? (
            <Select.Item value={NONE_VALUE}>
              <Trans>Not mapped</Trans>
            </Select.Item>
          ) : null}
          {options.map((option) => (
            <Select.Item key={option.index} value={option.index.toString()}>
              {option.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </div>
  );
}

function DateTimeMappingEditor({
  mapping,
  options,
  onChange,
}: {
  mapping: CalendarImportDateTimeMapping;
  options: Array<{ index: number; label: string }>;
  onChange: (value: CalendarImportDateTimeMapping) => void;
}) {
  return (
    <Flex direction="column" gap="2" className={styles.mappingControls}>
      <Text as="label" size="2" className={styles.mappingLabel}>
        <Trans>Select source CSV column(s)</Trans>
      </Text>
      <Select.Root
        value={mapping.mode}
        onValueChange={(value) => {
          onChange(
            updateDateTimeMapping(
              mapping,
              value as CalendarImportDateTimeMapping["mode"],
            ),
          );
        }}
      >
        <Select.Trigger
          className={styles.selectTrigger}
          aria-label="Datetime format"
        />
        <Select.Content position="popper">
          <Select.Item value="datetime">
            <Trans>Combined date and time</Trans>
          </Select.Item>
          <Select.Item value="date-time">
            <Trans>Separate date/time columns</Trans>
          </Select.Item>
        </Select.Content>
      </Select.Root>

      {mapping.mode === "datetime" ? (
        <ColumnSelect
          label="Datetime column"
          value={mapping.columnIndex}
          options={options}
          onChange={(nextValue) => {
            onChange({ mode: "datetime", columnIndex: nextValue });
          }}
          placeholder="Choose datetime column"
          showLabel={false}
        />
      ) : (
        <Flex direction="row" gap="2" wrap="wrap">
          <div className={styles.mappingSplitField}>
            <ColumnSelect
              label="Date column"
              value={mapping.dateColumnIndex}
              options={options}
              onChange={(nextValue) => {
                onChange({ ...mapping, dateColumnIndex: nextValue });
              }}
              placeholder="Choose date column"
            />
          </div>
          <div className={styles.mappingSplitField}>
            <ColumnSelect
              label="Time column"
              value={mapping.timeColumnIndex}
              options={options}
              onChange={(nextValue) => {
                onChange({ ...mapping, timeColumnIndex: nextValue });
              }}
              placeholder="Choose time column"
            />
          </div>
        </Flex>
      )}
    </Flex>
  );
}

function HeaderMappingPopover({
  title,
  source,
  children,
}: {
  title: string;
  source: string;
  children: React.ReactNode;
}) {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <button type="button" className={styles.headerMappingButton}>
          <span className={styles.headerMappingTitle}>
            {title}
            <ChevronDownIcon className={styles.headerMappingArrow} />
          </span>
          <span className={styles.headerMappingSource}>{source}</span>
        </button>
      </Popover.Trigger>
      <Popover.Content
        align="start"
        sideOffset={6}
        className={styles.mappingPopover}
      >
        {children}
      </Popover.Content>
    </Popover.Root>
  );
}

function RowStatusIcon({
  row,
  status,
}: {
  row: CalendarImportPreviewRow;
  status?: RowImportStatus;
}) {
  if (status?.status === "importing") {
    return <Spinner />;
  }

  if (status?.status === "imported") {
    return <CheckCircledIcon className={styles.successIcon} />;
  }

  if (status?.status === "failed" || row.issues.length > 0) {
    return <ExclamationTriangleIcon className={styles.warningIcon} />;
  }

  return <CheckCircledIcon />;
}

export default function CalendarCsvImportSheet({
  clubId,
  open,
  onOpenChange,
  onImported,
}: CalendarCsvImportSheetProps) {
  const { t } = useLingui();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [document, setDocument] = useState<ParsedCsvDocument | null>(null);
  const [useHeaderRow, setUseHeaderRow] = useState(false);
  const [mapping, setMapping] = useState<CalendarImportMapping | null>(null);
  const [rowStatuses, setRowStatuses] = useState<
    Record<number, RowImportStatus>
  >({});
  const [isParsing, setIsParsing] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      resetState();
    }
  }, [open]);

  const resetState = () => {
    setFileName(null);
    setDocument(null);
    setUseHeaderRow(false);
    setMapping(null);
    setRowStatuses({});
    setIsParsing(false);
    setIsImporting(false);
    setMessage(null);
    setError(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const columnOptions = useMemo(
    () => (document ? getCalendarColumnOptions(document, useHeaderRow) : []),
    [document, useHeaderRow],
  );

  const previewRows = useMemo(
    () =>
      document && mapping
        ? buildCalendarImportPreviewRows(document, useHeaderRow, mapping)
        : [],
    [document, mapping, useHeaderRow],
  );

  const rowCount = previewRows.length;
  const readyRowCount = previewRows.filter(
    (row) => row.issues.length === 0,
  ).length;
  const issueRowCount = previewRows.filter(
    (row) => row.issues.length > 0,
  ).length;

  const validRowsToImport = previewRows.filter(
    (row) =>
      row.issues.length === 0 &&
      rowStatuses[row.rowNumber]?.status !== "imported",
  );

  const resolveColumnLabel = (index: number | null) => {
    if (index === null) {
      return t`No source`;
    }

    return (
      columnOptions.find((option) => option.index === index)?.label ??
      `${t`Column`} ${index + 1}`
    );
  };

  const resolveDateTimeSourceLabel = (
    dateTimeMapping: CalendarImportDateTimeMapping,
  ) => {
    if (dateTimeMapping.mode === "datetime") {
      return resolveColumnLabel(dateTimeMapping.columnIndex);
    }

    return `${resolveColumnLabel(dateTimeMapping.dateColumnIndex)} + ${resolveColumnLabel(
      dateTimeMapping.timeColumnIndex,
    )}`;
  };

  const handleParseFile = async (file: File) => {
    setIsParsing(true);
    setMessage(null);
    setError(null);
    setRowStatuses({});

    try {
      const content = await file.text();
      const parsed = parseCsvDocument(content);
      const initialUseHeaderRow =
        parsed.rows.length > 1 &&
        looksLikeHeaderRow(parsed.rows[0]?.values ?? []);

      setFileName(file.name);
      setDocument(parsed);
      setUseHeaderRow(initialUseHeaderRow);
      setMapping(inferCalendarImportMapping(parsed, initialUseHeaderRow));
    } catch (exception) {
      setDocument(null);
      setMapping(null);
      setError((exception as Error).message);
    } finally {
      setIsParsing(false);
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    await handleParseFile(file);
  };

  const chooseFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    fileInputRef.current?.click();
  };

  const updateMapping = (nextMapping: CalendarImportMapping) => {
    setMapping(nextMapping);
    setRowStatuses({});
    setMessage(null);
    setError(null);
  };

  const handleHeaderToggle = (nextValue: boolean) => {
    setUseHeaderRow(nextValue);

    if (document) {
      setMapping(inferCalendarImportMapping(document, nextValue));
      setRowStatuses({});
      setMessage(null);
      setError(null);
    }
  };

  const handleImport = async () => {
    if (!document || !mapping) {
      return;
    }

    const rows = validRowsToImport;

    if (rows.length === 0) {
      setError(t`No valid rows are ready to import.`);
      return;
    }

    setIsImporting(true);
    setError(null);
    setMessage(null);

    const supabase = createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setIsImporting(false);
      setError(t`You must be signed in to import events.`);
      return;
    }

    let importedCount = 0;
    let failedCount = 0;

    for (const row of rows) {
      setRowStatuses((current) => ({
        ...current,
        [row.rowNumber]: { status: "importing" },
      }));

      const insertData: Database["public"]["Tables"]["calendar_events"]["Insert"] =
        {
          club_id: clubId,
          created_by: user.id,
          title: row.title,
          start_time: row.startTimeIso!,
          end_time: row.endTimeIso!,
          location: row.location || null,
          description: row.description || null,
        };

      const { error: insertError } = await supabase
        .from("calendar_events")
        .insert(insertData);

      if (insertError) {
        failedCount += 1;
        setRowStatuses((current) => ({
          ...current,
          [row.rowNumber]: {
            status: "failed",
            message: insertError.message,
          },
        }));
      } else {
        importedCount += 1;
        setRowStatuses((current) => ({
          ...current,
          [row.rowNumber]: { status: "imported" },
        }));
      }
    }

    setIsImporting(false);

    if (importedCount > 0) {
      onImported();
    }

    if (failedCount > 0) {
      setMessage(
        t`${importedCount} row(s) imported, ${failedCount} row(s) need attention.`,
      );
      return;
    }

    if (issueRowCount === 0) {
      onOpenChange(false);
      resetState();
      return;
    }

    setMessage(
      t`${importedCount} row(s) imported. Fix the warning rows and import again if needed.`,
    );
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content className={styles.dialogContent}>
        <Dialog.Title>
          <Trans>Import events from CSV</Trans>
        </Dialog.Title>

        <Flex direction="column" gap="4" className={styles.content}>
          <div className={styles.header}></div>

          <div className={styles.toolbar}>
            <Flex direction="row" gap="2" align="center" wrap="wrap">
              <Button
                type="button"
                variant={document ? "surface" : "solid"}
                onClick={chooseFile}
              >
                {document ? (
                  <Trans>Choose another file</Trans>
                ) : (
                  <Trans>Choose CSV file</Trans>
                )}
              </Button>
              <Text size="2" className={styles.fileName}>
                {fileName ? fileName : t`No file selected yet`}
              </Text>
            </Flex>
            <label className={styles.headerToggle}>
              <input
                type="checkbox"
                checked={useHeaderRow}
                onChange={(event) => handleHeaderToggle(event.target.checked)}
              />
              <span>
                <Trans>First row contains headers</Trans>
              </span>
            </label>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,text/csv"
            hidden
            onChange={handleFileChange}
          />

          {isParsing ? (
            <Flex direction="row" gap="2" align="center">
              <Spinner />
              <Text size="2">
                <Trans>Reading CSV file...</Trans>
              </Text>
            </Flex>
          ) : null}

          {error ? (
            <Callout.Root color="red">
              <Callout.Text>{error}</Callout.Text>
            </Callout.Root>
          ) : null}

          {message ? (
            <Callout.Root color="green">
              <Callout.Text>{message}</Callout.Text>
            </Callout.Root>
          ) : null}

          {document && issueRowCount > 0 ? (
            <div className={styles.summaryRow}>
              <Text size="2" className={styles.muted}>
                <Trans>
                  Issues detected in {issueRowCount} out of {rowCount} row(s).
                  You may need to adjust the columns by clicking the headers in
                  the table below or edit your CSV.
                </Trans>
              </Text>
            </div>
          ) : null}

          {document && previewRows.length > 0 ? (
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th scope="col" className={styles.statusHeader}>
                      <VisuallyHidden>
                        <Trans>Status</Trans>
                      </VisuallyHidden>
                    </th>
                    <th scope="col">
                      <HeaderMappingPopover
                        title={t`Title`}
                        source={resolveColumnLabel(
                          mapping?.titleColumnIndex ?? null,
                        )}
                      >
                        <ColumnSelect
                          label={t`Title`}
                          value={mapping?.titleColumnIndex ?? null}
                          options={columnOptions}
                          onChange={(nextValue) =>
                            mapping
                              ? updateMapping({
                                  ...mapping,
                                  titleColumnIndex: nextValue,
                                })
                              : null
                          }
                          placeholder={t`Choose title column`}
                        />
                      </HeaderMappingPopover>
                    </th>
                    <th scope="col">
                      <HeaderMappingPopover
                        title={t`Start time`}
                        source={
                          mapping
                            ? resolveDateTimeSourceLabel(mapping.startTime)
                            : t`No source`
                        }
                      >
                        {mapping ? (
                          <DateTimeMappingEditor
                            mapping={mapping.startTime}
                            options={columnOptions}
                            onChange={(nextValue) =>
                              updateMapping({
                                ...mapping,
                                startTime: nextValue,
                              })
                            }
                          />
                        ) : null}
                      </HeaderMappingPopover>
                    </th>
                    <th scope="col">
                      <HeaderMappingPopover
                        title={t`End time`}
                        source={
                          mapping
                            ? resolveDateTimeSourceLabel(mapping.endTime)
                            : t`Not mapped`
                        }
                      >
                        {mapping ? (
                          <DateTimeMappingEditor
                            mapping={mapping.endTime}
                            options={columnOptions}
                            onChange={(nextValue) =>
                              updateMapping({ ...mapping, endTime: nextValue })
                            }
                          />
                        ) : null}
                      </HeaderMappingPopover>
                    </th>
                    <th scope="col">
                      <HeaderMappingPopover
                        title={t`Location`}
                        source={resolveColumnLabel(
                          mapping?.locationColumnIndex ?? null,
                        )}
                      >
                        <ColumnSelect
                          label={t`Location`}
                          value={mapping?.locationColumnIndex ?? null}
                          options={columnOptions}
                          onChange={(nextValue) =>
                            mapping
                              ? updateMapping({
                                  ...mapping,
                                  locationColumnIndex: nextValue,
                                })
                              : null
                          }
                          placeholder={t`Choose location column`}
                        />
                      </HeaderMappingPopover>
                    </th>
                    <th scope="col">
                      <HeaderMappingPopover
                        title={t`Description`}
                        source={resolveColumnLabel(
                          mapping?.descriptionColumnIndex ?? null,
                        )}
                      >
                        <ColumnSelect
                          label={t`Description`}
                          value={mapping?.descriptionColumnIndex ?? null}
                          options={columnOptions}
                          onChange={(nextValue) =>
                            mapping
                              ? updateMapping({
                                  ...mapping,
                                  descriptionColumnIndex: nextValue,
                                })
                              : null
                          }
                          placeholder={t`Choose description column`}
                        />
                      </HeaderMappingPopover>
                    </th>
                    <th scope="col">Warnings</th>
                  </tr>
                </thead>
                <tbody>
                  {previewRows.map((row) => {
                    const status = rowStatuses[row.rowNumber];

                    return (
                      <tr
                        key={row.rowNumber}
                        className={
                          row.issues.length > 0 || status?.status === "failed"
                            ? styles.warningRow
                            : undefined
                        }
                      >
                        <td className={styles.statusCell}>
                          <RowStatusIcon row={row} status={status} />
                        </td>
                        <td>{row.title || "—"}</td>
                        <td>{row.startTime || "—"}</td>
                        <td>{row.endTime || "—"}</td>
                        <td>{row.location || "—"}</td>
                        <td>{row.description || "—"}</td>
                        <td>
                          {row.issues.length > 0 ? (
                            <ul className={styles.errorList}>
                              {row.issues.map((issue) => (
                                <li key={issue}>{issue}</li>
                              ))}
                            </ul>
                          ) : status?.status === "failed" && status.message ? (
                            <Text size="2" className={styles.errorText}>
                              {status.message}
                            </Text>
                          ) : status?.status === "imported" ? (
                            <Text size="2" className={styles.successText}>
                              <Trans>Imported</Trans>
                            </Text>
                          ) : (
                            <Text size="2" className={styles.muted}>
                              <Trans>Ready</Trans>
                            </Text>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : null}

          <div className={styles.actions}>
            <Button
              type="button"
              variant="soft"
              onClick={() => onOpenChange(false)}
            >
              <Trans>Cancel</Trans>
            </Button>
            <Flex direction="row" gap="2" wrap="wrap" justify="end">
              <Button
                type="button"
                loading={isImporting}
                disabled={validRowsToImport.length === 0 || isParsing}
                onClick={handleImport}
              >
                <UploadIcon />
                <Trans>Import valid rows</Trans>
              </Button>
            </Flex>
          </div>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
