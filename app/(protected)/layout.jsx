"use client";
import { useAuth } from "@/app/_lib/AuthContext";
import { useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { LoadingBarPage } from "@/app/_components/Loading";

function Protected({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const returnUrl = usePathname();
  useLayoutEffect(() => {
    if (!loading && !user) {
      router.push(`/user/signin?returnUrl=${returnUrl}`);
    }
  }, [loading, user]);
  if (loading || !user) return <LoadingBarPage />;
  return <>{children}</>;
}

export default Protected;
