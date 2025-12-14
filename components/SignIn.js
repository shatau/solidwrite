"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import logo from "@/app/icon.png";

export default function SignIn() {
  const handleEmailSignIn = () => {
    const emailInput = document.querySelector('input[type="email"]');
    if (emailInput?.value) {
      signIn("email", { email: emailInput.value, callbackUrl: "/dashboard" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 sm:p-8 bg-white">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-3 mb-8">
          <Image
            src={logo}
            width={48}
            height={48}
            alt="SolidWrite Logo"
          />
          <span className="text-2xl font-bold text-gray-900">SolidWrite</span>
        </div>

        {/* Email Form */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="email@example.com"
              className="w-full border-2 border-gray-200 rounded-xl py-3 px-4 focus:border-blue-200 focus:outline-none transition-colors duration-200"
            />
          </div>
          <button
            onClick={handleEmailSignIn}
            className="w-full bg-primary hover:bg-primary text-white font-medium rounded-xl py-3 px-4 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Sign in with Email
          </button>
        </div>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500 font-medium">or</span>
          </div>
        </div>

        {/* Google Sign In Button */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-full flex items-center bg-blue-100 justify-center gap-3 border-2 border-gray-200 hover:border-gray-300 rounded-xl py-3 px-4 mb-6 transition-all duration-200 hover:shadow-md group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
            <path fill="#4caf50" d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z"></path>
            <path fill="#1e88e5" d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z"></path>
            <polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"></polygon>
            <path fill="#c62828" d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z"></path>
            <path fill="#fbc02d" d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z"></path>
          </svg>
          <span className="font-medium text-gray-700 group-hover:text-gray-900">Quick Sign In with Google</span>
        </button>

        <div>
          <p className="text-gray-500 text-center mt-2">
            By signing in, you agree to our{" "}
            <a href="/tos" className="hover:underline">
              Terms of Service
            </a>.
          </p>
        </div>
      </div>
    </div>


  );
}