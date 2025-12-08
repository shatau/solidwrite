'use client';

import { useState } from 'react';
import { X, Check, Info } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 px-6 py-5 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-slate-900">
                {currentPlan === 'free' ? 'Upgrade Your Plan' : 'Change Your Plan'}
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                {currentPlan === 'free' 
                  ? 'Choose the plan that fits your needs' 
                  : 'Upgrade for more credits or downgrade anytime'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Billing Toggle */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-1 bg-slate-100 p-1 rounded-full">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  billingCycle === 'annual'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Annual
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  billingCycle === 'annual' ? 'bg-emerald-500 text-white' : 'bg-emerald-100 text-emerald-700'
                }`}>
                  -50%
                </span>
              </button>
            </div>
          </div>

          {/* Info Alert */}
          {currentPlan !== 'free' && (
            <div className="flex items-start gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl mb-6">
              <Info className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-slate-600">
                <div className="font-medium text-slate-900 mb-1">How plan changes work:</div>
                <ul className="space-y-1">
                  <li><span className="font-medium">Upgrade:</span> Get new plan credits immediately + keep your remaining credits</li>
                  <li><span className="font-medium">Downgrade:</span> Changes at end of billing period, you keep current plan until then</li>
                </ul>
              </div>
            </div>
          )}

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentPlans.map((plan) => {
              const isCurrentPlan = currentPlan.toLowerCase() === plan.planKey && billingCycle === currentBillingInterval;
              const comparison = getPlanComparison(plan.planKey);
              
              return (
                <div
                  key={plan.priceId}
                  className={`relative rounded-xl border p-5 transition-all ${
                    plan.isFeatured
                      ? 'border-emerald-500 shadow-lg shadow-emerald-500/10'
                      : 'border-slate-200 hover:border-slate-300'
                  } ${isCurrentPlan ? 'opacity-60' : ''}`}
                >
                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {plan.isFeatured && (
                      <span className="text-xs px-2 py-0.5 bg-emerald-500 text-white rounded-full font-medium">
                        Popular
                      </span>
                    )}
                    {billingCycle === 'annual' && plan.priceAnchor && (
                      <span className="text-xs px-2 py-0.5 bg-red-500 text-white rounded-full font-medium">
                        50% OFF
                      </span>
                    )}
                    {isCurrentPlan && (
                      <span className="text-xs px-2 py-0.5 bg-slate-900 text-white rounded-full font-medium">
                        Current
                      </span>
                    )}
                    {/* {!isCurrentPlan && comparison === 'upgrade' && (
                      <span className="text-xs px-2 py-0.5 bg-blue-500 text-white rounded-full font-medium">
                        ↑ Upgrade
                      </span>
                    )} */}
                    {/* {!isCurrentPlan && comparison === 'downgrade' && (
                      <span className="text-xs px-2 py-0.5 bg-amber-500 text-white rounded-full font-medium">
                        ↓ Downgrade
                      </span>
                    )} */}
                  </div>

                  {/* Plan Name */}
                  <h4 className="text-lg font-semibold text-slate-900 mb-1">{plan.name}</h4>
                  <p className="text-xs text-slate-500 mb-4">{plan.description}</p>

                  {/* Price */}
                  <div className="mb-4">
                    <div className="flex items-baseline gap-2">
                      {plan.priceAnchor && (
                        <span className="text-sm text-slate-400 line-through">${plan.priceAnchor}</span>
                      )}
                      <span className="text-3xl font-bold text-slate-900">${plan.price}</span>
                      <span className="text-sm text-slate-500">/month</span>
                    </div>
                    {billingCycle === 'annual' && (
                      <p className="text-xs text-slate-400 mt-1">Billed annually</p>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-2 mb-5">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Upgrade/Downgrade Info */}
                  {!isCurrentPlan && comparison === 'upgrade' && currentPlan !== 'free' && (
                    <div className="flex items-center gap-2 p-2 bg-emerald-50 border border-emerald-100 rounded-lg mb-3">
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span className="text-xs text-emerald-700">Instant upgrade + keep credits</span>
                    </div>
                  )}

                  {!isCurrentPlan && comparison === 'downgrade' && (
                    <div className="flex items-center gap-2 p-2 bg-amber-50 border border-amber-100 rounded-lg mb-3">
                      <Info className="w-4 h-4 text-amber-600 flex-shrink-0" />
                      <span className="text-xs text-amber-700">Changes at end of billing</span>
                    </div>
                  )}

                  {/* Button */}
                  {isCurrentPlan ? (
                    <button 
                      className="w-full py-2.5 px-4 bg-slate-100 text-slate-400 rounded-xl text-sm font-medium cursor-not-allowed"
                      disabled
                    >
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
        <div className="flex-shrink-0 px-6 py-4 bg-slate-50 border-t border-slate-100">
          <p className="text-center text-xs text-slate-500">
            All plans include unlimited AI detection • Credits reset monthly • Cancel anytime
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingModal;