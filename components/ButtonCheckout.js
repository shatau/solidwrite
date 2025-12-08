"use client";

import { useState } from "react";
import apiClient from "@/libs/api";
import config from "@/config";

const ButtonCheckout = ({ priceId, mode = "subscription", buttonText = "Subscribe" }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);

    try {
      const res = await apiClient.post("/stripe/create-checkout", {
        priceId,
        mode,
        successUrl: window.location.href,
        cancelUrl: window.location.href,
      });

      window.location.href = res.url;
    } catch (e) {
      console.error(e);
    }

    setIsLoading(false);
  };

  return (
    <button
      className="btn bg-blue-700 btn-block group text-white font-semibold"
      onClick={() => handlePayment()}
      disabled={isLoading}
    >
      {isLoading ? (
        <span className="loading loading-spinner loading-xs"></span>
      ) : (
        <>
          <svg
            className="w-5 h-5 fill-white group-hover:scale-110 transition-transform duration-200"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          {buttonText}
        </>
      )}
    </button>
  );
};

export default ButtonCheckout;