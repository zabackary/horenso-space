import type { CodegenConfig } from "@graphql-codegen/cli";
import { addTypenameSelectionDocumentTransform } from "@graphql-codegen/client-preset";

const config: CodegenConfig = {
  schema: "http://localhost:54321/graphql/v1",
  documents: "src/**/*.tsx",
  overwrite: true,
  generates: {
    "src/gql/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
      },
      documentTransforms: [addTypenameSelectionDocumentTransform],
      plugins: [],
      config: {
        scalars: {
          UUID: "string",
          Date: "string",
          Time: "string",
          Datetime: "string",
          JSON: "string",
          BigInt: "string",
          BigFloat: "string",
          Opaque: "any",
        },
      },
    },
  },
  hooks: {},
};

export default config;
