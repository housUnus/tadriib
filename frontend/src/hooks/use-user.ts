"use client"
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/app/stores/user";
import { getMe } from "@/lib/actions/users";
import { UserInput } from "@/lib/schemas/users";

export const useCurrentUser = () => {
  const setUser = useUserStore((s) => s.setUser);

  const { data, isSuccess} = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setUser(data as UserInput);
    }
  }, [data, setUser]);

  return 

};