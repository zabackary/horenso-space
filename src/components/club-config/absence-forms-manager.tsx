"use client";

import type { AbsenceForm } from "@/@types/AbsenceForm";
import { DEFAULT_ABSENCE_FORM } from "@/@types/AbsenceForm";
import type { Database } from "@/@types/database.types";
import { createClient } from "@/lib/supabase/client";
import { CrossCircledIcon, TrashIcon } from "@radix-ui/react-icons";
import {
  Badge,
  Button,
  Callout,
  Card,
  Flex,
  Heading,
  Separator,
  Spinner,
  Text,
  TextField,
} from "@radix-ui/themes";
import { use, useMemo, useState } from "react";
import AbsenceFormEditor from "./absence-form-editor";
import styles from "./absence-forms-manager.module.css";

type AbsenceFormRow =
  Database["public"]["Tables"]["absence_report_forms"]["Row"];

type ClientForm = {
  id: string;
  name: string;
  questions: AbsenceForm;
  createdAt: string;
  updatedAt: string;
};

function toAbsenceForm(input: unknown): AbsenceForm {
  const fallback = structuredDefaultForm();
  if (
    input &&
    typeof input === "object" &&
    !Array.isArray(input) &&
    "items" in input &&
    Array.isArray((input as { items?: unknown }).items)
  ) {
    const val = input as { items: AbsenceForm["items"]; description?: string };
    return {
      items: Array.isArray(val.items) ? val.items : fallback.items,
      description: val.description ?? fallback.description,
    } satisfies AbsenceForm;
  }
  return fallback;
}

function structuredDefaultForm(): AbsenceForm {
  return JSON.parse(JSON.stringify(DEFAULT_ABSENCE_FORM)) as AbsenceForm;
}

function mapRow(row: AbsenceFormRow): ClientForm {
  return {
    id: row.id,
    name: row.name,
    questions: toAbsenceForm(row.questions),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export default function AbsenceFormsManager({
  clubId,
  formsPromise,
}: {
  clubId: string;
  formsPromise: PromiseLike<AbsenceFormRow[]>;
}) {
  const initialRows = use(formsPromise) ?? [];
  const [forms, setForms] = useState<ClientForm[]>(() =>
    initialRows.map(mapRow)
  );
  const [selectedId, setSelectedId] = useState<string | null>(
    () => initialRows[0]?.id ?? null
  );
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const selected = useMemo(
    () => forms.find((f) => f.id === selectedId) ?? null,
    [forms, selectedId]
  );

  function updateForm(id: string, updater: (form: ClientForm) => ClientForm) {
    setForms((prev) => prev.map((f) => (f.id === id ? updater(f) : f)));
  }

  async function saveForm(id: string) {
    const form = forms.find((f) => f.id === id);
    if (!form) return;
    setError(null);
    setIsSaving(true);
    const supabase = createClient();
    try {
      const { error: updateError } = await supabase
        .from("absence_report_forms")
        .update({
          name: form.name,
          questions: form.questions as any,
        })
        .eq("id", id)
        .eq("club_id", clubId);
      if (updateError) throw updateError;
      setForms((prev) =>
        prev.map((f) =>
          f.id === id ? { ...f, updatedAt: new Date().toISOString() } : f
        )
      );
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setIsSaving(false);
    }
  }

  async function createForm() {
    setError(null);
    setIsCreating(true);
    const supabase = createClient();
    try {
      const { data, error: insertError } = await supabase
        .from("absence_report_forms")
        .insert({
          club_id: clubId,
          name: `Template ${forms.length + 1}`,
          questions: structuredDefaultForm() as any,
        })
        .select()
        .single();
      if (insertError) throw insertError;
      if (data) {
        const clientForm = mapRow(data);
        setForms((prev) => [...prev, clientForm]);
        setSelectedId(clientForm.id);
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setIsCreating(false);
    }
  }

  async function deleteForm(id: string) {
    if (!confirm("Delete this template? This cannot be undone.")) return;
    setError(null);
    const supabase = createClient();
    try {
      const { error: deleteError } = await supabase
        .from("absence_report_forms")
        .delete()
        .eq("id", id)
        .eq("club_id", clubId);
      if (deleteError) throw deleteError;
      setForms((prev) => {
        const next = prev.filter((f) => f.id !== id);
        if (selectedId === id) {
          setSelectedId(next[0]?.id ?? null);
        }
        return next;
      });
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }

  return (
    <Flex direction="column" className={styles.root} gap="3">
      <Heading size="5" as="h3">
        Absence templates
      </Heading>
      {error && (
        <Callout.Root color="red">
          <Callout.Icon>
            <CrossCircledIcon />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <Flex className={styles.layout} gap="3">
        <Card className={styles.sidebar}>
          <Flex direction="column" gap="3">
            <Heading size="3">Templates</Heading>
            <Flex direction="column" gap="2">
              {forms.length === 0 ? (
                <Text className={styles.empty}>No templates yet.</Text>
              ) : (
                forms.map((form) => {
                  const isSelected = form.id === selectedId;
                  return (
                    <Card
                      asChild
                      key={form.id}
                      className={`${styles.templateCard} ${
                        isSelected ? styles.templateCardSelected : ""
                      }`}
                    >
                      <button
                        type="button"
                        className={styles.templateButton}
                        onClick={() => setSelectedId(form.id)}
                      >
                        <Flex direction="column" gap="1">
                          <Flex align="center" gap="2" justify="between">
                            <Text weight="bold">{form.name}</Text>
                            {isSelected && <Badge color="green">Active</Badge>}
                          </Flex>
                          <Text size="1" className={styles.templateMeta}>
                            Updated{" "}
                            {new Date(form.updatedAt).toLocaleDateString()}
                          </Text>
                        </Flex>
                      </button>
                    </Card>
                  );
                })
              )}
            </Flex>
            <Button onClick={() => createForm()} disabled={isCreating}>
              {isCreating ? <Spinner /> : "Create template"}
            </Button>
          </Flex>
        </Card>

        <Card className={styles.detailCard}>
          {!selected ? (
            <Text className={styles.empty}>Select a template to edit.</Text>
          ) : (
            <Flex direction="column" gap="3">
              <Flex align="center" gap="2">
                <TextField.Root
                  value={selected.name}
                  onChange={(e) =>
                    updateForm(selected.id, (prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  placeholder="Template name"
                  style={{ flexGrow: 1 }}
                />
                <Button
                  variant="soft"
                  color="red"
                  onClick={() => deleteForm(selected.id)}
                >
                  <TrashIcon />
                  Delete
                </Button>
                <Button
                  onClick={() => saveForm(selected.id)}
                  disabled={isSaving}
                >
                  {isSaving ? <Spinner /> : "Save"}
                </Button>
              </Flex>

              <Separator size="4" />

              <AbsenceFormEditor
                value={selected.questions}
                onChange={(next) =>
                  updateForm(selected.id, (prev) => ({
                    ...prev,
                    questions: next,
                  }))
                }
              />
            </Flex>
          )}
        </Card>
      </Flex>
    </Flex>
  );
}
