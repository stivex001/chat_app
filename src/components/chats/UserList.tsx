import Image from 'next/image';
import React from 'react';
import avater from '@/components/assets/images/avater.jpg';
import { formatTime } from '@/lib/formatTime';
import { useChatStore } from '@/store/chatStore';

type Props = {
  chat: any;
};

export const UserList = ({ chat }: Props) => {
  console.log(chat, 'chatss');
  const {changeChat} = useChatStore()

 

  return (
    <div className="flex items-center justify-between border-b border-gray-500/50 p-5">
      <div className="flex items-center gap-5">
        {chat?.user?.avater ? (
          <Image
            src={avater}
            alt="User Avatar"
            width={50}
            height={50}
            className="h-12 w-12 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white">
            {chat?.user?.name?.charAt(0)}
          </div>
        )}

        <div className="flex flex-col gap-2.5">
          <span className="font-medium">{chat?.user?.name}</span>
          <p className="text-sm text-white/70">{chat?.lastMessage}</p>
        </div>
      </div>
      <span className="text-sm text-white/70"> {formatTime(chat?.updatedAt)}</span>
    </div>
  );
};
