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
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <UserInitializer />
            {children}
        </QueryClientProvider>
    );
}
