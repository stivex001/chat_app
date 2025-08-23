'use client';

import ControlledInput from '@/components/controlledInputs/ControlledInput';
import useDynamicForm from '@/hooks/useDynamicForm';
import { Field } from '@/schemas/dynamicSchema';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { CustomButton } from '@/components/clickable/CustomButton';
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuthStore } from '@/store/authStore';
import { AuthUser } from '@/app/api/type';
import { useAuth } from '../../../api/crud/auth';

const fields: Field[] = [
  {
    name: 'email',
    type: 'email',
    errorMessage: 'Email is required',
    isRequired: true,
  },
  {
    name: 'password',
    type: 'text',
    errorMessage: 'Password is required',
    isRequired: true,
  },
  {
    name: 'confirmPassword',
    type: 'text',
    errorMessage: 'Password is required',
  },
];

const ClientSignUp = () => {
  const router = useRouter();
  const { setAccessToken } = useAuthStore();
  const { control, handleSubmit, formState, watch, setError, clearErrors } =
    useDynamicForm<AuthUser>(fields, {});

  const password = watch('password');
  const confirmPassword = watch('confirmPassword');
  const { isValid } = formState;
  const { registerUser } = useAuth();
  const { isPending, mutateAsync } = registerUser;

  useEffect(() => {
    if (confirmPassword) {
      if (confirmPassword !== password) {
        setError('confirmPassword', {
          type: 'manual',
          message: 'Passwords do not match',
        });
      } else {
        clearErrors('confirmPassword');
      }
    }
  }, [confirmPassword, password, setError, clearErrors]);

  const onSubmit = async (data: any) => {
    if (data.password !== data.confirmPassword) {
      setError('confirmPassword', { message: 'Passwords do not match' });
      return;
    }

    const payload = { ...data };
    try {
      await mutateAsync(payload, {
        onSuccess: (response: any) => {
          toast.success(response?.message);
          const token = response?.user?.token;
          if (token) setAccessToken(token);
          router.push(`/`);
        },
        onError: (error: any) => {
          toast.error(error?.data?.error);
        },
      });
    } catch (error: any) {
      console.log('An error occurred ', error?.data?.error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5">
          <div className="flex w-full flex-col gap-5">
            <ControlledInput
              name="email"
              control={control}
              type="email"
              label="Email"
              variant="primary"
              rules={{ required: true }}
            />
            <ControlledInput
              name="password"
              control={control}
              type="password"
              label="Password"
              variant="primary"
              rules={{
                required: { value: true, message: 'Password is required' },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{6,}$/,
                  message: 'Password must meet all requirements',
                },
              }}
            />
         
            <ControlledInput
              name="confirmPassword"
              control={control}
              type="password"
              label="Confirm New Password"
              variant="primary"
              rules={{ required: true }}
            />
          </div>

          <CustomButton
            type="submit"
            disabled={!isValid}
            isLoading={isPending}
            label="Create My Account"
            className="w-full rounded-[10px]"
            variant="primary"
          />

          <Link
            href={'/auth/login'}
            className="text-paragrah mt-6 flex items-center justify-center text-sm"
          >
            Already have an account?{' '}
            <span className="text-primary ml-1 font-medium">Log in</span>
          </Link>
        </div>
      </form>
    </>
  );
};

export default ClientSignUp;
