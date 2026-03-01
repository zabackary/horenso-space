/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A high precision floating point value represented as a string */
  BigFloat: { input: string; output: string; }
  /** An arbitrary size integer represented as a string */
  BigInt: { input: string; output: string; }
  /** An opaque string using for tracking a position in results during pagination */
  Cursor: { input: any; output: any; }
  /** A date without time information */
  Date: { input: string; output: string; }
  /** A date and time */
  Datetime: { input: string; output: string; }
  /** A Javascript Object Notation value serialized as a string */
  JSON: { input: string; output: string; }
  /** Any type not handled by the type system */
  Opaque: { input: any; output: any; }
  /** A time without date information */
  Time: { input: string; output: string; }
  /** A universally unique identifier */
  UUID: { input: string; output: string; }
};

/** Boolean expression comparing fields on type "BigFloat" */
export type BigFloatFilter = {
  eq?: InputMaybe<Scalars['BigFloat']['input']>;
  gt?: InputMaybe<Scalars['BigFloat']['input']>;
  gte?: InputMaybe<Scalars['BigFloat']['input']>;
  in?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['BigFloat']['input']>;
  lte?: InputMaybe<Scalars['BigFloat']['input']>;
  neq?: InputMaybe<Scalars['BigFloat']['input']>;
};

/** Boolean expression comparing fields on type "BigFloatList" */
export type BigFloatListFilter = {
  containedBy?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
  contains?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
  eq?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
};

/** Boolean expression comparing fields on type "BigInt" */
export type BigIntFilter = {
  eq?: InputMaybe<Scalars['BigInt']['input']>;
  gt?: InputMaybe<Scalars['BigInt']['input']>;
  gte?: InputMaybe<Scalars['BigInt']['input']>;
  in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['BigInt']['input']>;
  lte?: InputMaybe<Scalars['BigInt']['input']>;
  neq?: InputMaybe<Scalars['BigInt']['input']>;
};

