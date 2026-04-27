/* eslint-disable @typescript-eslint/no-explicit-any */
// app/providers.tsx or src/providers/QueryProvider.tsx
"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';


export default function QueryProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () => new QueryClient({
      defaultOptions: {
        queries: {
          // Cache duration - show cached data instantly
          staleTime: 5 * 60 * 1000,      // 5 minutes - data considered fresh
          gcTime: 30 * 60 * 1000,        // 30 minutes - keep in cache
          
          // Retry logic
          retry: 2,                       // Retry failed requests twice
          retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
          
          // Refetch behavior
          refetchOnWindowFocus: false,    // Don't refetch on tab focus
          refetchOnMount: true,           // Refetch if stale
          refetchOnReconnect: false,      // Don't refetch on reconnect
          
          // UI behavior
          placeholderData: (previousData: any) => previousData, // Show old data while fetching
        },
      },
    })
  );

  return (
    <QueryClientProvider client={queryClient}>
       <ReactQueryStreamedHydration>
        {children}
      </ReactQueryStreamedHydration>
      
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}