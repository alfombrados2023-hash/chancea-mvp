"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const authData = localStorage.getItem("chancea-auth");
    if (authData) {
      try {
        const parsed = JSON.parse(authData);
        if (parsed.state?.isAuthenticated) {
          router.replace("/home");
          return;
        }
      } catch {
        // ignore
      }
    }
    router.replace("/onboarding");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary">
      <div className="text-center">
        <h1 className="text-4xl font-black bg-gradient-to-r from-accent-primary to-[#FF8F65] bg-clip-text text-transparent animate-pulse">
          Chancea
        </h1>
      </div>
    </div>
  );
}
