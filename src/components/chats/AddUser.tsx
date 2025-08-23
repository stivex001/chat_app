"use client";
import React, { useState, useEffect } from "react";
import { BaseModal } from "../shared/BaseModal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

type User = {
  id: number;
  firstName: string;
  lastName: string;
  avatar: string;
};

const mockUsers: User[] = [
  { id: 1, firstName: "John", lastName: "Doe", avatar: "https://i.pravatar.cc/150?img=1" },
  { id: 2, firstName: "Jane", lastName: "Smith", avatar: "https://i.pravatar.cc/150?img=2" },
  { id: 3, firstName: "Michael", lastName: "Brown", avatar: "https://i.pravatar.cc/150?img=3" },
];

const AddUser = ({ isOpen, onClose }: Props) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<User[]>([]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const filtered = mockUsers.filter((user) =>
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  }, [query]);

  const handleAddUser = (user: User) => {
    console.log("User added:", user);
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
        <div className="flex">
          <input
            type="text"
            placeholder="Search user..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Search Results */}
        <div className="mt-4 space-y-3">
          {results.length > 0 ? (
            results.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between rounded-lg border p-2"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white">
                    {user.firstName.charAt(0)}
                    {user.lastName.charAt(0)}
                  </div>
                  <span className="text-sm font-medium">
                    {user.firstName} {user.lastName}
                  </span>
                </div>
                <button
                  onClick={() => handleAddUser(user)}
                  className="cursor-pointer rounded-lg bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700"
                >
                  Add
                </button>
              </div>
            ))
          ) : query ? (
            <p className="text-sm text-gray-500">No users found</p>
          ) : null}
        </div>
      </div>
    </BaseModal>
  );
};

export default AddUser;
