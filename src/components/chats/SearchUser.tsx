"use client"
import React, { useState } from "react";
import { SearchIcon } from "../assets/icons/SvgIcons";
import { Plus, Minus } from "lucide-react";

type Props = {};

export const SearchUser = (props: Props) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleToggle = () => {
    setIsAdded((prev) => !prev);
  };

  return (
    <section className="flex items-center gap-5 p-5">
      <div className="flex flex-1 items-center gap-2 rounded-[10px] bg-black/60 p-2.5">
        <SearchIcon />
        <input
          type="text"
          placeholder="Search"
          className="flex-1 bg-transparent text-white outline-none focus:outline-none"
        />
      </div>
      <button
        onClick={handleToggle}
        className="flex h-7 w-7 items-center justify-center bg-black/60 rounded-[10px] cursor-pointer"
      >
        {isAdded ? <Minus /> : <Plus />}
      </button>
    </section>
  );
};
