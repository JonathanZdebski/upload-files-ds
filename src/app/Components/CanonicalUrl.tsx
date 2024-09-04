"use client";

import { useEffect, useState } from "react";
import Head from "next/head";

const CanonicalUrl = () => {
  const [canonicalUrl, setCanonicalUrl] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = `https://upload-files-ds.vercel.app${window.location.pathname}`;
      setCanonicalUrl(url);
    }
  }, []);

  return (
    <Head>{canonicalUrl && <link rel="canonical" href={canonicalUrl} />}</Head>
  );
};

export default CanonicalUrl;
