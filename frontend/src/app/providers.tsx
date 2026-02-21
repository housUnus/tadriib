// src/app/providers.tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { useCurrentUser } from "@/hooks/use-user";

function UserInitializer() {
    useCurrentUser();
    return null;
}

export function Providers({ children }: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                refetchOnMount: false,
                refetchOnReconnect: false,
                staleTime: 1000 * 60 * 5,
            },
        },
    }));

    return (
        <QueryClientProvider client={queryClient}>
            <UserInitializer />
            {children}
        </QueryClientProvider>
    );
}
