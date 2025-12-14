import Image from "next/image";

import { getSEOTags } from "@/libs/seo";
import config from "@/config";
import logo from "@/app/icon.png";



export async function generateMetadata({ params: { lang } }) {
  const metadata = await getSEOTags({
    title: `${config.appName} Magic Link`,
      description: "SolidWrite Magic Link was sent to user email and they can now log in.",
      canonicalUrlRelative: `/verify-request`,
  });
  return metadata;
}


export default function VerifyRequest() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-sm rounded-2xl shadow-lg bg-white">
        <div className="flex flex-col items-center text-center space-y-4 p-6">
          {/* Logo */}
     
          <div className="flex items-center justify-center gap-3 mb-8">
          <Image
            src={logo}
            width={48}
            height={48}
            alt="SolidWrite Logo"
          />
          <span className="text-2xl font-bold text-gray-900">SolidWrite</span>
        </div>
          {/* Main heading */}
          <h2 className="text-xl font-semibold text-gray-800">
            Check Your Email
          </h2>
          
          {/* Description */}
          <p className="text-gray-600">
            A signin link has been sent to your email address.
          </p>
          
          {/* Spam folder note */}
          <p className="text-sm text-gray-500">
            Please also check your <u>spam</u> folder if you cannot find the email.
          </p>

          {/* Website domain */}
          <p className="text-sm text-gray-400">
            <a href="https://solidwrite.com" target="_blank" rel="noopener noreferrer">
              SolidWrite.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
