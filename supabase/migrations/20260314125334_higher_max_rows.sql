SET ROLE "postgres";
COMMENT ON SCHEMA public IS '
@graphql({
  "inflect_names": true,
  "max_rows": 100
})
';
