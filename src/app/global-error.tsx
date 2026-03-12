"use client";

import * as Sentry from "@sentry/nextjs";
import clsx from "clsx";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./error.module.css";

export const metadata: Metadata = {
  title: "404",
};

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  const [sentryConnected, setSentryConnected] = useState(true);

  useEffect(() => {
    Sentry.diagnoseSdkConnectivity().then((result) => {
      setSentryConnected(typeof result === "undefined");
    });
  }, []);

  const sawaratsukiLink = (
    <Link
      href="https://github.com/SAWARATSUKI/KawaiiLogos/blob/f1ed8e2c677943c3179bed7b0611fa3d3c315397/ResponseCode/500%20InternalServerError.png"
      target="_blank"
    >
      SAWARATSUKI
    </Link>
  );

  return (
    <html lang="en" className={styles.internalServerError}>
      <body>
        <footer className={styles.internalServerErrorHeader}>
          <h1>Horenso SPACE</h1>
        </footer>
        <div className={styles.internalServerErrorContainer}>
          <Image
            className={styles.hero}
            src="/status/500.png"
            alt="500 Internal Server Error"
            width={640}
            height={360}
            priority
          />
          <p>
            Telling us what happened can help us fix the issue faster. &middot;
            何が起こったのかを伝えば、問題をより早く解決することができます
          </p>
          <div className={styles.internalServerErrorButtons}>
            <Link
              href="/"
              className={clsx(
                styles.internalServerErrorButton,
                styles.internalServerErrorOutlinedButton,
              )}
            >
              Back to home
            </Link>
            <Link
              href="#"
              className={styles.internalServerErrorButton}
              onClick={() => Sentry.showReportDialog()}
            >
              Tell us what happened &middot; {/* japanese */} 問題を詳しく報告
            </Link>
          </div>
          <details className={styles.internalServerErrorDetails}>
            <summary>
              {sentryConnected ? (
                "Some error details have been reported. 通知済みです。"
              ) : (
                <span>
                  Failed to send automatic error report. <em>Why?</em>
                </span>
              )}
            </summary>
            <div className={styles.internalServerErrorDetailsMessage}>
              <p>
                We automatically collect error reports to help us improve the
                product using{" "}
                <a
                  href="https://sentry.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Sentry
                </a>
                .
              </p>
              {!sentryConnected && (
                <>
                  <p>Possible reasons for a failed connection include:</p>
                  <ul>
                    <li>
                      You are using an ad blocker or privacy extension that
                      blocks Sentry (most likely). Please disable it for this
                      site and reload.
                    </li>
                    <li>Your network is blocking Sentry.</li>
                    <li>
                      There is a temporary issue connecting to Sentry. Please
                      try again later.
                    </li>
                  </ul>
                  <p>
                    To report this error manually, please contact us and include
                    the error digest below.
                  </p>
                </>
              )}
            </div>
          </details>
          <details className={styles.internalServerErrorDetails}>
            <summary>Show error details</summary>
            <pre className={styles.internalServerErrorDetailsMessage}>
              {error.message}
            </pre>
          </details>
        </div>
        <footer className={styles.internalServerErrorFooter}>
          {error.digest && (
            <div className={styles.internalServerErrorDigest}>
              If you report this error, include this digest:{" "}
              <code>{error.digest}</code>
            </div>
          )}
          <p className={styles.internalServerErrorImageCredit}>
            Image by {sawaratsukiLink}
          </p>
        </footer>
      </body>
    </html>
  );
}
