create extension if not exists moddatetime schema "extensions";

create extension if not exists pg_jsonschema schema "extensions";

create schema if not exists private;

comment on schema public is e'@graphql({"inflect_names": true})';

