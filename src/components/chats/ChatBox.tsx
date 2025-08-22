import React from 'react';
import { ChatTop } from './ChatTop';
import { ChatCenter } from './ChatCenter';
import { ChatBottom } from './ChatBottom';

type Props = {};

export const ChatBox = (props: Props) => {
  return (
    <div className="flex-2 flex flex-col border-r border-l border-gray-500/50">
      <ChatTop />
      <ChatCenter />
      <ChatBottom />
    </div>
  );
};
