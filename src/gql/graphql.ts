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

export type AbsenceReportForms = Node & {
  __typename?: 'AbsenceReportForms';
  absenceReportsCollection?: Maybe<AbsenceReportsConnection>;
  club?: Maybe<Clubs>;
  clubId: Scalars['UUID']['output'];
  createdAt: Scalars['Datetime']['output'];
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  questions: Scalars['JSON']['output'];
  rolesCollection?: Maybe<RolesConnection>;
  updatedAt: Scalars['Datetime']['output'];
};


export type AbsenceReportFormsAbsenceReportsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<AbsenceReportsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AbsenceReportsOrderBy>>;
};


export type AbsenceReportFormsRolesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<RolesFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RolesOrderBy>>;
};

export type AbsenceReportFormsConnection = {
  __typename?: 'AbsenceReportFormsConnection';
  edges: Array<AbsenceReportFormsEdge>;
  pageInfo: PageInfo;
};

export type AbsenceReportFormsDeleteResponse = {
  __typename?: 'AbsenceReportFormsDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<AbsenceReportForms>;
};

export type AbsenceReportFormsEdge = {
  __typename?: 'AbsenceReportFormsEdge';
  cursor: Scalars['String']['output'];
  node: AbsenceReportForms;
};

export type AbsenceReportFormsFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<AbsenceReportFormsFilter>>;
  clubId?: InputMaybe<UuidFilter>;
  createdAt?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<AbsenceReportFormsFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<AbsenceReportFormsFilter>>;
  updatedAt?: InputMaybe<DatetimeFilter>;
};

