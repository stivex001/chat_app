"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, ReactNode } from "react";
import { useAuthStore } from "@/store/authStore";

interface RouteGuardProps {
  children: ReactNode;
  publicRoutes?: string[];
}

export default function RouteGuard({
  children,
  publicRoutes = [],
}: RouteGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { currentUser, accessToken } = useAuthStore();

  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = (): void => {
      const isPublicRoute = publicRoutes.some((route: string) => {
        if (route.endsWith("*")) {
          const baseRoute = route.slice(0, -1);
          return pathname.startsWith(baseRoute);
        }
        return pathname === route;
      });

      const isLoggedIn = !!currentUser && !!accessToken;

      if (!isPublicRoute && !isLoggedIn) {
        setAuthorized(false);
        localStorage.setItem("redirectAfterLogin", pathname);
        router.replace("/auth/login");
      } else {
        setAuthorized(true);
      }

      setLoading(false);
    };

    checkAuth();
  }, [pathname, router, publicRoutes, currentUser]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return authorized ? children : null;
}
