
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

const SearchBar: React.FC = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value);

  return (
    <motion.div 
      className="relative w-full"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      whileHover={{ scale: 1.01 }}
    >
      <motion.input
        type="text"
        placeholder="Search for charging stations..."
        className="glass-input w-full pr-10 pl-10"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        value={searchValue}
        animate={{ 
          boxShadow: isFocused 
            ? "0 0 0 2px rgba(30, 174, 219, 0.5), 0 0 15px rgba(30, 174, 219, 0.3)" 
            : "none"
        }}
        transition={{ duration: 0.2 }}
      />
      
      <motion.div 
        className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
        animate={{ 
          x: isFocused ? 2 : 0,
          scale: isFocused ? 1.1 : 1,
          color: isFocused ? "rgb(30, 174, 219)" : "rgba(255, 255, 255, 0.7)"
        }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      >
        <Search className="h-5 w-5" />
      </motion.div>
      
      {/* Animated line under search input */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-ev-blue to-ev-green rounded-full"
        initial={{ width: "0%" }}
        animate={{ width: isFocused ? "100%" : searchValue ? "100%" : "0%" }}
        transition={{ type: "tween", duration: 0.3 }}
      />
      
      {/* Clear button appears when there is text */}
      {searchValue && (
        <motion.button
          className="absolute inset-y-0 right-3 flex items-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.2 }}
          onClick={() => setSearchValue('')}
        >
          <motion.div
            className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center"
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.3)" }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </motion.div>
        </motion.button>
      )}
    </motion.div>
  );
};

export default SearchBar;
