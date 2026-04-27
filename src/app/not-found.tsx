/* eslint-disable react/no-unescaped-entities */
"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-white px-4 text-center">

      {/* Big 404 */}
      <h1 className="text-7xl md:text-8xl font-extrabold text-orange-500">
        404
      </h1>

      {/* Title */}
      <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-gray-800">
        Oops! Page not found
      </h2>

      {/* Description */}
      <p className="mt-2 text-gray-500 max-w-md">
        The page you're looking for doesn't exist or may have been moved.
      </p>

      {/* Buttons */}
      <div className="flex gap-4 mt-6">
        <Link
          href="/"
          className="px-5 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 active:scale-95 transition"
        >
          Go Home
        </Link>

        <button
          onClick={() => window.history.back()}
          className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 active:scale-95 transition"
        >
          Go Back
        </button>
      </div>

      {/* Fun visual element */}
      <div className="mt-10 text-6xl animate-bounce">
        😕
      </div>
    </div>
  );
}