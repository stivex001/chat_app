'use client';
import React, { useState } from 'react';
import { BaseModal } from '../shared/BaseModal';
import { collection, where, query, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Spinner } from '../shared/Spinner';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

type User = {
  id: string;
  username: string;
  avatar?: string;
};

const AddUser = ({ isOpen, onClose }: Props) => {
  const [searchUser, setSearchUser] = useState<User | null | 'notfound'>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get('username')?.toString().trim();

    if (!username) return;

    setLoading(true);
    try {
      const userRef = collection(db, 'users');
      const q = query(userRef, where('username', '==', username));
      const querySnapShot = await getDocs(q);

      if (!querySnapShot.empty) {
        setSearchUser({
          id: querySnapShot.docs[0].id,
          ...(querySnapShot.docs[0].data() as Omit<User, 'id'>),
        });
      } else {
        setSearchUser('notfound');
      }
    } catch (err) {
      console.error('Error fetching users: ', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = (user: User) => {
    console.log('User added:', user);
    // integrate with backend or state logic
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      className="!max-w-lg overflow-hidden !rounded-2xl border-none bg-white p-0 shadow-none"
      title="Add User"
    >
      <div className="p-4">
        {/* Search Form */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            name="username"
            type="text"
            placeholder="Search user..."
            className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
          >
            {loading ? <Spinner /> : 'Search'}
          </button>
        </form>

        {/* Search Results */}
        <div className="mt-4 space-y-3">
          {loading ? (
            <p className="text-sm text-gray-500">Searching...</p>
          ) : searchUser && searchUser !== 'notfound' ? (
            <div
              key={searchUser.id}
              className="flex items-center justify-between rounded-lg border p-2"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white">
                  {searchUser?.username?.charAt(0)}
                </div>
                <span className="text-sm font-medium">
                  {searchUser?.username}
                </span>
              </div>
              <button
                onClick={() => handleAddUser(searchUser)}
                className="cursor-pointer rounded-lg bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700"
              >
                Add
              </button>
            </div>
          ) : searchUser === 'notfound' ? (
            <p className="text-sm text-gray-500">No users found</p>
          ) : null}
        </div>
      </div>
    </BaseModal>
  );
};

export default AddUser;
