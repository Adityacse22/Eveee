import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface NavbarProps {
  hasScrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ hasScrolled }) => {
  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        hasScrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
            Eveee
          </Link>
          <div className="space-x-6">
            <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link to="/stations" className="text-gray-600 hover:text-blue-600 transition-colors">
              Stations
            </Link>
            <Link to="/bookings" className="text-gray-600 hover:text-blue-600 transition-colors">
              My Bookings
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar; 