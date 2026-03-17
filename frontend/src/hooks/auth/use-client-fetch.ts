"use client";

import { UpdateSession, useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { JwtSession } from "../../lib/schemas/auth";

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

  const { data: session, update } = useSession() as { data: JwtSession | null, update: UpdateSession };

  const checkTokenValidity = async () => {
    const session = sessionRef.current

    if (!session) return

    const accessExpired = session.expiry.access - 60000 <= Date.now()
    const refreshExpired = session.expiry.refresh - 60000 <= Date.now()

    if (refreshExpired) {
      window.location.href = "/login"
      return
    }

    if (accessExpired) {
      await update({ refresh: true })
    }
  }

  const sessionRef = useRef(session)

  useEffect(() => {
    sessionRef.current = session
  }, [session])

  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const request = async <TResponse, TPayload = unknown>(
    url: string,
    method: HttpMethod = "GET",
    payload?: TPayload,
    headers: HeadersInit = {},
    retry = true
  ): Promise<FetchResult<TResponse>> => {
    setIsPending(true)
    setError(null)

    try {
      const isFormData = payload instanceof FormData

      await checkTokenValidity()

      const options: RequestInit = {
        method,
        headers: {
          ...(sessionRef.current?.access_token
            ? { Authorization: `Bearer ${sessionRef.current.access_token}` }
            : {}),
          ...(isFormData ? {} : { "Content-Type": "application/json" }),
          ...headers,
        },
        body: payload
          ? isFormData
            ? payload
            : JSON.stringify(payload)
          : undefined,
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_BASE_URL}${url}`,
        options
      )

      /* ---------- TOKEN EXPIRED ---------- */

      if (response.status === 401 && retry) {
        console.log("🚀 ~ updating")
        await update({ refresh: true }) // triggers NextAuth refresh token flow

        return request<TResponse, TPayload>(
          url,
          method,
          payload,
          headers,
          false // avoid infinite loop
        )
      }

      if (!response.ok) {
        const message = await response.text()
        throw new Error(message || response.statusText)
      }

      const data = (await response.json()) as TResponse

      return { data, error: null }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error"

      setError(message)
      return { data: null, error: message }
    } finally {
      setIsPending(false)
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
