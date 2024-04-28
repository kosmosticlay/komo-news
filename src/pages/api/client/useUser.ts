import { url } from "inspector";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

export default function useUser() {
  const { data, error } = useSWR("/api/user-profile");
  const router = useRouter();

  // console.log("data:", data); // {ok: true, profile: {…}}

  useEffect(() => {
    if (data && !data.ok) {
      router.replace("/login");
    }
  }, [data, router]);

  return { user: data?.profile, isLoading: !data && !error };
}
