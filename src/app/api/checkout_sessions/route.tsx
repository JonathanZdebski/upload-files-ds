import { NextResponse } from "next/server";
import Stripe from "stripe";
import { v4 as uuidv4 } from "uuid"; // Importar a função UUID

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function POST(req: Request) {
  try {
    const customSessionId = uuidv4();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
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
              interval: "month",
            },
            unit_amount: 199,
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${req.headers.get(
        "origin"
      )}/success?session_id={CHECKOUT_SESSION_ID}&custom_session_id=${customSessionId}`,
      cancel_url: `${req.headers.get("origin")}/canceled`,
    });

    return NextResponse.json({
      id: session.id,
      custom_session_id: customSessionId,
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.error();
  }
}
