import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function POST(req: Request) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"], // "google_pay" e "apple_pay" são suportados automaticamente via Stripe.js
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Sign up Upload Multi Files (IMG, PDF, Documents, Videos)",
              description:
                "Discover the benefits of securely keeping your cloud files up-to-date and quickly sharing them. Your files are permanently saved in the cloud, with unlimited uploads.",
              images: ["https://uploadfilesds.vercel.app/file-lock.png"],
            },
            recurring: {
              interval: "month", // Recorrência mensal
            },
            unit_amount: 199, // $1.99 em centavos
          },
          quantity: 1,
        },
      ],
      mode: "subscription", // Modo de assinatura
      success_url: `${req.headers.get("origin")}/success?session_id={ }`,
      cancel_url: `${req.headers.get("origin")}/canceled`,
    });

    return NextResponse.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.error();
  }
}
