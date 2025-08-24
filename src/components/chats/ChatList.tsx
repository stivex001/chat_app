"use client";
import React from 'react';
import { UserHeading } from './UserHeading';
import { SearchUser } from './SearchUser';
import { UserList } from './UserList';
import { useAuthStore } from '@/store/authStore';

type Props = {};

export const ChatList = (props: Props) => {
   const {currentUser} = useAuthStore();


  return (
    <div className="flex flex-1 flex-col">
      <UserHeading  />
      <SearchUser />
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <UserList />
        <UserList />
        <UserList />
        <UserList />
        <UserList />
        <UserList />
        <UserList />
        <UserList />
        <UserList />
        <UserList />
        <UserList />
        <UserList />
        <UserList />
        <UserList />
      </div>
    </div>
  );
};
