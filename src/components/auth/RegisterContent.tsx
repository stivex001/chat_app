'use client';
import React, { Suspense } from 'react';
import { AuthTitle } from '@/components/auth/AuthTitle';
import loginAuth from '@/components/assets/images/delivery.jpg';
import AuthLayout from './AuthLayout';
import ClientSignUp from './ClientSignUp';

const RegisterContent = () => {


  return (
    <AuthLayout
      authImg={loginAuth}
      title={' Get Connected'}
      desc={"Join us today and start your journey!"}

    >
      <div className="flex flex-col gap-10">
        <AuthTitle
          title="Create an Account"
          desc="Enter your email and password"
        />
        <ClientSignUp  />
      </div>
    </AuthLayout>
  );
};

export default RegisterContent;
