// src/app/[locale]/layout.tsx
import '@/styles/globals.css' 
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from "next";
import { ThemeProvider } from "@/context/ThemeProvider";
import Header from "@/components/Header";
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: "Haotian Chen | Graduate Student",
  keywords: ["Haotian Chen", "Frontend Engineer", "Graduate Student"],
  description: "Haotian Chen's personal website",
};
import { englishFont, chineseFont } from "@/lib/fonts";



export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (

    <html lang={locale}
      className={`${englishFont.variable} ${chineseFont.variable}`}>
      <body>
        <ThemeProvider>
          <NextIntlClientProvider>
            <Header />
            <div className='h-[64px]'></div>
            {/* 这里是为了给 Header 留出空间 */}
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}