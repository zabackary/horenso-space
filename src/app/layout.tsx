import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Theme accentColor="red" grayColor="mauve" radius="full" asChild>
        <body
          className={`${hachiMaruPop.variable} ${notoSansJP.variable} ${gloriaHallelujah.variable} ${notoSans.variable}`}
        >
          <ThemeProvider attribute="class">{children}</ThemeProvider>
        </body>
      </Theme>
    </html>
  );
}
