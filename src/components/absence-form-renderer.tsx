"use client";

import type {
  AbsenceForm,
  AbsenceFormItem,
  MultipleChoiceItem,
  SimpleTextItem,
  TextItem,
  TimeItem,
} from "@/@types/AbsenceForm";
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Select,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import { useState } from "react";
import styles from "./absence-form-renderer.module.css";

export type AbsenceFormValues = Record<string, unknown>;

export interface AbsenceFormRendererProps {
  form: AbsenceForm;
  onChange?: (values: AbsenceFormValues) => void;
  onSubmit?: (values: AbsenceFormValues) => void;
}

function makeKey(path: number[]) {
  return path.join(".");
}

export function AbsenceFormRenderer({
  form,
  onChange,
  onSubmit,
}: AbsenceFormRendererProps) {
  const [values, setValues] = useState<AbsenceFormValues>({});
  const isReadOnly = onChange === undefined;

  function updateValue(key: string, value: unknown) {
    const next = { ...values, [key]: value };
    setValues(next);
    onChange?.(next);
  }

  // Flatten all items including nested children into a single list
  function flattenItems(items: AbsenceFormItem[], basePath: number[] = []): Array<{
    item: AbsenceFormItem;
    path: number[];
    parentKey?: string;
    parentValue?: string;
  }> {
    const result: Array<{
      item: AbsenceFormItem;
      path: number[];
      parentKey?: string;
      parentValue?: string;
    }> = [];

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const path = [...basePath, i];
      result.push({ item, path });

      const t = item.item as MultipleChoiceItem | TimeItem | TextItem | SimpleTextItem;
      
      // For multipleChoice items, flatten all possible children
      if (t.type === "multipleChoice") {
        const parentKey = makeKey(path);
        for (const opt of t.options) {
          if (opt.children) {
            const children = flattenItems(opt.children, path);
            for (const child of children) {
              result.push({ ...child, parentKey, parentValue: opt.label });
            }
          }
        }
      }
    }

    return result;
  }

  const flatItems = flattenItems(form.items);

  // Filter visible items based on parent selections
  const visibleItems = flatItems.filter(({ item, path, parentKey, parentValue }) => {
    if (!parentKey) return true;
    
    // Check if parent multipleChoice has selected the option that includes this child
    const selectedValue = values[parentKey] as string;
    return selectedValue === parentValue;
  });

  function renderItem(item: AbsenceFormItem, path: number[]) {
    const key = makeKey(path);

    const t = item.item as
      | MultipleChoiceItem
      | TimeItem
      | TextItem
      | SimpleTextItem;

    if (isReadOnly) {
      // Read-only compact rendering
      return (
        <Box key={key} className={styles.readOnlyItem}>
          <Text size="2" weight="medium" className={styles.readOnlyLabel}>
            {item.title}
          </Text>
          <Text size="2" className={styles.readOnlyValue}>
            {t.type === "multipleChoice" && (values[key] as string || "—")}
            {t.type === "time" && (values[key] as string || "—")}
            {t.type === "text" && (values[key] as string || "—")}
            {t.type === "simpleText" && (t as SimpleTextItem).text}
          </Text>
        </Box>
      );
    }

    // Editable rendering
    return (
      <Card key={key} className={styles.card}>
        <Heading size="4" as="h4">
          {item.title}
        </Heading>

        {t.type === "multipleChoice" && (
          <Select.Root
            required
            value={(values[key] as string) ?? ""}
            onValueChange={(val) => updateValue(key, val)}
          >
            <Select.Trigger placeholder="Select..." />
            <Select.Content>
              {t.options.map((opt, i) => (
                <Select.Item key={opt.label} value={opt.label}>
                  <Text>{opt.label}</Text>
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        )}

        {t.type === "time" && (
          <TextField.Root
            required
            type="time"
            className={styles.timeField}
            value={(values[key] as string) ?? ""}
            onChange={(e) => updateValue(key, e.target.value)}
          />
        )}

        {t.type === "text" && (
          <TextArea
            placeholder={item.title}
            value={(values[key] as string) ?? ""}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              updateValue(key, e.target.value)
            }
            required
            className={styles.textArea}
            rows={t.multiline ? 4 : 1}
          />
        )}

        {t.type === "simpleText" && <Text>{(t as SimpleTextItem).text}</Text>}
      </Card>
    );
  }

  const content = (
    <>
      {visibleItems.map(({ item, path }) => renderItem(item, path))}
      {!isReadOnly && (
        <Flex justify="end">
          <Button type="submit">Submit</Button>
        </Flex>
      )}
    </>
  );

  if (isReadOnly) {
    return (
      <Flex direction="column" gap="2" className={styles.readOnlyForm}>
        {content}
      </Flex>
    );
  }

  return (
    <Flex direction="column" gap="2" asChild>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit?.(values);
        }}
      >
        {content}
      </form>
    </Flex>
  );
}

export default AbsenceFormRenderer;
