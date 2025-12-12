# i18n (Internationalization) Setup Guide

This project uses **i18next** with **react-i18next** for managing translations with lazy-loading support.

## Structure

```
src/
├── lib/i18n/
│   ├── config.ts              # i18next configuration
│   ├── useTranslation.ts      # Custom hook with lazy-loading
│   └── i18n-initializer.tsx   # Component to initialize i18n
└── components/providers/
    └── i18n-provider.tsx      # Provider component for i18n context

public/
└── locales/
    └── en.json                # English translations (organized by namespace)
```

## Adding Translations

All translations are stored in `/public/locales/{lang}.json` files. They are organized by namespace (feature/page).

**Example structure of `en.json`:**

```json
{
  "common": {
    "error": "An error occurred",
    "cancel": "Cancel",
    "save": "Save"
  },
  "auth": {
    "login": "Login",
    "password": "Password",
    "signIn": "Sign in with {{provider}}"
  },
  "home": {
    "title": "Welcome",
    "subtitle": "Get started"
  }
}
```

## Using Translations in Components

### In Client Components

```tsx
"use client";

import { useTranslation } from "@/lib/i18n/useTranslation";

export function MyComponent() {
  // Simple usage - loads common namespace by default
  const { t } = useTranslation();

  // Load specific namespaces
  const { t: t_auth } = useTranslation("auth");

  // Load multiple namespaces
  const { t: t_multi } = useTranslation(["auth", "common"]);

  return (
    <div>
      <h1>{t("common:error")}</h1>
      <button>{t_auth("login")}</button>
      <p>{t("home:title")}</p>
    </div>
  );
}
```

### With Interpolation (Variables)

```tsx
const { t } = useTranslation("auth");

// In en.json: "signIn": "Sign in with {{provider}}"
<button>{t("auth:signIn", { provider: "Google" })}</button>
// Output: "Sign in with Google"
```

## Adding a New Language

1. Create a new file: `/public/locales/{lang}.json`
2. Add all the same namespace keys with translated content

**Example: `/public/locales/ja.json`**

```json
{
  "common": {
    "error": "エラーが発生しました",
    "cancel": "キャンセル",
    "save": "保存"
  },
  "auth": {
    "login": "ログイン",
    "password": "パスワード"
  }
}
```

## Lazy Loading

The i18n setup uses lazy-loading for optimal performance:

- **Only required namespaces are loaded** when components using them render
- **Language files are fetched from `/public/locales/`** on demand
- **Bundles are cached** to avoid duplicate loading
- **Automatic language detection** from browser settings

## Best Practices

1. **Always use translation keys** - avoid hardcoding strings
2. **Group related translations** - organize by namespace (pages, features)
3. **Use namespaces for code splitting** - load only what's needed
4. **Keep keys descriptive** - use camelCase and meaningful names
5. **Support interpolation** - use `{{variable}}` for dynamic content
6. **Fallback to English** - always provide English translations

## Current Supported Languages

- `en` - English (default)

## Migration from Hardcoded Strings

When migrating existing hardcoded strings:

1. Add the string to the appropriate namespace in `en.json`
2. Create a meaningful key (e.g., `auth.login`, `common.error`)
3. Replace the hardcoded string in the component with `t("namespace:key")`
4. If using `useTranslation("namespace")`, you can use `t("key")` directly

## Example: Migrating a Component

**Before:**
```tsx
export function LoginForm() {
  return (
    <>
      <input placeholder="Email" />
      <button>Sign in with Google</button>
      <a href="/forgot-password">Forgot password?</a>
    </>
  );
}
```

**After:**
```tsx
"use client";

import { useTranslation } from "@/lib/i18n/useTranslation";

export function LoginForm() {
  const { t } = useTranslation("auth");

  return (
    <>
      <input placeholder={t("email")} />
      <button>{t("signIn", { provider: "Google" })}</button>
      <a href="/forgot-password">{t("forgotPassword")}</a>
    </>
  );
}
```
