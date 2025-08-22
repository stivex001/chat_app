import Image from 'next/image';
import React from 'react';
import avater from '@/components/assets/images/avater.jpg';

type MessageProps = {
  text?: string;
  image?: string;
  isSender: boolean;
  timestamp: string;
};

export const Messages = ({
  text,
  image,
  isSender,
  timestamp,
}: MessageProps) => {
  return (
    <div className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}>
      <div className="flex max-w-[70%] items-start gap-5">
        {!isSender && (
          <Image
            src={avater}
            alt="avater"
            width={50}
            height={50}
            className="h-8 w-8 rounded-full object-cover"
          />
        )}
        <div className="flex flex-1 flex-col gap-1">
          {image && (
            <div className="relative h-[300px] w-full">
              <Image
                src={image}
                alt="img"
                fill
                className="h-full w-full rounded-[10px] object-cover"
              />
            </div>
          )}

          <p className="rounded-[10px] bg-black/50 p-3 text-sm">{text}</p>
          <span className="text-xs">{timestamp}</span>
        </div>
      </div>
    </div>
  );
};
