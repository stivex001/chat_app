import React from 'react';
import { ChevronDown, Download } from 'lucide-react';
import Image from 'next/image';
import { auth } from '@/lib/firebase';
import { useAuthStore } from '@/store/authStore';

type Props = {};

export const ChatSettings = (props: Props) => {
  const {logout} = useAuthStore()
  const sharedPhotos = [
    { name: 'photo_2024_2.png', src: '/photo_2024_2.png' },
    { name: 'photo_2024_2.png', src: '/photo_2024_2.png' },
    { name: 'photo_2024_2.png', src: '/photo_2024_2.png' },
  ];

  const handleLogout = () => {
    auth.signOut().then(() => {
      logout();
    });
  }

  return (
    <div className="flex flex-1 flex-col border-l border-white/50 p-5 text-white backdrop-blur-lg">
      {/* Profile Section */}
      <div className="flex flex-col items-center border-b border-white/20 pb-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-700 text-2xl font-semibold">
          A
        </div>
        <h2 className="mt-3 text-lg font-semibold">Jane Doe</h2>
        <p className="text-sm text-gray-300">Lorem ipsum dolor sit amet.</p>
      </div>

      {/* Accordions */}
      <div className="mt-4 flex flex-col gap-2 text-sm">
        <button className="hover:text-primary flex w-full items-center justify-between py-2">
          Chat Settings <ChevronDown size={16} />
        </button>
        <button className="hover:text-primary flex w-full items-center justify-between py-2">
          Privacy & Help <ChevronDown size={16} />
        </button>

        {/* Shared Photos */}
        <div>
          <button className="hover:text-primary flex w-full items-center justify-between py-2">
            Shared Photos <ChevronDown size={16} />
          </button>
          <div className="mt-2 flex flex-col gap-2">
            {sharedPhotos.map((photo, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-md bg-white/10 p-2"
              >
                <div className="flex items-center gap-2">
                  <Image
                    src={photo.src}
                    alt={photo.name}
                    width={30}
                    height={30}
                    className="rounded-md"
                  />
                  <span className="text-xs">{photo.name}</span>
                </div>
                <button>
                  <Download size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Shared Files */}
        <button className="hover:text-primary flex w-full items-center justify-between py-2">
          Shared Files <ChevronDown size={16} />
        </button>
      </div>

      {/* Action Buttons */}
      <div className="mt-auto flex flex-col gap-3 pt-2">
        <button className="w-full rounded-md bg-red-600 py-2 font-semibold">
          Block User
        </button>
        <button
          onClick={handleLogout}
          className="w-full cursor-pointer rounded-md bg-blue-600 py-2 font-semibold"
        >
          Logout
        </button>
      </div>
    </div>
  );
};
