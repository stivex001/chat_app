'use client';
/* eslint-disable react-hooks/rules-of-hooks */
import { CustomButton } from '@/components/clickable/CustomButton';
import useDynamicForm from '@/hooks/useDynamicForm';
import { Field } from '@/schemas/dynamicSchema';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';
import loginAuth from '@/components/assets/images/delivery.jpg';
import ControlledInput from '../controlledInputs/ControlledInput';
import { useAuth } from '../../../api/crud/auth';
import AuthLayout from './AuthLayout';
import { AuthTitle } from './AuthTitle';
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

const fields: Field[] = [
  {
    name: 'email',
    type: 'text',
    errorMessage: 'Email is required',
    isRequired: true,
  },
  {
    name: 'password',
    type: 'text',
    errorMessage: 'Password is required',
    isRequired: true,
  },
];

const LoginContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');

  const { control, handleSubmit, formState } = useDynamicForm(fields, {});
  const { isValid } = formState;

  const { setAccessToken, accessToken, setCurrentUser, currentUser } =
    useAuthStore();

  const { login } = useFirebaseAuth();
  const { isPending, mutateAsync } = login;

  useEffect(() => {
    if (accessToken && currentUser && !redirect) {
      router.push('/');
    }
  }, [accessToken, currentUser, redirect]);

  const onSubmit = async (data: any) => {
    try {
      const response = await mutateAsync({
        email: data.email,
        password: data.password,
      });

      const token = response?.user?.accessToken;
      const user = response?.user;

      if (token) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCurrentUser({
            ...currentUser,
            ...docSnap.data(),
            id: user.uid,
          } as any);
          setAccessToken(token);
          toast.success('Login successful');

          if (redirect) {
            router.push(redirect);
          } else {
            router.push('/');
          }
        } else {
          toast.error('No user profile found in Firestore');
        }
      } else {
        toast.error('Invalid login response');
      }
    } catch (error: any) {
      console.error('Login error: ', error);
      toast.error(error?.message || 'Login failed');
    }
  };

  return (
    <AuthLayout
      authImg={loginAuth}
      title="Where Great Work Meets Real Opportunities"
      desc="Whether you're booking help or offering your skills, Artisanshub is your trusted space to connect, work, and grow."
    >
      <div className="flex flex-col gap-10">
        <AuthTitle title="Welcome Back!" desc="Enter your email and password" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5">
            <div className="flex w-full flex-col gap-5">
              <ControlledInput
                name="email"
                control={control}
                placeholder="Enter Email"
                type="text"
                label="Email"
                variant="primary"
                rules={{ required: true }}
              />
              <ControlledInput
                name="password"
                control={control}
                placeholder="Password"
                type="password"
                label="Password"
                variant="primary"
                rules={{ required: true }}
              />
              <Link
                href={'/auth/forgot-password'}
                className="text-primary flex items-center justify-end text-sm font-semibold"
              >
                forgot password?
              </Link>
            </div>
            <CustomButton
              type="submit"
              label="Login"
              className="w-full rounded-[10px]"
              disabled={!isValid}
              isLoading={isPending}
            />
            <Link
              href={'/auth/register'}
              className="text-paragrah mt-6 flex items-center justify-center text-sm"
            >
              Don’t have an account?
              <span className="text-primary ml-1 font-medium">Sign Up</span>
            </Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default LoginContent;
