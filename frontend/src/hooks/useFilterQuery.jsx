"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";

export function useFilterQuery({ key, fetcher, defaultValues = {} }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get all current query parameters as an object
  const params = useMemo(() => {
    const obj = {};

    for (const key of searchParams.keys()) {
      const values = searchParams.getAll(key);

      // Take the single value or array of values
      let value = values.length > 1 ? values : values[0];

      // Convert comma-separated strings like "100,200" → ["100", "200"]
      if (typeof value === "string" && value.includes(",")) {
        value = value.split(",").map((v) => v.trim());
      }

      obj[key] = value;
    }

    return { ...defaultValues, ...obj };
  }, [searchParams, defaultValues]);

  // Update URL with new filters
  const setParams = (newParams) => {
    const updated = { ...params, ...newParams };

    // Remove undefined or empty params
    Object.keys(updated).forEach((key) => {
      if (
        updated[key] === undefined ||
        updated[key] === "" ||
        updated[key]?.length === 0
      ) {
        delete updated[key];
      }
    });

    // Convert to search string
    const search = new URLSearchParams(updated).toString();
    router.push(`?${search}`, { scroll: false });
  };

  const { fetch, ...query } = useQuery({
    queryKey: [key, params],
    queryFn: () => fetcher(params),
    keepPreviousData: true,
  });

  return {
    params,
    setParams,
    fetch,
    ...query,
  };
}
