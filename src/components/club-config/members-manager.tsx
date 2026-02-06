// "use client";

// import { graphql } from "@/gql";
// import { createClient } from "@/lib/supabase/client";
// import { useSuspenseQuery } from "@apollo/client/react";
// import { Trans, useLingui } from "@lingui/react/macro";
// import { CrossCircledIcon, TrashIcon } from "@radix-ui/react-icons";
// import {
//   Avatar,
//   Button,
//   Callout,
//   Card,
//   Flex,
//   Heading,
//   Link as RadixLink,
//   Select,
//   Text,
// } from "@radix-ui/themes";
// import Link from "next/link";
// import { useState } from "react";
// import styles from "./members-manager.module.css";

// const membersManagerQueryDocument = graphql(/* GraphQL */ `
//   query MembersManager($clubId: UUID!) {
//     club_membersCollection(orderBy: { joined_at: DescNullsLast }, first: 100) {
//       edges {
//         node {
//           user_id
//           role_id
//         }
//       }
//     }
//     rolesCollection(orderBy: { name: AscNullsLast }, first: 100) {
//       edges {
//         node {
//           id
//           name
//         }
//       }
//     }
//   }
// `);

// type Role = { id: string; name: string };

// export default function MembersManager({ clubId }: { clubId: string }) {

//   type MemberClient = {
//     key: string;
//     user_id: string;
//     role_id: string | null;
//     profile: ProfileRow | null;
//   };

//   const [members, setMembers] = useState<MemberClient[]>(
//     () =>
//       initialMembers.map((m) => ({
//         key: m.user_id,
//         user_id: m.user_id,
//         role_id: (m.role_id as string) ?? null,
//         profile: m.profile,
//       })) ?? [],
//   );
//   const [roles] = useState<Role[]>(
//     () =>
//       initialRoles.map((r) => ({
//         id: r.id,
//         name: (r as { id: string; name: string }).name,
//       })) ?? [],
//   );
//   const [error, setError] = useState<string | null>(null);

//   const { data, error: queryError } = useSuspenseQuery(membersManagerQueryDocument, {
//     variables: { clubId },
//   });

//   if (queryError) {
//     console.error("Failed to load members manager data:", queryError);
//     return (
//       <Callout.Root color="red">
//         <Callout.Icon>
//           <CrossCircledIcon />
//         </Callout.Icon>
//         <Callout.Text>
//           <Trans>Failed to load members data. Please try again later.</Trans>
//         </Callout.Text>
//       </Callout.Root>
//     );
//   }

//   const initialMembers =
//     data.club_membersCollection.edges.map((e) => e.node) ?? [];
//   const initialRoles = data.rolesCollection.edges.map((e) => e.node) ?? [];

//   const { t } = useLingui();

//   async function changeRole(memberUserId: string, newRoleId: string) {
//     setError(null);
//     const supabase = createClient();
//     try {
//       await supabase
//         .from("club_members")
//         .update({ role_id: newRoleId })
//         .match({ club_id: clubId, user_id: memberUserId })
//         .throwOnError();
//       setMembers((prev) =>
//         prev.map((m) =>
//           m.user_id === memberUserId ? { ...m, role_id: newRoleId } : m,
//         ),
//       );
//     } catch (e: unknown) {
//       console.error("Failed to change member role:", e);
//       setError(t`Failed to change member role. Please try again later.`);
//     }
//   }

//   async function removeMember(memberUserId: string) {
//     setError(null);
//     const supabase = createClient();
//     try {
//       await supabase
//         .from("club_members")
//         .delete()
//         .match({ club_id: clubId, user_id: memberUserId })
//         .throwOnError();
//       setMembers((prev) => prev.filter((m) => m.user_id !== memberUserId));
//     } catch (e: unknown) {
//       console.error("Failed to remove member:", e);
//       setError(t`Failed to remove member. Please try again later.`);
//     }
//   }

//   return (
//     <Flex direction="column" className={styles.root} gap="3">
//       <Heading size="5" as="h3">
//         <Trans>Manage members</Trans>
//       </Heading>
//       {error && (
//         <Callout.Root color="red">
//           <Callout.Icon>
//             <CrossCircledIcon />
//           </Callout.Icon>
//           <Callout.Text>{error}</Callout.Text>
//         </Callout.Root>
//       )}

//       <Flex direction="column" gap="3">
//         {members.length === 0 ? (
//           <Text className={styles.empty}>
//             <Trans>No members yet.</Trans>
//           </Text>
//         ) : (
//           members.map((m) => {
//             const displayName =
//               m.profile?.full_name ?? m.profile?.nickname ?? m.user_id;
//             const effectiveRoleId = m.role_id ?? roles[0]?.id ?? "";
//             const currentRoleLabel =
//               roles.find((r) => r.id === effectiveRoleId)?.name ?? "";

//             return (
//               <Card key={m.key}>
//                 <Flex align="center" gap="3" justify="between" width="100%">
//                   <Avatar
//                     fallback={displayName.charAt(0).toUpperCase()}
//                     size="4"
//                     src={m.profile?.avatar_url ?? undefined}
//                   />
//                   <Flex direction="column" style={{ flexGrow: 1 }} gap="1">
//                     <RadixLink weight="bold" size="3" asChild>
//                       <Link href={`/app/users/${m.user_id}`}>
//                         {displayName}
//                       </Link>
//                     </RadixLink>
//                     <Text size="2" color="gray">
//                       <Trans>Role: {currentRoleLabel}</Trans>
//                     </Text>
//                   </Flex>
//                   <Flex align="center" gap="2">
//                     <Select.Root
//                       value={effectiveRoleId}
//                       onValueChange={(val) => changeRole(m.user_id, val)}
//                     >
//                       <Select.Trigger />
//                       <Select.Content>
//                         {roles.map((r) => (
//                           <Select.Item key={r.id} value={r.id}>
//                             {r.name}
//                           </Select.Item>
//                         ))}
//                       </Select.Content>
//                     </Select.Root>
//                     <Button
//                       onClick={() => removeMember(m.user_id)}
//                       variant="soft"
//                       color="red"
//                     >
//                       <TrashIcon /> <Trans>Remove</Trans>
//                     </Button>
//                   </Flex>
//                 </Flex>
//               </Card>
//             );
//           })
//         )}
//       </Flex>
//     </Flex>
//   );
// }
