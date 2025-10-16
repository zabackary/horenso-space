# Horenso Space - AI Coding Guidelines

## Project Overview

Club management platform built with Next.js 15 + Supabase. Manages clubs, members, absence reports, and permissions.

## Architecture & Technology Stack

### Core Technologies

- **Framework**: Next.js 15 (App Router) with TypeScript
- **Database**: Supabase (PostgreSQL + Auth + RLS)
- **UI**: Radix UI Themes + CSS Modules
- **Tooling**: Biome (linting/formatting), Turbopack (dev server)

### Key Architectural Patterns

#### Supabase Client Pattern

- **Server**: Use `createClient()` from `@/lib/supabase/server` - creates new instance per function call
- **Client**: Use `createClient()` from `@/lib/supabase/client` - browser-only
- **Middleware**: Auth session management via `@/lib/supabase/middleware`
- **Types**: Auto-generated from schema in `src/@types/database.types.ts`

```typescript
// Server components
const supabase = await createClient();

// Client components
const supabase = createClient();
```

#### Authentication Flow

- Server Actions in `src/actions/auth.ts` handle auth operations
- Profile data retrieved via `getProfile()` from `@/lib/auth/getProfile.ts`
- Client forms handle UI state, server actions handle auth logic
- Always call `revalidateRoot()` after auth state changes

#### Component Organization

- **Forms**: Client components in `src/components/` (e.g., `login-form.tsx`)
- **UI Components**: Reusable in `src/components/ui/` (e.g., `fullscreen-card.tsx`)
- **Pages**: Server components in `src/app/` following App Router structure

## Database Schema & Patterns

### Core Entities

- **Clubs**: Multi-tenant units with custom schemas and permissions
- **Profiles**: User data (auto-created via trigger)
- **Roles**: JSONB permissions system with schema validation
- **Club Members**: Junction table with role-based access

### Permission System

- Permissions stored as JSONB in `roles.permissions`
- Schema defined in `supabase/schemas/public/permissions-schema.json`
- Examples: `canWriteFiles`, `canReadAllReports`, `canManageMembers`

### Schema Management

```bash
# Generate TypeScript types from Supabase schema
pnpm gen-types
```

## Development Workflows

### Essential Commands

```bash
# Development (uses Turbopack)
pnpm dev

# Database type generation
pnpm gen-types

# Linting & formatting (Biome)
pnpm lint
pnpm format
```

### Database Development

- Local Supabase via `supabase/` directory
- Migrations in `supabase/migrations/`
- Schema files in `supabase/schemas/` (organized by schema/table)
- Use `@postgrestools/postgrestools` for enhanced PostgreSQL development

## Code Conventions

### Styling

- **CSS Modules**: `.module.css` files co-located with components
- **Radix Themes**: Primary UI system, avoid custom CSS where possible
- **Fonts**: Japanese support via Noto Sans JP, decorative fonts for branding

### TypeScript Patterns

- Strict TypeScript configuration
- Database types auto-generated, imported from `@/@types/database.types`
- Interface definitions for complex data (see `Profile` in `getProfile.ts`)

### File Structure Conventions

```
src/
├── @types/           # Generated database types
├── actions/          # Server Actions
├── app/             # Next.js App Router pages
│   ├── auth/        # Authentication pages
│   └── app/         # Protected app pages
├── components/      # React components
│   └── ui/          # Reusable UI components
└── lib/             # Utilities and integrations
    ├── auth/        # Auth helpers
    └── supabase/    # Database clients
```

### Form Patterns

- Client components for form UI and validation
- Server Actions for data mutations
- Error handling with Radix Callout components
- Loading states with `isLoading` boolean

## Common Gotchas

### Supabase Client Creation

❌ **Don't**: Store server client in global variable
✅ **Do**: Create new client instance per function call

### Auth State Management

- Use `revalidatePath("/", "layout")` after auth changes
- Redirect to `/app` after successful login
- Handle `next` parameter for redirect flows

### Database Queries

- Always use typed queries with generated Database types
- Row Level Security (RLS) enabled on all public tables
- Use `.single()` for queries expecting one result

### CSS and Styling

- Use CSS Modules for component-specific styles
- Leverage Radix Themes for consistent design system
- Japanese text requires Noto Sans JP font family
