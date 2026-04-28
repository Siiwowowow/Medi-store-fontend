"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-orange-50 to-white px-4">
      <div className="max-w-md w-full text-center">

        {/* Icon */}
        <div className="mb-6">
          <div className="w-24 h-24 mx-auto bg-orange-100 rounded-full flex items-center justify-center">
            <span className="text-5xl">⚠️</span>
          </div>
        </div>

        {/* Error Code */}
        <h1 className="text-5xl font-bold text-orange-500 mb-2">
          500
        </h1>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Something went wrong
        </h2>

        {/* Message */}
        <p className="text-gray-500 mb-6">
          {error.message || "An unexpected error occurred. Please try again."}
        </p>

        {/* Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => reset()}
            className="w-full px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 active:scale-95 transition"
          >
            Try Again
          </button>

          <button
            onClick={() => window.location.reload()}
            className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 active:scale-95 transition"
          >
            Reload Page
          </button>

          <Link
            href="/"
            className="block w-full px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Go to Home
          </Link>
        </div>

        {/* Extra Help Text */}
        <p className="mt-6 text-xs text-gray-400">
          If the problem persists, please try again later.
        </p>

        {/* Error ID */}
        {error.digest && (
          <p className="mt-2 text-[10px] text-gray-400">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}