import { Search } from "lucide-react";
import React from "react";

type SearchProps = {
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

const SearchComponent = ({ value, onChange, placeholder }: SearchProps) => {
  return (
    <div className="flex items-center gap-2 justify-start border border-lightGrey rounded-[5px] h-[50px] relative  w-full px-3">
      <Search className=" h-4 my-1 text-gray-600" />
      <input
        type="text"
        className="border-transparent bg-transparent text-brandBlack h-full py-0 mb-0 placeholder:text-12px w-full focus:outline-none focus-visible:outline-none"
        placeholder={placeholder ?? `Search here...`}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchComponent;
