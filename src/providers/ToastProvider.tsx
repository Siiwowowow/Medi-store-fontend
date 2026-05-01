// src/providers/ToastProvider.tsx

"use client";

import { Toaster } from "react-hot-toast";

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 3000,
        style: {
          background: '#363636',
          color: '#fff',
          fontFamily: 'Poppins, sans-serif',
          fontSize: '13px',
          borderRadius: '12px',
          padding: '12px 16px',
        },
        success: {
          duration: 3000,
          iconTheme: {
            primary: '#3b9c3c',
            secondary: '#fff',
          },
          style: {
            background: '#063c28',
            color: '#fff',
          },
        },
        error: {
          duration: 4000,
          iconTheme: {
            primary: '#ef4444',
            secondary: '#fff',
          },
          style: {
            background: '#7f1d1d',
            color: '#fff',
          },
        },
        loading: {
          duration: 2000,
          style: {
            background: '#1e293b',
            color: '#fff',
          },
        },
      }}
    />
  );
}