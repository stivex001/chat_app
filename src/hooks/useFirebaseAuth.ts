import { useMutation } from '@tanstack/react-query';
import { loginUser, registerUser } from '../../api/crud/firebaseAuth';

export const useFirebaseAuth = () => {
  const register = useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      return await registerUser(payload.email, payload.password);
    },
  });

  const login = useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      return await loginUser(payload.email, payload.password);
    },
  });

  return { register, login };
};
