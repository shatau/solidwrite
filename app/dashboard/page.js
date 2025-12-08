import HeaderDashboard from '@/components/HeaderDashboard';
import TextHumanizer from '@/components/TextHumanizer';
import { auth } from "@/libs/auth";
import connectMongo from "@/libs/mongo";
import User from "@/models/User";

export default async function DashboardPage() {
  const session = await auth();
  
  await connectMongo();
  let user = await User.findOne({ email: session.user.email });

  if (!user) {
    user = await User.create({
      email: session.user.email,
      name: session.user.name,
      image: session.user.image,
      credits: 0,
      plan: 'free'
    });
  }

  return (
    <>
      <HeaderDashboard />
      <main className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 py-12 px-4">
        <TextHumanizer 
          initialCredits={user.credits}
          userPlan={user.plan || 'free'}
        />
      </main>
    </>
  );
}