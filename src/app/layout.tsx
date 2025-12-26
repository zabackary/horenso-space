import { Theme } from "@radix-ui/themes";
import { initLingui } from "@/lib/i18n/initLingui";
import { LinguiClientProvider } from "@/lib/i18n/LinguiClientProvider";
import "@radix-ui/themes/styles.css";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import {
  Gloria_Hallelujah,
  Hachi_Maru_Pop,
  Noto_Sans,
  Noto_Sans_JP,
} from "next/font/google";
import { ThemeProvider } from "next-themes";
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
  params,
}: LayoutProps<"/">) {
  const i18n = await initLingui();

  return (
    <html lang={i18n.locale} suppressHydrationWarning>
      <Theme accentColor="lime" grayColor="mauve" radius="full" asChild>
        <body
          className={`${hachiMaruPop.variable} ${notoSansJP.variable} ${gloriaHallelujah.variable} ${notoSans.variable}`}
        >
          <LinguiClientProvider
            initialLocale={i18n.locale}
            initialMessages={i18n.messages}
          >
            <ThemeProvider attribute="class">{children}</ThemeProvider>
          </LinguiClientProvider>
          <Analytics />
        </body>
      </Theme>
    </html>
  );
}
