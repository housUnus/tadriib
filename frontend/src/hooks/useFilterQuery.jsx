"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";

const schemas = {
  price: { type: "array" },
  level: { type: "array" },
  sortBy: { type: "string" },
};

function parseParam(key, values, schemas) {
  const schema = schemas[key];

  if (!schema) return values.length > 1 ? values : values[0];

  switch (schema.type) {
    case "array":
      return values.flatMap((v) => v.split(",").map((x) => x.trim()));

    case "string":
      return values[0] ?? "";

    default:
      return values.length > 1 ? values : values[0];
  }
}

export function useFilterQuery({ key, fetcher, defaultValues = {}, schemas = {} }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get all current query parameters as an object
  const params = useMemo(() => {
    const obj = {};

    for (const key of searchParams.keys()) {
      const values = searchParams.getAll(key);
      obj[key] = parseParam(key, values, schemas);
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
