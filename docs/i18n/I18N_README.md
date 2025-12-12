# Horenso Space - Internationalization (i18n) Setup

This project uses **i18next** with **react-i18next** for comprehensive localization support with lazy-loading for optimal performance.

## Quick Start

### Using Translations in Components

```tsx
"use client";

import { useTranslation } from "@/lib/i18n/useTranslation";

export function MyComponent() {
  const { t } = useTranslation("auth");
  
  return (
    <>
      <h1>{t("login")}</h1>
      <input placeholder={t("email")} />
      <button>{t("signIn", { provider: "Google" })}</button>
    </>
  );
}
```

### Adding Translations

Edit `/public/locales/en.json`:

```json
{
  "auth": {
    "login": "Login",
    "email": "Email",
    "signIn": "Sign in with {{provider}}"
  }
}
```

## 📁 Project Structure

```
src/
├── lib/i18n/
│   ├── config.ts                 # i18next configuration
│   ├── useTranslation.ts         # Custom hook with lazy-loading
│   └── i18n-initializer.tsx      # Auto-initializer component
└── components/providers/
    └── i18n-provider.tsx         # Provider component

public/locales/
└── en.json                        # English translations (organized by namespace)

Documentation/
├── I18N_GUIDE.md                 # Complete usage guide
├── I18N_MIGRATION_EXAMPLES.md    # Before/after examples
└── I18N_MIGRATION_CHECKLIST.md   # Step-by-step migration guide
```

## 🌍 Current Languages

| Language | Code | Status     |
|----------|------|------------|
| English  | en   | ✅ Complete |
| Japanese | ja   | 📝 TODO     |

## 📚 Documentation

### Getting Started
- **[I18N_GUIDE.md](./I18N_GUIDE.md)** - Comprehensive guide with examples
- **[I18N_SETUP_SUMMARY.md](./I18N_SETUP_SUMMARY.md)** - Setup overview and architecture

### Migration
- **[I18N_MIGRATION_EXAMPLES.md](./I18N_MIGRATION_EXAMPLES.md)** - Real component examples
- **[I18N_MIGRATION_CHECKLIST.md](./I18N_MIGRATION_CHECKLIST.md)** - Step-by-step checklist

## 🚀 Features

- ✅ **Lazy Loading**: Only load translations when needed
- ✅ **Namespace Support**: Organize translations by feature
- ✅ **Interpolation**: Support for dynamic variables
- ✅ **Auto Language Detection**: Detects from browser settings
- ✅ **Extensible**: Easy to add new languages
- ✅ **Type-Safe**: Full TypeScript support
- ✅ **Performance**: Minimal bundle impact (~40KB)

## 💡 Usage Examples

### Basic Translation

```tsx
const { t } = useTranslation("auth");
<button>{t("login")}</button>
```

### With Variables

```tsx
// Translation: "Welcome back, {{name}}"
<p>{t("welcome", { name: "John" })}</p>
```

### Multiple Namespaces

```tsx
const { t } = useTranslation(["auth", "common", "home"]);
<div>
  <button>{t("auth:login")}</button>
  <p>{t("common:error")}</p>
</div>
```

### Lazy Namespace Loading

```tsx
// Only load this namespace when needed
const { t } = useTranslation("advancedFeature");
```

## 🔧 Configuration

Main configuration: `src/lib/i18n/config.ts`

- **Default Language**: `en`
- **Fallback Language**: `en`
- **Interpolation**: Enabled with `{{ }}`
- **Namespaces**: Auto-detected from `en.json`

## 📖 Translation Structure

Translations are organized by namespace in `/public/locales/en.json`:

```json
{
  "common": {
    // Shared strings used across app
    "error": "An error occurred",
    "loading": "Loading..."
  },
  "auth": {
    // Authentication related strings
    "login": "Login",
    "password": "Password"
  },
  "home": {
    // Homepage specific strings
    "title": "Welcome"
  }
  // Add more namespaces as needed
}
```

## 🌐 Adding a New Language

1. Create `/public/locales/{lang}.json`
2. Copy the structure from `en.json`
3. Translate all values
4. Done! The app will auto-detect the language

Example: `/public/locales/ja.json`
```json
{
  "common": {
    "error": "エラーが発生しました",
    "loading": "読み込み中..."
  },
  "auth": {
    "login": "ログイン",
    "password": "パスワード"
  }
}
```

## 🔄 Language Switching

To switch languages at runtime:

```tsx
"use client";

import { useTranslation } from "@/lib/i18n/useTranslation";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <>
      <button onClick={() => i18n.changeLanguage("en")}>English</button>
      <button onClick={() => i18n.changeLanguage("ja")}>日本語</button>
    </>
  );
}
```

## 📋 Key Namespaces

| Namespace | Purpose | Used In |
|-----------|---------|---------|
| `common` | Shared UI strings | All components |
| `auth` | Authentication | Login, signup, password reset |
| `home` | Homepage content | Home page |
| `club` | Club management | Club pages |
| `invite` | Invite system | Invite management |
| `members` | Member management | Members page |
| `absenceForms` | Absence forms | Absence form editor |
| `user` | User settings | User profile |

## ⚡ Performance

- **Bundle Size**: ~40KB (i18next + react-i18next)
- **Load Time**: Translations lazy-loaded on demand
- **Caching**: Loaded translations cached in memory
- **Network**: Single fetch per language on first load

## 🐛 Troubleshooting

### Missing Translation Shows Key
```
Problem: Seeing "auth:login" instead of translated text
Solution: Check that the key exists in en.json under auth namespace
```

### Translation Not Updating
```
Problem: Changed en.json but changes don't appear
Solution: Clear browser cache and reload
```

### Namespace Not Found
```
Problem: Getting error about missing namespace
Solution: Ensure useTranslation("namespace") matches the en.json namespace
```

### Language Not Detected
```
Problem: Wrong language selected
Solution: Check browser language settings or explicitly set with i18n.changeLanguage()
```

## 📝 Best Practices

1. **Use Descriptive Keys**: `auth:forgotPassword` instead of `btn1`
2. **Organize by Namespace**: Group related strings together
3. **Use Camel Case**: `forgotPassword` not `forgot-password`
4. **Separate Logic from Strings**: Don't translate variable data
5. **Provide English Fallback**: Always have en.json complete
6. **Test String Lengths**: Some languages are longer than English
7. **Avoid Special Characters**: Keep it simple for translation tools

## 🔗 Resources

- [i18next Official Docs](https://www.i18next.com/)
- [react-i18next Documentation](https://react.i18next.com/)
- [i18next Backend Plugins](https://www.i18next.com/overview/plugins-and-utils)

## 🎯 Next Steps

1. Review [I18N_MIGRATION_CHECKLIST.md](./I18N_MIGRATION_CHECKLIST.md)
2. Start migrating components (follow the checklist)
3. Add Japanese translations for `ja.json`
4. Implement language switcher UI
5. Set up translation management tool (optional)

## ✅ Setup Status

- ✅ i18next configured
- ✅ react-i18next integrated
- ✅ Lazy loading implemented
- ✅ English translations created (100+ keys)
- ✅ Provider setup complete
- ✅ Documentation complete
- 📝 Component migration: In progress

Start migrating components today! 🚀
