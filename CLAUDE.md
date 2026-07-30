# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Horenso Space is a club management platform (clubs, members, absence reports, calendars, permissions) built with Next.js 15 (App Router) + Supabase (PostgreSQL + Auth + RLS).

UI is built with **Radix UI Themes** + CSS Modules. Do not use Tailwind or global CSS — this is a hard project convention.

## Commands

```bash
# Start dev server (Turbopack + lingui watch + GraphQL codegen watch, all concurrently)
pnpm dev

# Production build / start
pnpm build
pnpm start

# Lint (Biome) and format
pnpm lint
pnpm format

# Type-check only (no emit)
pnpm lint-types

# Regenerate Supabase TypeScript types from the local DB into src/@types/database.types.ts
# (requires local Supabase running, e.g. `supabase start`)
pnpm gen-types

# Regenerate GraphQL types/hooks from src/**/*.tsx `gql(...)` tags into src/gql/
# (requires local Supabase GraphQL endpoint at http://localhost:54321/graphql/v1; see tools/codegen.ts)
pnpm gen-graphql
pnpm gen-graphql --watch

# Extract/update i18n message catalogs (src/locales/{locale}.po) after adding <Trans> / t`` usage
pnpm lingui:extract
pnpm lingui:watch
```

There is no test suite configured in this repo (no test runner in `package.json`). Verify changes via `pnpm lint-types`, `pnpm lint`, and manual testing against a local Supabase instance.

The Nix flake (`flake.nix` + `.envrc`, direnv) provisions Node 24, pnpm, and the Supabase CLI — use it if available, otherwise ensure those tools are installed manually.

## Architecture

### Data layer: two parallel access patterns

The app talks to Supabase through **two different mechanisms** depending on the call site — know which one a given file uses before editing it:

1. **Supabase JS client** (`@supabase/supabase-js`) for typed REST/RPC-style queries and auth, using the schema types generated into `src/@types/database.types.ts`.
   - Server: `createClient()` from `@/lib/supabase/server` — creates a **new instance per function call** (never store/reuse a server client across requests).
   - Client (browser): `createClient()` from `@/lib/supabase/client`.
   - Session refresh: `updateSession()` in `@/lib/supabase/middleware.ts`, invoked from the request-level entry point at `src/proxy.ts` (Next.js 16 renamed `middleware.ts` to `proxy.ts`; this is also where the maintenance-mode rewrite lives, gated by `MAINTENANCE` in `src/maintainance.ts`).
2. **GraphQL via Apollo Client**, against Supabase's auto-generated `graphql-v1` endpoint (`pg_graphql`), for components that need richer relational queries. Query documents are written inline as `gql(...)` tagged templates in `.tsx` files; `pnpm gen-graphql` (graphql-code-generator, config in `tools/codegen.ts`) reads those tags and regenerates typed documents/hooks into `src/gql/` (this generated output **is committed to git**, so keep it in sync after adding/editing queries). Apollo setup: `src/lib/apollo/client.tsx` (client provider), `server.ts` (RSC), `shared.ts` (shared client factory).

When adding a new data-fetching call, match whichever pattern the surrounding feature already uses rather than introducing a third approach.

### Auth & permissions

- Server Actions in `src/actions/auth.ts` handle sign-out etc.; always call `revalidateRoot()` (`revalidatePath("/", "layout")`) after auth state changes so server components re-render with fresh session state.
- `getProfile(supabase, signal?)` in `src/lib/auth/getProfile.ts` fetches the current user's profile row.
- `getPermissionsForClub(supabase, clubId, signal?)` in `src/lib/auth/getPermissionsForClub.ts` returns the caller's `{ permissions, roleName, roleId }` for a given club — permissions come back as a flat array of enabled permission-name strings (already filtered from the JSONB booleans).
- Permission flags (`canWriteFiles`, `canReadFiles`, `canWriteOwnReport`, `canReadAllReports`, `canWriteReportReview`, `canDeleteOwnReport`, `canDeleteAllReports`, `canWriteCalendar`, `canReadCalendar`, `canManageClub`) are defined by JSON Schema at `supabase/schemas/public/permissions-schema.json` and stored as JSONB on `roles.permissions`. Keep that schema, `supabase/schemas/public/roles.sql`, and any TypeScript permission checks in sync when changing permissions.
- Row Level Security is enabled on all public tables — don't try to work around RLS from application code; fix policies in the schema instead.

### Database schema (Supabase)

- `supabase/schemas/` is the **declarative source of truth** for the DB (organized by schema: `public/`, `private/`, `functions/`, `views/`), edited directly.
- `supabase/migrations/` is the linear history of applied migrations (many are iterative fixes to prior migrations — e.g. multiple `fix_create_invitation_*` files — reflecting how schema changes actually shipped; don't assume the latest-named migration for a feature is the only one that touches it).
- After changing files under `supabase/schemas/`, regenerate types with `pnpm gen-types` and produce a migration via the Supabase CLI's schema diff workflow before committing.

### i18n

- Lingui (`@lingui/*`), locales `en` (source), `ja`, `pseudo` — configured in `lingui.config.ts`. Message catalogs live in `src/locales/`.
- `src/lib/i18n/i18n.ts` loads compiled `.po` catalogs into per-locale `I18n` instances server-side; `getRequestLocale.ts` resolves the request's locale; `LinguiClientProvider.tsx` wires it into client components.
- Run `pnpm lingui:extract` after adding new translatable strings so catalogs stay current.

### Docs content

- `content/docs/<lang>/*.md` are Markdown files with YAML frontmatter (`title`, `publishDate`, `author`) rendered under `/docs/<lang>/...`; `index.md` is the locale landing page. Routed by `src/app/docs/[lang]/[[...slug]]/page.tsx`.

### Component/route organization

- `src/app/` — Next.js App Router pages/layouts. Notable route groups: `app/app/[id]/...` (per-club protected pages: calendar, absences, config), `app/auth/...` (login/sign-up/password), `app/docs/...`.
- `src/components/` — client components (forms, auth, club-config); `src/components/ui/` — shared/reusable UI components.
- `src/lib/` — non-UI logic grouped by domain (`auth/`, `supabase/`, `apollo/`, `i18n/`, `absences/`, `calendar/`, `docs/`).
- `src/@types/database.types.ts` — generated, do not hand-edit; regenerate via `pnpm gen-types`.

### Error monitoring

Sentry is wired via `@sentry/nextjs` (`sentry.server.config.ts`, `sentry.edge.config.ts`, and the `withSentryConfig` wrapper in `next.config.ts`).

## Code conventions

- **Styling**: CSS Modules (`.module.css`) co-located with their component; Radix Themes is the primary UI system. Prefer Radix layout primitives (`Flex`, `Grid`, `Box`) over raw HTML elements or custom CSS for layout.
- **Forms**: client components own form UI/local state (`isLoading` booleans, Radix `Callout` for errors); Server Actions own the actual mutation/auth logic.
- Biome (not ESLint/Prettier) is the linter/formatter — config in `biome.json` (Next + React rule domains enabled, import organization on).
- Path alias `@/*` maps to `src/*` (see `tsconfig.json`).
