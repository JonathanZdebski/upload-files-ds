// src/app/success/page.tsx
"use client";

import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Content from "../Components/Content";
import Confetti from "../Components/Confetti";
import { useRouter } from "next/navigation";
import Image from "next/image";

const SuccessPage = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/upload-multi-files");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div>
      <Navbar />
      <Confetti />
      <div className="flex flex-col flex-wrap items-center justify-center mt-20 mb-20">
        <Image
          className="mb-6"
          src="/secure-payment.png"
          width={150}
          height={150}
          alt="secure payment"
        />
        <h1 className="text-3xl bg-white bg-opacity-10 p-4 rounded-2xl">
          Payment Successful!!
        </h1>
      </div>
      <Content />
      <Footer />
    </div>
  );
};

export default SuccessPage;
