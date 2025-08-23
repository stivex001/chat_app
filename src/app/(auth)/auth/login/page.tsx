import React, { Suspense } from "react";
import { Loader } from "@/components/Loader";
import LoginContent from "@/components/auth/LoginContent";

const Login = () => {
  return (
    <Suspense fallback={<Loader />}>
      <LoginContent />
    </Suspense>
  );
};

export default Login;
