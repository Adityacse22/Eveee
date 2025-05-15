
import React from 'react';
import { Search } from 'lucide-react';

const SearchBar: React.FC = () => {
  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search for charging stations..."
        className="glass-input w-full pr-10 pl-10"
      />
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-white/70" />
      </div>
    </div>
  );
};

export default SearchBar;
