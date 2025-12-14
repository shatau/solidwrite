"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import logo from "@/app/icon.png";
import config from "@/config";
import PricingModal from "./PricingModal";

const HeaderDashboard = ({ refreshTrigger, onDataLoaded }) => {
  const { data: session } = useSession();
  const [credits, setCredits] = useState(null);
  const [userPlan, setUserPlan] = useState('free');
  const [loading, setLoading] = useState(true);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [cancelAtPeriodEnd, setCancelAtPeriodEnd] = useState(false);
  const [subscriptionEndDate, setSubscriptionEndDate] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, [refreshTrigger]);

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/user/credits');
      const data = await response.json();

      if (response.ok) {
        setCredits(data.credits);
        setUserPlan(data.plan || 'free');
        setCancelAtPeriodEnd(data.cancelAtPeriodEnd || false);
        setSubscriptionEndDate(data.subscriptionEndDate || null);

        if (onDataLoaded) {
          onDataLoaded({
            credits: data.credits,
            plan: data.plan || 'free'
          });
        }
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateCredits = (newCredits) => {
    setCredits(newCredits);
  };

  const getPlanBadgeColor = (plan) => {
    switch (plan.toLowerCase()) {
      case 'basic': return 'bg-blue-100 text-blue-700';
      case 'pro': return 'bg-blue-600 text-white';
      case 'ultra': return 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const handleManageSubscription = async () => {
    try {
      const response = await fetch('/api/stripe/create-portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ returnUrl: window.location.href }),
      });

      const data = await response.json();

      if (response.ok && data.url) {
        window.location.href = data.url;
      } else {
        alert('Unable to access billing portal');
      }
    } catch (error) {
      console.error('Error accessing billing portal:', error);
      alert('Failed to open billing portal');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <>
      <header className="w-full bg-white/80 backdrop-blur-2xl border-b border-gray-100/50 sticky top-0 z-40 shadow-sm">
        <nav className="container flex items-center justify-between px-6 py-4 mx-auto">
          {/* Logo */}
          <Link
            className="flex items-center gap-2.5 shrink-0 group"
            href="/"
            title={`${config.appName}`}
          >
            <Image
              src={logo}
              alt={`${config.appName} logo`}
              className="w-9 h-9 transition-transform group-hover:scale-105"
              placeholder="blur"
              priority={true}
              width={36}
              height={36}
            />
            <span className="font-bold text-xl tracking-tight text-gray-900">{config.appName}</span>
          </Link>

          {/* Center - Credits Display */}
          <div className="hidden md:flex items-center gap-3 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 px-6 py-2.5 rounded-full shadow-sm">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-blue-600"
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
              <div>
                <div className="text-sm font-semibold text-gray-900">
                  {loading ? (
                    <span className="inline-block w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <>{credits?.toLocaleString() || '0'} credits</>
                  )}
                </div>
                <div className="text-xs text-gray-600">
                  {userPlan.charAt(0).toUpperCase() + userPlan.slice(1)} Plan
                  {cancelAtPeriodEnd && subscriptionEndDate && (
                    <span className="text-yellow-600 ml-1">
                      (Ends {formatDate(subscriptionEndDate)})
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Upgrade Button + Profile */}
          <div className="flex items-center gap-3">
            {/* Upgrade Button */}
            {userPlan === 'free' && (
              <button
                onClick={() => setShowPricingModal(true)}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all shadow-sm hover:shadow-md text-sm flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
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
                <span className="hidden sm:inline">Upgrade</span>
              </button>
            )}

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-sm"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                {session?.user?.name?.[0]?.toUpperCase() ||
                  session?.user?.email?.[0]?.toUpperCase() ||
                  'U'}
              </button>

              {showProfileMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setShowProfileMenu(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 z-20">
                    {/* User Info Section */}
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                          {session?.user?.name?.[0]?.toUpperCase() ||
                            session?.user?.email?.[0]?.toUpperCase() ||
                            'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm text-gray-900 truncate">
                            {session?.user?.name || 'User'}
                          </div>
                          <div className="text-xs text-gray-600 truncate">
                            {session?.user?.email}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Cancellation Notice */}
                    {cancelAtPeriodEnd && subscriptionEndDate && (
                      <div className="p-3 bg-yellow-50 border-b border-yellow-100">
                        <div className="flex items-start gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          <div className="text-xs text-yellow-800">
                            <div className="font-semibold">Subscription Ending</div>
                            <div>Access until {formatDate(subscriptionEndDate)}</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Plan & Credits Info */}
                    <div className="p-3 space-y-2">
                      <div className="flex items-center justify-between py-2">
                        <span className="text-sm text-gray-600">Current Plan</span>
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${getPlanBadgeColor(userPlan)}`}>
                          {userPlan.toUpperCase()}
                        </span>
                      </div>

                      <div className="flex items-center justify-between py-2">
                        <span className="text-sm text-gray-600">Credits</span>
                        <span className="font-semibold text-sm text-gray-900">
                          {loading ? (
                            <span className="inline-block w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></span>
                          ) : (
                            credits?.toLocaleString() || '0'
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="border-t border-gray-100"></div>

                    {/* Action Items */}
                    <div className="p-2">
                      {userPlan === 'free' && (
                        <button
                          onClick={() => {
                            setShowPricingModal(true);
                            setShowProfileMenu(false);
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                        >
                          <svg
                            className="w-4 h-4"
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
                      )}

                      {userPlan !== 'free' && (
                        <button
                          onClick={handleManageSubscription}
                          className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                            />
                          </svg>
                          {cancelAtPeriodEnd ? 'Renew Subscription' : 'Manage Billing'}
                        </button>
                      )}

                      <Link
                        href="/"
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                          />
                        </svg>
                        Home
                      </Link>
                    </div>

                    <div className="border-t border-gray-100"></div>

                    <div className="p-2">
                      <button
                        onClick={() => {
                          window.location.href = '/api/auth/signout';
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        Sign Out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </nav>

        {/* Mobile Credits Display */}
        <div className="md:hidden border-t border-gray-100 px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-blue-600"
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
              <span className="text-sm font-semibold text-gray-900">
                {loading ? (
                  <span className="inline-block w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>{credits?.toLocaleString() || '0'} credits</>
                )}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${getPlanBadgeColor(userPlan)}`}>
                {userPlan.toUpperCase()}
              </span>
              {cancelAtPeriodEnd && (
                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-xs font-semibold">
                  Ending Soon
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Pricing Modal */}
      <PricingModal
        isOpen={showPricingModal}
        onClose={() => setShowPricingModal(false)}
        currentPlan={userPlan}
      />
    </>
  );
};

export default HeaderDashboard;