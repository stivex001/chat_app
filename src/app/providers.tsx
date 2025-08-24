'use client';
import RouteGuard from '@/components/RouteGuard';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode } from 'react';

const queryClient = new QueryClient();

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const publicRoutes = [
  
    '/auth/login',
    '/admin-auth/login',
    '/admin-auth/verify-account',
    '/admin-auth/reset-password',
    '/auth/register',
    '/auth/verify-account',
    '/auth/forgot-password',
    '/about',
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <RouteGuard publicRoutes={publicRoutes}>{children}</RouteGuard>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
