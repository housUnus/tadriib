'use client';
import { useSession } from "next-auth/react";
import { useState } from "react";

export const useClientFetch = () => {
  const { data: session } = useSession();

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const request = async (url, method = 'GET', payload = null, headers = {}) => {
    setIsPending(true);
    setError(null);

    try {
      const options = {
        method,
        headers: {
          Authorization: `Bearer ${session?.token}`,
          'Content-Type': 'application/json',
          ...headers,
        },
      };

      if (payload) {
        options.body = JSON.stringify(payload);
      }

      const response = await fetch(url, options);
      if (!response.ok) throw new Error(response.statusText);
      
      const data = await response.json();
      setIsPending(false);
      return { data, error: null };
    } catch (error) {
      setIsPending(false);
      setError(`${error} Could not Fetch Data`);
      return { data: null, error: `${error} Could not Fetch Data` };
    }
  };

  // Return methods for different HTTP actions
  return {
    fetch: ({url, method = 'GET', payload, headers = {}}) => request(url, method, payload, headers),
    get: (url, headers = {}) => request(url, 'GET', null, headers),
    post: (url, payload, headers = {}) => request(url, 'POST', payload, headers),
    put: (url, payload, headers = {}) => request(url, 'PUT', payload, headers),
    delete: (url, headers = {}) => request(url, 'DELETE', null, headers),
    isPending,
    error,
  };
};
