import Image from 'next/image';
import React from 'react';
import avater from '@/components/assets/images/avater.jpg';
import { Info, Phone, Video } from 'lucide-react';

type Props = {};

export const ChatTop = (props: Props) => {
  return (
    <div className="flex justify-between border-b border-gray-500/50 p-5">
      <div className="flex items-center gap-5">
        <Image
          src={avater}
          alt="User Avatar"
          width={50}
          height={50}
          className="h-12 w-12 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <span className="font-medium">Godwin Opara</span>
          <p className="line-clamp-1 text-sm text-white/70">
            Lorem ipsum dolor sit amet consectetur
          </p>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <button className="cursor-pointer">
          <Phone size={20} />
        </button>
        <button className="cursor-pointer">
          <Video size={20}/>
        </button>
        <button className="cursor-pointer">
          <Info size={20}/>
        </button>
      </div>
    </div>
  );
};
