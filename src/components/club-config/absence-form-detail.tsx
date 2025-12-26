"use client";

import { Trans, useLingui } from "@lingui/react/macro";
import { CrossCircledIcon, TrashIcon } from "@radix-ui/react-icons";
import {
  Button,
  Callout,
  Flex,
  Heading,
  Spinner,
  TextField,
} from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { AbsenceForm } from "@/@types/AbsenceForm";
import type { Database } from "@/@types/database.types";
import { createClient } from "@/lib/supabase/client";
import AbsenceFormEditor from "./absence-form-editor";

type AbsenceFormRow =
  Database["public"]["Tables"]["absence_report_forms"]["Row"];

function toClient(row: AbsenceFormRow) {
  const questions = ((): AbsenceForm => {
    const q = row.questions as unknown;
    if (
      q &&
      typeof q === "object" &&
      !Array.isArray(q) &&
      "items" in (q as Record<string, unknown>)
    ) {
      const { items, description } = q as {
        items?: AbsenceForm["items"];
        description?: string;
      };
      return { items: Array.isArray(items) ? items : [], description };
    }
    return { items: [] };
  })();
  return { id: row.id, name: row.name, questions, updatedAt: row.updated_at };
}

export default function AbsenceFormDetail({
  initial,
  clubId,
}: {
  initial: AbsenceFormRow;
  clubId: string;
}) {
  const router = useRouter();
  const [state, setState] = useState(() => toClient(initial));
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [savedSnapshot, setSavedSnapshot] = useState(() =>
    JSON.stringify({ name: initial.name, questions: initial.questions }),
  );

  const { t } = useLingui();

  const isDirty = useMemo(() => {
    const current = JSON.stringify({
      name: state.name,
      questions: state.questions,
    });
    return current !== savedSnapshot;
  }, [state, savedSnapshot]);

  async function save() {
    setError(null);
    setSaving(true);
    const supabase = createClient();
    try {
      const { error: updateError } = await supabase
        .from("absence_report_forms")
        .update({ name: state.name, questions: state.questions as any })
        .eq("id", state.id)
        .eq("club_id", clubId);
      if (updateError) throw updateError;
      setSavedSnapshot(
        JSON.stringify({ name: state.name, questions: state.questions }),
      );
      router.refresh();
    } catch (e: unknown) {
      console.error("Failed to save absence form template", e);
      setError(t`Failed to save template.`);
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    if (!confirm("Delete this template? This cannot be undone.")) return;
    setError(null);
    setDeleting(true);
    const supabase = createClient();
    try {
      const { error: delError } = await supabase
        .from("absence_report_forms")
        .delete()
        .eq("id", state.id)
        .eq("club_id", clubId);
      if (delError) throw delError;
      // Soft UX: navigate back
      window.location.href = window.location.pathname.replace(/\/[^/]+$/, "");
    } catch (_e: unknown) {
      setError(t`Failed to delete template.`);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <Flex direction="column" gap="3">
      <Heading size="4">Template</Heading>
      {isDirty && !error && (
        <Callout.Root color="amber">
          <Callout.Text>
            <Trans>You have unsaved changes</Trans>
          </Callout.Text>
        </Callout.Root>
      )}
      {error && (
        <Callout.Root color="red">
          <Callout.Icon>
            <CrossCircledIcon />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <Flex align="center" gap="2">
        <TextField.Root
          placeholder="Template name"
          value={state.name}
          onChange={(e) => setState((s) => ({ ...s, name: e.target.value }))}
          style={{ flexGrow: 1 }}
        />
        <Button variant="soft" color="red" onClick={remove} disabled={deleting}>
          {deleting ? (
            <Spinner />
          ) : (
            <>
              <TrashIcon /> <Trans>Delete</Trans>
            </>
          )}
        </Button>
        <Button onClick={save} disabled={saving || !isDirty} variant="solid">
          {saving ? (
            <Spinner />
          ) : isDirty ? (
            <Trans>Save changes</Trans>
          ) : (
            <Trans>Saved</Trans>
          )}
        </Button>
      </Flex>

      <AbsenceFormEditor
        value={state.questions}
        onChange={(questions) => setState((s) => ({ ...s, questions }))}
      />
    </Flex>
  );
}
