import type { Metadata } from "next";
import { EdgeStoreProvider } from "./lib/edgestore";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="ZdDdkr8rensIcRxSdhlzsbtRReJ4EXa_MjkoORGrkxk"
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
        />
      </head>
      <body className={inter.className}>
        <header></header>

        <SessionProvider>
          <EdgeStoreProvider>{children}</EdgeStoreProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
