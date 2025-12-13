import getRequestLocale from "@/lib/i18n/getRequestLocale";
import { getI18nInstance } from "@/lib/i18n/i18n";
import { LinguiClientProvider } from "@/lib/i18n/LinguiClientProvider";
import { setI18n } from "@lingui/react/server";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import {
  Gloria_Hallelujah,
  Hachi_Maru_Pop,
  Noto_Sans,
  Noto_Sans_JP,
} from "next/font/google";
import { headers } from "next/headers";
import "./layout.module.css";

const hachiMaruPop = Hachi_Maru_Pop({
  variable: "--font-hachi-maru-pop",
  weight: "400",
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
});

const gloriaHallelujah = Gloria_Hallelujah({
  variable: "--font-gloria-hallelujah",
  weight: "400",
});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | 報連相SPACE",
    default: "報連相SPACE",
  },
  description: "部活の報連相をUP",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const reqHeaders = await headers();
  const requestLocale = getRequestLocale(reqHeaders);
  const i18n = getI18nInstance(requestLocale);
  setI18n(i18n);

  return (
    <html lang={requestLocale} suppressHydrationWarning>
      <Theme accentColor="lime" grayColor="mauve" radius="full" asChild>
        <body
          className={`${hachiMaruPop.variable} ${notoSansJP.variable} ${gloriaHallelujah.variable} ${notoSans.variable}`}
        >
          <LinguiClientProvider
            initialLocale={requestLocale}
            initialMessages={i18n.messages}
          >
            <ThemeProvider attribute="class">{children}</ThemeProvider>
          </LinguiClientProvider>
        </body>
      </Theme>
    </html>
  );
}
