import { AuthUser } from '@/app/api/type';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useAuthStore } from './authStore';

interface ChatState {
  chatId: string | null;
  user: AuthUser | null;
  isCurrentUserBlocked: boolean;
  isRecieverBlocked: boolean;
  changeChat: (chatId: null, user: AuthUser | null) => void;
  changeBlock: () => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    set => ({
      chatId: null,
      user: null,
      isCurrentUserBlocked: false,
      isRecieverBlocked: false,
      changeChat(chatId, user) {
        const currentUser = useAuthStore.getState().currentUser;

        if (user?.blocked?.includes(currentUser?.id)) {
          return set({
            chatId,
            user: null,
            isCurrentUserBlocked: true,
            isRecieverBlocked: false,
          });
        }

        if (currentUser?.blocked?.includes(user?.id)) {
          return set({
            chatId,
            user: null,
            isCurrentUserBlocked: false,
            isRecieverBlocked: true,
          });
        }
      },
      changeBlock: () => {
        set(state => ({
          ...state,
          isRecieverBlocked: !state.isRecieverBlocked,
        }));
      },
    }),

    {
      name: 'chat-storage',
    },
  ),
);
