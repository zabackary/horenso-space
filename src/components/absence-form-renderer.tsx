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

  function updateValue(key: string, value: unknown) {
    const next = { ...values, [key]: value };
    setValues(next);
    onChange?.(next);
  }

  function renderItem(item: AbsenceFormItem, path: number[] = []) {
    const key = makeKey(path);

    const t = item.item as
      | MultipleChoiceItem
      | TimeItem
      | TextItem
      | SimpleTextItem;

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

        {/* Render dependent children for multipleChoice if selected */}
        {t.type === "multipleChoice" &&
          (() => {
            const selected = (values[key] as string) ?? "";
            const opt = t.options.find((o) => o.label === selected);
            if (!opt?.children) return null;
            return (
              <Box className={styles.childrenInset}>
                {opt.children.map((child, i) =>
                  renderItem(child, [...path, i + 1])
                )}
              </Box>
            );
          })()}
      </Card>
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
        {form.items.map((it, i) => renderItem(it, [i]))}

        <Flex justify="end">
          <Button type="submit">Submit</Button>
        </Flex>
      </form>
    </Flex>
  );
}

export default AbsenceFormRenderer;
