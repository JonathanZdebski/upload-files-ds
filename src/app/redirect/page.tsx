"use client";

// src/hooks/useUpdatePaymentStatus.ts
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const useUpdatePaymentStatus = (successUrl: string) => {
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
      router.push("/success");
    }, 0);

    return () => clearTimeout(timer);
  }, [router]);
};

export default useUpdatePaymentStatus;
