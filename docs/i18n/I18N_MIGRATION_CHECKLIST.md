# i18n Migration Checklist

Use this checklist when migrating components to use i18n for translations.

## Pre-Migration

- [ ] Identify all hardcoded user-facing strings in the component
- [ ] Group strings by feature/namespace (auth, club, home, etc.)
- [ ] Check if the namespace already exists in `public/locales/en.json`
- [ ] If new namespace, decide on meaningful namespace name

## Migration Steps

### 1. Add Translation Keys

- [ ] Add all identified strings to `public/locales/en.json`
- [ ] Organize them under the appropriate namespace
- [ ] Use camelCase for key names
- [ ] Add {{variables}} for dynamic content

Example:
```json
{
  "myNamespace": {
    "title": "My Title",
    "label": "My Label",
    "message": "Hello {{name}}"
  }
}
```

### 2. Import useTranslation Hook

- [ ] Add `"use client"` directive if not already present
- [ ] Import: `import { useTranslation } from "@/lib/i18n/useTranslation";`

### 3. Initialize Translation Hook

- [ ] Call `const { t } = useTranslation("namespace")` in component body
- [ ] For multiple namespaces: `const { t } = useTranslation(["namespace1", "namespace2"])`
- [ ] When using multiple namespaces, use fully qualified keys: `t("namespace:key")`

### 4. Replace Hardcoded Strings

- [ ] Replace all hardcoded strings with `t("key")` calls
- [ ] Use interpolation for variables: `t("key", { variable: value })`
- [ ] Keep placeholder strings: `placeholder={t("placeholderKey")}`
- [ ] Translate alt text and titles

### 5. Handle Special Cases

- [ ] Error messages: Use fallback or reference `common:error`
- [ ] Dates/numbers: Keep formatting logic separate from translation
- [ ] Rich text/HTML: Consider using components instead of translations
- [ ] Conditionals: Keep logic separate, translate only the strings

### 6. Testing

- [ ] Check component renders without errors
- [ ] Verify all strings are translated (no untranslated keys showing)
- [ ] Test with different content lengths (some languages are longer)
- [ ] Check browser console for any i18n errors

### 7. Performance Check

- [ ] Verify namespace is lazy-loaded (check Network tab in DevTools)
- [ ] Ensure `useTranslation` is not called multiple times unnecessarily
- [ ] Check for duplicate namespace loads

## Common Patterns

### Pattern 1: Simple String
```tsx
// Before
<button>Click me</button>

// After
<button>{t("clickMe")}</button>
```

### Pattern 2: String with Variable
```tsx
// Before
<p>Hello {name}</p>

// After
// In en.json: "greeting": "Hello {{name}}"
<p>{t("greeting", { name })}</p>
```

### Pattern 3: Conditional String
```tsx
// Before
{error && <p>Error occurred</p>}

// After
{error && <p>{t("common:error")}</p>}
```

### Pattern 4: Placeholder
```tsx
// Before
<input placeholder="Enter your email" />

// After
<input placeholder={t("enterEmail")} />
```

### Pattern 5: Multiple Namespaces
```tsx
// Before
<button>{errorMsg || "Submit"}</button>

// After
// In config: useTranslation(["auth", "common"])
<button>{errorMsg || t("auth:submit")}</button>
```

## Verification Steps

After migration, verify:

- [ ] All strings in component are using `t()` function
- [ ] No hardcoded user-facing text remains
- [ ] All keys exist in `en.json`
- [ ] Keys are organized under correct namespace
- [ ] Component doesn't break on missing translations
- [ ] Performance is not degraded
- [ ] No console errors

## Common Issues & Solutions

### Issue: Translation key not found
```
Solution: Check if key exists in en.json and namespace is correct
```

### Issue: Component not updating language on language change
```
Solution: Ensure useTranslation hook is called, not just imported
```

### Issue: Variables not interpolating
```
Solution: Use double braces {{variable}} in en.json and pass as object to t()
```

### Issue: Namespace not lazy-loading
```
Solution: Verify fetch request to /locales/{lang}.json succeeds
```

## Quick Ref Commands

Check current implementation:
```bash
# Find all components with hardcoded strings
grep -r "\"[A-Z]" src/components --include="*.tsx"

# Find all t() usages
grep -r "t(" src --include="*.tsx"

# Check translation coverage
grep -r "t(" src --include="*.tsx" | wc -l
```

## Next Steps After Migration

1. **Add more languages**: Create `public/locales/{lang}.json` files
2. **Language switcher**: Add UI to switch languages
3. **RTL support**: For languages that read right-to-left
4. **Namespace organization**: Group namespaces by feature for better organization
5. **Translation management**: Use translation management tool (e.g., Lokalise, Crowdin)
