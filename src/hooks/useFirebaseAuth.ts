// hooks/useFirebaseAuth.ts
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../api/crud/firebaseAuth";

export const useFirebaseAuth = () => {
  const register = useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      return await registerUser(payload.email, payload.password);
    },
  });

  return { register };
};
