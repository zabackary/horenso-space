/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query AllAbsenceReports($clubId: UUID!) {\n    absence_reportsCollection(\n      filter: {\n        club_id: { eq: $clubId }\n      }\n      orderBy: { created_at: DescNullsFirst }\n      offset: 0\n    ) {\n      edges {\n        node {\n          id,\n          ...AbsenceReportCard\n        }\n      }\n    }\n  }\n": typeof types.AllAbsenceReportsDocument,
    "\n  query MyAbsenceReports($clubId: UUID!, $userId: UUID!) {\n    absence_reportsCollection(\n      filter: {\n        club_id: { eq: $clubId }\n        user_id: { eq: $userId }\n      }\n      orderBy: { created_at: DescNullsFirst }\n      offset: 0\n    ) {\n      edges {\n        node {\n          id,\n          ...AbsenceReportCard\n        }\n      }\n    }\n  }\n": typeof types.MyAbsenceReportsDocument,
    "\n  query JoinedClubs($me: UUID!) {\n    club_membersCollection(filter: { user_id: { eq: $me } }) {\n      edges {\n        node {\n          clubs {\n            nodeId,\n            ...ClubCard\n          }\n        }\n      }\n    }\n  }\n": typeof types.JoinedClubsDocument,
    "\n  query User($id: UUID!) {\n    club_membersCollection(filter: { user_id: { eq: $id } }) {\n      edges {\n        node {\n          clubs {\n            nodeId,\n            ...ClubCard\n          }\n        }\n      }\n    }\n  }\n": typeof types.UserDocument,
    "\n  fragment AbsenceReportCard on absence_reports {\n    id\n    date\n    created_at\n\n    assigned_to_role: roles {\n      name\n    }\n\n    reviews: absence_report_reviewsCollection {\n      edges {\n        node {\n          id\n        }\n      }\n    }\n    \n    event: calendar_events {\n      id\n      title\n      start_time\n      end_time\n    }\n    user: profiles {\n      full_name\n      avatar_url\n    }\n  }\n": typeof types.AbsenceReportCardFragmentDoc,
    "\n  fragment ClubCard on clubs {\n    id\n    name\n    school\n    description\n  }\n": typeof types.ClubCardFragmentDoc,
};
const documents: Documents = {
    "\n  query AllAbsenceReports($clubId: UUID!) {\n    absence_reportsCollection(\n      filter: {\n        club_id: { eq: $clubId }\n      }\n      orderBy: { created_at: DescNullsFirst }\n      offset: 0\n    ) {\n      edges {\n        node {\n          id,\n          ...AbsenceReportCard\n        }\n      }\n    }\n  }\n": types.AllAbsenceReportsDocument,
    "\n  query MyAbsenceReports($clubId: UUID!, $userId: UUID!) {\n    absence_reportsCollection(\n      filter: {\n        club_id: { eq: $clubId }\n        user_id: { eq: $userId }\n      }\n      orderBy: { created_at: DescNullsFirst }\n      offset: 0\n    ) {\n      edges {\n        node {\n          id,\n          ...AbsenceReportCard\n        }\n      }\n    }\n  }\n": types.MyAbsenceReportsDocument,
    "\n  query JoinedClubs($me: UUID!) {\n    club_membersCollection(filter: { user_id: { eq: $me } }) {\n      edges {\n        node {\n          clubs {\n            nodeId,\n            ...ClubCard\n          }\n        }\n      }\n    }\n  }\n": types.JoinedClubsDocument,
    "\n  query User($id: UUID!) {\n    club_membersCollection(filter: { user_id: { eq: $id } }) {\n      edges {\n        node {\n          clubs {\n            nodeId,\n            ...ClubCard\n          }\n        }\n      }\n    }\n  }\n": types.UserDocument,
    "\n  fragment AbsenceReportCard on absence_reports {\n    id\n    date\n    created_at\n\n    assigned_to_role: roles {\n      name\n    }\n\n    reviews: absence_report_reviewsCollection {\n      edges {\n        node {\n          id\n        }\n      }\n    }\n    \n    event: calendar_events {\n      id\n      title\n      start_time\n      end_time\n    }\n    user: profiles {\n      full_name\n      avatar_url\n    }\n  }\n": types.AbsenceReportCardFragmentDoc,
    "\n  fragment ClubCard on clubs {\n    id\n    name\n    school\n    description\n  }\n": types.ClubCardFragmentDoc,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query AllAbsenceReports($clubId: UUID!) {\n    absence_reportsCollection(\n      filter: {\n        club_id: { eq: $clubId }\n      }\n      orderBy: { created_at: DescNullsFirst }\n      offset: 0\n    ) {\n      edges {\n        node {\n          id,\n          ...AbsenceReportCard\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query AllAbsenceReports($clubId: UUID!) {\n    absence_reportsCollection(\n      filter: {\n        club_id: { eq: $clubId }\n      }\n      orderBy: { created_at: DescNullsFirst }\n      offset: 0\n    ) {\n      edges {\n        node {\n          id,\n          ...AbsenceReportCard\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query MyAbsenceReports($clubId: UUID!, $userId: UUID!) {\n    absence_reportsCollection(\n      filter: {\n        club_id: { eq: $clubId }\n        user_id: { eq: $userId }\n      }\n      orderBy: { created_at: DescNullsFirst }\n      offset: 0\n    ) {\n      edges {\n        node {\n          id,\n          ...AbsenceReportCard\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query MyAbsenceReports($clubId: UUID!, $userId: UUID!) {\n    absence_reportsCollection(\n      filter: {\n        club_id: { eq: $clubId }\n        user_id: { eq: $userId }\n      }\n      orderBy: { created_at: DescNullsFirst }\n      offset: 0\n    ) {\n      edges {\n        node {\n          id,\n          ...AbsenceReportCard\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query JoinedClubs($me: UUID!) {\n    club_membersCollection(filter: { user_id: { eq: $me } }) {\n      edges {\n        node {\n          clubs {\n            nodeId,\n            ...ClubCard\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query JoinedClubs($me: UUID!) {\n    club_membersCollection(filter: { user_id: { eq: $me } }) {\n      edges {\n        node {\n          clubs {\n            nodeId,\n            ...ClubCard\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query User($id: UUID!) {\n    club_membersCollection(filter: { user_id: { eq: $id } }) {\n      edges {\n        node {\n          clubs {\n            nodeId,\n            ...ClubCard\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query User($id: UUID!) {\n    club_membersCollection(filter: { user_id: { eq: $id } }) {\n      edges {\n        node {\n          clubs {\n            nodeId,\n            ...ClubCard\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment AbsenceReportCard on absence_reports {\n    id\n    date\n    created_at\n\n    assigned_to_role: roles {\n      name\n    }\n\n    reviews: absence_report_reviewsCollection {\n      edges {\n        node {\n          id\n        }\n      }\n    }\n    \n    event: calendar_events {\n      id\n      title\n      start_time\n      end_time\n    }\n    user: profiles {\n      full_name\n      avatar_url\n    }\n  }\n"): (typeof documents)["\n  fragment AbsenceReportCard on absence_reports {\n    id\n    date\n    created_at\n\n    assigned_to_role: roles {\n      name\n    }\n\n    reviews: absence_report_reviewsCollection {\n      edges {\n        node {\n          id\n        }\n      }\n    }\n    \n    event: calendar_events {\n      id\n      title\n      start_time\n      end_time\n    }\n    user: profiles {\n      full_name\n      avatar_url\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment ClubCard on clubs {\n    id\n    name\n    school\n    description\n  }\n"): (typeof documents)["\n  fragment ClubCard on clubs {\n    id\n    name\n    school\n    description\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;