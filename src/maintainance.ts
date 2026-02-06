const enable = true;

const current = {
  eta: new Date("2026-02-06T14:00:00Z"),
  fallbackMessage:
    "Horenso SPACE is currently under maintenance. Please try again later.",
  message: {
    en: "Horenso SPACE is currently under maintenance. Please try again later.",
    ja: "ただいま報連相SPACEはメンテナンス中です。しばらくしてから再度アクセスしてください。",
  },
};

export const MAINTENANCE: {
  eta: Date | null;
  fallbackMessage: string;
  message: Record<string, string>;
} | null = enable && process.env.NODE_ENV === "production" ? current : null;
