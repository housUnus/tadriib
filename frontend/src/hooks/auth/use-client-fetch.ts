"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import {JwtSession} from "../../lib/schemas/auth";

/* -------------------------
   Types
-------------------------- */

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type FetchResult<T> = {
  data: T | null;
  error: string | null;
};

type RequestArgs<TPayload> = {
  url: string;
  method?: HttpMethod;
  payload?: TPayload;
  headers?: HeadersInit;
};

/* -------------------------
   Hook
-------------------------- */

export const useClientFetch = () => {
  const { data: session } = useSession() as {data: JwtSession | null};

  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const request = async <TResponse, TPayload = unknown>(
    url: string,
    method: HttpMethod = "GET",
    payload?: TPayload,
    headers: HeadersInit = {}
  ): Promise<FetchResult<TResponse>> => {
    setIsPending(true);
    setError(null);

    try {
      const options: RequestInit = {
        method,
        headers: {
          Authorization: session?.token
            ? `Bearer ${session.token}`
            : "",
          "Content-Type": "application/json",
          ...headers,
        },
      };

      if (payload !== undefined) {
        options.body = JSON.stringify(payload);
      }

      const response = await fetch(url, options);

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || response.statusText);
      }

      const data = (await response.json()) as TResponse;

      return { data, error: null };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unknown error";

      setError(message);
      return { data: null, error: message };
    } finally {
      setIsPending(false);
    }
  };

  /* -------------------------
     Public API
  -------------------------- */

  return {
    fetch: <TResponse, TPayload = unknown>(
      args: RequestArgs<TPayload>
    ) =>
      request<TResponse, TPayload>(
        args.url,
        args.method,
        args.payload,
        args.headers
      ),

    get: <TResponse>(url: string, headers?: HeadersInit) =>
      request<TResponse>(url, "GET", undefined, headers),

    post: <TResponse, TPayload>(
      url: string,
      payload: TPayload,
      headers?: HeadersInit
    ) =>
      request<TResponse, TPayload>(
        url,
        "POST",
        payload,
        headers
      ),

    put: <TResponse, TPayload>(
      url: string,
      payload: TPayload,
      headers?: HeadersInit
    ) =>
      request<TResponse, TPayload>(
        url,
        "PUT",
        payload,
        headers
      ),

    delete: <TResponse>(url: string, headers?: HeadersInit) =>
      request<TResponse>(url, "DELETE", undefined, headers),

    isPending,
    error,
  };
};
