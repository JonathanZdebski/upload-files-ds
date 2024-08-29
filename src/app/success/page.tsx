// src/app/success/page.tsx
"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Content from "../Components/Content";
import Confetti from "../Components/Confetti";
import Image from "next/image";

const SuccessPage = () => {
  const router = useRouter(); // Obtenha a instância do roteador

  useEffect(() => {
    // Função para atualizar o status de pagamento
    const updatePaymentStatus = async () => {
      try {
        const response = await fetch("/api/update-payment", {
          method: "POST",
        });

        if (response.ok) {
          console.log("Payment status updated successfully");
        } else {
          console.error("Failed to update payment status");
        }
      } catch (error) {
        console.error("Error updating payment status:", error);
      }
    };

    updatePaymentStatus();

    const timer = setTimeout(() => {
      router.push("/upload-multi-files");
    }, 2000);

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
