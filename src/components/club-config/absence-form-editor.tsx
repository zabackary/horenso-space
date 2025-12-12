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
  CaretDownIcon,
  CaretRightIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import {
  Button,
  Card,
  Flex,
  Heading,
  Select,
  Switch,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";
import styles from "./absence-form-editor.module.css";

const DEFAULT_TEXT_ITEM: AbsenceFormItem = {
  title: "New question",
  item: {
    type: "text",
    multiline: true,
  },
};

function coerceType(
  item: AbsenceFormItem,
  type: AbsenceFormItem["item"]["type"]
): AbsenceFormItem {
  if (type === "text") {
    return {
      ...item,
      item: {
        type: "text",
        multiline: true,
      } satisfies TextItem,
    };
  }
  if (type === "time") {
    return {
      ...item,
      item: {
        type: "time",
      } satisfies TimeItem,
    };
  }
  if (type === "simpleText") {
    return {
      ...item,
      item: {
        type: "simpleText",
        text: "",
      } satisfies SimpleTextItem,
    };
  }
  return {
    ...item,
    item: {
      type: "multipleChoice",
      options: [{ label: "Option 1" }, { label: "Option 2" }],
    } satisfies MultipleChoiceItem,
  };
}

function normalizeChildren(children?: AbsenceFormItem[]): AbsenceFormItem[] {
  if (!children) return [];
  if (!Array.isArray(children)) return [];
  return children.map((child) => ({
    title: child.title ?? "Follow-up",
    item: child.item ?? { type: "text", multiline: true },
  }));
}

function ItemEditor({
  item,
  onChange,
  onRemove,
  expandAllFollowups,
}: {
  item: AbsenceFormItem;
  onChange: (item: AbsenceFormItem) => void;
  onRemove?: () => void;
  expandAllFollowups?: boolean;
}) {
  const inner = item.item as
    | MultipleChoiceItem
    | TextItem
    | TimeItem
    | SimpleTextItem;
  const [openOptions, setOpenOptions] = useState<Set<number>>(() => new Set());
  const [optionsOpen, setOptionsOpen] = useState(false);

  useEffect(() => {
    if (typeof expandAllFollowups === "boolean") {
      setOptionsOpen(Boolean(expandAllFollowups));
    }
  }, [expandAllFollowups]);

  function updateTitle(title: string) {
    onChange({ ...item, title });
  }

  function updateType(type: AbsenceFormItem["item"]["type"]) {
    onChange(coerceType(item, type));
  }

  function updateMultipleChoice(options: MultipleChoiceItem["options"]) {
    onChange({
      ...item,
      item: {
        type: "multipleChoice",
        options,
      },
    });
  }

  function updateOptionLabel(index: number, label: string) {
    if (inner.type !== "multipleChoice") return;
    const options = inner.options.map((opt, i) =>
      i === index ? { ...opt, label } : opt
    );
    updateMultipleChoice(options);
  }

  function addOption() {
    if (inner.type !== "multipleChoice") return;
    updateMultipleChoice([
      ...inner.options,
      { label: `Option ${inner.options.length + 1}` },
    ]);
    setOptionsOpen(true);
  }

  function removeOption(index: number) {
    if (inner.type !== "multipleChoice") return;
    const options = inner.options.filter((_, i) => i !== index);
    updateMultipleChoice(options.length ? options : [{ label: "Option 1" }]);
  }

  function addChildOption(index: number) {
    if (inner.type !== "multipleChoice") return;
    const options = inner.options.map((opt, i) => {
      if (i !== index) return opt;
      const nextChildren = normalizeChildren(opt.children);
      return {
        ...opt,
        children: [...nextChildren, { ...DEFAULT_TEXT_ITEM }],
      };
    });
    updateMultipleChoice(options);
    // Ensure the follow-up section is visible after adding
    setOpenOptions((prev) => {
      const next = new Set(prev);
      next.add(index);
      return next;
    });
  }

  function updateChildOption(
    index: number,
    childIndex: number,
    next: AbsenceFormItem
  ) {
    if (inner.type !== "multipleChoice") return;
    const options = inner.options.map((opt, i) => {
      if (i !== index) return opt;
      const nextChildren = normalizeChildren(opt.children).map((child, j) =>
        j === childIndex ? next : child
      );
      return {
        ...opt,
        children: nextChildren,
      };
    });
    updateMultipleChoice(options);
  }

  function removeChildOption(index: number, childIndex: number) {
    if (inner.type !== "multipleChoice") return;
    const options = inner.options.map((opt, i) => {
      if (i !== index) return opt;
      const nextChildren = normalizeChildren(opt.children).filter(
        (_, j) => j !== childIndex
      );
      return {
        ...opt,
        children: nextChildren.length ? nextChildren : undefined,
      };
    });
    updateMultipleChoice(options);
  }

  function isOptionOpen(index: number) {
    if (expandAllFollowups) return true;
    return openOptions.has(index);
  }

  function toggleOptionOpen(index: number) {
    setOpenOptions((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  return (
    <Card className={styles.itemCard}>
      <Flex direction="column" gap="2">
        <Flex align="center" gap="2" className={styles.actionRow}>
          <TextField.Root
            placeholder="Question title"
            value={item.title}
            onChange={(e) => updateTitle(e.target.value)}
            style={{ flexGrow: 1 }}
          />
          {onRemove && (
            <Button
              variant="ghost"
              color="red"
              onClick={onRemove}
              className={styles.removeButton}
            >
              <TrashIcon />
              Remove
            </Button>
          )}
        </Flex>

        <Flex gap="2" className={styles.typeRow}>
          <Text color="gray" size="2" style={{ minWidth: 48 }}>
            Type
          </Text>
          <Select.Root
            value={inner.type}
            onValueChange={(value) =>
              updateType(value as AbsenceFormItem["item"]["type"])
            }
          >
            <Select.Trigger />
            <Select.Content>
              <Select.Item value="text">Text</Select.Item>
              <Select.Item value="time">Time</Select.Item>
              <Select.Item value="multipleChoice">Multiple choice</Select.Item>
              <Select.Item value="simpleText">Static text</Select.Item>
            </Select.Content>
          </Select.Root>
        </Flex>

        {inner.type === "text" && (
          <Flex align="center" gap="2">
            <Text color="gray" size="2" style={{ minWidth: 120 }}>
              Allow multiline
            </Text>
            <Switch
              checked={Boolean(inner.multiline)}
              onCheckedChange={(checked) =>
                onChange({
                  ...item,
                  item: { type: "text", multiline: Boolean(checked) },
                })
              }
            />
          </Flex>
        )}

        {inner.type === "simpleText" && (
          <TextArea
            className={styles.simpleTextArea}
            placeholder="Static text"
            value={(inner as SimpleTextItem).text}
            onChange={(e) =>
              onChange({
                ...item,
                item: { type: "simpleText", text: e.target.value },
              })
            }
            rows={2}
          />
        )}

        {inner.type === "multipleChoice" && (
          <Flex direction="column" gap="2">
            <Flex align="center" justify="between">
              <Heading size="3">Options</Heading>
              <Button variant="ghost" onClick={() => setOptionsOpen((v) => !v)}>
                {optionsOpen ? (
                  <>
                    <CaretDownIcon /> Hide options
                  </>
                ) : (
                  <>
                    <CaretRightIcon /> Show options
                  </>
                )}
              </Button>
            </Flex>
            {!optionsOpen && (
              <Text size="2" className={styles.childHeaderSummary}>
                {inner.options
                  .map((opt) => {
                    const hasFollowups =
                      normalizeChildren(opt.children).length > 0;
                    return `${opt.label}${hasFollowups ? " ↗" : ""}`;
                  })
                  .join(" · ")}
              </Text>
            )}
            {optionsOpen && (
              <Flex direction="column" gap="2">
                {inner.options.map((opt, index) => (
                  <Card
                    key={`${opt.label}-${index}`}
                    className={styles.optionCard}
                  >
                    <Flex direction="column" gap="2">
                      <Flex align="center" gap="2">
                        <TextField.Root
                          placeholder="Option label"
                          value={opt.label}
                          onChange={(e) =>
                            updateOptionLabel(index, e.target.value)
                          }
                          style={{ flexGrow: 1 }}
                        />
                        <Button
                          variant="ghost"
                          color="red"
                          onClick={() => removeOption(index)}
                          disabled={inner.options.length <= 1}
                        >
                          <TrashIcon />
                          Remove
                        </Button>
                      </Flex>

                      <Flex align="center" justify="between">
                        <Text size="2" className={styles.childHeaderSummary}>
                          {normalizeChildren(opt.children).length > 0
                            ? `${
                                normalizeChildren(opt.children).length
                              } follow-up${
                                normalizeChildren(opt.children).length === 1
                                  ? ""
                                  : "s"
                              }`
                            : "No follow-ups"}
                        </Text>
                        {normalizeChildren(opt.children).length > 0 ? (
                          <Button
                            variant="ghost"
                            onClick={() => toggleOptionOpen(index)}
                          >
                            {isOptionOpen(index) ? (
                              <>
                                <CaretDownIcon /> Hide
                              </>
                            ) : (
                              <>
                                <CaretRightIcon /> Show
                              </>
                            )}
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            onClick={() => addChildOption(index)}
                          >
                            Add follow-up
                          </Button>
                        )}
                      </Flex>

                      {isOptionOpen(index) &&
                        normalizeChildren(opt.children).length > 0 && (
                          <Flex
                            direction="column"
                            gap="2"
                            className={styles.childList}
                          >
                            {normalizeChildren(opt.children).map(
                              (child, childIndex) => (
                                <ItemEditor
                                  key={`child-${index}-${childIndex}`}
                                  item={child}
                                  onChange={(next) =>
                                    updateChildOption(index, childIndex, next)
                                  }
                                  onRemove={() =>
                                    removeChildOption(index, childIndex)
                                  }
                                  expandAllFollowups={expandAllFollowups}
                                />
                              )
                            )}
                            <Button
                              variant="outline"
                              onClick={() => addChildOption(index)}
                            >
                              Add follow-up question
                            </Button>
                          </Flex>
                        )}
                    </Flex>
                  </Card>
                ))}
                <Button variant="outline" onClick={() => addOption()}>
                  Add option
                </Button>
              </Flex>
            )}
          </Flex>
        )}
      </Flex>
    </Card>
  );
}

export default function AbsenceFormEditor({
  value,
  onChange,
}: {
  value: AbsenceForm;
  onChange: (form: AbsenceForm) => void;
}) {
  const [expandAllFollowups, setExpandAllFollowups] = useState(false);
  function updateItem(index: number, next: AbsenceFormItem) {
    onChange({
      ...value,
      items: value.items.map((item, i) => (i === index ? next : item)),
    });
  }

  function removeItem(index: number) {
    onChange({
      ...value,
      items: value.items.filter((_, i) => i !== index),
    });
  }

  function addItem() {
    onChange({
      ...value,
      items: [...value.items, { ...DEFAULT_TEXT_ITEM }],
    });
  }

  return (
    <Flex direction="column" gap="3">
      <Flex align="center" justify="between">
        <Heading size="3">Form description</Heading>
      </Flex>
      <TextArea
        placeholder="Form description (optional)"
        value={value.description ?? ""}
        onChange={(e) => onChange({ ...value, description: e.target.value })}
        rows={3}
      />

      <Flex align="center" justify="between">
        <Heading size="4">Questions</Heading>
        <Button variant="soft" onClick={() => setExpandAllFollowups((v) => !v)}>
          {expandAllFollowups ? "Collapse all" : "Expand all"}
        </Button>
      </Flex>
      <div className={styles.items}>
        {value.items.map((item, index) => (
          <ItemEditor
            key={index}
            item={item}
            onChange={(next) => updateItem(index, next)}
            onRemove={() => removeItem(index)}
            expandAllFollowups={expandAllFollowups}
          />
        ))}
      </div>

      <Flex>
        <Button variant="outline" onClick={() => addItem()}>
          Add question
        </Button>
      </Flex>
    </Flex>
  );
}
