import { Card, Flex } from "@radix-ui/themes";
import { createClient } from "@/lib/supabase/server";
import { ClubConfigTabNav } from "../layout";
import styles from "./layout.module.css";
import Sidebar from "./sidebar";

export default async function AbsenceFormsLayout({
  children,
  params,
}: LayoutProps<"/app/[id]/club/config/absence-forms">) {
  const { id, formId } = (await params) as { id: string; formId?: string };
  const supabase = await createClient();

  const forms =
    (
      await supabase
        .from("absence_report_forms")
        .select("id, name, updated_at")
        .eq("club_id", id)
        .order("created_at", { ascending: true })
    ).data ?? [];

  return (
    <>
      <ClubConfigTabNav active="absenceForms" clubId={id} />
      <Flex p="4" direction="column" gap="3" className={styles.root}>
        <Flex className={styles.layout}>
          <Card className={styles.sidebar}>
            <Sidebar clubId={id} forms={forms} />
          </Card>

          <div className={styles.detailCard}>{children}</div>
        </Flex>
      </Flex>
    </>
  );
}