/** Boolean expression comparing fields on type "BigIntList" */
export type BigIntListFilter = {
  containedBy?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  contains?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  eq?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

/** Boolean expression comparing fields on type "Boolean" */
export type BooleanFilter = {
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  is?: InputMaybe<FilterIs>;
};

/** Boolean expression comparing fields on type "BooleanList" */
export type BooleanListFilter = {
  containedBy?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  contains?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  eq?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

/** Boolean expression comparing fields on type "Date" */
export type DateFilter = {
  eq?: InputMaybe<Scalars['Date']['input']>;
  gt?: InputMaybe<Scalars['Date']['input']>;
  gte?: InputMaybe<Scalars['Date']['input']>;
  in?: InputMaybe<Array<Scalars['Date']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Date']['input']>;
  lte?: InputMaybe<Scalars['Date']['input']>;
  neq?: InputMaybe<Scalars['Date']['input']>;
};

/** Boolean expression comparing fields on type "DateList" */
export type DateListFilter = {
  containedBy?: InputMaybe<Array<Scalars['Date']['input']>>;
  contains?: InputMaybe<Array<Scalars['Date']['input']>>;
  eq?: InputMaybe<Array<Scalars['Date']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['Date']['input']>>;
};

/** Boolean expression comparing fields on type "Datetime" */
export type DatetimeFilter = {
  eq?: InputMaybe<Scalars['Datetime']['input']>;
  gt?: InputMaybe<Scalars['Datetime']['input']>;
  gte?: InputMaybe<Scalars['Datetime']['input']>;
  in?: InputMaybe<Array<Scalars['Datetime']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Datetime']['input']>;
  lte?: InputMaybe<Scalars['Datetime']['input']>;
  neq?: InputMaybe<Scalars['Datetime']['input']>;
};

/** Boolean expression comparing fields on type "DatetimeList" */
export type DatetimeListFilter = {
  containedBy?: InputMaybe<Array<Scalars['Datetime']['input']>>;
  contains?: InputMaybe<Array<Scalars['Datetime']['input']>>;
  eq?: InputMaybe<Array<Scalars['Datetime']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['Datetime']['input']>>;
};

export enum FilterIs {
  NotNull = 'NOT_NULL',
  Null = 'NULL'
}

/** Boolean expression comparing fields on type "Float" */
export type FloatFilter = {
  eq?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  neq?: InputMaybe<Scalars['Float']['input']>;
};

/** Boolean expression comparing fields on type "FloatList" */
export type FloatListFilter = {
  containedBy?: InputMaybe<Array<Scalars['Float']['input']>>;
  contains?: InputMaybe<Array<Scalars['Float']['input']>>;
  eq?: InputMaybe<Array<Scalars['Float']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['Float']['input']>>;
};

/** Boolean expression comparing fields on type "ID" */
export type IdFilter = {
  eq?: InputMaybe<Scalars['ID']['input']>;
};

/** Boolean expression comparing fields on type "Int" */
export type IntFilter = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  neq?: InputMaybe<Scalars['Int']['input']>;
};

/** Boolean expression comparing fields on type "IntList" */
export type IntListFilter = {
  containedBy?: InputMaybe<Array<Scalars['Int']['input']>>;
  contains?: InputMaybe<Array<Scalars['Int']['input']>>;
  eq?: InputMaybe<Array<Scalars['Int']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** The root type for creating and mutating data */
export type Mutation = {
  __typename?: 'Mutation';
  /** Deletes zero or more records from the `absence_report_forms` collection */
  deleteFromabsence_report_formsCollection: Absence_Report_FormsDeleteResponse;
  /** Deletes zero or more records from the `absence_report_reviews` collection */
  deleteFromabsence_report_reviewsCollection: Absence_Report_ReviewsDeleteResponse;
  /** Deletes zero or more records from the `absence_reports` collection */
  deleteFromabsence_reportsCollection: Absence_ReportsDeleteResponse;
  /** Deletes zero or more records from the `calendar_events` collection */
  deleteFromcalendar_eventsCollection: Calendar_EventsDeleteResponse;
  /** Deletes zero or more records from the `club_members` collection */
  deleteFromclub_membersCollection: Club_MembersDeleteResponse;
  /** Deletes zero or more records from the `clubs` collection */
  deleteFromclubsCollection: ClubsDeleteResponse;
  /** Deletes zero or more records from the `feedback_submissions` collection */
  deleteFromfeedback_submissionsCollection: Feedback_SubmissionsDeleteResponse;
  /** Deletes zero or more records from the `files` collection */
  deleteFromfilesCollection: FilesDeleteResponse;
  /** Deletes zero or more records from the `joined_clubs` collection */
  deleteFromjoined_clubsCollection: Joined_ClubsDeleteResponse;
  /** Deletes zero or more records from the `notifications` collection */
  deleteFromnotificationsCollection: NotificationsDeleteResponse;
  /** Deletes zero or more records from the `profiles` collection */
  deleteFromprofilesCollection: ProfilesDeleteResponse;
  /** Deletes zero or more records from the `roles` collection */
  deleteFromrolesCollection: RolesDeleteResponse;
  /** Adds one or more `absence_report_forms` records to the collection */
  insertIntoabsence_report_formsCollection?: Maybe<Absence_Report_FormsInsertResponse>;
  /** Adds one or more `absence_report_reviews` records to the collection */
  insertIntoabsence_report_reviewsCollection?: Maybe<Absence_Report_ReviewsInsertResponse>;
  /** Adds one or more `absence_reports` records to the collection */
  insertIntoabsence_reportsCollection?: Maybe<Absence_ReportsInsertResponse>;
  /** Adds one or more `calendar_events` records to the collection */
  insertIntocalendar_eventsCollection?: Maybe<Calendar_EventsInsertResponse>;
  /** Adds one or more `club_members` records to the collection */
  insertIntoclub_membersCollection?: Maybe<Club_MembersInsertResponse>;
  /** Adds one or more `clubs` records to the collection */
  insertIntoclubsCollection?: Maybe<ClubsInsertResponse>;
  /** Adds one or more `feedback_submissions` records to the collection */
  insertIntofeedback_submissionsCollection?: Maybe<Feedback_SubmissionsInsertResponse>;
  /** Adds one or more `files` records to the collection */
  insertIntofilesCollection?: Maybe<FilesInsertResponse>;
  /** Adds one or more `joined_clubs` records to the collection */
  insertIntojoined_clubsCollection?: Maybe<Joined_ClubsInsertResponse>;
  /** Adds one or more `notifications` records to the collection */
  insertIntonotificationsCollection?: Maybe<NotificationsInsertResponse>;
  /** Adds one or more `profiles` records to the collection */
  insertIntoprofilesCollection?: Maybe<ProfilesInsertResponse>;
  /** Adds one or more `roles` records to the collection */
  insertIntorolesCollection?: Maybe<RolesInsertResponse>;
  invitations_accept?: Maybe<Scalars['Opaque']['output']>;
  invitations_create?: Maybe<Scalars['UUID']['output']>;
  invitations_delete?: Maybe<Scalars['Opaque']['output']>;
  profiles_locale_get?: Maybe<Scalars['String']['output']>;
  profiles_locale_set?: Maybe<Scalars['Opaque']['output']>;
  /** Updates zero or more records in the `absence_report_forms` collection */
  updateabsence_report_formsCollection: Absence_Report_FormsUpdateResponse;
  /** Updates zero or more records in the `absence_report_reviews` collection */
  updateabsence_report_reviewsCollection: Absence_Report_ReviewsUpdateResponse;
  /** Updates zero or more records in the `absence_reports` collection */
  updateabsence_reportsCollection: Absence_ReportsUpdateResponse;
  /** Updates zero or more records in the `calendar_events` collection */
  updatecalendar_eventsCollection: Calendar_EventsUpdateResponse;
  /** Updates zero or more records in the `club_members` collection */
  updateclub_membersCollection: Club_MembersUpdateResponse;
  /** Updates zero or more records in the `clubs` collection */
  updateclubsCollection: ClubsUpdateResponse;
  /** Updates zero or more records in the `feedback_submissions` collection */
  updatefeedback_submissionsCollection: Feedback_SubmissionsUpdateResponse;
  /** Updates zero or more records in the `files` collection */
  updatefilesCollection: FilesUpdateResponse;
  /** Updates zero or more records in the `joined_clubs` collection */
  updatejoined_clubsCollection: Joined_ClubsUpdateResponse;
  /** Updates zero or more records in the `notifications` collection */
  updatenotificationsCollection: NotificationsUpdateResponse;
  /** Updates zero or more records in the `profiles` collection */
  updateprofilesCollection: ProfilesUpdateResponse;
  /** Updates zero or more records in the `roles` collection */
  updaterolesCollection: RolesUpdateResponse;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromabsence_Report_FormsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Absence_Report_FormsFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromabsence_Report_ReviewsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Absence_Report_ReviewsFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromabsence_ReportsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Absence_ReportsFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromcalendar_EventsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Calendar_EventsFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromclub_MembersCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Club_MembersFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromclubsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<ClubsFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromfeedback_SubmissionsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Feedback_SubmissionsFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromfilesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<FilesFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromjoined_ClubsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Joined_ClubsFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromnotificationsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<NotificationsFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromprofilesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<ProfilesFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromrolesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<RolesFilter>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoabsence_Report_FormsCollectionArgs = {
  objects: Array<Absence_Report_FormsInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoabsence_Report_ReviewsCollectionArgs = {
  objects: Array<Absence_Report_ReviewsInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoabsence_ReportsCollectionArgs = {
  objects: Array<Absence_ReportsInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntocalendar_EventsCollectionArgs = {
  objects: Array<Calendar_EventsInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoclub_MembersCollectionArgs = {
  objects: Array<Club_MembersInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoclubsCollectionArgs = {
  objects: Array<ClubsInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntofeedback_SubmissionsCollectionArgs = {
  objects: Array<Feedback_SubmissionsInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntofilesCollectionArgs = {
  objects: Array<FilesInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntojoined_ClubsCollectionArgs = {
  objects: Array<Joined_ClubsInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntonotificationsCollectionArgs = {
  objects: Array<NotificationsInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoprofilesCollectionArgs = {
  objects: Array<ProfilesInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntorolesCollectionArgs = {
  objects: Array<RolesInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInvitations_AcceptArgs = {
  invitation_id: Scalars['UUID']['input'];
};


/** The root type for creating and mutating data */
export type MutationInvitations_CreateArgs = {
  expires_at: Scalars['Datetime']['input'];
  new_club_id: Scalars['UUID']['input'];
  role_id: Scalars['UUID']['input'];
};


/** The root type for creating and mutating data */
export type MutationInvitations_DeleteArgs = {
  invitation_id: Scalars['UUID']['input'];
};


/** The root type for creating and mutating data */
export type MutationProfiles_Locale_SetArgs = {
  new_locale: Scalars['String']['input'];
};


/** The root type for creating and mutating data */
export type MutationUpdateabsence_Report_FormsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Absence_Report_FormsFilter>;
  set: Absence_Report_FormsUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateabsence_Report_ReviewsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Absence_Report_ReviewsFilter>;
  set: Absence_Report_ReviewsUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateabsence_ReportsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Absence_ReportsFilter>;
  set: Absence_ReportsUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdatecalendar_EventsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Calendar_EventsFilter>;
  set: Calendar_EventsUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateclub_MembersCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Club_MembersFilter>;
  set: Club_MembersUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateclubsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<ClubsFilter>;
  set: ClubsUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdatefeedback_SubmissionsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Feedback_SubmissionsFilter>;
  set: Feedback_SubmissionsUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdatefilesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<FilesFilter>;
  set: FilesUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdatejoined_ClubsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Joined_ClubsFilter>;
  set: Joined_ClubsUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdatenotificationsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<NotificationsFilter>;
  set: NotificationsUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateprofilesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<ProfilesFilter>;
  set: ProfilesUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdaterolesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<RolesFilter>;
  set: RolesUpdateInput;
};

export type Node = {
  /** Retrieves a record by `ID` */
  nodeId: Scalars['ID']['output'];
};

/** Boolean expression comparing fields on type "Opaque" */
export type OpaqueFilter = {
  eq?: InputMaybe<Scalars['Opaque']['input']>;
  is?: InputMaybe<FilterIs>;
};

/** Defines a per-field sorting order */
export enum OrderByDirection {
  /** Ascending order, nulls first */
  AscNullsFirst = 'AscNullsFirst',
  /** Ascending order, nulls last */
  AscNullsLast = 'AscNullsLast',
  /** Descending order, nulls first */
  DescNullsFirst = 'DescNullsFirst',
  /** Descending order, nulls last */
  DescNullsLast = 'DescNullsLast'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

/** The root type for querying data */
export type Query = {
  __typename?: 'Query';
  /** A pagable collection of type `absence_report_forms` */
  absence_report_formsCollection?: Maybe<Absence_Report_FormsConnection>;
  /** A pagable collection of type `absence_report_reviews` */
  absence_report_reviewsCollection?: Maybe<Absence_Report_ReviewsConnection>;
  /** A pagable collection of type `absence_reports` */
  absence_reportsCollection?: Maybe<Absence_ReportsConnection>;
  absence_reports_is_approved?: Maybe<Scalars['Boolean']['output']>;
  /** A pagable collection of type `calendar_events` */
  calendar_eventsCollection?: Maybe<Calendar_EventsConnection>;
  /** A pagable collection of type `club_members` */
  club_membersCollection?: Maybe<Club_MembersConnection>;
  /** A pagable collection of type `clubs` */
  clubsCollection?: Maybe<ClubsConnection>;
  /** A pagable collection of type `feedback_submissions` */
  feedback_submissionsCollection?: Maybe<Feedback_SubmissionsConnection>;
  /** A pagable collection of type `files` */
  filesCollection?: Maybe<FilesConnection>;
  /** A pagable collection of type `joined_clubs` */
  joined_clubsCollection?: Maybe<Joined_ClubsConnection>;
  /** Retrieve a record by its `ID` */
  node?: Maybe<Node>;
  /** A pagable collection of type `notifications` */
  notificationsCollection?: Maybe<NotificationsConnection>;
  /** A pagable collection of type `profiles` */
  profilesCollection?: Maybe<ProfilesConnection>;
  /** A pagable collection of type `roles` */
  rolesCollection?: Maybe<RolesConnection>;
  user_has_club_permission?: Maybe<Scalars['Boolean']['output']>;
  user_is_club_member?: Maybe<Scalars['Boolean']['output']>;
};


/** The root type for querying data */
export type QueryAbsence_Report_FormsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Absence_Report_FormsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Absence_Report_FormsOrderBy>>;
};


/** The root type for querying data */
export type QueryAbsence_Report_ReviewsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Absence_Report_ReviewsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Absence_Report_ReviewsOrderBy>>;
};


/** The root type for querying data */
export type QueryAbsence_ReportsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Absence_ReportsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Absence_ReportsOrderBy>>;
};


/** The root type for querying data */
export type QueryAbsence_Reports_Is_ApprovedArgs = {
  p_report_id: Scalars['UUID']['input'];
};


/** The root type for querying data */
export type QueryCalendar_EventsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Calendar_EventsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Calendar_EventsOrderBy>>;
};


/** The root type for querying data */
export type QueryClub_MembersCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Club_MembersFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Club_MembersOrderBy>>;
};


/** The root type for querying data */
export type QueryClubsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<ClubsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ClubsOrderBy>>;
};


/** The root type for querying data */
export type QueryFeedback_SubmissionsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Feedback_SubmissionsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Feedback_SubmissionsOrderBy>>;
};


/** The root type for querying data */
export type QueryFilesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<FilesFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<FilesOrderBy>>;
};


/** The root type for querying data */
export type QueryJoined_ClubsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Joined_ClubsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Joined_ClubsOrderBy>>;
};


/** The root type for querying data */
export type QueryNodeArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root type for querying data */
export type QueryNotificationsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<NotificationsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<NotificationsOrderBy>>;
};


/** The root type for querying data */
export type QueryProfilesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<ProfilesFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ProfilesOrderBy>>;
};


/** The root type for querying data */
export type QueryRolesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<RolesFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RolesOrderBy>>;
};


/** The root type for querying data */
export type QueryUser_Has_Club_PermissionArgs = {
  p_club_id: Scalars['UUID']['input'];
  p_permission: Scalars['String']['input'];
};


/** The root type for querying data */
export type QueryUser_Is_Club_MemberArgs = {
  p_club_id: Scalars['UUID']['input'];
};

/** Boolean expression comparing fields on type "String" */
export type StringFilter = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  iregex?: InputMaybe<Scalars['String']['input']>;
  is?: InputMaybe<FilterIs>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  regex?: InputMaybe<Scalars['String']['input']>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression comparing fields on type "StringList" */
export type StringListFilter = {
  containedBy?: InputMaybe<Array<Scalars['String']['input']>>;
  contains?: InputMaybe<Array<Scalars['String']['input']>>;
  eq?: InputMaybe<Array<Scalars['String']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** Boolean expression comparing fields on type "Time" */
export type TimeFilter = {
  eq?: InputMaybe<Scalars['Time']['input']>;
  gt?: InputMaybe<Scalars['Time']['input']>;
  gte?: InputMaybe<Scalars['Time']['input']>;
  in?: InputMaybe<Array<Scalars['Time']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Time']['input']>;
  lte?: InputMaybe<Scalars['Time']['input']>;
  neq?: InputMaybe<Scalars['Time']['input']>;
};

/** Boolean expression comparing fields on type "TimeList" */
export type TimeListFilter = {
  containedBy?: InputMaybe<Array<Scalars['Time']['input']>>;
  contains?: InputMaybe<Array<Scalars['Time']['input']>>;
  eq?: InputMaybe<Array<Scalars['Time']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['Time']['input']>>;
};

/** Boolean expression comparing fields on type "UUID" */
export type UuidFilter = {
  eq?: InputMaybe<Scalars['UUID']['input']>;
  in?: InputMaybe<Array<Scalars['UUID']['input']>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<Scalars['UUID']['input']>;
};

/** Boolean expression comparing fields on type "UUIDList" */
export type UuidListFilter = {
  containedBy?: InputMaybe<Array<Scalars['UUID']['input']>>;
  contains?: InputMaybe<Array<Scalars['UUID']['input']>>;
  eq?: InputMaybe<Array<Scalars['UUID']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['UUID']['input']>>;
};

export type Absence_Report_Forms = Node & {
  __typename?: 'absence_report_forms';
  absence_reportsCollection?: Maybe<Absence_ReportsConnection>;
  club_id: Scalars['UUID']['output'];
  clubs?: Maybe<Clubs>;
  created_at: Scalars['Datetime']['output'];
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  questions: Scalars['JSON']['output'];
  rolesCollection?: Maybe<RolesConnection>;
  updated_at: Scalars['Datetime']['output'];
};


export type Absence_Report_FormsAbsence_ReportsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Absence_ReportsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Absence_ReportsOrderBy>>;
};


export type Absence_Report_FormsRolesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<RolesFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RolesOrderBy>>;
};

export type Absence_Report_FormsConnection = {
  __typename?: 'absence_report_formsConnection';
  edges: Array<Absence_Report_FormsEdge>;
  pageInfo: PageInfo;
};

export type Absence_Report_FormsDeleteResponse = {
  __typename?: 'absence_report_formsDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Absence_Report_Forms>;
};

export type Absence_Report_FormsEdge = {
  __typename?: 'absence_report_formsEdge';
  cursor: Scalars['String']['output'];
  node: Absence_Report_Forms;
};

export type Absence_Report_FormsFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<Absence_Report_FormsFilter>>;
  club_id?: InputMaybe<UuidFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<Absence_Report_FormsFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<Absence_Report_FormsFilter>>;
  updated_at?: InputMaybe<DatetimeFilter>;
};

export type Absence_Report_FormsInsertInput = {
  club_id?: InputMaybe<Scalars['UUID']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  questions?: InputMaybe<Scalars['JSON']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type Absence_Report_FormsInsertResponse = {
  __typename?: 'absence_report_formsInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Absence_Report_Forms>;
};

export type Absence_Report_FormsOrderBy = {
  club_id?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
};

export type Absence_Report_FormsUpdateInput = {
  club_id?: InputMaybe<Scalars['UUID']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  questions?: InputMaybe<Scalars['JSON']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type Absence_Report_FormsUpdateResponse = {
  __typename?: 'absence_report_formsUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Absence_Report_Forms>;
};

export type Absence_Report_Reviews = Node & {
  __typename?: 'absence_report_reviews';
  absence_report_id: Scalars['UUID']['output'];
  absence_reports?: Maybe<Absence_Reports>;
  accepted: Scalars['Boolean']['output'];
  comments?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['Datetime']['output'];
  id: Scalars['UUID']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  profiles?: Maybe<Profiles>;
  reviewer_id?: Maybe<Scalars['UUID']['output']>;
  updated_at: Scalars['Datetime']['output'];
};

export type Absence_Report_ReviewsConnection = {
  __typename?: 'absence_report_reviewsConnection';
  edges: Array<Absence_Report_ReviewsEdge>;
  pageInfo: PageInfo;
};

export type Absence_Report_ReviewsDeleteResponse = {
  __typename?: 'absence_report_reviewsDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Absence_Report_Reviews>;
};

export type Absence_Report_ReviewsEdge = {
  __typename?: 'absence_report_reviewsEdge';
  cursor: Scalars['String']['output'];
  node: Absence_Report_Reviews;
};

export type Absence_Report_ReviewsFilter = {
  absence_report_id?: InputMaybe<UuidFilter>;
  accepted?: InputMaybe<BooleanFilter>;
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<Absence_Report_ReviewsFilter>>;
  comments?: InputMaybe<StringFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<Absence_Report_ReviewsFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<Absence_Report_ReviewsFilter>>;
  reviewer_id?: InputMaybe<UuidFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
};

export type Absence_Report_ReviewsInsertInput = {
  absence_report_id?: InputMaybe<Scalars['UUID']['input']>;
  accepted?: InputMaybe<Scalars['Boolean']['input']>;
  comments?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  reviewer_id?: InputMaybe<Scalars['UUID']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type Absence_Report_ReviewsInsertResponse = {
  __typename?: 'absence_report_reviewsInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Absence_Report_Reviews>;
};

export type Absence_Report_ReviewsOrderBy = {
  absence_report_id?: InputMaybe<OrderByDirection>;
  accepted?: InputMaybe<OrderByDirection>;
  comments?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  reviewer_id?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
};

export type Absence_Report_ReviewsUpdateInput = {
  absence_report_id?: InputMaybe<Scalars['UUID']['input']>;
  accepted?: InputMaybe<Scalars['Boolean']['input']>;
  comments?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  reviewer_id?: InputMaybe<Scalars['UUID']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type Absence_Report_ReviewsUpdateResponse = {
  __typename?: 'absence_report_reviewsUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Absence_Report_Reviews>;
};

export type Absence_Reports = Node & {
  __typename?: 'absence_reports';
  absence_report_forms?: Maybe<Absence_Report_Forms>;
  absence_report_reviewsCollection?: Maybe<Absence_Report_ReviewsConnection>;
  assigned_to_role?: Maybe<Scalars['UUID']['output']>;
  calendar_events?: Maybe<Calendar_Events>;
  club_id: Scalars['UUID']['output'];
  clubs?: Maybe<Clubs>;
  created_at: Scalars['Datetime']['output'];
  data: Scalars['JSON']['output'];
  date?: Maybe<Scalars['Date']['output']>;
  event_id?: Maybe<Scalars['UUID']['output']>;
  form_id?: Maybe<Scalars['UUID']['output']>;
  id: Scalars['UUID']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  profiles?: Maybe<Profiles>;
  roles?: Maybe<Roles>;
  updated_at: Scalars['Datetime']['output'];
  user_id?: Maybe<Scalars['UUID']['output']>;
};


export type Absence_ReportsAbsence_Report_ReviewsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Absence_Report_ReviewsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Absence_Report_ReviewsOrderBy>>;
};

export type Absence_ReportsConnection = {
  __typename?: 'absence_reportsConnection';
  edges: Array<Absence_ReportsEdge>;
  pageInfo: PageInfo;
};

export type Absence_ReportsDeleteResponse = {
  __typename?: 'absence_reportsDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Absence_Reports>;
};

export type Absence_ReportsEdge = {
  __typename?: 'absence_reportsEdge';
  cursor: Scalars['String']['output'];
  node: Absence_Reports;
};

export type Absence_ReportsFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<Absence_ReportsFilter>>;
  assigned_to_role?: InputMaybe<UuidFilter>;
  club_id?: InputMaybe<UuidFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  date?: InputMaybe<DateFilter>;
  event_id?: InputMaybe<UuidFilter>;
  form_id?: InputMaybe<UuidFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<Absence_ReportsFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<Absence_ReportsFilter>>;
  updated_at?: InputMaybe<DatetimeFilter>;
  user_id?: InputMaybe<UuidFilter>;
};

export type Absence_ReportsInsertInput = {
  assigned_to_role?: InputMaybe<Scalars['UUID']['input']>;
  club_id?: InputMaybe<Scalars['UUID']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  data?: InputMaybe<Scalars['JSON']['input']>;
  date?: InputMaybe<Scalars['Date']['input']>;
  event_id?: InputMaybe<Scalars['UUID']['input']>;
  form_id?: InputMaybe<Scalars['UUID']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type Absence_ReportsInsertResponse = {
  __typename?: 'absence_reportsInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Absence_Reports>;
};

export type Absence_ReportsOrderBy = {
  assigned_to_role?: InputMaybe<OrderByDirection>;
  club_id?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  date?: InputMaybe<OrderByDirection>;
  event_id?: InputMaybe<OrderByDirection>;
  form_id?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
  user_id?: InputMaybe<OrderByDirection>;
};

export type Absence_ReportsUpdateInput = {
  assigned_to_role?: InputMaybe<Scalars['UUID']['input']>;
  club_id?: InputMaybe<Scalars['UUID']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  data?: InputMaybe<Scalars['JSON']['input']>;
  date?: InputMaybe<Scalars['Date']['input']>;
  event_id?: InputMaybe<Scalars['UUID']['input']>;
  form_id?: InputMaybe<Scalars['UUID']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type Absence_ReportsUpdateResponse = {
  __typename?: 'absence_reportsUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Absence_Reports>;
};

export type Calendar_Events = Node & {
  __typename?: 'calendar_events';
  absence_reportsCollection?: Maybe<Absence_ReportsConnection>;
  club_id: Scalars['UUID']['output'];
  clubs?: Maybe<Clubs>;
  created_at: Scalars['Datetime']['output'];
  created_by?: Maybe<Scalars['UUID']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  end_time: Scalars['Datetime']['output'];
  id: Scalars['UUID']['output'];
  location?: Maybe<Scalars['String']['output']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  profiles?: Maybe<Profiles>;
  start_time: Scalars['Datetime']['output'];
  title: Scalars['String']['output'];
  updated_at: Scalars['Datetime']['output'];
};


export type Calendar_EventsAbsence_ReportsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Absence_ReportsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Absence_ReportsOrderBy>>;
};

export type Calendar_EventsConnection = {
  __typename?: 'calendar_eventsConnection';
  edges: Array<Calendar_EventsEdge>;
  pageInfo: PageInfo;
};

export type Calendar_EventsDeleteResponse = {
  __typename?: 'calendar_eventsDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Calendar_Events>;
};

export type Calendar_EventsEdge = {
  __typename?: 'calendar_eventsEdge';
  cursor: Scalars['String']['output'];
  node: Calendar_Events;
};

export type Calendar_EventsFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<Calendar_EventsFilter>>;
  club_id?: InputMaybe<UuidFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  created_by?: InputMaybe<UuidFilter>;
  description?: InputMaybe<StringFilter>;
  end_time?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  location?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<Calendar_EventsFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<Calendar_EventsFilter>>;
  start_time?: InputMaybe<DatetimeFilter>;
  title?: InputMaybe<StringFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
};

export type Calendar_EventsInsertInput = {
  club_id?: InputMaybe<Scalars['UUID']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  created_by?: InputMaybe<Scalars['UUID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  end_time?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  start_time?: InputMaybe<Scalars['Datetime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type Calendar_EventsInsertResponse = {
  __typename?: 'calendar_eventsInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Calendar_Events>;
};

export type Calendar_EventsOrderBy = {
  club_id?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  created_by?: InputMaybe<OrderByDirection>;
  description?: InputMaybe<OrderByDirection>;
  end_time?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  location?: InputMaybe<OrderByDirection>;
  start_time?: InputMaybe<OrderByDirection>;
  title?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
};

export type Calendar_EventsUpdateInput = {
  club_id?: InputMaybe<Scalars['UUID']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  created_by?: InputMaybe<Scalars['UUID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  end_time?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  start_time?: InputMaybe<Scalars['Datetime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type Calendar_EventsUpdateResponse = {
  __typename?: 'calendar_eventsUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Calendar_Events>;
};

export type Club_Members = Node & {
  __typename?: 'club_members';
  accepted: Scalars['Boolean']['output'];
  club_id: Scalars['UUID']['output'];
  clubs?: Maybe<Clubs>;
  joined_at: Scalars['Datetime']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  profiles?: Maybe<Profiles>;
  role_id: Scalars['UUID']['output'];
  roles?: Maybe<Roles>;
  user_id: Scalars['UUID']['output'];
};

export type Club_MembersConnection = {
  __typename?: 'club_membersConnection';
  edges: Array<Club_MembersEdge>;
  pageInfo: PageInfo;
};

export type Club_MembersDeleteResponse = {
  __typename?: 'club_membersDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Club_Members>;
};

export type Club_MembersEdge = {
  __typename?: 'club_membersEdge';
  cursor: Scalars['String']['output'];
  node: Club_Members;
};

export type Club_MembersFilter = {
  accepted?: InputMaybe<BooleanFilter>;
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<Club_MembersFilter>>;
  club_id?: InputMaybe<UuidFilter>;
  joined_at?: InputMaybe<DatetimeFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<Club_MembersFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<Club_MembersFilter>>;
  role_id?: InputMaybe<UuidFilter>;
  user_id?: InputMaybe<UuidFilter>;
};

export type Club_MembersInsertInput = {
  accepted?: InputMaybe<Scalars['Boolean']['input']>;
  club_id?: InputMaybe<Scalars['UUID']['input']>;
  joined_at?: InputMaybe<Scalars['Datetime']['input']>;
  role_id?: InputMaybe<Scalars['UUID']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type Club_MembersInsertResponse = {
  __typename?: 'club_membersInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Club_Members>;
};

export type Club_MembersOrderBy = {
  accepted?: InputMaybe<OrderByDirection>;
  club_id?: InputMaybe<OrderByDirection>;
  joined_at?: InputMaybe<OrderByDirection>;
  role_id?: InputMaybe<OrderByDirection>;
  user_id?: InputMaybe<OrderByDirection>;
};

export type Club_MembersUpdateInput = {
  accepted?: InputMaybe<Scalars['Boolean']['input']>;
  club_id?: InputMaybe<Scalars['UUID']['input']>;
  joined_at?: InputMaybe<Scalars['Datetime']['input']>;
  role_id?: InputMaybe<Scalars['UUID']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type Club_MembersUpdateResponse = {
  __typename?: 'club_membersUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Club_Members>;
};

export type Clubs = Node & {
  __typename?: 'clubs';
  absence_report_formsCollection?: Maybe<Absence_Report_FormsConnection>;
  absence_report_required_reviewer?: Maybe<Scalars['UUID']['output']>;
  absence_report_schema: Scalars['JSON']['output'];
  absence_reportsCollection?: Maybe<Absence_ReportsConnection>;
  active: Scalars['Boolean']['output'];
  calendar_eventsCollection?: Maybe<Calendar_EventsConnection>;
  club_membersCollection?: Maybe<Club_MembersConnection>;
  created_at: Scalars['Datetime']['output'];
  created_by?: Maybe<Scalars['UUID']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  feedback_submissionsCollection?: Maybe<Feedback_SubmissionsConnection>;
  filesCollection?: Maybe<FilesConnection>;
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  notificationsCollection?: Maybe<NotificationsConnection>;
  profiles?: Maybe<Profiles>;
  public: Scalars['Boolean']['output'];
  rolesCollection?: Maybe<RolesConnection>;
  school?: Maybe<Scalars['String']['output']>;
  website?: Maybe<Scalars['String']['output']>;
};


export type ClubsAbsence_Report_FormsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Absence_Report_FormsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Absence_Report_FormsOrderBy>>;
};


export type ClubsAbsence_ReportsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Absence_ReportsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Absence_ReportsOrderBy>>;
};


export type ClubsCalendar_EventsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Calendar_EventsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Calendar_EventsOrderBy>>;
};


export type ClubsClub_MembersCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Club_MembersFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Club_MembersOrderBy>>;
};


export type ClubsFeedback_SubmissionsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Feedback_SubmissionsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Feedback_SubmissionsOrderBy>>;
};


export type ClubsFilesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<FilesFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<FilesOrderBy>>;
};


export type ClubsNotificationsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<NotificationsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<NotificationsOrderBy>>;
};


export type ClubsRolesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<RolesFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RolesOrderBy>>;
};

export type ClubsConnection = {
  __typename?: 'clubsConnection';
  edges: Array<ClubsEdge>;
  pageInfo: PageInfo;
};

export type ClubsDeleteResponse = {
  __typename?: 'clubsDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Clubs>;
};

export type ClubsEdge = {
  __typename?: 'clubsEdge';
  cursor: Scalars['String']['output'];
  node: Clubs;
};

export type ClubsFilter = {
  absence_report_required_reviewer?: InputMaybe<UuidFilter>;
  active?: InputMaybe<BooleanFilter>;
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<ClubsFilter>>;
  created_at?: InputMaybe<DatetimeFilter>;
  created_by?: InputMaybe<UuidFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<ClubsFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<ClubsFilter>>;
  public?: InputMaybe<BooleanFilter>;
  school?: InputMaybe<StringFilter>;
  website?: InputMaybe<StringFilter>;
};

export type ClubsInsertInput = {
  absence_report_required_reviewer?: InputMaybe<Scalars['UUID']['input']>;
  absence_report_schema?: InputMaybe<Scalars['JSON']['input']>;
  active?: InputMaybe<Scalars['Boolean']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  created_by?: InputMaybe<Scalars['UUID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  public?: InputMaybe<Scalars['Boolean']['input']>;
  school?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type ClubsInsertResponse = {
  __typename?: 'clubsInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Clubs>;
};

export type ClubsOrderBy = {
  absence_report_required_reviewer?: InputMaybe<OrderByDirection>;
  active?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  created_by?: InputMaybe<OrderByDirection>;
  description?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  public?: InputMaybe<OrderByDirection>;
  school?: InputMaybe<OrderByDirection>;
  website?: InputMaybe<OrderByDirection>;
};

export type ClubsUpdateInput = {
  absence_report_required_reviewer?: InputMaybe<Scalars['UUID']['input']>;
  absence_report_schema?: InputMaybe<Scalars['JSON']['input']>;
  active?: InputMaybe<Scalars['Boolean']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  created_by?: InputMaybe<Scalars['UUID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  public?: InputMaybe<Scalars['Boolean']['input']>;
  school?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type ClubsUpdateResponse = {
  __typename?: 'clubsUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Clubs>;
};

export type Feedback_Submissions = Node & {
  __typename?: 'feedback_submissions';
  club_id?: Maybe<Scalars['UUID']['output']>;
  clubs?: Maybe<Clubs>;
  created_at: Scalars['Datetime']['output'];
  feedback: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  profiles?: Maybe<Profiles>;
  user_id?: Maybe<Scalars['UUID']['output']>;
};

export type Feedback_SubmissionsConnection = {
  __typename?: 'feedback_submissionsConnection';
  edges: Array<Feedback_SubmissionsEdge>;
  pageInfo: PageInfo;
};

export type Feedback_SubmissionsDeleteResponse = {
  __typename?: 'feedback_submissionsDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Feedback_Submissions>;
};

export type Feedback_SubmissionsEdge = {
  __typename?: 'feedback_submissionsEdge';
  cursor: Scalars['String']['output'];
  node: Feedback_Submissions;
};

export type Feedback_SubmissionsFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<Feedback_SubmissionsFilter>>;
  club_id?: InputMaybe<UuidFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  feedback?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<Feedback_SubmissionsFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<Feedback_SubmissionsFilter>>;
  user_id?: InputMaybe<UuidFilter>;
};

export type Feedback_SubmissionsInsertInput = {
  club_id?: InputMaybe<Scalars['UUID']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  feedback?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type Feedback_SubmissionsInsertResponse = {
  __typename?: 'feedback_submissionsInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Feedback_Submissions>;
};

export type Feedback_SubmissionsOrderBy = {
  club_id?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  feedback?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  user_id?: InputMaybe<OrderByDirection>;
};

export type Feedback_SubmissionsUpdateInput = {
  club_id?: InputMaybe<Scalars['UUID']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  feedback?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type Feedback_SubmissionsUpdateResponse = {
  __typename?: 'feedback_submissionsUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Feedback_Submissions>;
};

export type Files = Node & {
  __typename?: 'files';
  club_id?: Maybe<Scalars['UUID']['output']>;
  clubs?: Maybe<Clubs>;
  created_at: Scalars['Datetime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  file_name: Scalars['String']['output'];
  file_size: Scalars['BigInt']['output'];
  file_type: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  profiles?: Maybe<Profiles>;
  updated_at: Scalars['Datetime']['output'];
  url: Scalars['String']['output'];
  user_id?: Maybe<Scalars['UUID']['output']>;
};

export type FilesConnection = {
  __typename?: 'filesConnection';
  edges: Array<FilesEdge>;
  pageInfo: PageInfo;
};

export type FilesDeleteResponse = {
  __typename?: 'filesDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Files>;
};

export type FilesEdge = {
  __typename?: 'filesEdge';
  cursor: Scalars['String']['output'];
  node: Files;
};

export type FilesFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<FilesFilter>>;
  club_id?: InputMaybe<UuidFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  description?: InputMaybe<StringFilter>;
  file_name?: InputMaybe<StringFilter>;
  file_size?: InputMaybe<BigIntFilter>;
  file_type?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<FilesFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<FilesFilter>>;
  updated_at?: InputMaybe<DatetimeFilter>;
  url?: InputMaybe<StringFilter>;
  user_id?: InputMaybe<UuidFilter>;
};

export type FilesInsertInput = {
  club_id?: InputMaybe<Scalars['UUID']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  file_name?: InputMaybe<Scalars['String']['input']>;
  file_size?: InputMaybe<Scalars['BigInt']['input']>;
  file_type?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type FilesInsertResponse = {
  __typename?: 'filesInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Files>;
};

export type FilesOrderBy = {
  club_id?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  description?: InputMaybe<OrderByDirection>;
  file_name?: InputMaybe<OrderByDirection>;
  file_size?: InputMaybe<OrderByDirection>;
  file_type?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
  url?: InputMaybe<OrderByDirection>;
  user_id?: InputMaybe<OrderByDirection>;
};

export type FilesUpdateInput = {
  club_id?: InputMaybe<Scalars['UUID']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  file_name?: InputMaybe<Scalars['String']['input']>;
  file_size?: InputMaybe<Scalars['BigInt']['input']>;
  file_type?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type FilesUpdateResponse = {
  __typename?: 'filesUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Files>;
};

export type Joined_Clubs = Node & {
  __typename?: 'joined_clubs';
  absence_report_required_reviewer?: Maybe<Scalars['UUID']['output']>;
  absence_report_schema?: Maybe<Scalars['JSON']['output']>;
  active?: Maybe<Scalars['Boolean']['output']>;
  created_at?: Maybe<Scalars['Datetime']['output']>;
  created_by?: Maybe<Scalars['UUID']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['UUID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  public?: Maybe<Scalars['Boolean']['output']>;
  school?: Maybe<Scalars['String']['output']>;
  website?: Maybe<Scalars['String']['output']>;
};

export type Joined_ClubsConnection = {
  __typename?: 'joined_clubsConnection';
  edges: Array<Joined_ClubsEdge>;
  pageInfo: PageInfo;
};

export type Joined_ClubsDeleteResponse = {
  __typename?: 'joined_clubsDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Joined_Clubs>;
};

export type Joined_ClubsEdge = {
  __typename?: 'joined_clubsEdge';
  cursor: Scalars['String']['output'];
  node: Joined_Clubs;
};

export type Joined_ClubsFilter = {
  absence_report_required_reviewer?: InputMaybe<UuidFilter>;
  active?: InputMaybe<BooleanFilter>;
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<Joined_ClubsFilter>>;
  created_at?: InputMaybe<DatetimeFilter>;
  created_by?: InputMaybe<UuidFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<Joined_ClubsFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<Joined_ClubsFilter>>;
  public?: InputMaybe<BooleanFilter>;
  school?: InputMaybe<StringFilter>;
  website?: InputMaybe<StringFilter>;
};

export type Joined_ClubsInsertInput = {
  absence_report_required_reviewer?: InputMaybe<Scalars['UUID']['input']>;
  absence_report_schema?: InputMaybe<Scalars['JSON']['input']>;
  active?: InputMaybe<Scalars['Boolean']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  created_by?: InputMaybe<Scalars['UUID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  public?: InputMaybe<Scalars['Boolean']['input']>;
  school?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type Joined_ClubsInsertResponse = {
  __typename?: 'joined_clubsInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Joined_Clubs>;
};

export type Joined_ClubsOrderBy = {
  absence_report_required_reviewer?: InputMaybe<OrderByDirection>;
  active?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  created_by?: InputMaybe<OrderByDirection>;
  description?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  public?: InputMaybe<OrderByDirection>;
  school?: InputMaybe<OrderByDirection>;
  website?: InputMaybe<OrderByDirection>;
};

export type Joined_ClubsUpdateInput = {
  absence_report_required_reviewer?: InputMaybe<Scalars['UUID']['input']>;
  absence_report_schema?: InputMaybe<Scalars['JSON']['input']>;
  active?: InputMaybe<Scalars['Boolean']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  created_by?: InputMaybe<Scalars['UUID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  public?: InputMaybe<Scalars['Boolean']['input']>;
  school?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type Joined_ClubsUpdateResponse = {
  __typename?: 'joined_clubsUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Joined_Clubs>;
};

export type Notifications = Node & {
  __typename?: 'notifications';
  club_id?: Maybe<Scalars['UUID']['output']>;
  clubs?: Maybe<Clubs>;
  content: Scalars['String']['output'];
  created_at: Scalars['Datetime']['output'];
  id: Scalars['UUID']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  profiles?: Maybe<Profiles>;
  read: Scalars['Boolean']['output'];
  user_id?: Maybe<Scalars['UUID']['output']>;
};

export type NotificationsConnection = {
  __typename?: 'notificationsConnection';
  edges: Array<NotificationsEdge>;
  pageInfo: PageInfo;
};

export type NotificationsDeleteResponse = {
  __typename?: 'notificationsDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Notifications>;
};

export type NotificationsEdge = {
  __typename?: 'notificationsEdge';
  cursor: Scalars['String']['output'];
  node: Notifications;
};

export type NotificationsFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<NotificationsFilter>>;
  club_id?: InputMaybe<UuidFilter>;
  content?: InputMaybe<StringFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<NotificationsFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<NotificationsFilter>>;
  read?: InputMaybe<BooleanFilter>;
  user_id?: InputMaybe<UuidFilter>;
};

export type NotificationsInsertInput = {
  club_id?: InputMaybe<Scalars['UUID']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  read?: InputMaybe<Scalars['Boolean']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type NotificationsInsertResponse = {
  __typename?: 'notificationsInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Notifications>;
};

export type NotificationsOrderBy = {
  club_id?: InputMaybe<OrderByDirection>;
  content?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  read?: InputMaybe<OrderByDirection>;
  user_id?: InputMaybe<OrderByDirection>;
};

export type NotificationsUpdateInput = {
  club_id?: InputMaybe<Scalars['UUID']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  read?: InputMaybe<Scalars['Boolean']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type NotificationsUpdateResponse = {
  __typename?: 'notificationsUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Notifications>;
};

export type Profiles = Node & {
  __typename?: 'profiles';
  absence_report_reviewsCollection?: Maybe<Absence_Report_ReviewsConnection>;
  absence_reportsCollection?: Maybe<Absence_ReportsConnection>;
  avatar_url?: Maybe<Scalars['String']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  calendar_eventsCollection?: Maybe<Calendar_EventsConnection>;
  club_membersCollection?: Maybe<Club_MembersConnection>;
  clubsCollection?: Maybe<ClubsConnection>;
  created_at: Scalars['Datetime']['output'];
  feedback_submissionsCollection?: Maybe<Feedback_SubmissionsConnection>;
  filesCollection?: Maybe<FilesConnection>;
  full_name: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  locale?: Maybe<Scalars['String']['output']>;
  nickname?: Maybe<Scalars['String']['output']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  notificationsCollection?: Maybe<NotificationsConnection>;
  private_profile: Scalars['Boolean']['output'];
  push_notifications_preference: Scalars['JSON']['output'];
  school?: Maybe<Scalars['String']['output']>;
  updated_at: Scalars['Datetime']['output'];
};


export type ProfilesAbsence_Report_ReviewsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Absence_Report_ReviewsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Absence_Report_ReviewsOrderBy>>;
};


export type ProfilesAbsence_ReportsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Absence_ReportsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Absence_ReportsOrderBy>>;
};


export type ProfilesCalendar_EventsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Calendar_EventsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Calendar_EventsOrderBy>>;
};


export type ProfilesClub_MembersCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Club_MembersFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Club_MembersOrderBy>>;
};


export type ProfilesClubsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<ClubsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ClubsOrderBy>>;
};


export type ProfilesFeedback_SubmissionsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Feedback_SubmissionsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Feedback_SubmissionsOrderBy>>;
};


export type ProfilesFilesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<FilesFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<FilesOrderBy>>;
};


export type ProfilesNotificationsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<NotificationsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<NotificationsOrderBy>>;
};

export type ProfilesConnection = {
  __typename?: 'profilesConnection';
  edges: Array<ProfilesEdge>;
  pageInfo: PageInfo;
};

export type ProfilesDeleteResponse = {
  __typename?: 'profilesDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Profiles>;
};

export type ProfilesEdge = {
  __typename?: 'profilesEdge';
  cursor: Scalars['String']['output'];
  node: Profiles;
};

export type ProfilesFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<ProfilesFilter>>;
  avatar_url?: InputMaybe<StringFilter>;
  bio?: InputMaybe<StringFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  full_name?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  locale?: InputMaybe<StringFilter>;
  nickname?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<ProfilesFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<ProfilesFilter>>;
  private_profile?: InputMaybe<BooleanFilter>;
  school?: InputMaybe<StringFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
};

export type ProfilesInsertInput = {
  avatar_url?: InputMaybe<Scalars['String']['input']>;
  bio?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  full_name?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  nickname?: InputMaybe<Scalars['String']['input']>;
  private_profile?: InputMaybe<Scalars['Boolean']['input']>;
  push_notifications_preference?: InputMaybe<Scalars['JSON']['input']>;
  school?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type ProfilesInsertResponse = {
  __typename?: 'profilesInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Profiles>;
};

export type ProfilesOrderBy = {
  avatar_url?: InputMaybe<OrderByDirection>;
  bio?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  full_name?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  locale?: InputMaybe<OrderByDirection>;
  nickname?: InputMaybe<OrderByDirection>;
  private_profile?: InputMaybe<OrderByDirection>;
  school?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
};

export type ProfilesUpdateInput = {
  avatar_url?: InputMaybe<Scalars['String']['input']>;
  bio?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  full_name?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  nickname?: InputMaybe<Scalars['String']['input']>;
  private_profile?: InputMaybe<Scalars['Boolean']['input']>;
  push_notifications_preference?: InputMaybe<Scalars['JSON']['input']>;
  school?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type ProfilesUpdateResponse = {
  __typename?: 'profilesUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Profiles>;
};

export type Roles = Node & {
  __typename?: 'roles';
  absence_report_approval_required: Scalars['Boolean']['output'];
  absence_report_form?: Maybe<Scalars['UUID']['output']>;
  absence_report_forms?: Maybe<Absence_Report_Forms>;
  absence_report_reviewer_role?: Maybe<Scalars['UUID']['output']>;
  absence_reportsCollection?: Maybe<Absence_ReportsConnection>;
  club_id?: Maybe<Scalars['UUID']['output']>;
  club_membersCollection?: Maybe<Club_MembersConnection>;
  clubs?: Maybe<Clubs>;
  created_at: Scalars['Datetime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  permissions: Scalars['JSON']['output'];
  roles?: Maybe<Roles>;
  rolesCollection?: Maybe<RolesConnection>;
  updated_at: Scalars['Datetime']['output'];
};


export type RolesAbsence_ReportsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Absence_ReportsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Absence_ReportsOrderBy>>;
};


export type RolesClub_MembersCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Club_MembersFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Club_MembersOrderBy>>;
};


export type RolesRolesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<RolesFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RolesOrderBy>>;
};

export type RolesConnection = {
  __typename?: 'rolesConnection';
  edges: Array<RolesEdge>;
  pageInfo: PageInfo;
};

export type RolesDeleteResponse = {
  __typename?: 'rolesDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Roles>;
};

export type RolesEdge = {
  __typename?: 'rolesEdge';
  cursor: Scalars['String']['output'];
  node: Roles;
};

export type RolesFilter = {
  absence_report_approval_required?: InputMaybe<BooleanFilter>;
  absence_report_form?: InputMaybe<UuidFilter>;
  absence_report_reviewer_role?: InputMaybe<UuidFilter>;
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<RolesFilter>>;
  club_id?: InputMaybe<UuidFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<RolesFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<RolesFilter>>;
  updated_at?: InputMaybe<DatetimeFilter>;
};

export type RolesInsertInput = {
  absence_report_approval_required?: InputMaybe<Scalars['Boolean']['input']>;
  absence_report_form?: InputMaybe<Scalars['UUID']['input']>;
  absence_report_reviewer_role?: InputMaybe<Scalars['UUID']['input']>;
  club_id?: InputMaybe<Scalars['UUID']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  permissions?: InputMaybe<Scalars['JSON']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type RolesInsertResponse = {
  __typename?: 'rolesInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Roles>;
};

export type RolesOrderBy = {
  absence_report_approval_required?: InputMaybe<OrderByDirection>;
  absence_report_form?: InputMaybe<OrderByDirection>;
  absence_report_reviewer_role?: InputMaybe<OrderByDirection>;
  club_id?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  description?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
};

export type RolesUpdateInput = {
  absence_report_approval_required?: InputMaybe<Scalars['Boolean']['input']>;
  absence_report_form?: InputMaybe<Scalars['UUID']['input']>;
  absence_report_reviewer_role?: InputMaybe<Scalars['UUID']['input']>;
  club_id?: InputMaybe<Scalars['UUID']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  permissions?: InputMaybe<Scalars['JSON']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type RolesUpdateResponse = {
  __typename?: 'rolesUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Roles>;
};

export type AbsenceReportAllDetailQueryVariables = Exact<{
  reportId: Scalars['UUID']['input'];
}>;


export type AbsenceReportAllDetailQuery = { __typename: 'Query', absence_reportsCollection?: { __typename: 'absence_reportsConnection', edges: Array<{ __typename: 'absence_reportsEdge', node: (
        { __typename: 'absence_reports' }
        & { ' $fragmentRefs'?: { 'AbsenceReportDetailFragment': AbsenceReportDetailFragment } }
      ) }> } | null };

export type AllAbsenceReportsQueryVariables = Exact<{
  clubId: Scalars['UUID']['input'];
}>;


export type AllAbsenceReportsQuery = { __typename: 'Query', absence_reportsCollection?: { __typename: 'absence_reportsConnection', edges: Array<{ __typename: 'absence_reportsEdge', node: (
        { __typename: 'absence_reports', id: string }
        & { ' $fragmentRefs'?: { 'AbsenceReportCardFragment': AbsenceReportCardFragment } }
      ) }> } | null };

export type AbsenceReportMyDetailQueryVariables = Exact<{
  reportId: Scalars['UUID']['input'];
}>;


export type AbsenceReportMyDetailQuery = { __typename: 'Query', absence_reportsCollection?: { __typename: 'absence_reportsConnection', edges: Array<{ __typename: 'absence_reportsEdge', node: (
        { __typename: 'absence_reports' }
        & { ' $fragmentRefs'?: { 'AbsenceReportDetailFragment': AbsenceReportDetailFragment } }
      ) }> } | null };

export type MyAbsenceReportsQueryVariables = Exact<{
  clubId: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
}>;


export type MyAbsenceReportsQuery = { __typename: 'Query', absence_reportsCollection?: { __typename: 'absence_reportsConnection', edges: Array<{ __typename: 'absence_reportsEdge', node: (
        { __typename: 'absence_reports', id: string }
        & { ' $fragmentRefs'?: { 'AbsenceReportCardFragment': AbsenceReportCardFragment } }
      ) }> } | null };

export type AbsenceReportDetailFragment = { __typename: 'absence_reports', id: string, date?: string | null, created_at: string, data: string, assigned_to_role?: { __typename: 'roles', name: string } | null, form?: { __typename: 'absence_report_forms', id: string, name: string, questions: string } | null, reviews?: { __typename: 'absence_report_reviewsConnection', edges: Array<{ __typename: 'absence_report_reviewsEdge', node: { __typename: 'absence_report_reviews', id: string, created_at: string, accepted: boolean, comments?: string | null, reviewer?: { __typename: 'profiles', full_name: string } | null } }> } | null, event?: { __typename: 'calendar_events', id: string, title: string, start_time: string, end_time: string } | null, user?: { __typename: 'profiles', full_name: string, avatar_url?: string | null } | null } & { ' $fragmentName'?: 'AbsenceReportDetailFragment' };

export type CalendarDayQueryVariables = Exact<{
  clubId: Scalars['UUID']['input'];
  date: Scalars['Date']['input'];
  startDate: Scalars['Datetime']['input'];
  endDate: Scalars['Datetime']['input'];
}>;


export type CalendarDayQuery = { __typename: 'Query', calendar_eventsCollection?: { __typename: 'calendar_eventsConnection', edges: Array<{ __typename: 'calendar_eventsEdge', node: (
        { __typename: 'calendar_events', id: string, title: string, start_time: string, end_time: string, description?: string | null, location?: string | null }
        & { ' $fragmentRefs'?: { 'EventDetailDrawerFragment': EventDetailDrawerFragment } }
      ) }> } | null, absence_reportsCollection?: { __typename: 'absence_reportsConnection', edges: Array<{ __typename: 'absence_reportsEdge', node: (
        { __typename: 'absence_reports', id: string }
        & { ' $fragmentRefs'?: { 'AbsenceReportCardFragment': AbsenceReportCardFragment } }
      ) }> } | null };

export type EventDetailDrawerFragment = { __typename: 'calendar_events', id: string, title: string, start_time: string, end_time: string, description?: string | null, location?: string | null } & { ' $fragmentName'?: 'EventDetailDrawerFragment' };

export type JoinedClubsQueryVariables = Exact<{
  me: Scalars['UUID']['input'];
}>;


export type JoinedClubsQuery = { __typename: 'Query', club_membersCollection?: { __typename: 'club_membersConnection', edges: Array<{ __typename: 'club_membersEdge', node: { __typename: 'club_members', clubs?: (
          { __typename: 'clubs', nodeId: string }
          & { ' $fragmentRefs'?: { 'ClubCardFragment': ClubCardFragment } }
        ) | null } }> } | null };

export type UserQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type UserQuery = { __typename: 'Query', club_membersCollection?: { __typename: 'club_membersConnection', edges: Array<{ __typename: 'club_membersEdge', node: { __typename: 'club_members', clubs?: (
          { __typename: 'clubs', nodeId: string }
          & { ' $fragmentRefs'?: { 'ClubCardFragment': ClubCardFragment } }
        ) | null } }> } | null };

export type MembersManagerQueryVariables = Exact<{
  clubId: Scalars['UUID']['input'];
}>;


export type MembersManagerQuery = { __typename: 'Query', club_membersCollection?: { __typename: 'club_membersConnection', edges: Array<{ __typename: 'club_membersEdge', node: { __typename: 'club_members', user_id: string, user?: { __typename: 'profiles', full_name: string, nickname?: string | null, avatar_url?: string | null } | null, role?: { __typename: 'roles', name: string, id: string } | null } }> } | null, rolesCollection?: { __typename: 'rolesConnection', edges: Array<{ __typename: 'rolesEdge', node: { __typename: 'roles', id: string, name: string } }> } | null };

export type ChangeMemberRoleMutationVariables = Exact<{
  clubId: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
  roleId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type ChangeMemberRoleMutation = { __typename: 'Mutation', updateclub_membersCollection: { __typename: 'club_membersUpdateResponse', affectedCount: number } };

export type RemoveMemberMutationVariables = Exact<{
  clubId: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
}>;


export type RemoveMemberMutation = { __typename: 'Mutation', deleteFromclub_membersCollection: { __typename: 'club_membersDeleteResponse', affectedCount: number } };

export type AbsenceReportCardFragment = { __typename: 'absence_reports', id: string, date?: string | null, created_at: string, assigned_to_role?: { __typename: 'roles', name: string } | null, reviews?: { __typename: 'absence_report_reviewsConnection', edges: Array<{ __typename: 'absence_report_reviewsEdge', node: { __typename: 'absence_report_reviews', id: string } }> } | null, event?: { __typename: 'calendar_events', id: string, title: string, start_time: string, end_time: string } | null, user?: { __typename: 'profiles', full_name: string, avatar_url?: string | null } | null } & { ' $fragmentName'?: 'AbsenceReportCardFragment' };

export type ClubCardFragment = { __typename: 'clubs', id: string, name: string, school?: string | null, description?: string | null } & { ' $fragmentName'?: 'ClubCardFragment' };

export const AbsenceReportDetailFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AbsenceReportDetail"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"absence_reports"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","alias":{"kind":"Name","value":"assigned_to_role"},"name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"form"},"name":{"kind":"Name","value":"absence_report_forms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"questions"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"reviews"},"name":{"kind":"Name","value":"absence_report_reviewsCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"accepted"}},{"kind":"Field","name":{"kind":"Name","value":"comments"}},{"kind":"Field","alias":{"kind":"Name","value":"reviewer"},"name":{"kind":"Name","value":"profiles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"full_name"}}]}}]}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"event"},"name":{"kind":"Name","value":"calendar_events"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"start_time"}},{"kind":"Field","name":{"kind":"Name","value":"end_time"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"user"},"name":{"kind":"Name","value":"profiles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"full_name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_url"}}]}}]}}]} as unknown as DocumentNode<AbsenceReportDetailFragment, unknown>;
export const EventDetailDrawerFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventDetailDrawer"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"calendar_events"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"start_time"}},{"kind":"Field","name":{"kind":"Name","value":"end_time"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"location"}}]}}]} as unknown as DocumentNode<EventDetailDrawerFragment, unknown>;
export const AbsenceReportCardFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AbsenceReportCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"absence_reports"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","alias":{"kind":"Name","value":"assigned_to_role"},"name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"reviews"},"name":{"kind":"Name","value":"absence_report_reviewsCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"event"},"name":{"kind":"Name","value":"calendar_events"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"start_time"}},{"kind":"Field","name":{"kind":"Name","value":"end_time"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"user"},"name":{"kind":"Name","value":"profiles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"full_name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_url"}}]}}]}}]} as unknown as DocumentNode<AbsenceReportCardFragment, unknown>;
export const ClubCardFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ClubCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"clubs"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"school"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<ClubCardFragment, unknown>;
export const AbsenceReportAllDetailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AbsenceReportAllDetail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"reportId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"absence_reportsCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"reportId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AbsenceReportDetail"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AbsenceReportDetail"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"absence_reports"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","alias":{"kind":"Name","value":"assigned_to_role"},"name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"form"},"name":{"kind":"Name","value":"absence_report_forms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"questions"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"reviews"},"name":{"kind":"Name","value":"absence_report_reviewsCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"accepted"}},{"kind":"Field","name":{"kind":"Name","value":"comments"}},{"kind":"Field","alias":{"kind":"Name","value":"reviewer"},"name":{"kind":"Name","value":"profiles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"full_name"}}]}}]}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"event"},"name":{"kind":"Name","value":"calendar_events"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"start_time"}},{"kind":"Field","name":{"kind":"Name","value":"end_time"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"user"},"name":{"kind":"Name","value":"profiles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"full_name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_url"}}]}}]}}]} as unknown as DocumentNode<AbsenceReportAllDetailQuery, AbsenceReportAllDetailQueryVariables>;
export const AllAbsenceReportsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllAbsenceReports"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"clubId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"absence_reportsCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"club_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"clubId"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"created_at"},"value":{"kind":"EnumValue","value":"DescNullsFirst"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"IntValue","value":"0"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AbsenceReportCard"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AbsenceReportCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"absence_reports"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","alias":{"kind":"Name","value":"assigned_to_role"},"name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"reviews"},"name":{"kind":"Name","value":"absence_report_reviewsCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"event"},"name":{"kind":"Name","value":"calendar_events"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"start_time"}},{"kind":"Field","name":{"kind":"Name","value":"end_time"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"user"},"name":{"kind":"Name","value":"profiles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"full_name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_url"}}]}}]}}]} as unknown as DocumentNode<AllAbsenceReportsQuery, AllAbsenceReportsQueryVariables>;
export const AbsenceReportMyDetailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AbsenceReportMyDetail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"reportId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"absence_reportsCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"reportId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AbsenceReportDetail"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AbsenceReportDetail"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"absence_reports"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","alias":{"kind":"Name","value":"assigned_to_role"},"name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"form"},"name":{"kind":"Name","value":"absence_report_forms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"questions"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"reviews"},"name":{"kind":"Name","value":"absence_report_reviewsCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"accepted"}},{"kind":"Field","name":{"kind":"Name","value":"comments"}},{"kind":"Field","alias":{"kind":"Name","value":"reviewer"},"name":{"kind":"Name","value":"profiles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"full_name"}}]}}]}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"event"},"name":{"kind":"Name","value":"calendar_events"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"start_time"}},{"kind":"Field","name":{"kind":"Name","value":"end_time"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"user"},"name":{"kind":"Name","value":"profiles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"full_name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_url"}}]}}]}}]} as unknown as DocumentNode<AbsenceReportMyDetailQuery, AbsenceReportMyDetailQueryVariables>;
export const MyAbsenceReportsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MyAbsenceReports"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"clubId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"absence_reportsCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"club_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"clubId"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"created_at"},"value":{"kind":"EnumValue","value":"DescNullsFirst"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"IntValue","value":"0"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AbsenceReportCard"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AbsenceReportCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"absence_reports"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","alias":{"kind":"Name","value":"assigned_to_role"},"name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"reviews"},"name":{"kind":"Name","value":"absence_report_reviewsCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"event"},"name":{"kind":"Name","value":"calendar_events"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"start_time"}},{"kind":"Field","name":{"kind":"Name","value":"end_time"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"user"},"name":{"kind":"Name","value":"profiles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"full_name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_url"}}]}}]}}]} as unknown as DocumentNode<MyAbsenceReportsQuery, MyAbsenceReportsQueryVariables>;
export const CalendarDayDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CalendarDay"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"clubId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Datetime"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Datetime"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"calendar_eventsCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"club_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"clubId"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"start_time"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"gte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"end_time"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"lte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"start_time"},"value":{"kind":"EnumValue","value":"AscNullsLast"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"start_time"}},{"kind":"Field","name":{"kind":"Name","value":"end_time"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventDetailDrawer"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"absence_reportsCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"club_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"clubId"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"date"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AbsenceReportCard"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventDetailDrawer"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"calendar_events"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"start_time"}},{"kind":"Field","name":{"kind":"Name","value":"end_time"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"location"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AbsenceReportCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"absence_reports"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","alias":{"kind":"Name","value":"assigned_to_role"},"name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"reviews"},"name":{"kind":"Name","value":"absence_report_reviewsCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"event"},"name":{"kind":"Name","value":"calendar_events"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"start_time"}},{"kind":"Field","name":{"kind":"Name","value":"end_time"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"user"},"name":{"kind":"Name","value":"profiles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"full_name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_url"}}]}}]}}]} as unknown as DocumentNode<CalendarDayQuery, CalendarDayQueryVariables>;
export const JoinedClubsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"JoinedClubs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"me"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"club_membersCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"me"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"clubs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"nodeId"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ClubCard"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ClubCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"clubs"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"school"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<JoinedClubsQuery, JoinedClubsQueryVariables>;
export const UserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"User"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"club_membersCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"clubs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"nodeId"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ClubCard"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ClubCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"clubs"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"school"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<UserQuery, UserQueryVariables>;
export const MembersManagerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MembersManager"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"clubId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"club_membersCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"joined_at"},"value":{"kind":"EnumValue","value":"DescNullsLast"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"100"}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"club_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"clubId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","alias":{"kind":"Name","value":"user"},"name":{"kind":"Name","value":"profiles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"full_name"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_url"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"role"},"name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user_id"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"rolesCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"AscNullsLast"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"100"}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"club_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"clubId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<MembersManagerQuery, MembersManagerQueryVariables>;
export const ChangeMemberRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeMemberRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"clubId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roleId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"updateclub_membersCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"set"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"role_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roleId"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"club_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"clubId"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"atMost"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"affectedCount"}}]}}]}}]} as unknown as DocumentNode<ChangeMemberRoleMutation, ChangeMemberRoleMutationVariables>;
export const RemoveMemberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveMember"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"clubId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"deleteFromclub_membersCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"club_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"clubId"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"atMost"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"affectedCount"}}]}}]}}]} as unknown as DocumentNode<RemoveMemberMutation, RemoveMemberMutationVariables>;