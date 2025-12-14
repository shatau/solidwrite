/* eslint-disable @next/next/no-img-element */
"use client";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import config from "@/config";

const ButtonSignin = ({ 
  text = "Sign In", 
  authenticatedText = "Dashboard",
  extraStyle 
}) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const handleClick = () => {
    if (status === "authenticated") {
      router.push("/dashboard");
    } else {
      router.push("/signin");
    }
  };

  if (status === "authenticated") {
    return (
      <Link
        href="/dashboard"
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