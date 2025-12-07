'use client';

import { useState } from 'react';
import HeaderDashboard from '@/components/HeaderDashboard';
import TextHumanizer from '@/components/TextHumanizer';

export default function DashboardPage() {
  const [userData, setUserData] = useState({
    credits: null,
    plan: 'free'
  });

  const handleDataLoaded = (data) => {
    setUserData(data);
  };

  const handleCreditsUpdate = (newCredits) => {
    setUserData(prev => ({ ...prev, credits: newCredits }));
  };

  return (
    <>
      <HeaderDashboard 
        onDataLoaded={handleDataLoaded}
      />
      <main className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50  py-12 px-4">
        <TextHumanizer 
          initialCredits={userData.credits}
          userPlan={userData.plan}
          onCreditsUpdate={handleCreditsUpdate}
        />
      </main>
    </>
  );
}