export type AbsenceReportFormsInsertInput = {
  clubId?: InputMaybe<Scalars['UUID']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  questions?: InputMaybe<Scalars['JSON']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

export type AbsenceReportFormsInsertResponse = {
  __typename?: 'AbsenceReportFormsInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<AbsenceReportForms>;
};

export type AbsenceReportFormsOrderBy = {
  clubId?: InputMaybe<OrderByDirection>;
  createdAt?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  updatedAt?: InputMaybe<OrderByDirection>;
};

export type AbsenceReportFormsUpdateInput = {
  clubId?: InputMaybe<Scalars['UUID']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  questions?: InputMaybe<Scalars['JSON']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

export type AbsenceReportFormsUpdateResponse = {
  __typename?: 'AbsenceReportFormsUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<AbsenceReportForms>;
};

export type AbsenceReportReviews = Node & {
  __typename?: 'AbsenceReportReviews';
  absenceReport?: Maybe<AbsenceReports>;
  absenceReportId: Scalars['UUID']['output'];
  accepted: Scalars['Boolean']['output'];
  comments?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Datetime']['output'];
  id: Scalars['UUID']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  reviewer?: Maybe<Profiles>;
  reviewerId?: Maybe<Scalars['UUID']['output']>;
  updatedAt: Scalars['Datetime']['output'];
};

export type AbsenceReportReviewsConnection = {
  __typename?: 'AbsenceReportReviewsConnection';
  edges: Array<AbsenceReportReviewsEdge>;
  pageInfo: PageInfo;
};

export type AbsenceReportReviewsDeleteResponse = {
  __typename?: 'AbsenceReportReviewsDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<AbsenceReportReviews>;
};

export type AbsenceReportReviewsEdge = {
  __typename?: 'AbsenceReportReviewsEdge';
  cursor: Scalars['String']['output'];
  node: AbsenceReportReviews;
};

export type AbsenceReportReviewsFilter = {
  absenceReportId?: InputMaybe<UuidFilter>;
  accepted?: InputMaybe<BooleanFilter>;
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<AbsenceReportReviewsFilter>>;
  comments?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<AbsenceReportReviewsFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<AbsenceReportReviewsFilter>>;
  reviewerId?: InputMaybe<UuidFilter>;
  updatedAt?: InputMaybe<DatetimeFilter>;
};

export type AbsenceReportReviewsInsertInput = {
  absenceReportId?: InputMaybe<Scalars['UUID']['input']>;
  accepted?: InputMaybe<Scalars['Boolean']['input']>;
  comments?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  reviewerId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

export type AbsenceReportReviewsInsertResponse = {
  __typename?: 'AbsenceReportReviewsInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<AbsenceReportReviews>;
};

export type AbsenceReportReviewsOrderBy = {
  absenceReportId?: InputMaybe<OrderByDirection>;
  accepted?: InputMaybe<OrderByDirection>;
  comments?: InputMaybe<OrderByDirection>;
  createdAt?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  reviewerId?: InputMaybe<OrderByDirection>;
  updatedAt?: InputMaybe<OrderByDirection>;
};

export type AbsenceReportReviewsUpdateInput = {
  absenceReportId?: InputMaybe<Scalars['UUID']['input']>;
  accepted?: InputMaybe<Scalars['Boolean']['input']>;
  comments?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  reviewerId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

export type AbsenceReportReviewsUpdateResponse = {
  __typename?: 'AbsenceReportReviewsUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<AbsenceReportReviews>;
};

export type AbsenceReports = Node & {
  __typename?: 'AbsenceReports';
  absenceReportReviewsCollection?: Maybe<AbsenceReportReviewsConnection>;
  absenceReportsStatusCollection?: Maybe<AbsenceReportsStatusConnection>;
  assignedToRole?: Maybe<Scalars['UUID']['output']>;
  club?: Maybe<Clubs>;
  clubId: Scalars['UUID']['output'];
  createdAt: Scalars['Datetime']['output'];
  data: Scalars['JSON']['output'];
  date?: Maybe<Scalars['Date']['output']>;
  event?: Maybe<CalendarEvents>;
  eventId?: Maybe<Scalars['UUID']['output']>;
  form?: Maybe<AbsenceReportForms>;
  formId?: Maybe<Scalars['UUID']['output']>;
  id: Scalars['UUID']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  roles?: Maybe<Roles>;
  updatedAt: Scalars['Datetime']['output'];
  user?: Maybe<Profiles>;
  userId?: Maybe<Scalars['UUID']['output']>;
};


export type AbsenceReportsAbsenceReportReviewsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<AbsenceReportReviewsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AbsenceReportReviewsOrderBy>>;
};


export type AbsenceReportsAbsenceReportsStatusCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<AbsenceReportsStatusFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AbsenceReportsStatusOrderBy>>;
};

export type AbsenceReportsConnection = {
  __typename?: 'AbsenceReportsConnection';
  edges: Array<AbsenceReportsEdge>;
  pageInfo: PageInfo;
};

export type AbsenceReportsDeleteResponse = {
  __typename?: 'AbsenceReportsDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<AbsenceReports>;
};

export type AbsenceReportsEdge = {
  __typename?: 'AbsenceReportsEdge';
  cursor: Scalars['String']['output'];
  node: AbsenceReports;
};

export type AbsenceReportsFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<AbsenceReportsFilter>>;
  assignedToRole?: InputMaybe<UuidFilter>;
  clubId?: InputMaybe<UuidFilter>;
  createdAt?: InputMaybe<DatetimeFilter>;
  date?: InputMaybe<DateFilter>;
  eventId?: InputMaybe<UuidFilter>;
  formId?: InputMaybe<UuidFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<AbsenceReportsFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<AbsenceReportsFilter>>;
  updatedAt?: InputMaybe<DatetimeFilter>;
  userId?: InputMaybe<UuidFilter>;
};

export type AbsenceReportsInsertInput = {
  assignedToRole?: InputMaybe<Scalars['UUID']['input']>;
  clubId?: InputMaybe<Scalars['UUID']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  data?: InputMaybe<Scalars['JSON']['input']>;
  date?: InputMaybe<Scalars['Date']['input']>;
  eventId?: InputMaybe<Scalars['UUID']['input']>;
  formId?: InputMaybe<Scalars['UUID']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

export type AbsenceReportsInsertResponse = {
  __typename?: 'AbsenceReportsInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<AbsenceReports>;
};

export type AbsenceReportsOrderBy = {
  assignedToRole?: InputMaybe<OrderByDirection>;
  clubId?: InputMaybe<OrderByDirection>;
  createdAt?: InputMaybe<OrderByDirection>;
  date?: InputMaybe<OrderByDirection>;
  eventId?: InputMaybe<OrderByDirection>;
  formId?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  updatedAt?: InputMaybe<OrderByDirection>;
  userId?: InputMaybe<OrderByDirection>;
};

export type AbsenceReportsStatus = Node & {
  __typename?: 'AbsenceReportsStatus';
  club?: Maybe<Clubs>;
  clubId?: Maybe<Scalars['UUID']['output']>;
  isApproved?: Maybe<Scalars['Boolean']['output']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  report?: Maybe<AbsenceReports>;
  reportId?: Maybe<Scalars['UUID']['output']>;
  reportUser?: Maybe<Profiles>;
  reportUserId?: Maybe<Scalars['UUID']['output']>;
};

export type AbsenceReportsStatusConnection = {
  __typename?: 'AbsenceReportsStatusConnection';
  edges: Array<AbsenceReportsStatusEdge>;
  pageInfo: PageInfo;
};

export type AbsenceReportsStatusDeleteResponse = {
  __typename?: 'AbsenceReportsStatusDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<AbsenceReportsStatus>;
};

export type AbsenceReportsStatusEdge = {
  __typename?: 'AbsenceReportsStatusEdge';
  cursor: Scalars['String']['output'];
  node: AbsenceReportsStatus;
};

export type AbsenceReportsStatusFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<AbsenceReportsStatusFilter>>;
  clubId?: InputMaybe<UuidFilter>;
  isApproved?: InputMaybe<BooleanFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<AbsenceReportsStatusFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<AbsenceReportsStatusFilter>>;
  reportId?: InputMaybe<UuidFilter>;
  reportUserId?: InputMaybe<UuidFilter>;
};

export type AbsenceReportsStatusInsertInput = {
  clubId?: InputMaybe<Scalars['UUID']['input']>;
  isApproved?: InputMaybe<Scalars['Boolean']['input']>;
  reportId?: InputMaybe<Scalars['UUID']['input']>;
  reportUserId?: InputMaybe<Scalars['UUID']['input']>;
};

export type AbsenceReportsStatusInsertResponse = {
  __typename?: 'AbsenceReportsStatusInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<AbsenceReportsStatus>;
};

export type AbsenceReportsStatusOrderBy = {
  clubId?: InputMaybe<OrderByDirection>;
  isApproved?: InputMaybe<OrderByDirection>;
  reportId?: InputMaybe<OrderByDirection>;
  reportUserId?: InputMaybe<OrderByDirection>;
};

export type AbsenceReportsStatusUpdateInput = {
  clubId?: InputMaybe<Scalars['UUID']['input']>;
  isApproved?: InputMaybe<Scalars['Boolean']['input']>;
  reportId?: InputMaybe<Scalars['UUID']['input']>;
  reportUserId?: InputMaybe<Scalars['UUID']['input']>;
};

export type AbsenceReportsStatusUpdateResponse = {
  __typename?: 'AbsenceReportsStatusUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<AbsenceReportsStatus>;
};

export type AbsenceReportsUpdateInput = {
  assignedToRole?: InputMaybe<Scalars['UUID']['input']>;
  clubId?: InputMaybe<Scalars['UUID']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  data?: InputMaybe<Scalars['JSON']['input']>;
  date?: InputMaybe<Scalars['Date']['input']>;
  eventId?: InputMaybe<Scalars['UUID']['input']>;
  formId?: InputMaybe<Scalars['UUID']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

export type AbsenceReportsUpdateResponse = {
  __typename?: 'AbsenceReportsUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<AbsenceReports>;
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

export type CalendarEvents = Node & {
  __typename?: 'CalendarEvents';
  absenceReportsCollection?: Maybe<AbsenceReportsConnection>;
  club?: Maybe<Clubs>;
  clubId: Scalars['UUID']['output'];
  createdAt: Scalars['Datetime']['output'];
  createdBy?: Maybe<Scalars['UUID']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  endTime: Scalars['Datetime']['output'];
  id: Scalars['UUID']['output'];
  location?: Maybe<Scalars['String']['output']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  profiles?: Maybe<Profiles>;
  startTime: Scalars['Datetime']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['Datetime']['output'];
};


export type CalendarEventsAbsenceReportsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<AbsenceReportsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AbsenceReportsOrderBy>>;
};

export type CalendarEventsConnection = {
  __typename?: 'CalendarEventsConnection';
  edges: Array<CalendarEventsEdge>;
  pageInfo: PageInfo;
};

export type CalendarEventsDeleteResponse = {
  __typename?: 'CalendarEventsDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<CalendarEvents>;
};

export type CalendarEventsEdge = {
  __typename?: 'CalendarEventsEdge';
  cursor: Scalars['String']['output'];
  node: CalendarEvents;
};

export type CalendarEventsFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<CalendarEventsFilter>>;
  clubId?: InputMaybe<UuidFilter>;
  createdAt?: InputMaybe<DatetimeFilter>;
  createdBy?: InputMaybe<UuidFilter>;
  description?: InputMaybe<StringFilter>;
  endTime?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  location?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<CalendarEventsFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<CalendarEventsFilter>>;
  startTime?: InputMaybe<DatetimeFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DatetimeFilter>;
};

export type CalendarEventsInsertInput = {
  clubId?: InputMaybe<Scalars['UUID']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  createdBy?: InputMaybe<Scalars['UUID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  endTime?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  startTime?: InputMaybe<Scalars['Datetime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

export type CalendarEventsInsertResponse = {
  __typename?: 'CalendarEventsInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<CalendarEvents>;
};

export type CalendarEventsOrderBy = {
  clubId?: InputMaybe<OrderByDirection>;
  createdAt?: InputMaybe<OrderByDirection>;
  createdBy?: InputMaybe<OrderByDirection>;
  description?: InputMaybe<OrderByDirection>;
  endTime?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  location?: InputMaybe<OrderByDirection>;
  startTime?: InputMaybe<OrderByDirection>;
  title?: InputMaybe<OrderByDirection>;
  updatedAt?: InputMaybe<OrderByDirection>;
};

export type CalendarEventsUpdateInput = {
  clubId?: InputMaybe<Scalars['UUID']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  createdBy?: InputMaybe<Scalars['UUID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  endTime?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  startTime?: InputMaybe<Scalars['Datetime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

export type CalendarEventsUpdateResponse = {
  __typename?: 'CalendarEventsUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<CalendarEvents>;
};

export type ClubMembers = Node & {
  __typename?: 'ClubMembers';
  accepted: Scalars['Boolean']['output'];
  club?: Maybe<Clubs>;
  clubId: Scalars['UUID']['output'];
  joinedAt: Scalars['Datetime']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  role?: Maybe<Roles>;
  roleId: Scalars['UUID']['output'];
  user?: Maybe<Profiles>;
  userId: Scalars['UUID']['output'];
};

export type ClubMembersConnection = {
  __typename?: 'ClubMembersConnection';
  edges: Array<ClubMembersEdge>;
  pageInfo: PageInfo;
};

export type ClubMembersDeleteResponse = {
  __typename?: 'ClubMembersDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<ClubMembers>;
};

export type ClubMembersEdge = {
  __typename?: 'ClubMembersEdge';
  cursor: Scalars['String']['output'];
  node: ClubMembers;
};

export type ClubMembersFilter = {
  accepted?: InputMaybe<BooleanFilter>;
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<ClubMembersFilter>>;
  clubId?: InputMaybe<UuidFilter>;
  joinedAt?: InputMaybe<DatetimeFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<ClubMembersFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<ClubMembersFilter>>;
  roleId?: InputMaybe<UuidFilter>;
  userId?: InputMaybe<UuidFilter>;
};

export type ClubMembersInsertInput = {
  accepted?: InputMaybe<Scalars['Boolean']['input']>;
  clubId?: InputMaybe<Scalars['UUID']['input']>;
  joinedAt?: InputMaybe<Scalars['Datetime']['input']>;
  roleId?: InputMaybe<Scalars['UUID']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

export type ClubMembersInsertResponse = {
  __typename?: 'ClubMembersInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<ClubMembers>;
};

export type ClubMembersOrderBy = {
  accepted?: InputMaybe<OrderByDirection>;
  clubId?: InputMaybe<OrderByDirection>;
  joinedAt?: InputMaybe<OrderByDirection>;
  roleId?: InputMaybe<OrderByDirection>;
  userId?: InputMaybe<OrderByDirection>;
};

export type ClubMembersUpdateInput = {
  accepted?: InputMaybe<Scalars['Boolean']['input']>;
  clubId?: InputMaybe<Scalars['UUID']['input']>;
  joinedAt?: InputMaybe<Scalars['Datetime']['input']>;
  roleId?: InputMaybe<Scalars['UUID']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

export type ClubMembersUpdateResponse = {
  __typename?: 'ClubMembersUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<ClubMembers>;
};

export type Clubs = Node & {
  __typename?: 'Clubs';
  absenceReportFormsCollection?: Maybe<AbsenceReportFormsConnection>;
  absenceReportRequiredReviewer?: Maybe<Scalars['UUID']['output']>;
  absenceReportSchema: Scalars['JSON']['output'];
  absenceReportsCollection?: Maybe<AbsenceReportsConnection>;
  absenceReportsStatusCollection?: Maybe<AbsenceReportsStatusConnection>;
  active: Scalars['Boolean']['output'];
  calendarEventsCollection?: Maybe<CalendarEventsConnection>;
  clubMembersCollection?: Maybe<ClubMembersConnection>;
  createdAt: Scalars['Datetime']['output'];
  createdBy?: Maybe<Scalars['UUID']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  feedbackSubmissionsCollection?: Maybe<FeedbackSubmissionsConnection>;
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


export type ClubsAbsenceReportFormsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<AbsenceReportFormsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AbsenceReportFormsOrderBy>>;
};


export type ClubsAbsenceReportsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<AbsenceReportsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AbsenceReportsOrderBy>>;
};


export type ClubsAbsenceReportsStatusCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<AbsenceReportsStatusFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AbsenceReportsStatusOrderBy>>;
};


export type ClubsCalendarEventsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<CalendarEventsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CalendarEventsOrderBy>>;
};


export type ClubsClubMembersCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<ClubMembersFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ClubMembersOrderBy>>;
};


export type ClubsFeedbackSubmissionsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<FeedbackSubmissionsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<FeedbackSubmissionsOrderBy>>;
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
  __typename?: 'ClubsConnection';
  edges: Array<ClubsEdge>;
  pageInfo: PageInfo;
};

export type ClubsDeleteResponse = {
  __typename?: 'ClubsDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Clubs>;
};

export type ClubsEdge = {
  __typename?: 'ClubsEdge';
  cursor: Scalars['String']['output'];
  node: Clubs;
};

export type ClubsFilter = {
  absenceReportRequiredReviewer?: InputMaybe<UuidFilter>;
  active?: InputMaybe<BooleanFilter>;
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<ClubsFilter>>;
  createdAt?: InputMaybe<DatetimeFilter>;
  createdBy?: InputMaybe<UuidFilter>;
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
  absenceReportRequiredReviewer?: InputMaybe<Scalars['UUID']['input']>;
  absenceReportSchema?: InputMaybe<Scalars['JSON']['input']>;
  active?: InputMaybe<Scalars['Boolean']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  createdBy?: InputMaybe<Scalars['UUID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  public?: InputMaybe<Scalars['Boolean']['input']>;
  school?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type ClubsInsertResponse = {
  __typename?: 'ClubsInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Clubs>;
};

export type ClubsOrderBy = {
  absenceReportRequiredReviewer?: InputMaybe<OrderByDirection>;
  active?: InputMaybe<OrderByDirection>;
  createdAt?: InputMaybe<OrderByDirection>;
  createdBy?: InputMaybe<OrderByDirection>;
  description?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  public?: InputMaybe<OrderByDirection>;
  school?: InputMaybe<OrderByDirection>;
  website?: InputMaybe<OrderByDirection>;
};

export type ClubsUpdateInput = {
  absenceReportRequiredReviewer?: InputMaybe<Scalars['UUID']['input']>;
  absenceReportSchema?: InputMaybe<Scalars['JSON']['input']>;
  active?: InputMaybe<Scalars['Boolean']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  createdBy?: InputMaybe<Scalars['UUID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  public?: InputMaybe<Scalars['Boolean']['input']>;
  school?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type ClubsUpdateResponse = {
  __typename?: 'ClubsUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Clubs>;
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

export type FeedbackSubmissions = Node & {
  __typename?: 'FeedbackSubmissions';
  club?: Maybe<Clubs>;
  clubId?: Maybe<Scalars['UUID']['output']>;
  createdAt: Scalars['Datetime']['output'];
  feedback: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  user?: Maybe<Profiles>;
  userId?: Maybe<Scalars['UUID']['output']>;
};

export type FeedbackSubmissionsConnection = {
  __typename?: 'FeedbackSubmissionsConnection';
  edges: Array<FeedbackSubmissionsEdge>;
  pageInfo: PageInfo;
};

export type FeedbackSubmissionsDeleteResponse = {
  __typename?: 'FeedbackSubmissionsDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<FeedbackSubmissions>;
};

export type FeedbackSubmissionsEdge = {
  __typename?: 'FeedbackSubmissionsEdge';
  cursor: Scalars['String']['output'];
  node: FeedbackSubmissions;
};

export type FeedbackSubmissionsFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<FeedbackSubmissionsFilter>>;
  clubId?: InputMaybe<UuidFilter>;
  createdAt?: InputMaybe<DatetimeFilter>;
  feedback?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<FeedbackSubmissionsFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<FeedbackSubmissionsFilter>>;
  userId?: InputMaybe<UuidFilter>;
};

export type FeedbackSubmissionsInsertInput = {
  clubId?: InputMaybe<Scalars['UUID']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  feedback?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

export type FeedbackSubmissionsInsertResponse = {
  __typename?: 'FeedbackSubmissionsInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<FeedbackSubmissions>;
};

export type FeedbackSubmissionsOrderBy = {
  clubId?: InputMaybe<OrderByDirection>;
  createdAt?: InputMaybe<OrderByDirection>;
  feedback?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  userId?: InputMaybe<OrderByDirection>;
};

export type FeedbackSubmissionsUpdateInput = {
  clubId?: InputMaybe<Scalars['UUID']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  feedback?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

export type FeedbackSubmissionsUpdateResponse = {
  __typename?: 'FeedbackSubmissionsUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<FeedbackSubmissions>;
};

export type Files = Node & {
  __typename?: 'Files';
  club?: Maybe<Clubs>;
  clubId?: Maybe<Scalars['UUID']['output']>;
  createdAt: Scalars['Datetime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  fileName: Scalars['String']['output'];
  fileSize: Scalars['BigInt']['output'];
  fileType: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  updatedAt: Scalars['Datetime']['output'];
  url: Scalars['String']['output'];
  user?: Maybe<Profiles>;
  userId?: Maybe<Scalars['UUID']['output']>;
};

export type FilesConnection = {
  __typename?: 'FilesConnection';
  edges: Array<FilesEdge>;
  pageInfo: PageInfo;
};

export type FilesDeleteResponse = {
  __typename?: 'FilesDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Files>;
};

export type FilesEdge = {
  __typename?: 'FilesEdge';
  cursor: Scalars['String']['output'];
  node: Files;
};

export type FilesFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<FilesFilter>>;
  clubId?: InputMaybe<UuidFilter>;
  createdAt?: InputMaybe<DatetimeFilter>;
  description?: InputMaybe<StringFilter>;
  fileName?: InputMaybe<StringFilter>;
  fileSize?: InputMaybe<BigIntFilter>;
  fileType?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<FilesFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<FilesFilter>>;
  updatedAt?: InputMaybe<DatetimeFilter>;
  url?: InputMaybe<StringFilter>;
  userId?: InputMaybe<UuidFilter>;
};

export type FilesInsertInput = {
  clubId?: InputMaybe<Scalars['UUID']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  fileName?: InputMaybe<Scalars['String']['input']>;
  fileSize?: InputMaybe<Scalars['BigInt']['input']>;
  fileType?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

export type FilesInsertResponse = {
  __typename?: 'FilesInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Files>;
};

export type FilesOrderBy = {
  clubId?: InputMaybe<OrderByDirection>;
  createdAt?: InputMaybe<OrderByDirection>;
  description?: InputMaybe<OrderByDirection>;
  fileName?: InputMaybe<OrderByDirection>;
  fileSize?: InputMaybe<OrderByDirection>;
  fileType?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  updatedAt?: InputMaybe<OrderByDirection>;
  url?: InputMaybe<OrderByDirection>;
  userId?: InputMaybe<OrderByDirection>;
};

export type FilesUpdateInput = {
  clubId?: InputMaybe<Scalars['UUID']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  fileName?: InputMaybe<Scalars['String']['input']>;
  fileSize?: InputMaybe<Scalars['BigInt']['input']>;
  fileType?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

export type FilesUpdateResponse = {
  __typename?: 'FilesUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Files>;
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

export type JoinedClubs = Node & {
  __typename?: 'JoinedClubs';
  absenceReportRequiredReviewer?: Maybe<Scalars['UUID']['output']>;
  absenceReportSchema?: Maybe<Scalars['JSON']['output']>;
  active?: Maybe<Scalars['Boolean']['output']>;
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  createdBy?: Maybe<Scalars['UUID']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['UUID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  public?: Maybe<Scalars['Boolean']['output']>;
  school?: Maybe<Scalars['String']['output']>;
  website?: Maybe<Scalars['String']['output']>;
};

export type JoinedClubsConnection = {
  __typename?: 'JoinedClubsConnection';
  edges: Array<JoinedClubsEdge>;
  pageInfo: PageInfo;
};

export type JoinedClubsDeleteResponse = {
  __typename?: 'JoinedClubsDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<JoinedClubs>;
};

export type JoinedClubsEdge = {
  __typename?: 'JoinedClubsEdge';
  cursor: Scalars['String']['output'];
  node: JoinedClubs;
};

export type JoinedClubsFilter = {
  absenceReportRequiredReviewer?: InputMaybe<UuidFilter>;
  active?: InputMaybe<BooleanFilter>;
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<JoinedClubsFilter>>;
  createdAt?: InputMaybe<DatetimeFilter>;
  createdBy?: InputMaybe<UuidFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<JoinedClubsFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<JoinedClubsFilter>>;
  public?: InputMaybe<BooleanFilter>;
  school?: InputMaybe<StringFilter>;
  website?: InputMaybe<StringFilter>;
};

export type JoinedClubsInsertInput = {
  absenceReportRequiredReviewer?: InputMaybe<Scalars['UUID']['input']>;
  absenceReportSchema?: InputMaybe<Scalars['JSON']['input']>;
  active?: InputMaybe<Scalars['Boolean']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  createdBy?: InputMaybe<Scalars['UUID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  public?: InputMaybe<Scalars['Boolean']['input']>;
  school?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type JoinedClubsInsertResponse = {
  __typename?: 'JoinedClubsInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<JoinedClubs>;
};

export type JoinedClubsOrderBy = {
  absenceReportRequiredReviewer?: InputMaybe<OrderByDirection>;
  active?: InputMaybe<OrderByDirection>;
  createdAt?: InputMaybe<OrderByDirection>;
  createdBy?: InputMaybe<OrderByDirection>;
  description?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  public?: InputMaybe<OrderByDirection>;
  school?: InputMaybe<OrderByDirection>;
  website?: InputMaybe<OrderByDirection>;
};

export type JoinedClubsUpdateInput = {
  absenceReportRequiredReviewer?: InputMaybe<Scalars['UUID']['input']>;
  absenceReportSchema?: InputMaybe<Scalars['JSON']['input']>;
  active?: InputMaybe<Scalars['Boolean']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  createdBy?: InputMaybe<Scalars['UUID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  public?: InputMaybe<Scalars['Boolean']['input']>;
  school?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type JoinedClubsUpdateResponse = {
  __typename?: 'JoinedClubsUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<JoinedClubs>;
};

/** The root type for creating and mutating data */
export type Mutation = {
  __typename?: 'Mutation';
  /** Deletes zero or more records from the `AbsenceReportForms` collection */
  deleteFromAbsenceReportFormsCollection: AbsenceReportFormsDeleteResponse;
  /** Deletes zero or more records from the `AbsenceReportReviews` collection */
  deleteFromAbsenceReportReviewsCollection: AbsenceReportReviewsDeleteResponse;
  /** Deletes zero or more records from the `AbsenceReports` collection */
  deleteFromAbsenceReportsCollection: AbsenceReportsDeleteResponse;
  /** Deletes zero or more records from the `AbsenceReportsStatus` collection */
  deleteFromAbsenceReportsStatusCollection: AbsenceReportsStatusDeleteResponse;
  /** Deletes zero or more records from the `CalendarEvents` collection */
  deleteFromCalendarEventsCollection: CalendarEventsDeleteResponse;
  /** Deletes zero or more records from the `ClubMembers` collection */
  deleteFromClubMembersCollection: ClubMembersDeleteResponse;
  /** Deletes zero or more records from the `Clubs` collection */
  deleteFromClubsCollection: ClubsDeleteResponse;
  /** Deletes zero or more records from the `FeedbackSubmissions` collection */
  deleteFromFeedbackSubmissionsCollection: FeedbackSubmissionsDeleteResponse;
  /** Deletes zero or more records from the `Files` collection */
  deleteFromFilesCollection: FilesDeleteResponse;
  /** Deletes zero or more records from the `JoinedClubs` collection */
  deleteFromJoinedClubsCollection: JoinedClubsDeleteResponse;
  /** Deletes zero or more records from the `Notifications` collection */
  deleteFromNotificationsCollection: NotificationsDeleteResponse;
  /** Deletes zero or more records from the `Profiles` collection */
  deleteFromProfilesCollection: ProfilesDeleteResponse;
  /** Deletes zero or more records from the `Roles` collection */
  deleteFromRolesCollection: RolesDeleteResponse;
  /** Adds one or more `AbsenceReportForms` records to the collection */
  insertIntoAbsenceReportFormsCollection?: Maybe<AbsenceReportFormsInsertResponse>;
  /** Adds one or more `AbsenceReportReviews` records to the collection */
  insertIntoAbsenceReportReviewsCollection?: Maybe<AbsenceReportReviewsInsertResponse>;
  /** Adds one or more `AbsenceReports` records to the collection */
  insertIntoAbsenceReportsCollection?: Maybe<AbsenceReportsInsertResponse>;
  /** Adds one or more `AbsenceReportsStatus` records to the collection */
  insertIntoAbsenceReportsStatusCollection?: Maybe<AbsenceReportsStatusInsertResponse>;
  /** Adds one or more `CalendarEvents` records to the collection */
  insertIntoCalendarEventsCollection?: Maybe<CalendarEventsInsertResponse>;
  /** Adds one or more `ClubMembers` records to the collection */
  insertIntoClubMembersCollection?: Maybe<ClubMembersInsertResponse>;
  /** Adds one or more `Clubs` records to the collection */
  insertIntoClubsCollection?: Maybe<ClubsInsertResponse>;
  /** Adds one or more `FeedbackSubmissions` records to the collection */
  insertIntoFeedbackSubmissionsCollection?: Maybe<FeedbackSubmissionsInsertResponse>;
  /** Adds one or more `Files` records to the collection */
  insertIntoFilesCollection?: Maybe<FilesInsertResponse>;
  /** Adds one or more `JoinedClubs` records to the collection */
  insertIntoJoinedClubsCollection?: Maybe<JoinedClubsInsertResponse>;
  /** Adds one or more `Notifications` records to the collection */
  insertIntoNotificationsCollection?: Maybe<NotificationsInsertResponse>;
  /** Adds one or more `Profiles` records to the collection */
  insertIntoProfilesCollection?: Maybe<ProfilesInsertResponse>;
  /** Adds one or more `Roles` records to the collection */
  insertIntoRolesCollection?: Maybe<RolesInsertResponse>;
  invitationsAccept?: Maybe<Scalars['Opaque']['output']>;
  invitationsCreate?: Maybe<Scalars['UUID']['output']>;
  invitationsDelete?: Maybe<Scalars['Opaque']['output']>;
  profilesLocaleGet?: Maybe<Scalars['String']['output']>;
  profilesLocaleSet?: Maybe<Scalars['Opaque']['output']>;
  /** Updates zero or more records in the `AbsenceReportForms` collection */
  updateAbsenceReportFormsCollection: AbsenceReportFormsUpdateResponse;
  /** Updates zero or more records in the `AbsenceReportReviews` collection */
  updateAbsenceReportReviewsCollection: AbsenceReportReviewsUpdateResponse;
  /** Updates zero or more records in the `AbsenceReports` collection */
  updateAbsenceReportsCollection: AbsenceReportsUpdateResponse;
  /** Updates zero or more records in the `AbsenceReportsStatus` collection */
  updateAbsenceReportsStatusCollection: AbsenceReportsStatusUpdateResponse;
  /** Updates zero or more records in the `CalendarEvents` collection */
  updateCalendarEventsCollection: CalendarEventsUpdateResponse;
  /** Updates zero or more records in the `ClubMembers` collection */
  updateClubMembersCollection: ClubMembersUpdateResponse;
  /** Updates zero or more records in the `Clubs` collection */
  updateClubsCollection: ClubsUpdateResponse;
  /** Updates zero or more records in the `FeedbackSubmissions` collection */
  updateFeedbackSubmissionsCollection: FeedbackSubmissionsUpdateResponse;
  /** Updates zero or more records in the `Files` collection */
  updateFilesCollection: FilesUpdateResponse;
  /** Updates zero or more records in the `JoinedClubs` collection */
  updateJoinedClubsCollection: JoinedClubsUpdateResponse;
  /** Updates zero or more records in the `Notifications` collection */
  updateNotificationsCollection: NotificationsUpdateResponse;
  /** Updates zero or more records in the `Profiles` collection */
  updateProfilesCollection: ProfilesUpdateResponse;
  /** Updates zero or more records in the `Roles` collection */
  updateRolesCollection: RolesUpdateResponse;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromAbsenceReportFormsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<AbsenceReportFormsFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromAbsenceReportReviewsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<AbsenceReportReviewsFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromAbsenceReportsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<AbsenceReportsFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromAbsenceReportsStatusCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<AbsenceReportsStatusFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromCalendarEventsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<CalendarEventsFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromClubMembersCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<ClubMembersFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromClubsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<ClubsFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromFeedbackSubmissionsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<FeedbackSubmissionsFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromFilesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<FilesFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromJoinedClubsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<JoinedClubsFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromNotificationsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<NotificationsFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromProfilesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<ProfilesFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromRolesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<RolesFilter>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoAbsenceReportFormsCollectionArgs = {
  objects: Array<AbsenceReportFormsInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoAbsenceReportReviewsCollectionArgs = {
  objects: Array<AbsenceReportReviewsInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoAbsenceReportsCollectionArgs = {
  objects: Array<AbsenceReportsInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoAbsenceReportsStatusCollectionArgs = {
  objects: Array<AbsenceReportsStatusInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoCalendarEventsCollectionArgs = {
  objects: Array<CalendarEventsInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoClubMembersCollectionArgs = {
  objects: Array<ClubMembersInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoClubsCollectionArgs = {
  objects: Array<ClubsInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoFeedbackSubmissionsCollectionArgs = {
  objects: Array<FeedbackSubmissionsInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoFilesCollectionArgs = {
  objects: Array<FilesInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoJoinedClubsCollectionArgs = {
  objects: Array<JoinedClubsInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoNotificationsCollectionArgs = {
  objects: Array<NotificationsInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoProfilesCollectionArgs = {
  objects: Array<ProfilesInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoRolesCollectionArgs = {
  objects: Array<RolesInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInvitationsAcceptArgs = {
  invitationId: Scalars['UUID']['input'];
};


/** The root type for creating and mutating data */
export type MutationInvitationsCreateArgs = {
  expiresAt: Scalars['Datetime']['input'];
  newClubId: Scalars['UUID']['input'];
  roleId: Scalars['UUID']['input'];
};


/** The root type for creating and mutating data */
export type MutationInvitationsDeleteArgs = {
  invitationId: Scalars['UUID']['input'];
};


/** The root type for creating and mutating data */
export type MutationProfilesLocaleSetArgs = {
  newLocale: Scalars['String']['input'];
};


/** The root type for creating and mutating data */
export type MutationUpdateAbsenceReportFormsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<AbsenceReportFormsFilter>;
  set: AbsenceReportFormsUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateAbsenceReportReviewsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<AbsenceReportReviewsFilter>;
  set: AbsenceReportReviewsUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateAbsenceReportsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<AbsenceReportsFilter>;
  set: AbsenceReportsUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateAbsenceReportsStatusCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<AbsenceReportsStatusFilter>;
  set: AbsenceReportsStatusUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateCalendarEventsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<CalendarEventsFilter>;
  set: CalendarEventsUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateClubMembersCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<ClubMembersFilter>;
  set: ClubMembersUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateClubsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<ClubsFilter>;
  set: ClubsUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateFeedbackSubmissionsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<FeedbackSubmissionsFilter>;
  set: FeedbackSubmissionsUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateFilesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<FilesFilter>;
  set: FilesUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateJoinedClubsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<JoinedClubsFilter>;
  set: JoinedClubsUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateNotificationsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<NotificationsFilter>;
  set: NotificationsUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateProfilesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<ProfilesFilter>;
  set: ProfilesUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateRolesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<RolesFilter>;
  set: RolesUpdateInput;
};

export type Node = {
  /** Retrieves a record by `ID` */
  nodeId: Scalars['ID']['output'];
};

export type Notifications = Node & {
  __typename?: 'Notifications';
  club?: Maybe<Clubs>;
  clubId?: Maybe<Scalars['UUID']['output']>;
  content: Scalars['String']['output'];
  createdAt: Scalars['Datetime']['output'];
  id: Scalars['UUID']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  read: Scalars['Boolean']['output'];
  user?: Maybe<Profiles>;
  userId?: Maybe<Scalars['UUID']['output']>;
};

export type NotificationsConnection = {
  __typename?: 'NotificationsConnection';
  edges: Array<NotificationsEdge>;
  pageInfo: PageInfo;
};

export type NotificationsDeleteResponse = {
  __typename?: 'NotificationsDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Notifications>;
};

export type NotificationsEdge = {
  __typename?: 'NotificationsEdge';
  cursor: Scalars['String']['output'];
  node: Notifications;
};

export type NotificationsFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<NotificationsFilter>>;
  clubId?: InputMaybe<UuidFilter>;
  content?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<NotificationsFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<NotificationsFilter>>;
  read?: InputMaybe<BooleanFilter>;
  userId?: InputMaybe<UuidFilter>;
};

export type NotificationsInsertInput = {
  clubId?: InputMaybe<Scalars['UUID']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  read?: InputMaybe<Scalars['Boolean']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

export type NotificationsInsertResponse = {
  __typename?: 'NotificationsInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Notifications>;
};

export type NotificationsOrderBy = {
  clubId?: InputMaybe<OrderByDirection>;
  content?: InputMaybe<OrderByDirection>;
  createdAt?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  read?: InputMaybe<OrderByDirection>;
  userId?: InputMaybe<OrderByDirection>;
};

export type NotificationsUpdateInput = {
  clubId?: InputMaybe<Scalars['UUID']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  read?: InputMaybe<Scalars['Boolean']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

export type NotificationsUpdateResponse = {
  __typename?: 'NotificationsUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Notifications>;
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

export type Profiles = Node & {
  __typename?: 'Profiles';
  absenceReportReviewsCollection?: Maybe<AbsenceReportReviewsConnection>;
  absenceReportsCollection?: Maybe<AbsenceReportsConnection>;
  absenceReportsStatusCollection?: Maybe<AbsenceReportsStatusConnection>;
  avatarUrl?: Maybe<Scalars['String']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  calendarEventsCollection?: Maybe<CalendarEventsConnection>;
  clubMembersCollection?: Maybe<ClubMembersConnection>;
  clubsCollection?: Maybe<ClubsConnection>;
  createdAt: Scalars['Datetime']['output'];
  feedbackSubmissionsCollection?: Maybe<FeedbackSubmissionsConnection>;
  filesCollection?: Maybe<FilesConnection>;
  fullName: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  locale?: Maybe<Scalars['String']['output']>;
  nickname?: Maybe<Scalars['String']['output']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  notificationsCollection?: Maybe<NotificationsConnection>;
  privateProfile: Scalars['Boolean']['output'];
  pushNotificationsPreference: Scalars['JSON']['output'];
  school?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Datetime']['output'];
};


export type ProfilesAbsenceReportReviewsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<AbsenceReportReviewsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AbsenceReportReviewsOrderBy>>;
};


export type ProfilesAbsenceReportsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<AbsenceReportsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AbsenceReportsOrderBy>>;
};


export type ProfilesAbsenceReportsStatusCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<AbsenceReportsStatusFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AbsenceReportsStatusOrderBy>>;
};


export type ProfilesCalendarEventsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<CalendarEventsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CalendarEventsOrderBy>>;
};


export type ProfilesClubMembersCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<ClubMembersFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ClubMembersOrderBy>>;
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


export type ProfilesFeedbackSubmissionsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<FeedbackSubmissionsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<FeedbackSubmissionsOrderBy>>;
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
  __typename?: 'ProfilesConnection';
  edges: Array<ProfilesEdge>;
  pageInfo: PageInfo;
};

export type ProfilesDeleteResponse = {
  __typename?: 'ProfilesDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Profiles>;
};

export type ProfilesEdge = {
  __typename?: 'ProfilesEdge';
  cursor: Scalars['String']['output'];
  node: Profiles;
};

export type ProfilesFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<ProfilesFilter>>;
  avatarUrl?: InputMaybe<StringFilter>;
  bio?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DatetimeFilter>;
  fullName?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  locale?: InputMaybe<StringFilter>;
  nickname?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<ProfilesFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<ProfilesFilter>>;
  privateProfile?: InputMaybe<BooleanFilter>;
  school?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DatetimeFilter>;
};

export type ProfilesInsertInput = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>;
  bio?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  nickname?: InputMaybe<Scalars['String']['input']>;
  privateProfile?: InputMaybe<Scalars['Boolean']['input']>;
  pushNotificationsPreference?: InputMaybe<Scalars['JSON']['input']>;
  school?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

export type ProfilesInsertResponse = {
  __typename?: 'ProfilesInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Profiles>;
};

export type ProfilesOrderBy = {
  avatarUrl?: InputMaybe<OrderByDirection>;
  bio?: InputMaybe<OrderByDirection>;
  createdAt?: InputMaybe<OrderByDirection>;
  fullName?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  locale?: InputMaybe<OrderByDirection>;
  nickname?: InputMaybe<OrderByDirection>;
  privateProfile?: InputMaybe<OrderByDirection>;
  school?: InputMaybe<OrderByDirection>;
  updatedAt?: InputMaybe<OrderByDirection>;
};

export type ProfilesUpdateInput = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>;
  bio?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  nickname?: InputMaybe<Scalars['String']['input']>;
  privateProfile?: InputMaybe<Scalars['Boolean']['input']>;
  pushNotificationsPreference?: InputMaybe<Scalars['JSON']['input']>;
  school?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

export type ProfilesUpdateResponse = {
  __typename?: 'ProfilesUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Profiles>;
};

/** The root type for querying data */
export type Query = {
  __typename?: 'Query';
  /** A pagable collection of type `AbsenceReportForms` */
  absenceReportFormsCollection?: Maybe<AbsenceReportFormsConnection>;
  /** A pagable collection of type `AbsenceReportReviews` */
  absenceReportReviewsCollection?: Maybe<AbsenceReportReviewsConnection>;
  /** A pagable collection of type `AbsenceReports` */
  absenceReportsCollection?: Maybe<AbsenceReportsConnection>;
  absenceReportsIsApproved?: Maybe<Scalars['Boolean']['output']>;
  /** A pagable collection of type `AbsenceReportsStatus` */
  absenceReportsStatusCollection?: Maybe<AbsenceReportsStatusConnection>;
  /** A pagable collection of type `CalendarEvents` */
  calendarEventsCollection?: Maybe<CalendarEventsConnection>;
  /** A pagable collection of type `ClubMembers` */
  clubMembersCollection?: Maybe<ClubMembersConnection>;
  /** A pagable collection of type `Clubs` */
  clubsCollection?: Maybe<ClubsConnection>;
  /** A pagable collection of type `FeedbackSubmissions` */
  feedbackSubmissionsCollection?: Maybe<FeedbackSubmissionsConnection>;
  /** A pagable collection of type `Files` */
  filesCollection?: Maybe<FilesConnection>;
  /** A pagable collection of type `JoinedClubs` */
  joinedClubsCollection?: Maybe<JoinedClubsConnection>;
  /** Retrieve a record by its `ID` */
  node?: Maybe<Node>;
  /** A pagable collection of type `Notifications` */
  notificationsCollection?: Maybe<NotificationsConnection>;
  /** A pagable collection of type `Profiles` */
  profilesCollection?: Maybe<ProfilesConnection>;
  /** A pagable collection of type `Roles` */
  rolesCollection?: Maybe<RolesConnection>;
  userHasClubPermission?: Maybe<Scalars['Boolean']['output']>;
  userIsClubMember?: Maybe<Scalars['Boolean']['output']>;
};


/** The root type for querying data */
export type QueryAbsenceReportFormsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<AbsenceReportFormsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AbsenceReportFormsOrderBy>>;
};


/** The root type for querying data */
export type QueryAbsenceReportReviewsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<AbsenceReportReviewsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AbsenceReportReviewsOrderBy>>;
};


/** The root type for querying data */
export type QueryAbsenceReportsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<AbsenceReportsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AbsenceReportsOrderBy>>;
};


/** The root type for querying data */
export type QueryAbsenceReportsIsApprovedArgs = {
  pReportId: Scalars['UUID']['input'];
};


/** The root type for querying data */
export type QueryAbsenceReportsStatusCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<AbsenceReportsStatusFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AbsenceReportsStatusOrderBy>>;
};


/** The root type for querying data */
export type QueryCalendarEventsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<CalendarEventsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CalendarEventsOrderBy>>;
};


/** The root type for querying data */
export type QueryClubMembersCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<ClubMembersFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ClubMembersOrderBy>>;
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
export type QueryFeedbackSubmissionsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<FeedbackSubmissionsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<FeedbackSubmissionsOrderBy>>;
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
export type QueryJoinedClubsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<JoinedClubsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<JoinedClubsOrderBy>>;
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
export type QueryUserHasClubPermissionArgs = {
  pClubId: Scalars['UUID']['input'];
  pPermission: Scalars['String']['input'];
};


/** The root type for querying data */
export type QueryUserIsClubMemberArgs = {
  pClubId: Scalars['UUID']['input'];
};

export type Roles = Node & {
  __typename?: 'Roles';
  absenceReportApprovalRequired: Scalars['Boolean']['output'];
  absenceReportForm?: Maybe<Scalars['UUID']['output']>;
  absenceReportForms?: Maybe<AbsenceReportForms>;
  absenceReportReviewerRole?: Maybe<Scalars['UUID']['output']>;
  absenceReportsCollection?: Maybe<AbsenceReportsConnection>;
  club?: Maybe<Clubs>;
  clubId?: Maybe<Scalars['UUID']['output']>;
  clubMembersCollection?: Maybe<ClubMembersConnection>;
  createdAt: Scalars['Datetime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  permissions: Scalars['JSON']['output'];
  roles?: Maybe<Roles>;
  rolesCollection?: Maybe<RolesConnection>;
  updatedAt: Scalars['Datetime']['output'];
};


export type RolesAbsenceReportsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<AbsenceReportsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AbsenceReportsOrderBy>>;
};


export type RolesClubMembersCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<ClubMembersFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ClubMembersOrderBy>>;
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
  __typename?: 'RolesConnection';
  edges: Array<RolesEdge>;
  pageInfo: PageInfo;
};

export type RolesDeleteResponse = {
  __typename?: 'RolesDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Roles>;
};

export type RolesEdge = {
  __typename?: 'RolesEdge';
  cursor: Scalars['String']['output'];
  node: Roles;
};

export type RolesFilter = {
  absenceReportApprovalRequired?: InputMaybe<BooleanFilter>;
  absenceReportForm?: InputMaybe<UuidFilter>;
  absenceReportReviewerRole?: InputMaybe<UuidFilter>;
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<RolesFilter>>;
  clubId?: InputMaybe<UuidFilter>;
  createdAt?: InputMaybe<DatetimeFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<RolesFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<RolesFilter>>;
  updatedAt?: InputMaybe<DatetimeFilter>;
};

export type RolesInsertInput = {
  absenceReportApprovalRequired?: InputMaybe<Scalars['Boolean']['input']>;
  absenceReportForm?: InputMaybe<Scalars['UUID']['input']>;
  absenceReportReviewerRole?: InputMaybe<Scalars['UUID']['input']>;
  clubId?: InputMaybe<Scalars['UUID']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  permissions?: InputMaybe<Scalars['JSON']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

export type RolesInsertResponse = {
  __typename?: 'RolesInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Roles>;
};

export type RolesOrderBy = {
  absenceReportApprovalRequired?: InputMaybe<OrderByDirection>;
  absenceReportForm?: InputMaybe<OrderByDirection>;
  absenceReportReviewerRole?: InputMaybe<OrderByDirection>;
  clubId?: InputMaybe<OrderByDirection>;
  createdAt?: InputMaybe<OrderByDirection>;
  description?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  updatedAt?: InputMaybe<OrderByDirection>;
};

export type RolesUpdateInput = {
  absenceReportApprovalRequired?: InputMaybe<Scalars['Boolean']['input']>;
  absenceReportForm?: InputMaybe<Scalars['UUID']['input']>;
  absenceReportReviewerRole?: InputMaybe<Scalars['UUID']['input']>;
  clubId?: InputMaybe<Scalars['UUID']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  permissions?: InputMaybe<Scalars['JSON']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

export type RolesUpdateResponse = {
  __typename?: 'RolesUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Roles>;
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

export type AbsenceReportAllDetailQueryVariables = Exact<{
  reportId: Scalars['UUID']['input'];
}>;


export type AbsenceReportAllDetailQuery = { __typename: 'Query', absenceReportsCollection?: { __typename: 'AbsenceReportsConnection', edges: Array<{ __typename: 'AbsenceReportsEdge', node: (
        { __typename: 'AbsenceReports' }
        & { ' $fragmentRefs'?: { 'AbsenceReportDetailFragment': AbsenceReportDetailFragment } }
      ) }> } | null };

export type AllAbsenceReportsQueryVariables = Exact<{
  clubId: Scalars['UUID']['input'];
}>;


export type AllAbsenceReportsQuery = { __typename: 'Query', absenceReportsCollection?: { __typename: 'AbsenceReportsConnection', edges: Array<{ __typename: 'AbsenceReportsEdge', node: (
        { __typename: 'AbsenceReports', id: string }
        & { ' $fragmentRefs'?: { 'AbsenceReportCardFragment': AbsenceReportCardFragment } }
      ) }> } | null };

export type AbsenceReportMyDetailQueryVariables = Exact<{
  reportId: Scalars['UUID']['input'];
}>;


export type AbsenceReportMyDetailQuery = { __typename: 'Query', absenceReportsCollection?: { __typename: 'AbsenceReportsConnection', edges: Array<{ __typename: 'AbsenceReportsEdge', node: (
        { __typename: 'AbsenceReports' }
        & { ' $fragmentRefs'?: { 'AbsenceReportDetailFragment': AbsenceReportDetailFragment } }
      ) }> } | null };

export type MyAbsenceReportsQueryVariables = Exact<{
  clubId: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
}>;


export type MyAbsenceReportsQuery = { __typename: 'Query', absenceReportsCollection?: { __typename: 'AbsenceReportsConnection', edges: Array<{ __typename: 'AbsenceReportsEdge', node: (
        { __typename: 'AbsenceReports', id: string }
        & { ' $fragmentRefs'?: { 'AbsenceReportCardFragment': AbsenceReportCardFragment } }
      ) }> } | null };

export type AbsenceReportDetailFragment = { __typename: 'AbsenceReports', id: string, date?: string | null, createdAt: string, data: string, assignedToRole?: { __typename: 'Roles', name: string } | null, form?: { __typename: 'AbsenceReportForms', id: string, name: string, questions: string } | null, reviews?: { __typename: 'AbsenceReportReviewsConnection', edges: Array<{ __typename: 'AbsenceReportReviewsEdge', node: { __typename: 'AbsenceReportReviews', id: string, createdAt: string, accepted: boolean, comments?: string | null, reviewer?: { __typename: 'Profiles', fullName: string } | null } }> } | null, event?: { __typename: 'CalendarEvents', id: string, title: string, startTime: string, endTime: string } | null, user?: { __typename: 'Profiles', fullName: string, avatarUrl?: string | null } | null } & { ' $fragmentName'?: 'AbsenceReportDetailFragment' };

export type CalendarDayQueryVariables = Exact<{
  clubId: Scalars['UUID']['input'];
  date: Scalars['Date']['input'];
  startDate: Scalars['Datetime']['input'];
  endDate: Scalars['Datetime']['input'];
}>;


export type CalendarDayQuery = { __typename: 'Query', calendarEventsCollection?: { __typename: 'CalendarEventsConnection', edges: Array<{ __typename: 'CalendarEventsEdge', node: (
        { __typename: 'CalendarEvents', id: string, title: string, startTime: string, endTime: string, description?: string | null, location?: string | null }
        & { ' $fragmentRefs'?: { 'EventDetailDrawerFragment': EventDetailDrawerFragment } }
      ) }> } | null, absenceReportsCollection?: { __typename: 'AbsenceReportsConnection', edges: Array<{ __typename: 'AbsenceReportsEdge', node: (
        { __typename: 'AbsenceReports', id: string }
        & { ' $fragmentRefs'?: { 'AbsenceReportCardFragment': AbsenceReportCardFragment } }
      ) }> } | null };

export type EventDetailDrawerFragment = { __typename: 'CalendarEvents', id: string, title: string, startTime: string, endTime: string, description?: string | null, location?: string | null } & { ' $fragmentName'?: 'EventDetailDrawerFragment' };

export type JoinedClubsQueryVariables = Exact<{
  me: Scalars['UUID']['input'];
}>;


export type JoinedClubsQuery = { __typename: 'Query', clubMembersCollection?: { __typename: 'ClubMembersConnection', edges: Array<{ __typename: 'ClubMembersEdge', node: { __typename: 'ClubMembers', club?: (
          { __typename: 'Clubs', nodeId: string }
          & { ' $fragmentRefs'?: { 'ClubCardFragment': ClubCardFragment } }
        ) | null } }> } | null };

export type UserQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type UserQuery = { __typename: 'Query', clubMembersCollection?: { __typename: 'ClubMembersConnection', edges: Array<{ __typename: 'ClubMembersEdge', node: { __typename: 'ClubMembers', club?: (
          { __typename: 'Clubs', nodeId: string }
          & { ' $fragmentRefs'?: { 'ClubCardFragment': ClubCardFragment } }
        ) | null } }> } | null };

export type MembersManagerQueryVariables = Exact<{
  clubId: Scalars['UUID']['input'];
}>;


export type MembersManagerQuery = { __typename: 'Query', clubMembersCollection?: { __typename: 'ClubMembersConnection', edges: Array<{ __typename: 'ClubMembersEdge', node: { __typename: 'ClubMembers', userId: string, user?: { __typename: 'Profiles', fullName: string, nickname?: string | null, avatarUrl?: string | null } | null, role?: { __typename: 'Roles', name: string, id: string } | null } }> } | null, rolesCollection?: { __typename: 'RolesConnection', edges: Array<{ __typename: 'RolesEdge', node: { __typename: 'Roles', id: string, name: string } }> } | null };

export type ChangeMemberRoleMutationVariables = Exact<{
  clubId: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
  roleId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type ChangeMemberRoleMutation = { __typename: 'Mutation', updateClubMembersCollection: { __typename: 'ClubMembersUpdateResponse', affectedCount: number } };

export type RemoveMemberMutationVariables = Exact<{
  clubId: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
}>;


export type RemoveMemberMutation = { __typename: 'Mutation', deleteFromClubMembersCollection: { __typename: 'ClubMembersDeleteResponse', affectedCount: number } };

export type AbsenceReportCardFragment = { __typename: 'AbsenceReports', id: string, date?: string | null, createdAt: string, assignedToRole?: { __typename: 'Roles', name: string } | null, reviews?: { __typename: 'AbsenceReportReviewsConnection', edges: Array<{ __typename: 'AbsenceReportReviewsEdge', node: { __typename: 'AbsenceReportReviews', id: string } }> } | null, event?: { __typename: 'CalendarEvents', id: string, title: string, startTime: string, endTime: string } | null, user?: { __typename: 'Profiles', fullName: string, avatarUrl?: string | null } | null } & { ' $fragmentName'?: 'AbsenceReportCardFragment' };

export type ClubCardFragment = { __typename: 'Clubs', id: string, name: string, school?: string | null, description?: string | null } & { ' $fragmentName'?: 'ClubCardFragment' };

export const AbsenceReportDetailFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AbsenceReportDetail"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AbsenceReports"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","alias":{"kind":"Name","value":"assignedToRole"},"name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"form"},"name":{"kind":"Name","value":"form"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"questions"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"reviews"},"name":{"kind":"Name","value":"absenceReportReviewsCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"accepted"}},{"kind":"Field","name":{"kind":"Name","value":"comments"}},{"kind":"Field","name":{"kind":"Name","value":"reviewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"event"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}}]}}]} as unknown as DocumentNode<AbsenceReportDetailFragment, unknown>;
export const EventDetailDrawerFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventDetailDrawer"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CalendarEvents"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"location"}}]}}]} as unknown as DocumentNode<EventDetailDrawerFragment, unknown>;
export const AbsenceReportCardFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AbsenceReportCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AbsenceReports"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","alias":{"kind":"Name","value":"assignedToRole"},"name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"reviews"},"name":{"kind":"Name","value":"absenceReportReviewsCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"event"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}}]}}]} as unknown as DocumentNode<AbsenceReportCardFragment, unknown>;
export const ClubCardFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ClubCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Clubs"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"school"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<ClubCardFragment, unknown>;
export const AbsenceReportAllDetailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AbsenceReportAllDetail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"reportId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"absenceReportsCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"reportId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AbsenceReportDetail"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AbsenceReportDetail"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AbsenceReports"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","alias":{"kind":"Name","value":"assignedToRole"},"name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"form"},"name":{"kind":"Name","value":"form"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"questions"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"reviews"},"name":{"kind":"Name","value":"absenceReportReviewsCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"accepted"}},{"kind":"Field","name":{"kind":"Name","value":"comments"}},{"kind":"Field","name":{"kind":"Name","value":"reviewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"event"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}}]}}]} as unknown as DocumentNode<AbsenceReportAllDetailQuery, AbsenceReportAllDetailQueryVariables>;
export const AllAbsenceReportsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllAbsenceReports"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"clubId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"absenceReportsCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"clubId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"clubId"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"createdAt"},"value":{"kind":"EnumValue","value":"DescNullsFirst"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"IntValue","value":"0"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AbsenceReportCard"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AbsenceReportCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AbsenceReports"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","alias":{"kind":"Name","value":"assignedToRole"},"name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"reviews"},"name":{"kind":"Name","value":"absenceReportReviewsCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"event"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}}]}}]} as unknown as DocumentNode<AllAbsenceReportsQuery, AllAbsenceReportsQueryVariables>;
export const AbsenceReportMyDetailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AbsenceReportMyDetail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"reportId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"absenceReportsCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"reportId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AbsenceReportDetail"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AbsenceReportDetail"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AbsenceReports"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","alias":{"kind":"Name","value":"assignedToRole"},"name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"form"},"name":{"kind":"Name","value":"form"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"questions"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"reviews"},"name":{"kind":"Name","value":"absenceReportReviewsCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"accepted"}},{"kind":"Field","name":{"kind":"Name","value":"comments"}},{"kind":"Field","name":{"kind":"Name","value":"reviewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"event"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}}]}}]} as unknown as DocumentNode<AbsenceReportMyDetailQuery, AbsenceReportMyDetailQueryVariables>;
export const MyAbsenceReportsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MyAbsenceReports"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"clubId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"absenceReportsCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"clubId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"clubId"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"userId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"createdAt"},"value":{"kind":"EnumValue","value":"DescNullsFirst"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"IntValue","value":"0"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AbsenceReportCard"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AbsenceReportCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AbsenceReports"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","alias":{"kind":"Name","value":"assignedToRole"},"name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"reviews"},"name":{"kind":"Name","value":"absenceReportReviewsCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"event"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}}]}}]} as unknown as DocumentNode<MyAbsenceReportsQuery, MyAbsenceReportsQueryVariables>;
export const CalendarDayDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CalendarDay"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"clubId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Datetime"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Datetime"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"calendarEventsCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"clubId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"clubId"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"startTime"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"gte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"endTime"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"lte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"startTime"},"value":{"kind":"EnumValue","value":"AscNullsLast"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventDetailDrawer"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"absenceReportsCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"clubId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"clubId"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"date"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AbsenceReportCard"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventDetailDrawer"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CalendarEvents"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"location"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AbsenceReportCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AbsenceReports"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","alias":{"kind":"Name","value":"assignedToRole"},"name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"reviews"},"name":{"kind":"Name","value":"absenceReportReviewsCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"event"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}}]}}]} as unknown as DocumentNode<CalendarDayQuery, CalendarDayQueryVariables>;
export const JoinedClubsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"JoinedClubs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"me"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"clubMembersCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"me"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"club"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"nodeId"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ClubCard"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ClubCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Clubs"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"school"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<JoinedClubsQuery, JoinedClubsQueryVariables>;
export const UserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"User"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"clubMembersCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"club"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"nodeId"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ClubCard"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ClubCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Clubs"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"school"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<UserQuery, UserQueryVariables>;
export const MembersManagerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MembersManager"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"clubId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"clubMembersCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"joinedAt"},"value":{"kind":"EnumValue","value":"DescNullsLast"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"100"}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"clubId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"clubId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"rolesCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"AscNullsLast"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"100"}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"clubId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"clubId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<MembersManagerQuery, MembersManagerQueryVariables>;
export const ChangeMemberRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeMemberRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"clubId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roleId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"updateClubMembersCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"set"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"roleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roleId"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"clubId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"clubId"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"atMost"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"affectedCount"}}]}}]}}]} as unknown as DocumentNode<ChangeMemberRoleMutation, ChangeMemberRoleMutationVariables>;
export const RemoveMemberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveMember"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"clubId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"deleteFromClubMembersCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"clubId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"clubId"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"atMost"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"affectedCount"}}]}}]}}]} as unknown as DocumentNode<RemoveMemberMutation, RemoveMemberMutationVariables>;