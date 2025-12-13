import { initLingui } from "@/lib/i18n/initLingui";
import { createClient } from "@/lib/supabase/server";
import { Card, Flex } from "@radix-ui/themes";
import { ClubConfigTabNav } from "../layout";
import styles from "./layout.module.css";
import Sidebar from "./sidebar";

export default async function AbsenceFormsLayout({
  children,
  params,
}: LayoutProps<"/app/[id]/club/config/absence-forms">) {
  const { id } = await params;
  await initLingui();
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
        <div className={styles.mobileMenuWrapper}>
          <Sidebar clubId={id} forms={forms} />
        </div>
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
