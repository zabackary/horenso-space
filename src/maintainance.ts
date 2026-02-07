const enable = false;

const current = {
  eta: new Date("2026-02-06T11:00:00Z"),
  fallbackMessage:
    "Horenso SPACE is currently undergoing critical database maintenance and cannot be accessed. Service is expected to resume at approximately 20:00 JST. We apologize for the inconvenience and understand that recent downtime has been out of acceptable limits.",
  message: {
    en: "Horenso SPACE is currently undergoing critical database maintenance and cannot be accessed. Service is expected to resume at approximately 20:00 JST. We apologize for the inconvenience and understand that recent downtime has been out of acceptable limits.",
    ja: "ただいま報連相SPACEは重要なデータベースメンテナンス中でアクセスできません。サービスはおおよそ20:00 JSTに再開する予定です。ご不便をおかけして申し訳ありません。",
  },
};

export const MAINTENANCE: {
  eta: Date | null;
  fallbackMessage: string;
  message: Record<string, string>;
} | null = enable && process.env.NODE_ENV === "production" ? current : null;
