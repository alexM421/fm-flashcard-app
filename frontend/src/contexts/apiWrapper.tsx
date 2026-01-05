type methodType = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

const baseUrl = "http://localhost:3001";
	
export const apiWrapper = async <T,> (
    endpoint: string,
    options?: {
        method?: methodType;
        headers?: HeadersInit; 
        body?: unknown;
    },
): Promise<T> => {

    const response = await fetch(`${baseUrl}${endpoint}`, {
        method: options?.method ?? "GET",
        headers: {
            "Content-Type": "application/json",
            ...options?.headers
        },
        body: options?.body ? JSON.stringify(options.body) : undefined
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
            `HTTP error! status: ${response.status}, message: ${errorText}`,
        );
    }

    if(response.status === 204){
        return undefined as T
    }

    return await response.json();
};