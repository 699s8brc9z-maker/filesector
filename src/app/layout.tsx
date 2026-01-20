import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import StructuredData from "@/components/StructuredData";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import OfflineBanner from "@/components/OfflineBanner";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FileSector - Free File Converter | HEIC to JPG, HWP to PDF, Video to GIF",
  description: "Convert images, documents, HWP, videos, and audio files for free. Supports 40+ conversions including HEIC to JPG, HWP to PDF, MP4 to GIF, MP4 to MP3. Safe and fast online file conversion platform.",
  keywords: [
    "file converter",
    "free file conversion",
    "HEIC to JPG converter",
    "HWP to PDF converter",
    "image converter",
    "video to GIF converter",
    "MP4 to MP3 converter",
    "online file converter",
    "free converter",
    "image to PDF converter",
    "WebP converter",
    "video thumbnail",
    "audio converter",
    "파일 변환",
    "무료 파일 변환",
    "HEIC JPG 변환",
    "HWP PDF 변환",
  ],
  authors: [{ name: "FileSector" }],
  creator: "FileSector",
  publisher: "FileSector",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://filesector.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "FileSector - Free File Converter | HEIC, HWP, Video, Audio",
    description: "Convert images, documents, HWP, videos, and audio files for free. Supports 40+ conversions. Safe and fast online file conversion platform.",
    url: 'https://filesector.com',
    siteName: 'FileSector',
    locale: 'en_US',
    alternateLocale: ['ko_KR', 'ja_JP', 'zh_CN'],
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FileSector - Free File Conversion Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "FileSector - Free File Converter",
    description: "Convert HEIC, HWP, videos, and audio for free. Supports 40+ conversions.",
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', sizes: '64x64', type: 'image/png' },
      { url: '/favicon.png', sizes: '128x128', type: 'image/png' },
    ],
    apple: '/favicon.png',
    shortcut: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="alternate" hrefLang="en" href="https://filesector.com/" />
        <link rel="alternate" hrefLang="ko" href="https://filesector.com/" />
        <link rel="alternate" hrefLang="ja" href="https://filesector.com/" />
        <link rel="alternate" hrefLang="zh" href="https://filesector.com/" />
        <link rel="alternate" hrefLang="x-default" href="https://filesector.com/" />
      </head>
      <body className={`${geist.className} antialiased bg-slate-50/50`}>
        <StructuredData />
        <OfflineBanner />
        <ErrorBoundary>
          <Navbar />
          <main>{children}</main>
        </ErrorBoundary>
      </body>
    </html>
  );
}
