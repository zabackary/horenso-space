# i18n Setup Summary

This document summarizes the internationalization (i18n) setup that has been implemented for the Horenso Space project.

## What Was Implemented

### 1. Core i18n System
- **Framework**: i18next with react-i18next
- **Type**: Client-side translation management
- **Default Language**: English
- **Lazy Loading**: Enabled for optimal performance

### 2. File Structure

```
Created Files:
├── src/lib/i18n/
│   ├── config.ts                 # i18next configuration
│   ├── useTranslation.ts         # Custom hook with lazy-loading
│   └── i18n-initializer.tsx      # Auto-initializer component
├── src/components/providers/
│   └── i18n-provider.tsx         # Provider for i18n context
├── public/locales/
│   └── en.json                   # English translations
├── I18N_GUIDE.md                 # Usage guide
├── I18N_MIGRATION_EXAMPLES.md    # Before/after examples
└── I18N_MIGRATION_CHECKLIST.md   # Migration checklist
```

### 3. Translation Organization

All translations are organized by namespace in `/public/locales/en.json`:

```
- common          (error, loading, cancel, save, etc.)
- auth            (login, password, email, sign up, etc.)
- home            (homepage content)
- club            (club management)
- invite          (invite system)
- members         (member management)
- absenceForms    (absence report templates)
- user            (user profile/settings)
```

### 4. Key Features

✅ **Lazy Loading**: Translations loaded on-demand, not all at startup
✅ **Namespace Support**: Organize translations by feature/page
✅ **Interpolation**: Support for variables: `"Hello {{name}}"`
✅ **Automatic Language Detection**: Detects from browser settings
✅ **Easy Expansion**: Add new languages by creating new locale files
✅ **Type-Safe**: TypeScript support throughout
✅ **Performance Optimized**: Only loads required namespaces

## Installation & Packages

### Installed Packages
```bash
✅ i18next@25.7.2         # i18n core library
✅ react-i18next@16.5.0   # React integration
```

### Updated Files
```bash
✅ src/app/layout.tsx     # Wrapped app with I18nProvider
```

## Usage

### In Client Components

```tsx
"use client";

import { useTranslation } from "@/lib/i18n/useTranslation";

export function MyComponent() {
  const { t } = useTranslation("auth");
  
  return <button>{t("login")}</button>;
}
```

### With Variables

```tsx
const { t } = useTranslation("invite");

// In en.json: "usedCount": "Used {{count}} times"
<p>{t("usedCount", { count: 5 })}</p>
// Output: "Used 5 times"
```

### Multiple Namespaces

```tsx
const { t } = useTranslation(["auth", "common"]);

<div>
  <button>{t("auth:login")}</button>
  <p>{t("common:error")}</p>
</div>
```

## Translation Files

### Current Status
- ✅ `en.json` - Fully populated with 100+ translation keys
- 📝 Ready for: `ja.json`, `fr.json`, etc.

### How to Add a Language

1. Create `/public/locales/{lang}.json`
2. Copy structure from `en.json`
3. Translate all values
4. Done! Language auto-detected from browser

Example:
```json
// public/locales/ja.json
{
  "auth": {
    "login": "ログイン",
    "password": "パスワード"
  }
}
```

## Next Steps for Development

### 1. Immediate (Must Do)
- [ ] Migrate hardcoded strings to use i18n
  - Start with: auth pages, home page
  - Follow: `I18N_MIGRATION_CHECKLIST.md`

### 2. Short Term (Should Do)
- [ ] Migrate all remaining components
- [ ] Add Japanese translations (ja.json)
- [ ] Test with different content lengths

### 3. Medium Term (Nice to Have)
- [ ] Add language switcher UI
- [ ] Integrate translation management tool (Lokalise, Crowdin)
- [ ] Add more language support
- [ ] Setup CI/CD for translation sync

### 4. Long Term (Future)
- [ ] RTL language support (Arabic, Hebrew)
- [ ] Pluralization rules
- [ ] Date/time localization
- [ ] Number formatting per locale

## Architecture Overview

```
┌─────────────────────────┐
│   Root Layout           │
│  (with I18nProvider)    │
└────────────┬────────────┘
             │
┌────────────▼────────────┐
│   I18nProvider          │
│  - I18nextProvider      │
│  - I18nInitializer      │
└────────────┬────────────┘
             │
┌────────────▼────────────┐
│   Components            │
│  useTranslation("ns")   │
│  t("key", {vars})       │
└────────────┬────────────┘
             │
┌────────────▼────────────┐
│   /public/locales/      │
│   en.json, ja.json etc. │
└─────────────────────────┘
```

## Performance Notes

- **Bundle Impact**: ~40KB (i18next + react-i18next)
- **Load Strategy**: Lazy-load namespaces on-demand
- **Caching**: Loaded translations cached in memory
- **Network**: Single fetch per locale file on first load

## Best Practices

1. ✅ Use meaningful namespace names (group by feature)
2. ✅ Use camelCase for translation keys
3. ✅ Keep interpolation variables separate from strings
4. ✅ Organize translations hierarchically
5. ✅ Always provide English fallback
6. ✅ Test with different string lengths
7. ✅ Avoid translating variable data (names, dates)

## Troubleshooting

### Missing Translation
```
If you see: "auth:login" in the UI
Check: en.json has auth.login key
```

### Namespace Not Loading
```
If t("key") returns "key"
Check: Namespace is included in useTranslation()
```

### Language Not Changing
```
If language doesn't update
Check: Browser's language setting or localStorage
```

## Documentation Files

- **I18N_GUIDE.md** - Complete usage guide with examples
- **I18N_MIGRATION_EXAMPLES.md** - Before/after component examples
- **I18N_MIGRATION_CHECKLIST.md** - Step-by-step migration checklist

## Configuration Files

All configuration is in: `src/lib/i18n/config.ts`

Current settings:
- Default language: English
- Fallback: English
- Interpolation: Enabled
- React Suspense: Disabled (safe fallback mode)

## Support & Resources

- **Documentation**: `/I18N_GUIDE.md`
- **Examples**: `/I18N_MIGRATION_EXAMPLES.md`
- **Checklist**: `/I18N_MIGRATION_CHECKLIST.md`
- **i18next Docs**: https://www.i18next.com/
- **react-i18next Docs**: https://react.i18next.com/

---

**Status**: ✅ Setup Complete - Ready for Migration

Start migrating components following the `I18N_MIGRATION_CHECKLIST.md`
