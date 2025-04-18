// src/app/[locale]/layout.tsx
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

import type { Metadata } from "next";
import "@/styles/globals.css";
import { ThemeProvider } from "@/context/ThemeProvider";
import { Doto } from "next/font/google";
import localFont from "next/font/local";
import Header from "@/components/Header";


export const metadata: Metadata = {
  title: "Haotian Chen | Frontend Engineer",
  description: "Haotian Chen's personal website",
}

export const englishFont = Doto({
  subsets: ["latin"],
  variable: "--font-english",
  display: "swap",
  weight: ["400", "700"],
});
export const chineseFont = localFont({
  src: [
    {
      path: '../../../public/fonts/NotoSC.ttf',
      weight: '400 700',
      style: 'normal',
    },
  ],
  display: 'swap',
  preload: true,
  variable: '--font-zh',
})

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
      </body>
    </html>
  );
}