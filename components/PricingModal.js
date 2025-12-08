'use client';

import { useState } from 'react';
import ButtonCheckout from './ButtonCheckout';

const PricingModal = ({ isOpen, onClose, currentPlan = 'free', currentBillingInterval = 'monthly' }) => {
  const [billingCycle, setBillingCycle] = useState(currentBillingInterval || 'annual');

  const pricingData = {
    monthly: [
      {
        name: "Basic",
        description: "Best for students who need basic humanization features",
        priceId: process.env.NODE_ENV === "development" ? "price_1SXkK4GubYQbBbhWJriHIpbR" : "price_1SbiOkKBnTv7JXWROJag4V1o",
        price: 5.99,
        credits: 5000,
        planKey: 'basic',
        features: [
          "5,000 words per month",
          "Basic AI Humanizer",
          "Unlimited AI Detection",
          "500 words per request",
        ],
      },
      {
        name: "Pro",
        description: "Perfect for professional writing",
        priceId: process.env.NODE_ENV === "development" ? "price_1SXkKUGubYQbBbhWwvqkPTzh" : "price_1SbiPIKBnTv7JXWRxPpg1isa",
        price: 19.99,
        credits: 15000,
        planKey: 'pro',
        isFeatured: true,
        features: [
          "15,000 words per month",
          "Advanced AI Humanizer",
          "Unlimited AI Detection",
          "1,500 words per request",
        ],
      },
      {
        name: "Ultra",
        description: "For blogs and long-form writing",
        priceId: process.env.NODE_ENV === "development" ? "price_1SXkKsGubYQbBbhW7Tp5A5Cp" : "price_1SbiPjKBnTv7JXWRMbCJ7Fqp",
        price: 39.99,
        credits: 30000,
        planKey: 'ultra',
        features: [
          "30,000 words per month",
          "Advanced AI Humanizer",
          "Unlimited AI Detection",
          "3,000 words per request",
          "Priority support",
        ],
      },
    ],
    annual: [
      {
        name: "Basic",
        description: "Best for students who need basic humanization features",
        priceId: process.env.NODE_ENV === "development" ? "price_1SXkM5GubYQbBbhWSVzXWKyM" : "price_1SbiQ7KBnTv7JXWRruqVX3Vx",
        price: 2.99,
        priceAnchor: 5.99,
        credits: 5000,
        planKey: 'basic',
        features: [
          "5,000 words per month",
          "Basic AI Humanizer",
          "Unlimited AI Detection",
          "500 words per request",
        ],
      },
      {
        name: "Pro",
        description: "Perfect for professional writing",
        priceId: process.env.NODE_ENV === "development" ? "price_1SXkMwGubYQbBbhWPIHRI7ys" : "price_1SbiQwKBnTv7JXWRzGbPHxQL",
        price: 9.99,
        priceAnchor: 19.99,
        credits: 15000,
        planKey: 'pro',
        isFeatured: true,
        features: [
          "15,000 words per month",
          "Advanced AI Humanizer",
          "Unlimited AI Detection",
          "1,500 words per request",
        ],
      },
      {
        name: "Ultra",
        description: "For blogs and long-form writing",
        priceId: process.env.NODE_ENV === "development" ? "price_1SXkNYGubYQbBbhWfyMUCcg0" : "price_1SbiRPKBnTv7JXWRPGSQKvtk",
        price: 19.99,
        priceAnchor: 39.99,
        credits: 30000,
        planKey: 'ultra',
        features: [
          "30,000 words per month",
          "Advanced AI Humanizer",
          "Unlimited AI Detection",
          "3,000 words per request",
          "Priority support",
        ],
      },
    ],
  };

  const currentPlans = pricingData[billingCycle];

  // Determine upgrade/downgrade status
  const getPlanComparison = (targetPlanKey) => {
    const planHierarchy = { free: 0, basic: 1, pro: 2, ultra: 3 };
    const currentLevel = planHierarchy[currentPlan.toLowerCase()] || 0;
    const targetLevel = planHierarchy[targetPlanKey.toLowerCase()] || 0;

    if (targetLevel > currentLevel) return 'upgrade';
    if (targetLevel < currentLevel) return 'downgrade';
    return 'current';
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-6xl p-0 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-purple-600 p-6 text-primary-content">
          <button
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-white hover:bg-white/20"
          >
            ✕
          </button>
          <h3 className="font-bold text-2xl mb-2">
            {currentPlan === 'free' ? 'Upgrade Your Plan' : 'Change Your Plan'}
          </h3>
          <p className="text-primary-content/80">
            {currentPlan === 'free' 
              ? 'Choose the plan that fits your needs' 
              : 'Upgrade for more credits or downgrade anytime'}
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Billing Toggle */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-3 bg-base-200 p-1 rounded-lg">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-md font-medium transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-success text-success-content'
                    : 'text-base-content/70 hover:text-base-content'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-6 py-2 rounded-md font-medium transition-all ${
                  billingCycle === 'annual'
                    ? 'bg-success text-success-content'
                    : 'text-base-content/70 hover:text-base-content'
                }`}
              >
                Annual
              </button>
              {billingCycle === 'annual' && (
                <span className="badge badge-error text-xs font-semibold">SAVE 50%</span>
              )}
            </div>
          </div>

          {/* Info Alert */}
          {currentPlan !== 'free' && (
            <div className="alert alert-info mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div className="text-sm">
                <div className="font-semibold">How plan changes work:</div>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li><strong>Upgrade:</strong> Get new plan credits immediately + keep your remaining credits</li>
                  <li><strong>Downgrade:</strong> Changes at end of billing period, you keep current plan until then</li>
                </ul>
              </div>
            </div>
          )}

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {currentPlans.map((plan) => {
              const isCurrentPlan = currentPlan.toLowerCase() === plan.planKey && billingCycle === currentBillingInterval;
              const comparison = getPlanComparison(plan.planKey);
              
              return (
                <div
                  key={plan.priceId}
                  className={`relative rounded-lg border-2 p-6 ${
                    plan.isFeatured
                      ? 'border-primary shadow-lg'
                      : 'border-base-300'
                  } ${isCurrentPlan ? 'opacity-60' : ''}`}
                >
                  {/* Popular Badge */}
                  {plan.isFeatured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="badge badge-primary badge-sm font-semibold">
                        POPULAR
                      </span>
                    </div>
                  )}

                  {/* 50% OFF Badge */}
                  {billingCycle === 'annual' && plan.priceAnchor && (
                    <div className="absolute -top-3 right-4">
                      <span className="badge badge-error badge-sm font-semibold">
                        50% OFF
                      </span>
                    </div>
                  )}

                  {/* Current Plan Badge */}
                  {isCurrentPlan && (
                    <div className="absolute -top-3 left-4">
                      <span className="badge badge-success badge-sm font-semibold">
                        CURRENT
                      </span>
                    </div>
                  )}

                  {/* Upgrade/Downgrade Badge */}
                  {!isCurrentPlan && comparison === 'upgrade' && (
                    <div className="absolute -top-3 left-4">
                      <span className="badge badge-info badge-sm font-semibold">
                        ⬆ UPGRADE
                      </span>
                    </div>
                  )}

                  {!isCurrentPlan && comparison === 'downgrade' && (
                    <div className="absolute -top-3 left-4">
                      <span className="badge badge-warning badge-sm font-semibold">
                        ⬇ DOWNGRADE
                      </span>
                    </div>
                  )}

                  {/* Plan Name */}
                  <h4 className="text-xl font-bold mb-1">{plan.name}</h4>
                  <p className="text-sm text-base-content/70 mb-4">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mb-4">
                    <div className="flex items-end gap-2 mb-1">
                      {plan.priceAnchor && (
                        <span className="text-base text-error line-through">
                          ${plan.priceAnchor}
                        </span>
                      )}
                      <span className={`text-4xl font-extrabold ${billingCycle === 'annual' ? 'text-success' : ''}`}>
                        ${plan.price}
                      </span>
                      <span className="text-sm text-base-content/60 mb-1">
                        /month
                      </span>
                    </div>
                    {billingCycle === 'annual' && (
                      <p className="text-xs text-base-content/60">
                        Billed annually
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <svg
                          className="w-5 h-5 text-success shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Upgrade/Downgrade Info */}
                  {!isCurrentPlan && comparison === 'upgrade' && currentPlan !== 'free' && (
                    <div className="alert alert-success mb-3 py-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-xs">Instant upgrade + keep current credits</span>
                    </div>
                  )}

                  {!isCurrentPlan && comparison === 'downgrade' && (
                    <div className="alert alert-warning mb-3 py-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <span className="text-xs">Changes at end of billing period</span>
                    </div>
                  )}

                  {/* Button */}
                  {isCurrentPlan ? (
                    <button className="btn btn-disabled btn-block" disabled>
                      Current Plan
                    </button>
                  ) : (
                    <ButtonCheckout 
                      priceId={plan.priceId} 
                      mode="subscription"
                      buttonText={comparison === 'upgrade' ? 'Upgrade Now' : comparison === 'downgrade' ? 'Downgrade' : 'Subscribe'}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-base-200 p-4 text-center">
          <p className="text-sm text-base-content/60">
            All plans include unlimited AI detection • Credits reset monthly • Cancel anytime
          </p>
        </div>
      </div>
      <div className="modal-backdrop bg-black/50" onClick={onClose}></div>
    </div>
  );
};

export default PricingModal;