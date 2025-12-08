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
    <section className="bg-gradient-to-br from-amber-50 via-white to-orange-50 py-20 lg:py-32" id="pricing">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-6">
          {/* <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            Simple, Transparent Pricing
          </div> */}

          <h2 className="text-4xl lg:text-4xl font-bold text-gray-900 ">Choose the right plan for you</h2>

          {/* <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Credit-based pricing with 1 word = 1 credit. Choose the plan that fits your needs and cancel anytime.
          </p> */}
        </div>

        {/* Toggle */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white p-1 rounded-xl shadow-lg border border-gray-200">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-8 py-2 rounded-lg font-semibold transition-all ${
                billingCycle === "monthly" ? "bg-orange-700 text-white shadow-md" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-8 py-2 rounded-lg font-semibold transition-all ${
                billingCycle === "annual" ? "bg-orange-700 text-white shadow-md" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Annual
              <span className="ml-2 px-3 py-1 bg-orange-100 text-orange-800 text-xs font-semibold rounded-full">
                Save 50%
              </span>
            </button>
            {/* {billingCycle === "annual" && (
              <span className="ml-2 px-3 py-1 bg-orange-100 text-orange-800 text-xs font-semibold rounded-full">
                Save 50%
              </span>
            )} */}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {currentPlans.map((plan) => {
            const IconComponent = plan.icon
            return (
              <div
                key={plan.priceId}
                className={`rounded-2xl border transition-all ${
                  plan.isFeatured
                    ? "border-orange-300 bg-white shadow-xl scale-105"
                    : "border-gray-200 bg-white hover:shadow-lg hover:border-gray-300"
                }`}
              >
                {plan.isFeatured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 bg-orange-700 text-white text-xs font-bold rounded-full shadow-lg">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div className="h-full p-8">
                  {/* Icon & Name */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        plan.isFeatured ? "bg-orange-700" : "bg-gray-100"
                      }`}
                    >
                      <IconComponent className={`w-6 h-6 ${plan.isFeatured ? "text-white" : "text-gray-700"}`} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-6">{plan.description}</p>

                  {/* Pricing */}
                  <div className="mb-6">
                    {plan.priceAnchor && (
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-gray-500 line-through">${plan.priceAnchor}</span>
                        <span className="text-xs font-semibold text-gray-600">50% off</span>
                      </div>
                    )}
                    <div className="flex items-end gap-2">
                      <span className="text-5xl font-bold text-gray-900">${plan.price}</span>
                      <span className="text-gray-600 mb-2">/month</span>
                    </div>
                    {billingCycle === "annual" && (
                      <p className="text-sm text-gray-500 mt-1">Billed ${(plan.price * 12).toFixed(2)} annually</p>
                    )}
                  </div>

                  <ButtonCheckout priceId={plan.priceId} mode="subscription" />

                  {/* Features */}
                  <ul className="mt-8 space-y-4">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-orange-700 shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-16">
          <p className="text-gray-600">
            All plans include • Unlimited AI detection • Credits reset monthly • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  )
}

export default Pricing
