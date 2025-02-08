"use client"; // Hanya Client Component yang bisa pakai useState & useEffect

import { useEffect, useState } from "react";
import { NextIntlClientProvider } from "next-intl";

export default function LocaleProvider({ locale, children }: { locale: string; children: React.ReactNode }) {
  const [messages, setMessages] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    import(`../messages/${locale}.json`)
      .then((mod) => setMessages(mod.default))
      .catch((error) => console.error(`Locale not found: ${locale}`, error));
  }, [locale]);

  if (!messages) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h1>404 - Locale Not Found</h1>
        <p>The requested language is not available.</p>
      </div>
    );
  }

  return <NextIntlClientProvider locale={locale} messages={messages}>{children}</NextIntlClientProvider>;
}
