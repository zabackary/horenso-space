# i18n Migration Examples

This document shows practical examples of migrating components to use the i18n system.

## Example 1: Login Form Component

### Before (Hardcoded Strings)

```tsx
// src/components/login-form.tsx
"use client";

import { Button, Flex, TextField } from "@radix-ui/themes";
import { useState } from "react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  return (
    <form>
      <Flex direction="column" gap="2">
        <Button type="button">Sign in with Google</Button>
        <Button type="button">Sign in with GitHub</Button>
        <TextField.Root placeholder="Email" />
        <TextField.Root placeholder="Password" type="password" />
        <Button type="submit">Login</Button>
        {error && <div>{error}</div>}
      </Flex>
    </form>
  );
}
```

### After (Using i18n)

```tsx
// src/components/login-form.tsx
"use client";

import { Button, Flex, TextField } from "@radix-ui/themes";
import { useState } from "react";
import { useTranslation } from "@/lib/i18n/useTranslation";

export function LoginForm() {
  const { t } = useTranslation("auth");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  return (
    <form>
      <Flex direction="column" gap="2">
        <Button type="button">{t("signIn", { provider: "Google" })}</Button>
        <Button type="button">{t("signIn", { provider: "GitHub" })}</Button>
        <TextField.Root placeholder={t("email")} />
        <TextField.Root placeholder={t("password")} type="password" />
        <Button type="submit">{t("login")}</Button>
        {error && <div>{error}</div>}
      </Flex>
    </form>
  );
}
```

### Translation Keys Required

In `public/locales/en.json`:
```json
{
  "auth": {
    "signIn": "Sign in with {{provider}}",
    "email": "Email",
    "password": "Password",
    "login": "Login"
  }
}
```

## Example 2: Home Page with Multiple Namespaces

### Before

```tsx
// src/app/page.tsx
export default function Home() {
  return (
    <>
      <h1>Club Report Sharing UP</h1>
      <button>Get Started</button>
      <button>Login</button>
      <h2>See who's absent</h2>
      <h2>Share documents easily</h2>
      <h2>Works with any club</h2>
    </>
  );
}
```

### After

```tsx
// src/app/page.tsx
"use client";

import { useTranslation } from "@/lib/i18n/useTranslation";

export default function Home() {
  const { t: t_home } = useTranslation("home");
  const { t: t_auth } = useTranslation("auth");

  return (
    <>
      <h1>{t_home("title")}</h1>
      <button>{t_home("getStarted")}</button>
      <button>{t_auth("login")}</button>
      <h2>{t_home("feature1")}</h2>
      <h2>{t_home("feature2")}</h2>
      <h2>{t_home("feature3")}</h2>
    </>
  );
}
```

## Example 3: Error Messages with Context

### Before

```tsx
function MembersManager() {
  const [error, setError] = useState<string | null>(null);

  async function changeRole(id: string) {
    try {
      // API call
    } catch (e) {
      setError(e instanceof Error ? e.message : "An error occurred");
    }
  }

  return (
    <>
      {error && <div className="error">{error}</div>}
    </>
  );
}
```

### After

```tsx
"use client";

import { useTranslation } from "@/lib/i18n/useTranslation";

function MembersManager() {
  const { t } = useTranslation(["common", "members"]);
  const [error, setError] = useState<string | null>(null);

  async function changeRole(id: string) {
    try {
      // API call
    } catch (e) {
      setError(e instanceof Error ? e.message : t("common:error"));
    }
  }

  return (
    <>
      {error && <div className="error">{error}</div>}
    </>
  );
}
```

## Example 4: Pluralization and Complex Interpolation

### Before

```tsx
function InviteCard({ invite }) {
  return (
    <>
      <Text>Used {invite.usage_count} times</Text>
      <Text>Expires at: {new Date(invite.expires_at).toLocaleString()}</Text>
    </>
  );
}
```

### After

```tsx
"use client";

import { useTranslation } from "@/lib/i18n/useTranslation";

function InviteCard({ invite }) {
  const { t } = useTranslation("invite");
  
  return (
    <>
      <Text>{t("usedCount", { count: invite.usage_count })}</Text>
      <Text>{t("expiresAt", { date: new Date(invite.expires_at).toLocaleString() })}</Text>
    </>
  );
}
```

## Adding Translations for New Namespaces

When you use a new namespace in your component (e.g., `useTranslation("myFeature")`), add it to the locale files:

1. Add to `public/locales/en.json`:
```json
{
  "myFeature": {
    "title": "My Feature Title",
    "description": "My feature description"
  }
}
```

2. Use in component:
```tsx
const { t } = useTranslation("myFeature");
<h1>{t("title")}</h1>
```

## Performance Tips

1. **Use namespace splitting**: Instead of loading all translations at once, use specific namespaces for features
   ```tsx
   // Good - only loads auth namespace
   const { t } = useTranslation("auth");
   
   // Less efficient - loads all namespaces
   const { t } = useTranslation();
   ```

2. **Avoid excessive hooks**: Don't call `useTranslation` multiple times in the same component
   ```tsx
   // Bad
   const { t: t1 } = useTranslation("auth");
   const { t: t2 } = useTranslation("common");
   
   // Good
   const { t } = useTranslation(["auth", "common"]);
   // Then use: t("auth:key") or t("common:key")
   ```

3. **Lazy load namespaces**: The system automatically lazy-loads namespaces, so don't worry about loading everything at startup

## Debugging

To see what translations are loaded:

```tsx
"use client";

import { useTranslation } from "@/lib/i18n/useTranslation";

export function DebugComponent() {
  const { i18n } = useTranslation("auth");
  
  useEffect(() => {
    console.log("Current language:", i18n.language);
    console.log("Loaded namespaces:", i18n.languages);
    console.log("All resources:", i18n.getResourceBundle(i18n.language));
  }, [i18n]);
  
  return null;
}
```
