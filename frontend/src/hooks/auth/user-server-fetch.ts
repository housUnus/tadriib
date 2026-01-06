import { auth } from "@/auth";
import type { Session as AuthSession } from 'next-auth';

type SessionWithToken = AuthSession & {
  access_token?: string; // optional because it may not exist
};

type RequestResult<T = any> = {
  data: T | null;
  error: string | null;
};

export const useServerFetch = async () => {

  const session: SessionWithToken | null = await auth();

  let isPending = false;
  let error = null;

  const request = async <T = any>(
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
    payload: any = null,
    headers: Record<string, string> = {}
  ): Promise<RequestResult<T>> => {
    isPending = true;
    error = null;
    try {
      const options = {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(session ? { Authorization: `Bearer ${session.access_token}` } : {}),
          ...headers,
        },
        body: payload ? JSON.stringify(payload) : undefined,
      };

      const response = await fetch(`${process.env.API_SERVER_BASE_URL}${url}`, options);
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        let errorData: any = data ?? response.statusText;
        if (typeof errorData === "string") {
          try {
            errorData = JSON.parse(errorData);
          } catch {
          }
        }

        return { data: null, error: errorData };
      }


      isPending = false;
      return { data, error: null };

    } catch (err: any) {

      isPending = false;
      error = err?.message || "Could not fetch data";
      console.log('error', error)
      console.error(`Server-side fetch error:`, err);
      return { data: null, error };
    }
  };

  // Return methods for different HTTP actions
  return {
    fetch: ({ url, method = "GET", payload, headers = {} }: { url: string, method?: "GET" | "POST" | "PUT" | "DELETE", payload?: any, headers?: any }) => request(url, method, payload, headers),
    get: (url: string, headers = {}) => request(url, "GET", null, headers),
    post: (url: string, payload: any, headers = {}) => request(url, "POST", payload, headers),
    put: (url: string, payload: any, headers = {}) => request(url, "PUT", payload, headers),
    delete: (url: string, headers = {}) => request(url, "DELETE", null, headers),
    isPending,
    error,
  };
};
