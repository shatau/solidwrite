import connectMongo from "@/libs/mongoose";
import User from "@/models/User";

export async function deductCredits(userId, wordCount) {
  await connectMongo();
  
  const user = await User.findById(userId);
  
  if (!user) {
    throw new Error('User not found');
  }
  
  if (user.credits < wordCount) {
    throw new Error('Insufficient credits');
  }
  
  user.credits -= wordCount;
  await user.save();
  
  return {
    remainingCredits: user.credits,
    deducted: wordCount
  };
}

export async function checkCredits(userId, wordCount) {
  await connectMongo();
  
  const user = await User.findById(userId);
  
  if (!user) {
    return { hasEnough: false, current: 0 };
  }
  
  return {
    hasEnough: user.credits >= wordCount,
    current: user.credits,
    plan: user.plan
  };
}