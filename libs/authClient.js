"use client";

import { useSession as useNextAuthSession } from "next-auth/react";
import { signIn as nextAuthSignIn, signOut as nextAuthSignOut } from "next-auth/react";

// Re-export NextAuth v5 client functions
export { SessionProvider } from "next-auth/react";

// useSession hook
export function useSession() {
  return useNextAuthSession();
}

// signIn function
export async function signIn(provider, options) {
  return nextAuthSignIn(provider, options);
}

// signOut function
export async function signOut(options) {
  return nextAuthSignOut(options);
}