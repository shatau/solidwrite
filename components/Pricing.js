"use client"

import { useState } from "react"
import { Check, Zap, Crown, Sparkles } from "lucide-react"
import ButtonCheckout from "./ButtonCheckout"

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState("annual")

  const pricingData = {
    monthly: [
      {
        name: "Basic",
        icon: Sparkles,
        description: "Perfect for students and light users",
        priceId: process.env.NODE_ENV === "development" ? "price_1SXkK4GubYQbBbhWJriHIpbR" : "price_1SbiOkKBnTv7JXWROJag4V1o",
        price: 5.99,
        credits: 5000,
        perRequestLimit: 500,
        features: [
          "5,000 words per month",
          "Basic AI Humanizer",
          "Unlimited AI Detection",
          "Multilingual support",
          "500 words per request",
          "Bypass Turnitin & GPTZero",
        ],
      },
      {
        name: "Pro",
        icon: Zap,
        description: "For professionals and frequent users",
        priceId: process.env.NODE_ENV === "development" ? "price_1SXkKUGubYQbBbhWwvqkPTzh" : "price_1SbiPIKBnTv7JXWRxPpg1isa",
        price: 19.99,
        credits: 15000,
        perRequestLimit: 1500,
        isFeatured: true,
        features: [
          "15,000 words per month",
          "Advanced AI Humanizer",
          "Unlimited AI Detection",
          "Multilingual support",
          "1,500 words per request",
          "My Writing Style",
          "Bypass all AI detectors",
          "Priority processing",
        ],
      },
      {
        name: "Ultra",
        icon: Crown,
        description: "For power users and agencies",
        priceId: process.env.NODE_ENV === "development" ? "price_1SXkKsGubYQbBbhW7Tp5A5Cp" : "price_1SbiPjKBnTv7JXWRMbCJ7Fqp",
        price: 39.99,
        credits: 30000,
        perRequestLimit: 3000,
        features: [
          "30,000 words per month",
          "Advanced AI Humanizer",
          "Unlimited AI Detection",
          "Multilingual support",
          "3,000 words per request",
          "My Writing Style",
          "Bypass all AI detectors",
          "Lightning-fast processing",
          "Priority support",
          "Early access to features",
        ],
      },
    ],
    annual: [
      {
        name: "Basic",
        icon: Sparkles,
        description: "Perfect for students and light users",
        priceId: process.env.NODE_ENV === "development" ? "price_1SXkM5GubYQbBbhWSVzXWKyM" : "price_1SbiQ7KBnTv7JXWRruqVX3Vx",
        price: 2.99,
        priceAnchor: 5.99,
        credits: 5000,
        perRequestLimit: 500,
        features: [
          "5,000 words per month",
          "Basic AI Humanizer",
          "Unlimited AI Detection",
          "Multilingual support",
          "500 words per request",
          "Bypass Turnitin & GPTZero",
        ],
      },
      {
        name: "Pro",
        icon: Zap,
        description: "For professionals and frequent users",
        priceId: process.env.NODE_ENV === "development" ? "price_1SXkMwGubYQbBbhWPIHRI7ys" : "price_1SbiQwKBnTv7JXWRzGbPHxQL",
        price: 9.99,
        priceAnchor: 19.99,
        credits: 15000,
        perRequestLimit: 1500,
        isFeatured: true,
        features: [
          "15,000 words per month",
          "Advanced AI Humanizer",
          "Unlimited AI Detection",
          "Multilingual support",
          "1,500 words per request",
          "My Writing Style",
          "Bypass all AI detectors",
          "Priority processing",
        ],
      },
      {
        name: "Ultra",
        icon: Crown,
        description: "For power users and agencies",
        priceId: process.env.NODE_ENV === "development" ? "price_ultra_annual_dev" : "price_1SbiRPKBnTv7JXWRPGSQKvtk",
        price: 19.99,
        priceAnchor: 39.99,
        credits: 30000,
        perRequestLimit: 3000,
        features: [
          "30,000 words per month",
          "Advanced AI Humanizer",
          "Unlimited AI Detection",
          "Multilingual support",
          "3,000 words per request",
          "My Writing Style",
          "Bypass all AI detectors",
          "Lightning-fast processing",
          "Priority support",
          "Early access to features",
        ],
      },
    ],
  }

  const currentPlans = pricingData[billingCycle]

  return (
    <section className="bg-slate-50 py-20 lg:py-28" id="pricing">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-6">
          <span className="inline-block text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-3">
            Pricing
          </span>

          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">Choose the right plan for you</h2>
        </div>

        {/* Toggle */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex items-center gap-1 bg-white p-1 rounded-full shadow-sm border border-slate-200">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                billingCycle === "monthly" ? "bg-slate-900 text-white" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                billingCycle === "annual" ? "bg-slate-900 text-white" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Annual
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                billingCycle === "annual" ? "bg-emerald-500 text-white" : "bg-emerald-100 text-emerald-700"
              }`}>
                -50%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {currentPlans.map((plan) => {
            const IconComponent = plan.icon
            return (
              <div
                key={plan.priceId}
                className={`relative rounded-2xl border transition-all ${
                  plan.isFeatured
                    ? "border-emerald-500 bg-white shadow-xl shadow-emerald-500/10 scale-[1.02]"
                    : "border-slate-200 bg-white hover:shadow-lg hover:border-slate-300"
                }`}
              >
                {plan.isFeatured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full shadow-lg">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div className="h-full p-6">
                  {/* Icon & Name */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                        plan.isFeatured ? "bg-emerald-600" : "bg-slate-100"
                      }`}
                    >
                      <IconComponent className={`w-5 h-5 ${plan.isFeatured ? "text-white" : "text-slate-600"}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                    </div>
                  </div>

                  <p className="text-slate-500 text-sm mb-6">{plan.description}</p>

                  {/* Pricing */}
                  <div className="mb-6">
                    {plan.priceAnchor && (
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm text-slate-400 line-through">${plan.priceAnchor}</span>
                        <span className="text-xs font-semibold text-emerald-600">50% off</span>
                      </div>
                    )}
                    <div className="flex items-end gap-1">
                      <span className="text-4xl font-bold text-slate-900">${plan.price}</span>
                      <span className="text-slate-500 mb-1">/month</span>
                    </div>
                    {billingCycle === "annual" && (
                      <p className="text-xs text-slate-400 mt-1">Billed ${(plan.price * 12).toFixed(2)} annually</p>
                    )}
                  </div>

                  <ButtonCheckout priceId={plan.priceId} mode="subscription" />

                  {/* Features */}
                  <ul className="mt-6 space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-slate-600 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-12">
          <p className="text-slate-500 text-sm">
            All plans include • Unlimited AI detection • Credits reset monthly • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  )
}

export default Pricing