import { NextResponse } from "next/server";
import { auth } from "@/libs/auth";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";

export async function GET(req) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectMongo();

    const user = await User.findById(session.user.id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      credits: user.credits || 0,
      plan: user.plan || 'free',
      hasAccess: user.hasAccess || false,
      cancelAtPeriodEnd: user.cancelAtPeriodEnd || false,
      subscriptionEndDate: user.subscriptionEndDate || null,
    });
  } catch (error) {
    console.error("Error fetching user credits:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}