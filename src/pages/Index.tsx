
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import LocationButton from '../components/ui/LocationButton';
import StationList from '../components/stations/StationList';
import BookingForm from '../components/booking/BookingForm';
import SearchBar from '../components/ui/SearchBar';
import HeroSection from '../components/ui/HeroSection';

const Index = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  
  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // This would be triggered when a station is selected
  const toggleBooking = () => {
    setIsBookingOpen(!isBookingOpen);
  };

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        damping: 12
      }
    }
  };

  return (
    <div className="min-h-screen w-full pb-24 overflow-x-hidden">
      <Navbar hasScrolled={hasScrolled} />
      
      {/* Hero Section */}
      <HeroSection />
      
      <motion.main 
        className="container pt-24 px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="mb-6 md:hidden" variants={itemVariants}>
          <SearchBar />
        </motion.div>
        
        <motion.div 
          className="mb-6 flex items-center justify-center"
          variants={itemVariants}
        >
          <LocationButton />
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 gap-6"
          variants={itemVariants}
        >
          <motion.div 
            className="glass-card p-5 h-full"
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 0 25px rgba(30, 174, 219, 0.5)",
              transition: { type: "spring", stiffness: 400, damping: 10 }
            }}
          >
            <StationList />
          </motion.div>
          
          {/* Mobile view station toggle button */}
          <motion.div 
            className="md:hidden mt-4 flex justify-center"
            variants={itemVariants}
          >
            <motion.button 
              className="glass-button py-2 px-4 flex items-center gap-2"
              onClick={toggleBooking}
              whileTap={{ scale: 0.95 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 20px rgba(30, 174, 219, 0.6)"
              }}
            >
              <span>{isBookingOpen ? "View Stations" : "Book Station"}</span>
              <motion.svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                animate={{ rotate: isBookingOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </motion.button>
          </motion.div>
          
          {/* Mobile view booking (conditionally rendered) */}
          <motion.div 
            className={`md:hidden mt-6 ${isBookingOpen ? 'block' : 'hidden'}`}
            variants={itemVariants}
            initial="hidden"
            animate={isBookingOpen ? "visible" : "hidden"}
          >
            {isBookingOpen && <BookingForm />}
          </motion.div>
        </motion.div>
        
        {/* Footer with app information */}
        <motion.footer 
          className="mt-16 text-center"
          variants={itemVariants}
        >
          <p className="text-white/50 text-sm">EV Charge Platform - Find and book charging stations</p>
        </motion.footer>
      </motion.main>
    </div>
  );
};

export default Index;
