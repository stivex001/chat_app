"use client";

import { AuthUtils } from "@/constants/api_management/AuthUtil";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, ReactNode } from "react";

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
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Authentication check function
    const checkAuth = (): void => {
      // Check if the current path is in the public routes list
      const isPublicRoute = publicRoutes.some((route: string) => {
        // Support exact matches and pattern matches with wildcard
        if (route.endsWith("*")) {
          const baseRoute = route.slice(0, -1);
          return pathname.startsWith(baseRoute);
        }
        return pathname === route;
      });

      // Check if user is logged in
      // const token = localStorage.getItem("token");
      const isAuth = AuthUtils.isAuthenticated();
      const isLoggedIn = !!isAuth;

      // If route is not public and user is not logged in, redirect to login
      if (!isPublicRoute && !isLoggedIn) {
        setAuthorized(false);
        // Store the attempted URL to redirect back after login
        localStorage.setItem("redirectAfterLogin", pathname);
        // router.push("/not-authorized");
        router.push("/");
      } else {
        setAuthorized(true);
      }

      setLoading(false);
    };

    // Run auth check on initial load and route change
    checkAuth();
  }, [pathname, router, publicRoutes]);

  // Show loading or unauthorized state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If authorized, render children
  return authorized ? children : null;
}
