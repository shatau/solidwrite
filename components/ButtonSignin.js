/* eslint-disable @next/next/no-img-element */
"use client";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import config from "@/config";

const ButtonSignin = ({ 
  text = "Sign In", 
  authenticatedText = "To Your Albums",
  extraStyle 
}) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const pathname = usePathname();

  // Extract language prefix from the pathname
  const match = pathname.match(/^\/([a-z]{2})/);
  const lang = match ? match[1] : 'en'; // Default to 'en' if no language prefix is found

  const callbackUrl = `/dashboard`; // Construct the callback URL with the language prefix

  const handleClick = () => {
    if (status === "authenticated") {
      router.push(callbackUrl);
    } else {
      signIn(undefined, { callbackUrl });
    }
  };

  if (status === "authenticated") {
    return (
      <Link
        href={callbackUrl}
        className={`btn ${extraStyle ? extraStyle : ""}`}
      >
        {authenticatedText}
      </Link>
    );
  }

  return (
    <button
      className={`btn ${extraStyle ? extraStyle : ""}`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default ButtonSignin;