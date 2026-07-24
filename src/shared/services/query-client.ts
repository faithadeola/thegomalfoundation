import { QueryClient } from "@tanstack/react-query";

export function makeQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry: (failureCount, error) => {
          // Don't retry on 4xx errors
          if (
            error instanceof Error &&
            "status" in error &&
            typeof (error as { status: unknown }).status === "number" &&
            (error as { status: number }).status < 500
          ) {
            return false;
          }
          return failureCount < 2;
        },
      },
    },
  });
}
