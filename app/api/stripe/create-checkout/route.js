import { NextResponse } from "next/server";
import { auth } from "@/libs/auth";
import { createCheckout } from "@/libs/stripe";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";

export async function POST(req) {
  const body = await req.json();

  if (!body.priceId) {
    return NextResponse.json(
      { error: "Price ID is required" },
      { status: 400 }
    );
  } else if (!body.successUrl || !body.cancelUrl) {
    return NextResponse.json(
      { error: "Success and cancel URLs are required" },
      { status: 400 }
    );
  } else if (!body.mode) {
    return NextResponse.json(
      {
        error:
          "Mode is required (either 'payment' for one-time payments or 'subscription' for recurring subscription)",
      },
      { status: 400 }
    );
  }

  try {
    const session = await auth();

    //console.log("🔵 CREATE CHECKOUT - Session:", session?.user?.id);

    await connectMongo();

    const user = await User.findById(session?.user?.id);

    // console.log("🔵 User found:", user?.email);
    // console.log("🔵 Current plan:", user?.plan);
    // console.log("🔵 Has subscription:", !!user?.subscriptionId);

    const { priceId, mode, successUrl, cancelUrl } = body;

    // Note: When user has existing subscription and checks out a new plan,
    // Stripe automatically creates a new subscription.
    // The webhook handles canceling the old subscription.
    if (user?.subscriptionId && mode === 'subscription') {
      //console.log("ℹ️ User has existing subscription - new subscription will be created");
      //console.log("ℹ️ Webhook will handle canceling old subscription:", user.subscriptionId);
    }

    const stripeSessionURL = await createCheckout({
      priceId,
      mode,
      successUrl,
      cancelUrl,
      clientReferenceId: user?._id?.toString(),
      user,
    });

    //console.log("✅ Checkout created with clientReferenceId:", user?._id?.toString());

    return NextResponse.json({ url: stripeSessionURL });
  } catch (e) {
    console.error("❌ Create checkout error:", e);
    return NextResponse.json({ error: e?.message }, { status: 500 });
  }
}