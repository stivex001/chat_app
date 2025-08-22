import React from 'react';
import { UserHeading } from './UserHeading';
import { SearchUser } from './SearchUser';
import { UserList } from './UserList';

type Props = {};

export const ChatList = (props: Props) => {
  return (
    <div className="flex flex-1 flex-col">
      <UserHeading />
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
