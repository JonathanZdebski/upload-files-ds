import type { Metadata } from "next";
import { EdgeStoreProvider } from "./lib/edgestore";
import Script from "next/script";
import Head from "next/head";
import { Inter } from "next/font/google";
// import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "Upload Files DS | Unlimited Multi-File Transfer with Advanced Security",
  description:
    "The easy, fast, and secure way to send your files around the world without needing an account. Share your files, photos, and videos for free right now.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>{String(metadata.title)}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={String(metadata.description)} />
      </Head>
      <body className={inter.className}>
        <SessionProvider>
          <EdgeStoreProvider>{children}</EdgeStoreProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
