"use client";

import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full text-center">
            <h1 className="text-4xl font-bold text-red-600 mb-4">Critical Error</h1>
            <h2 className="text-xl font-semibold mb-2">Something went wrong at the root level</h2>
            <p className="text-gray-600 mb-6">
              {error.message || "A fatal error occurred."}
            </p>
            <div className="space-x-4">
              <button
                onClick={() => reset()}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Try again
              </button>
              <Link
                href="/"
                className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-100 transition inline-block"
              >
                Go Home
              </Link>
            </div>
            {error.digest && (
              <p className="mt-4 text-xs text-gray-400">Error ID: {error.digest}</p>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}
