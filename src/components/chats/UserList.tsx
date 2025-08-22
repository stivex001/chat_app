import Image from 'next/image';
import React from 'react';
import avater from '@/components/assets/images/avater.jpg';

type Props = {};

export const UserList = (props: Props) => {
  return (
    <div className='flex justify-between border-b border-gray-500/50 p-5'>
      <div className="flex items-center gap-5 ">
        <Image
          src={avater}
          alt="User Avatar"
          width={50}
          height={50}
          className="h-12 w-12 rounded-full object-cover"
        />
        <div className='flex flex-col gap-2.5'>
          <span className='font-medium'>Godwin Opara</span>
          <p className='text-sm text-white/70'>Hello bro</p>
        </div>
      </div>
      <span className='text-sm text-white/70'>23:30</span>
    </div>
  );
};
