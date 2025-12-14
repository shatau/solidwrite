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
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5]">
        <div className="w-12 h-12 rounded-full border-2 border-gray-200 border-t-blue-500 animate-spin"></div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <>
      <HeaderDashboard onDataLoaded={handleDataLoaded} />
      <main className="relative min-h-screen bg-[#F5F5F5] py-16 px-4 overflow-hidden">
        {/* Subtle grid pattern matching Hero */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        {/* Gradient orbs matching Hero */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-gradient-to-br from-purple-200/40 to-blue-100/40 rounded-full blur-3xl" />
        
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