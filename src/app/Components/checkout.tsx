import { loadStripe } from "@stripe/stripe-js";
import styles from "../styles/button.module.css";
import Image from "next/image";
import { useState } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function Checkout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/checkout_sessions", { method: "POST" });

      // Verifique se a resposta é válida e tente analisar o JSON
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();

      // Verifique se a resposta contém o id da sessão
      if (!data.id) {
        throw new Error("Invalid response data");
      }

      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error("Stripe.js failed to load");
      }

      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: data.id,
      });

      if (stripeError) {
        throw stripeError;
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setError("An error occurred during checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Image
        className="mt-6 rounded-2xl"
        src="/primg.png"
        width={900}
        height={900}
        alt="secure payment"
      />
      <div className="mt-6 ">
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button
          className={`${styles.button} flex items-center space-x-2`}
          role="link"
          onClick={handleCheckout}
          disabled={loading}
        >
          <Image
            src="/passwordd.png"
            alt="Dashboard Icon"
            width={30}
            height={30}
          />
          <span>{loading ? "Loading..." : "Get Access"}</span>
        </button>
      </div>
    </div>
  );
}
