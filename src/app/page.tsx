'use client';
import { ChatBox } from '@/components/chats/ChatBox';
import { ChatList } from '@/components/chats/ChatList';
import { ChatSettings } from '@/components/chats/ChatSettings';
import { auth } from '@/lib/firebase';
import { useAuthStore } from '@/store/authStore';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';

export default function Home() {

  const {currentUser} = useAuthStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, user => {
      console.log(user, "user__ss");
    });

    return () => unSub();
  }, []);

  return (
    <div
      className="flex h-screen items-center justify-center"
      style={{
        backgroundImage: "url('/chat.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="flex h-[90vh] w-[90vw] justify-between rounded-2xl border border-black/80 bg-black/50 text-white backdrop-blur-lg">
        <ChatList />
        <ChatBox />
        <ChatSettings />
      </div>
    </div>
  );
}
