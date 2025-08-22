'use client';
import React, { useState } from 'react';
import { Smile, Image as ImageIcon, Camera, Mic, Send } from 'lucide-react';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

type Props = {};

export const ChatBottom = (props: Props) => {
  const [isRecording, setIsRecording] = useState(false);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleEmoji = (e: any) => {
    const emoji = e.native; 
    setMessage(prev => prev + emoji);
    setEmojiOpen(false);
  };

  const startRecording = () => {
    setIsRecording(true);
    console.log('Recording started...');
  };

  const stopRecording = () => {
    setIsRecording(false);
    console.log('Recording stopped.');
  };

  const handleSend = () => {
    if (!message.trim()) return;
    console.log('Send:', message);
    setMessage('');
  };

  return (
    <div className="flex items-center justify-between gap-5 border-t border-gray-700 p-5">
      <div className="flex items-center gap-3 relative">
        <button
          onClick={() => setEmojiOpen(prev => !prev)}
          className="cursor-pointer"
        >
          <Smile className="text-white" size={20} />
        </button>

        {emojiOpen && (
          <div className="absolute bottom-12 left-0 z-[99]">
            <Picker data={data} onEmojiSelect={handleEmoji} />
          </div>
        )}

        <button className="cursor-pointer">
          <ImageIcon className="text-white" size={20} />
        </button>
        <button className="cursor-pointer">
          <Camera className="text-white" size={20} />
        </button>
      </div>

      <input
        type="text"
        placeholder="Type a message..."
        className="flex-1 rounded-[10px] bg-black/40 p-5 text-base text-white outline-none"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />

      <div className="flex items-center gap-3">
        <button
          className={`rounded-lg p-2 ${
            isRecording ? 'bg-red-600' : 'hover:bg-black/40'
          }`}
          onMouseDown={startRecording}
          onMouseUp={stopRecording}
          onTouchStart={startRecording}
          onTouchEnd={stopRecording}
        >
          <Mic className="text-white" size={20} />
        </button>

        <button className="cursor-pointer" onClick={handleSend}>
          <Send className="text-white" size={20} />
        </button>
      </div>
    </div>
  );
};
