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
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <>
      <HeaderDashboard onDataLoaded={handleDataLoaded} />
      <main className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 py-12 px-4">
        <TextHumanizer 
          initialCredits={userData.credits}
          userPlan={userData.plan}
          onCreditsUpdate={handleCreditsUpdate}
        />
      </main>
    </>
  );
}