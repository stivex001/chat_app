"use client";
import { useAuthStore } from '@/store/authStore';
import { Ellipsis, SquarePen, Video } from 'lucide-react';
import React from 'react';



export const UserHeading = () => {
     const {currentUser} = useAuthStore();
  return (
    <section className="flex items-center justify-between p-5">
      <div className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-950 text-white">
          {currentUser?.name?.charAt(0).toUpperCase()}
        </div>
        <span className="text-base font-semibold">{currentUser?.name}</span>
      </div>
      <div className="flex items-center gap-4">
        <button className="cursor-pointer">
          <Ellipsis size={20} />
        </button>
        <button className="cursor-pointer">
          <Video size={20}/>
        </button>{' '}
        <button className="cursor-pointer">
          <SquarePen size={20} />
        </button>
      </div>
    </section>
  );
};
