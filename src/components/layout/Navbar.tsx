
import React from 'react';
import { Button } from "@/components/ui/button";
import SearchBar from "../ui/SearchBar";
import { Menu, User } from "lucide-react";

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card px-4 py-3 mx-4 mt-4 flex items-center justify-between">
      <div className="flex items-center">
        <div className="mr-3">
          <svg 
            className="w-8 h-8" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M8 3V8M16 3V8M7 16H9M15 16H17M11 11H13M11 15H13M7 12H9M15 12H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" 
              className="stroke-ev-blue" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className="text-lg font-bold gradient-text hidden sm:block">EV Charge</h1>
      </div>
      
      <div className="hidden md:block flex-grow max-w-md mx-4">
        <SearchBar />
      </div>
      
      <div className="flex items-center gap-3">
        <Button 
          variant="ghost" 
          size="icon" 
          className="glass-button rounded-full w-10 h-10"
        >
          <User className="h-5 w-5 text-white" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          className="glass-button md:hidden rounded-full w-10 h-10"
        >
          <Menu className="h-5 w-5 text-white" />
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
