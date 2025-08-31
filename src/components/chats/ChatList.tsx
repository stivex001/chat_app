'use client';
import React, { useEffect, useState } from 'react';
import { UserHeading } from './UserHeading';
import { SearchUser } from './SearchUser';
import { UserList } from './UserList';
import { useAuthStore } from '@/store/authStore';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

type Props = {};

export const ChatList = (props: Props) => {
  const { currentUser } = useAuthStore();
  const [chats, setChats] = useState<any[]>([]);

  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, 'userChats', currentUser?.id),
      async res => {
        const items = res?.data()?.chats;

        const promises = items?.map(async (item: any) => {
          const userDocRef = doc(db, 'users', item?.receiverId);
          const userDocSnap = await getDoc(userDocRef);

          const user = userDocSnap.data();

          return { ...item, user };
        });

        const chatData = await Promise?.all(promises);
        setChats(chatData?.sort((a, b) => b?.updatedAt - a?.updatedAt));
      },
    );

    return () => {
      unSub();
    };
  }, [currentUser?.id]);

  return (
    <div className="flex flex-1 flex-col">
      <UserHeading />
      <SearchUser />
      <div className="no-scrollbar flex-1 overflow-y-auto">
        {chats?.length === 0 ? (
          <p className="mt-5 text-center text-gray-500">No chats available</p>
        ) : (
          chats?.map(chat => {
            return <UserList key={chat?.chatId} chat={chat} />;
          })
        )}
      </div>
    </div>
  );
};
