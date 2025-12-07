'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import PricingModal from '@/components/PricingModal';

export default function DashboardComp() {
  const { data: session } = useSession();
  const [credits, setCredits] = useState(null);
  const [userPlan, setUserPlan] = useState('free');
  const [loading, setLoading] = useState(true);
  const [showPricingModal, setShowPricingModal] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/user/credits');
      const data = await response.json();
      
      if (response.ok) {
        setCredits(data.credits);
        setUserPlan(data.plan || 'free');
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPlanBadgeColor = (plan) => {
    switch(plan.toLowerCase()) {
      case 'basic': return 'badge-info';
      case 'pro': return 'badge-primary';
      case 'ultra': return 'badge-secondary';
      default: return 'badge-ghost';
    }
  };

  return (
    <div className="min-h-screen bg-base-200 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-base-content/70 mt-1">
              Welcome back, {session?.user?.name || 'User'}!
            </p>
          </div>
          
          {/* Upgrade Button */}
          <button
            onClick={() => setShowPricingModal(true)}
            className="btn btn-primary gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
            Upgrade Plan
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Credits Card */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-base-content/60 mb-1">Available Credits</p>
                  <h3 className="text-3xl font-bold">
                    {loading ? (
                      <span className="loading loading-spinner loading-md"></span>
                    ) : (
                      credits?.toLocaleString() || '0'
                    )}
                  </h3>
                </div>
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg
                    className="w-7 h-7 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-base-300 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{
                      width: credits
                        ? `${Math.min((credits / 5000) * 100, 100)}%`
                        : '0%',
                    }}
                  ></div>
                </div>
                <p className="text-xs text-base-content/60 mt-2">
                  1 word = 1 credit
                </p>
              </div>
            </div>
          </div>

          {/* Current Plan Card */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-base-content/60 mb-1">Current Plan</p>
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-bold capitalize">
                      {loading ? (
                        <span className="loading loading-spinner loading-md"></span>
                      ) : (
                        userPlan
                      )}
                    </h3>
                    {!loading && (
                      <span className={`badge ${getPlanBadgeColor(userPlan)} badge-sm`}>
                        {userPlan.toUpperCase()}
                      </span>
                    )}
                  </div>
                </div>
                <div className="w-14 h-14 rounded-full bg-success/10 flex items-center justify-center">
                  <svg
                    className="w-7 h-7 text-success"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                </div>
              </div>
              {userPlan === 'free' && (
                <button
                  onClick={() => setShowPricingModal(true)}
                  className="btn btn-sm btn-outline btn-primary mt-4"
                >
                  Upgrade Now
                </button>
              )}
            </div>
          </div>

          {/* Usage Stats Card */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-base-content/60 mb-1">This Month</p>
                  <h3 className="text-3xl font-bold">
                    {loading ? (
                      <span className="loading loading-spinner loading-md"></span>
                    ) : (
                      '0'
                    )}
                  </h3>
                  <p className="text-xs text-base-content/60 mt-1">requests</p>
                </div>
                <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center">
                  <svg
                    className="w-7 h-7 text-secondary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title mb-4">Quick Actions</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <a href="/humanize" className="btn btn-lg btn-outline gap-3 justify-start">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <div className="text-left">
                  <div className="font-semibold">Humanize Text</div>
                  <div className="text-xs opacity-70">Transform AI text</div>
                </div>
              </a>

              <a href="/detect" className="btn btn-lg btn-outline gap-3 justify-start">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <div className="text-left">
                  <div className="font-semibold">Detect AI</div>
                  <div className="text-xs opacity-70">Analyze content</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Modal */}
      <PricingModal
        isOpen={showPricingModal}
        onClose={() => setShowPricingModal(false)}
        currentPlan={userPlan}
      />
    </div>
  );
}