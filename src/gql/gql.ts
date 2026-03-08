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
    "\n  query AbsenceReportAllDetail($reportId: UUID!) {\n    absenceReportsCollection(\n      filter: {\n        id: { eq: $reportId }\n      }\n    ) {\n      edges {\n        node {\n          ...AbsenceReportDetail\n        }\n      }\n    }\n  }\n": typeof types.AbsenceReportAllDetailDocument,
    "\n  query AllAbsenceReports($clubId: UUID!) {\n    absenceReportsCollection(\n      filter: {\n        clubId: { eq: $clubId }\n      }\n      orderBy: { createdAt: DescNullsFirst }\n      offset: 0\n    ) {\n      edges {\n        node {\n          id,\n          ...AbsenceReportCard\n        }\n      }\n    }\n  }\n": typeof types.AllAbsenceReportsDocument,
    "\n  query AbsenceReportMyDetail($reportId: UUID!) {\n    absenceReportsCollection(\n      filter: {\n        id: { eq: $reportId }\n      }\n    ) {\n      edges {\n        node {\n          ...AbsenceReportDetail\n        }\n      }\n    }\n  }\n": typeof types.AbsenceReportMyDetailDocument,
    "\n  query MyAbsenceReports($clubId: UUID!, $userId: UUID!) {\n    absenceReportsCollection(\n      filter: {\n        clubId: { eq: $clubId }\n        userId: { eq: $userId }\n      }\n      orderBy: { createdAt: DescNullsFirst }\n      offset: 0\n    ) {\n      edges {\n        node {\n          id,\n          ...AbsenceReportCard\n        }\n      }\n    }\n  }\n": typeof types.MyAbsenceReportsDocument,
    "\n  fragment AbsenceReportDetail on AbsenceReports {\n    id\n    date\n    createdAt\n    data\n\n    assignedToRole: roles {\n      name\n    }\n    form: form {\n      id\n      name\n      questions \n    }\n\n    reviews: absenceReportReviewsCollection  {\n      edges {\n        node {\n          id\n          createdAt\n          accepted\n          comments\n          reviewer {\n            fullName\n          }\n        }\n      }\n    }\n    \n    event {\n      id\n      title\n      startTime\n      endTime\n    }\n    user {\n      fullName\n      avatarUrl\n    }\n  }\n": typeof types.AbsenceReportDetailFragmentDoc,
    "\n  query CalendarDay($clubId: UUID!, $date: Date!, $startDate: Datetime!, $endDate: Datetime!) {\n    calendarEventsCollection(\n      filter: {\n        clubId: { eq: $clubId }\n        startTime: { gte: $startDate }\n        endTime: { lte: $endDate }\n      }\n      orderBy: {\n        startTime: AscNullsLast\n      }\n    ) {\n      edges {\n        node {\n          id\n          title\n          startTime\n          endTime\n          description\n          location\n          ...EventDetailDrawer\n        }\n      }\n    }\n\n    absenceReportsCollection(\n      filter: {\n        clubId: { eq: $clubId }\n        date: { eq: $date }\n      }\n    ) {\n      edges {\n        node {\n          id\n          ...AbsenceReportCard\n        }\n      }\n    }\n  }\n": typeof types.CalendarDayDocument,
    "\n  fragment EventDetailDrawer on CalendarEvents {\n    id\n    title\n    startTime\n    endTime\n    description\n    location\n  }\n": typeof types.EventDetailDrawerFragmentDoc,
    "\n  query JoinedClubs($me: UUID!) {\n    clubMembersCollection(filter: { userId: { eq: $me } }) {\n      edges {\n        node {\n          club {\n            nodeId,\n            ...ClubCard\n          }\n        }\n      }\n    }\n  }\n": typeof types.JoinedClubsDocument,
    "\n  query User($id: UUID!) {\n    clubMembersCollection(filter: { userId: { eq: $id } }) {\n      edges {\n        node {\n          club {\n            nodeId,\n            ...ClubCard\n          }\n        }\n      }\n    }\n  }\n": typeof types.UserDocument,
    "\n  query MembersManager($clubId: UUID!) {\n    clubMembersCollection(\n      orderBy: { joinedAt: DescNullsLast }\n      first: 100\n      filter: { clubId: { eq: $clubId } }\n    ) {\n      edges {\n        node {\n          user {\n            fullName\n            nickname\n            avatarUrl\n          }\n          role {\n            name\n            id\n          }\n          userId\n        }\n      }\n    }\n    rolesCollection(\n      orderBy: { name: AscNullsLast }\n      first: 100\n      filter: { clubId: { eq: $clubId } }\n    ) {\n      edges {\n        node {\n          id\n          name\n        }\n      }\n    }\n  }\n": typeof types.MembersManagerDocument,
    "\n  mutation ChangeMemberRole($clubId: UUID!, $userId: UUID!, $roleId: UUID) {\n    updateClubMembersCollection(\n      set: {roleId: $roleId}\n      filter: {userId: {eq: $userId}, clubId: {eq: $clubId}}\n      atMost: 1\n    ) {\n      affectedCount\n    }\n  }\n": typeof types.ChangeMemberRoleDocument,
    "\n  mutation RemoveMember($clubId: UUID!, $userId: UUID!) {\n    deleteFromClubMembersCollection(\n      filter: {userId: {eq: $userId}, clubId: {eq: $clubId}}\n      atMost: 1\n    ) {\n      affectedCount\n    }\n  }\n": typeof types.RemoveMemberDocument,
    "\n  fragment AbsenceReportCard on AbsenceReports {\n    id\n    date\n    createdAt\n\n    assignedToRole: roles {\n      name\n    }\n\n    reviews: absenceReportReviewsCollection {\n      edges {\n        node {\n          id\n        }\n      }\n    }\n    \n    event {\n      id\n      title\n      startTime\n      endTime\n    }\n    user {\n      fullName\n      avatarUrl\n    }\n  }\n": typeof types.AbsenceReportCardFragmentDoc,
    "\n  fragment ClubCard on Clubs {\n    id\n    name\n    school\n    description\n  }\n": typeof types.ClubCardFragmentDoc,
};
const documents: Documents = {
    "\n  query AbsenceReportAllDetail($reportId: UUID!) {\n    absenceReportsCollection(\n      filter: {\n        id: { eq: $reportId }\n      }\n    ) {\n      edges {\n        node {\n          ...AbsenceReportDetail\n        }\n      }\n    }\n  }\n": types.AbsenceReportAllDetailDocument,
    "\n  query AllAbsenceReports($clubId: UUID!) {\n    absenceReportsCollection(\n      filter: {\n        clubId: { eq: $clubId }\n      }\n      orderBy: { createdAt: DescNullsFirst }\n      offset: 0\n    ) {\n      edges {\n        node {\n          id,\n          ...AbsenceReportCard\n        }\n      }\n    }\n  }\n": types.AllAbsenceReportsDocument,
    "\n  query AbsenceReportMyDetail($reportId: UUID!) {\n    absenceReportsCollection(\n      filter: {\n        id: { eq: $reportId }\n      }\n    ) {\n      edges {\n        node {\n          ...AbsenceReportDetail\n        }\n      }\n    }\n  }\n": types.AbsenceReportMyDetailDocument,
    "\n  query MyAbsenceReports($clubId: UUID!, $userId: UUID!) {\n    absenceReportsCollection(\n      filter: {\n        clubId: { eq: $clubId }\n        userId: { eq: $userId }\n      }\n      orderBy: { createdAt: DescNullsFirst }\n      offset: 0\n    ) {\n      edges {\n        node {\n          id,\n          ...AbsenceReportCard\n        }\n      }\n    }\n  }\n": types.MyAbsenceReportsDocument,
    "\n  fragment AbsenceReportDetail on AbsenceReports {\n    id\n    date\n    createdAt\n    data\n\n    assignedToRole: roles {\n      name\n    }\n    form: form {\n      id\n      name\n      questions \n    }\n\n    reviews: absenceReportReviewsCollection  {\n      edges {\n        node {\n          id\n          createdAt\n          accepted\n          comments\n          reviewer {\n            fullName\n          }\n        }\n      }\n    }\n    \n    event {\n      id\n      title\n      startTime\n      endTime\n    }\n    user {\n      fullName\n      avatarUrl\n    }\n  }\n": types.AbsenceReportDetailFragmentDoc,
    "\n  query CalendarDay($clubId: UUID!, $date: Date!, $startDate: Datetime!, $endDate: Datetime!) {\n    calendarEventsCollection(\n      filter: {\n        clubId: { eq: $clubId }\n        startTime: { gte: $startDate }\n        endTime: { lte: $endDate }\n      }\n      orderBy: {\n        startTime: AscNullsLast\n      }\n    ) {\n      edges {\n        node {\n          id\n          title\n          startTime\n          endTime\n          description\n          location\n          ...EventDetailDrawer\n        }\n      }\n    }\n\n    absenceReportsCollection(\n      filter: {\n        clubId: { eq: $clubId }\n        date: { eq: $date }\n      }\n    ) {\n      edges {\n        node {\n          id\n          ...AbsenceReportCard\n        }\n      }\n    }\n  }\n": types.CalendarDayDocument,
    "\n  fragment EventDetailDrawer on CalendarEvents {\n    id\n    title\n    startTime\n    endTime\n    description\n    location\n  }\n": types.EventDetailDrawerFragmentDoc,
    "\n  query JoinedClubs($me: UUID!) {\n    clubMembersCollection(filter: { userId: { eq: $me } }) {\n      edges {\n        node {\n          club {\n            nodeId,\n            ...ClubCard\n          }\n        }\n      }\n    }\n  }\n": types.JoinedClubsDocument,
    "\n  query User($id: UUID!) {\n    clubMembersCollection(filter: { userId: { eq: $id } }) {\n      edges {\n        node {\n          club {\n            nodeId,\n            ...ClubCard\n          }\n        }\n      }\n    }\n  }\n": types.UserDocument,
    "\n  query MembersManager($clubId: UUID!) {\n    clubMembersCollection(\n      orderBy: { joinedAt: DescNullsLast }\n      first: 100\n      filter: { clubId: { eq: $clubId } }\n    ) {\n      edges {\n        node {\n          user {\n            fullName\n            nickname\n            avatarUrl\n          }\n          role {\n            name\n            id\n          }\n          userId\n        }\n      }\n    }\n    rolesCollection(\n      orderBy: { name: AscNullsLast }\n      first: 100\n      filter: { clubId: { eq: $clubId } }\n    ) {\n      edges {\n        node {\n          id\n          name\n        }\n      }\n    }\n  }\n": types.MembersManagerDocument,
    "\n  mutation ChangeMemberRole($clubId: UUID!, $userId: UUID!, $roleId: UUID) {\n    updateClubMembersCollection(\n      set: {roleId: $roleId}\n      filter: {userId: {eq: $userId}, clubId: {eq: $clubId}}\n      atMost: 1\n    ) {\n      affectedCount\n    }\n  }\n": types.ChangeMemberRoleDocument,
    "\n  mutation RemoveMember($clubId: UUID!, $userId: UUID!) {\n    deleteFromClubMembersCollection(\n      filter: {userId: {eq: $userId}, clubId: {eq: $clubId}}\n      atMost: 1\n    ) {\n      affectedCount\n    }\n  }\n": types.RemoveMemberDocument,
    "\n  fragment AbsenceReportCard on AbsenceReports {\n    id\n    date\n    createdAt\n\n    assignedToRole: roles {\n      name\n    }\n\n    reviews: absenceReportReviewsCollection {\n      edges {\n        node {\n          id\n        }\n      }\n    }\n    \n    event {\n      id\n      title\n      startTime\n      endTime\n    }\n    user {\n      fullName\n      avatarUrl\n    }\n  }\n": types.AbsenceReportCardFragmentDoc,
    "\n  fragment ClubCard on Clubs {\n    id\n    name\n    school\n    description\n  }\n": types.ClubCardFragmentDoc,
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
export function gql(source: "\n  query AbsenceReportAllDetail($reportId: UUID!) {\n    absenceReportsCollection(\n      filter: {\n        id: { eq: $reportId }\n      }\n    ) {\n      edges {\n        node {\n          ...AbsenceReportDetail\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query AbsenceReportAllDetail($reportId: UUID!) {\n    absenceReportsCollection(\n      filter: {\n        id: { eq: $reportId }\n      }\n    ) {\n      edges {\n        node {\n          ...AbsenceReportDetail\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query AllAbsenceReports($clubId: UUID!) {\n    absenceReportsCollection(\n      filter: {\n        clubId: { eq: $clubId }\n      }\n      orderBy: { createdAt: DescNullsFirst }\n      offset: 0\n    ) {\n      edges {\n        node {\n          id,\n          ...AbsenceReportCard\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query AllAbsenceReports($clubId: UUID!) {\n    absenceReportsCollection(\n      filter: {\n        clubId: { eq: $clubId }\n      }\n      orderBy: { createdAt: DescNullsFirst }\n      offset: 0\n    ) {\n      edges {\n        node {\n          id,\n          ...AbsenceReportCard\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query AbsenceReportMyDetail($reportId: UUID!) {\n    absenceReportsCollection(\n      filter: {\n        id: { eq: $reportId }\n      }\n    ) {\n      edges {\n        node {\n          ...AbsenceReportDetail\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query AbsenceReportMyDetail($reportId: UUID!) {\n    absenceReportsCollection(\n      filter: {\n        id: { eq: $reportId }\n      }\n    ) {\n      edges {\n        node {\n          ...AbsenceReportDetail\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query MyAbsenceReports($clubId: UUID!, $userId: UUID!) {\n    absenceReportsCollection(\n      filter: {\n        clubId: { eq: $clubId }\n        userId: { eq: $userId }\n      }\n      orderBy: { createdAt: DescNullsFirst }\n      offset: 0\n    ) {\n      edges {\n        node {\n          id,\n          ...AbsenceReportCard\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query MyAbsenceReports($clubId: UUID!, $userId: UUID!) {\n    absenceReportsCollection(\n      filter: {\n        clubId: { eq: $clubId }\n        userId: { eq: $userId }\n      }\n      orderBy: { createdAt: DescNullsFirst }\n      offset: 0\n    ) {\n      edges {\n        node {\n          id,\n          ...AbsenceReportCard\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment AbsenceReportDetail on AbsenceReports {\n    id\n    date\n    createdAt\n    data\n\n    assignedToRole: roles {\n      name\n    }\n    form: form {\n      id\n      name\n      questions \n    }\n\n    reviews: absenceReportReviewsCollection  {\n      edges {\n        node {\n          id\n          createdAt\n          accepted\n          comments\n          reviewer {\n            fullName\n          }\n        }\n      }\n    }\n    \n    event {\n      id\n      title\n      startTime\n      endTime\n    }\n    user {\n      fullName\n      avatarUrl\n    }\n  }\n"): (typeof documents)["\n  fragment AbsenceReportDetail on AbsenceReports {\n    id\n    date\n    createdAt\n    data\n\n    assignedToRole: roles {\n      name\n    }\n    form: form {\n      id\n      name\n      questions \n    }\n\n    reviews: absenceReportReviewsCollection  {\n      edges {\n        node {\n          id\n          createdAt\n          accepted\n          comments\n          reviewer {\n            fullName\n          }\n        }\n      }\n    }\n    \n    event {\n      id\n      title\n      startTime\n      endTime\n    }\n    user {\n      fullName\n      avatarUrl\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query CalendarDay($clubId: UUID!, $date: Date!, $startDate: Datetime!, $endDate: Datetime!) {\n    calendarEventsCollection(\n      filter: {\n        clubId: { eq: $clubId }\n        startTime: { gte: $startDate }\n        endTime: { lte: $endDate }\n      }\n      orderBy: {\n        startTime: AscNullsLast\n      }\n    ) {\n      edges {\n        node {\n          id\n          title\n          startTime\n          endTime\n          description\n          location\n          ...EventDetailDrawer\n        }\n      }\n    }\n\n    absenceReportsCollection(\n      filter: {\n        clubId: { eq: $clubId }\n        date: { eq: $date }\n      }\n    ) {\n      edges {\n        node {\n          id\n          ...AbsenceReportCard\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query CalendarDay($clubId: UUID!, $date: Date!, $startDate: Datetime!, $endDate: Datetime!) {\n    calendarEventsCollection(\n      filter: {\n        clubId: { eq: $clubId }\n        startTime: { gte: $startDate }\n        endTime: { lte: $endDate }\n      }\n      orderBy: {\n        startTime: AscNullsLast\n      }\n    ) {\n      edges {\n        node {\n          id\n          title\n          startTime\n          endTime\n          description\n          location\n          ...EventDetailDrawer\n        }\n      }\n    }\n\n    absenceReportsCollection(\n      filter: {\n        clubId: { eq: $clubId }\n        date: { eq: $date }\n      }\n    ) {\n      edges {\n        node {\n          id\n          ...AbsenceReportCard\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment EventDetailDrawer on CalendarEvents {\n    id\n    title\n    startTime\n    endTime\n    description\n    location\n  }\n"): (typeof documents)["\n  fragment EventDetailDrawer on CalendarEvents {\n    id\n    title\n    startTime\n    endTime\n    description\n    location\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query JoinedClubs($me: UUID!) {\n    clubMembersCollection(filter: { userId: { eq: $me } }) {\n      edges {\n        node {\n          club {\n            nodeId,\n            ...ClubCard\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query JoinedClubs($me: UUID!) {\n    clubMembersCollection(filter: { userId: { eq: $me } }) {\n      edges {\n        node {\n          club {\n            nodeId,\n            ...ClubCard\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query User($id: UUID!) {\n    clubMembersCollection(filter: { userId: { eq: $id } }) {\n      edges {\n        node {\n          club {\n            nodeId,\n            ...ClubCard\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query User($id: UUID!) {\n    clubMembersCollection(filter: { userId: { eq: $id } }) {\n      edges {\n        node {\n          club {\n            nodeId,\n            ...ClubCard\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query MembersManager($clubId: UUID!) {\n    clubMembersCollection(\n      orderBy: { joinedAt: DescNullsLast }\n      first: 100\n      filter: { clubId: { eq: $clubId } }\n    ) {\n      edges {\n        node {\n          user {\n            fullName\n            nickname\n            avatarUrl\n          }\n          role {\n            name\n            id\n          }\n          userId\n        }\n      }\n    }\n    rolesCollection(\n      orderBy: { name: AscNullsLast }\n      first: 100\n      filter: { clubId: { eq: $clubId } }\n    ) {\n      edges {\n        node {\n          id\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query MembersManager($clubId: UUID!) {\n    clubMembersCollection(\n      orderBy: { joinedAt: DescNullsLast }\n      first: 100\n      filter: { clubId: { eq: $clubId } }\n    ) {\n      edges {\n        node {\n          user {\n            fullName\n            nickname\n            avatarUrl\n          }\n          role {\n            name\n            id\n          }\n          userId\n        }\n      }\n    }\n    rolesCollection(\n      orderBy: { name: AscNullsLast }\n      first: 100\n      filter: { clubId: { eq: $clubId } }\n    ) {\n      edges {\n        node {\n          id\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation ChangeMemberRole($clubId: UUID!, $userId: UUID!, $roleId: UUID) {\n    updateClubMembersCollection(\n      set: {roleId: $roleId}\n      filter: {userId: {eq: $userId}, clubId: {eq: $clubId}}\n      atMost: 1\n    ) {\n      affectedCount\n    }\n  }\n"): (typeof documents)["\n  mutation ChangeMemberRole($clubId: UUID!, $userId: UUID!, $roleId: UUID) {\n    updateClubMembersCollection(\n      set: {roleId: $roleId}\n      filter: {userId: {eq: $userId}, clubId: {eq: $clubId}}\n      atMost: 1\n    ) {\n      affectedCount\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RemoveMember($clubId: UUID!, $userId: UUID!) {\n    deleteFromClubMembersCollection(\n      filter: {userId: {eq: $userId}, clubId: {eq: $clubId}}\n      atMost: 1\n    ) {\n      affectedCount\n    }\n  }\n"): (typeof documents)["\n  mutation RemoveMember($clubId: UUID!, $userId: UUID!) {\n    deleteFromClubMembersCollection(\n      filter: {userId: {eq: $userId}, clubId: {eq: $clubId}}\n      atMost: 1\n    ) {\n      affectedCount\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment AbsenceReportCard on AbsenceReports {\n    id\n    date\n    createdAt\n\n    assignedToRole: roles {\n      name\n    }\n\n    reviews: absenceReportReviewsCollection {\n      edges {\n        node {\n          id\n        }\n      }\n    }\n    \n    event {\n      id\n      title\n      startTime\n      endTime\n    }\n    user {\n      fullName\n      avatarUrl\n    }\n  }\n"): (typeof documents)["\n  fragment AbsenceReportCard on AbsenceReports {\n    id\n    date\n    createdAt\n\n    assignedToRole: roles {\n      name\n    }\n\n    reviews: absenceReportReviewsCollection {\n      edges {\n        node {\n          id\n        }\n      }\n    }\n    \n    event {\n      id\n      title\n      startTime\n      endTime\n    }\n    user {\n      fullName\n      avatarUrl\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment ClubCard on Clubs {\n    id\n    name\n    school\n    description\n  }\n"): (typeof documents)["\n  fragment ClubCard on Clubs {\n    id\n    name\n    school\n    description\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;