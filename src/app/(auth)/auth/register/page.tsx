import React, { Suspense } from "react";
import { Loader } from "@/components/Loader";
import RegisterContent from "@/components/auth/RegisterContent";

const Register = () => {
  return (
    <Suspense fallback={<Loader />}>
      <RegisterContent />
    </Suspense>
  );
};

export default Register;
