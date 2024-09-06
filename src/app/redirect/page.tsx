// src/hooks/useUpdatePaymentStatus.ts
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const useUpdatePaymentStatus = () => {
  const router = useRouter();

  useEffect(() => {
    const updatePaymentStatus = async () => {
      try {
        const session_id = new URLSearchParams(window.location.search).get(
          "session_id"
        );
        const custom_session_id = new URLSearchParams(
          window.location.search
        ).get("custom_session_id");

        const response = await fetch("/api/update-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            session_id,
            custom_session_id,
          }),
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
      router.push("/success"); // Redireciona para a página de sucesso
    }, 100); // Meio segundo (500 milissegundos) para redirecionar

    return () => clearTimeout(timer);
  }, [router]);
};

export default useUpdatePaymentStatus;
