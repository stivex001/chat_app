"use client"
import React, { useEffect, useRef } from 'react';
import { Messages } from './Messages';

const mockMessages = [
  {
    id: 1,
    text: 'Hey, how are you?',
    senderId: 'user1',
    timestamp: '10:30 AM',
  },
  {
    id: 2,
    text: "I'm good, just working on the project. You?",
    senderId: 'user2',
    timestamp: '10:31 AM',
  },
  { id: 3, image: '/sample.jpg', senderId: 'user1', timestamp: '10:32 AM' },
  {
    id: 4,
    text: 'Check out this pic',
    image: '/sample.jpg',
    senderId: 'user2',
    timestamp: '10:33 AM',
  },
];
export const ChatCenter = () => {
  const currentUserId = 'user1';
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [])
  

  return (
    <div className="no-scrollbar flex flex-1 flex-col gap-5 overflow-y-scroll p-5">
      {mockMessages.map(msg => (
        <Messages
          key={msg.id}
          text={msg.text}
          isSender={msg.senderId === currentUserId}
          timestamp={msg.timestamp}
          image={msg.image}
        />
      ))}
      <div ref={endRef}></div>
    </div>
  );
};
