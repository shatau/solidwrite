'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import HeaderDashboard from '@/components/HeaderDashboard';
import TextHumanizer from '@/components/TextHumanizer';
import config from '@/config';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState({
    credits: null,
    plan: 'free'
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(config.auth.loginUrl);
    }
  }, [status, router]);

  const handleDataLoaded = (data) => {
    setUserData(data);
  };

  const handleCreditsUpdate = (newCredits) => {
    setUserData(prev => ({ ...prev, credits: newCredits }));
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 via-white to-slate-50">
        <div className="w-10 h-10 rounded-full border-2 border-slate-200 border-t-emerald-500 animate-spin"></div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <>
      <HeaderDashboard onDataLoaded={handleDataLoaded} />
      <main className="relative min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 py-12 px-4 overflow-hidden">
        {/* Background pattern matching Hero */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        <div className="relative max-w-7xl mx-auto">
          <TextHumanizer 
            initialCredits={userData.credits}
            userPlan={userData.plan}
            onCreditsUpdate={handleCreditsUpdate}
          />
        </div>
      </main>
    </>
  );
}