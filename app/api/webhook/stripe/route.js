import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import connectMongo from "@/libs/mongoose";
import configFile from "@/config";
import User from "@/models/User";
import { findCheckoutSession } from "@/libs/stripe";

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req) {
  console.log("\n========== WEBHOOK START ==========");
  console.log("Time:", new Date().toISOString());
  
  if (!stripe || !webhookSecret) {
    console.error("❌ Stripe not configured");
    return NextResponse.json({ error: "Stripe configuration missing" }, { status: 500 });
  }

  console.log("✅ Stripe configured");

  await connectMongo();
  console.log("✅ MongoDB connected");

  const body = await req.text();
  const signature = (await headers()).get("stripe-signature");

  let data;
  let eventType;
  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    console.log("✅ Webhook verified");
  } catch (err) {
    console.error("❌ Webhook verification failed:", err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  data = event.data;
  eventType = event.type;
  console.log("📋 Event Type:", eventType);

  try {
    switch (eventType) {
      case "checkout.session.completed": {
        console.log("\n🎯 CHECKOUT SESSION COMPLETED");
        
        const session = await findCheckoutSession(data.object.id);
        console.log("Session ID:", data.object.id);
        
        const customerId = session?.customer;
        const priceId = session?.line_items?.data[0]?.price.id;
        const userId = session?.client_reference_id;
        const subscriptionId = session?.subscription;
        
        console.log("Customer ID:", customerId);
        console.log("Price ID:", priceId);
        console.log("User ID:", userId);
        console.log("Subscription ID:", subscriptionId);
        
        const plan = configFile.stripe.plans.find((p) => p.priceId === priceId);
        
        if (!plan) {
          console.error("❌ Plan not found for priceId:", priceId);
          console.log("Available plans:", configFile.stripe.plans.map(p => p.priceId));
          break;
        }
        
        console.log("✅ Plan found:", plan.name);

        const customer = await stripe.customers.retrieve(customerId);
        console.log("Customer email:", customer.email);

        let user;

        if (userId) {
          console.log("Looking up user by ID:", userId);
          user = await User.findById(userId);
          console.log(user ? "✅ User found by ID" : "❌ User NOT found by ID");
        } else if (customer.email) {
          console.log("Looking up user by email:", customer.email);
          user = await User.findOne({ email: customer.email });
          console.log(user ? "✅ User found by email" : "ℹ️ User not found, creating...");

          if (!user) {
            user = await User.create({
              email: customer.email,
              name: customer.name,
            });
            await user.save();
            console.log("✅ New user created");
          }
        } else {
          console.error("❌ No userId or customer email");
          throw new Error("No user found");
        }

        if (!user) {
          console.error("❌ User is null after lookup");
          throw new Error("User not found");
        }

        console.log("\n📊 BEFORE UPDATE:");
        console.log("  Email:", user.email);
        console.log("  Plan:", user.plan);
        console.log("  Credits:", user.credits);
        console.log("  HasAccess:", user.hasAccess);
        console.log("  Existing Subscription:", user.subscriptionId);

        // Check if this is a plan change (user already has a subscription)
        const isPlanChange = user.subscriptionId && user.plan !== 'free';
        const currentCredits = user.credits || 0;

        console.log("🔄 Is Plan Change:", isPlanChange);
        console.log("💰 Current Credits:", currentCredits);

        // CREDIT LOGIC
        let newCredits;
        if (isPlanChange) {
          // User is changing plans - keep existing credits + add new plan credits
          newCredits = currentCredits + plan.credits;
          console.log("✨ Plan Change - Adding credits:", currentCredits, "+", plan.credits, "=", newCredits);
        } else {
          // New subscription - just give plan credits
          newCredits = plan.credits;
          console.log("✨ New Subscription - Credits:", newCredits);
        }

        user.priceId = priceId;
        user.customerId = customerId;
        user.subscriptionId = subscriptionId;
        user.hasAccess = true;
        user.credits = newCredits;
        user.monthlyCredits = plan.credits;
        user.plan = plan.name.toLowerCase();
        user.billingInterval = plan.billingInterval;
        user.creditsResetDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        user.cancelAtPeriodEnd = false;
        user.subscriptionEndDate = null;
        
        await user.save();
        
        console.log("\n✅ AFTER UPDATE:");
        console.log("  Email:", user.email);
        console.log("  Plan:", user.plan);
        console.log("  Credits:", user.credits);
        console.log("  HasAccess:", user.hasAccess);
        console.log("  CustomerId:", user.customerId);
        console.log("  SubscriptionId:", user.subscriptionId);
        
        break;
      }

      case "customer.subscription.updated": {
        console.log("\n🔄 SUBSCRIPTION UPDATED");
        const subscription = data.object;
        const subscriptionId = subscription.id;
        const customerId = subscription.customer;
        const cancelAtPeriodEnd = subscription.cancel_at_period_end;
        const currentPeriodEnd = subscription.current_period_end;
        const priceId = subscription.items?.data?.[0]?.price?.id;
        
        console.log("Subscription ID:", subscriptionId);
        console.log("Customer ID:", customerId);
        console.log("Price ID:", priceId);
        console.log("Cancel at period end:", cancelAtPeriodEnd);
        console.log("Current period end:", currentPeriodEnd);
        console.log("Period ends:", currentPeriodEnd ? new Date(currentPeriodEnd * 1000) : 'N/A');
        
        const user = await User.findOne({ customerId });

        if (user) {
          // Check if price changed (plan upgrade/downgrade via Stripe portal)
          if (priceId && priceId !== user.priceId) {
            console.log("🔄 Price changed from", user.priceId, "to", priceId);
            
            const newPlan = configFile.stripe.plans.find((p) => p.priceId === priceId);
            if (newPlan) {
              const currentCredits = user.credits || 0;
              
              // Keep existing credits + add new plan credits on upgrade
              user.credits = currentCredits + newPlan.credits;
              user.monthlyCredits = newPlan.credits;
              user.plan = newPlan.name.toLowerCase();
              user.billingInterval = newPlan.billingInterval;
              user.priceId = priceId;
              user.creditsResetDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
              
              console.log("✨ Plan updated - Credits:", currentCredits, "+", newPlan.credits, "=", user.credits);
            }
          }
          
          // Handle cancellation
          if (cancelAtPeriodEnd) {
            user.cancelAtPeriodEnd = true;
            user.subscriptionEndDate = new Date(currentPeriodEnd * 1000);
            console.log("📅 Subscription will end at:", user.subscriptionEndDate);
          } else {
            // User resumed/reactivated subscription
            user.cancelAtPeriodEnd = false;
            user.subscriptionEndDate = null;
            console.log("✅ Subscription reactivated");
          }
          
          await user.save();
          
          console.log("✅ User updated:", user.email);
          console.log("   Plan:", user.plan);
          console.log("   Credits:", user.credits);
          console.log("   Cancel flag:", user.cancelAtPeriodEnd);
          console.log("   End date:", user.subscriptionEndDate);
        } else {
          console.log("❌ User not found");
        }
        
        break;
      }

      case "customer.subscription.deleted": {
        console.log("\n🚫 SUBSCRIPTION DELETED");
        const subscription = data.object;
        const customerId = subscription.customer;
        
        const user = await User.findOne({ customerId });

        if (user) {
          // Reset to free plan with 500 credits
          user.hasAccess = false;
          user.plan = 'free';
          user.credits = 500;
          user.monthlyCredits = 0;
          user.cancelAtPeriodEnd = false;
          user.subscriptionEndDate = null;
          user.priceId = null;
          user.subscriptionId = null;
          await user.save();
          
          console.log("✅ Subscription ended for:", user.email);
          console.log("   Reset to free plan with 500 credits");
        } else {
          console.log("❌ User not found");
        }

        break;
      }

      case "invoice.paid": {
        console.log("\n💰 INVOICE PAID");
        const invoice = data.object;
        const priceId = invoice.lines?.data?.[0]?.price?.id;
        const customerId = invoice.customer;
        const subscriptionId = invoice.subscription;
        
        console.log("Price ID:", priceId);
        console.log("Customer ID:", customerId);
        console.log("Subscription ID:", subscriptionId);
        
        if (!priceId || !subscriptionId) {
          console.log("⚠️ No price ID or subscription ID in invoice");
          break;
        }
        
        const user = await User.findOne({ customerId });
        
        if (!user) {
          console.log("❌ User not found");
          break;
        }
        
        console.log("✅ User found:", user.email);
        
        const plan = configFile.stripe.plans.find((p) => p.priceId === priceId);
        
        if (!plan) {
          console.log("❌ Plan not found");
          break;
        }
        
        // Only reset credits for RECURRING invoices (not initial checkout)
        // Check if this is the same subscription and price the user already has
        if (user.priceId === priceId && user.subscriptionId === subscriptionId) {
          console.log("🔄 Recurring invoice - resetting credits");
          user.hasAccess = true;
          user.credits = plan.credits;
          user.creditsResetDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
          await user.save();
          
          console.log("✅ Credits reset to:", user.credits);
        } else {
          console.log("ℹ️ Initial invoice or different subscription, skipping credit reset");
        }
        
        break;
      }

      case "invoice.payment_failed":
        console.log("❌ Invoice payment failed");
        break;

      default:
        console.log("ℹ️ Unhandled event type:", eventType);
    }
  } catch (e) {
    console.error("\n❌ ERROR:", e.message);
    console.error("Stack:", e.stack);
    console.error("Event Type:", eventType);
  }

  console.log("========== WEBHOOK END ==========\n");
  return NextResponse.json({});
}