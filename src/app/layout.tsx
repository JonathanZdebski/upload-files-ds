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
        <meta
          name="google-site-verification"
          content="3mg8IPuMGjOLro9QMP9qNIxJpQEbP8YPjC_NrLSIK_Q"
        />
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PS2PC45L');`,
          }}
        ></Script>
      </Head>
      <body className={inter.className}>
        <SessionProvider>
          <EdgeStoreProvider>{children}</EdgeStoreProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
