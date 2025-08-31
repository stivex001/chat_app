'use client';
import React, { useEffect, useState } from 'react';
import { BaseModal } from '../shared/BaseModal';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Spinner } from '../shared/Spinner';
import { useAuthStore } from '@/store/authStore';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

type User = {
  id: string;
  name: string;
  avatar?: string;
};

const AddUser = ({ isOpen, onClose }: Props) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const { currentUser } = useAuthStore();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchUsers(searchTerm);
    }, 500); 

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const fetchUsers = async (term: string) => {
    setLoading(true);
    try {
      const userRef = collection(db, 'users');

      let q;
      if (term) {
        // Partial name search
        q = query(
          userRef,
          where('name', '>=', term),
          where('name', '<=', term + '\uf8ff'),
        );
      } else {
        // Fetch all users if no search term
        q = query(userRef);
      }

      const querySnapShot = await getDocs(q);

      const usersData: User[] = querySnapShot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<User, 'id'>),
      }));

      const searchUsersData = usersData?.filter(
        user => user.id !== currentUser?.id,
      ); // Exclude current user

      setUsers(searchUsersData);
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
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search user..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Search Results */}
        <div className="mt-4 space-y-3">
          {loading ? (
            <Spinner />
          ) : users.length > 0 ? (
            users.map(user => (
              <div
                key={user.id}
                className="flex items-center justify-between rounded-lg border p-2"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white">
                    {user?.name?.charAt(0)}
                  </div>
                  <span className="text-sm font-medium">{user?.name}</span>
                </div>
                <button
                  onClick={() => handleAddUser(user)}
                  className="cursor-pointer rounded-lg bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700"
                >
                  Add
                </button>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No users found</p>
          )}
        </div>
      </div>
    </BaseModal>
  );
};

export default AddUser;
