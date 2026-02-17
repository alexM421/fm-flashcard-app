import { useCallback } from "react";
import { useAuthContext } from "./AuthContext/AuthContext";

type methodType = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

export const apiWrapper = async <T,>(
    endpoint: string,
    options?: {
        method?: methodType;
        headers?: HeadersInit;
        body?: unknown;
        accessToken?: string | null;
    },
): Promise<T> => {
    const response = await fetch(`${baseUrl}${endpoint}`, {
        method: options?.method ?? "GET",
        headers: {
            "Content-Type": "application/json",
            ...(options?.accessToken && { Authorization: `Bearer ${options.accessToken}` }),
            ...options?.headers,
        },
        body: options?.body ? JSON.stringify(options.body) : undefined,
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
            `HTTP error! status: ${response.status}, message: ${errorText}`,
        );
    }

    if (response.status === 204) {
        return undefined as T;
    }

    return await response.json();
};

/** Use in components/hooks to get an API client that automatically sends the current session token. */
export function useApiWrapper() {
    const session = useAuthContext();

    return useCallback(
        async <T,>(
            endpoint: string,
            options?: {
                method?: methodType;
                headers?: HeadersInit;
                body?: unknown;
            },
        ): Promise<T> => {
            return apiWrapper<T>(endpoint, {
                ...options,
                accessToken: session?.access_token ?? undefined,
            });
        },
        [session?.access_token],
    );
}