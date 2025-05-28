
import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Battery, Clock, MapPin, Zap, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import BookingForm from '../booking/BookingForm';

interface StationCardProps {
  stationId: string;
  name: string;
  distance: string;
  chargerTypes: string[];
  price: string;
  available: boolean;
  rating: number;
  availablePorts: number;
  totalPorts: number;
  address: string;
}

const StationCard: React.FC<StationCardProps> = ({
  stationId,
  name,
  distance,
  chargerTypes,
  price,
  available,
  rating,
  availablePorts,
  totalPorts,
  address
}) => {
  const [isBooking, setIsBooking] = useState(false);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  const handleBookNow = () => {
    if (!available) return;
    
    setIsBooking(true);
    
    // Show the booking dialog after animation
    setTimeout(() => {
      setIsBooking(false);
      setShowBookingDialog(true);
    }, 800);
  };
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Generate random current users for display
  const currentUsers = Math.floor(Math.random() * 3);

  return (
    <>
      <motion.div
        className="glass-card p-4 mb-3 relative overflow-hidden cursor-pointer"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", damping: 12 }}
        style={{ 
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ 
          z: 10,
          boxShadow: "0 10px 30px -5px rgba(30, 174, 219, 0.5)"
        }}
      >
        {/* 3D depth elements */}
        <div className="absolute -inset-1 bg-gradient-to-br from-ev-blue/10 to-ev-green/10 rounded-2xl -z-10 transform translate-z-[-20px]" />
        
        <div className="flex justify-between items-start">
          <div>
            <motion.h3 
              className="font-semibold text-white text-lg"
              style={{ transform: "translateZ(10px)" }}
            >
              {name}
            </motion.h3>
            <motion.div 
              className="flex items-center text-white/70 text-sm mb-2"
              style={{ transform: "translateZ(5px)" }}
            >
              <MapPin className="w-3 h-3 mr-1" />
              <span>{distance} away</span>
            </motion.div>
            <motion.div 
              className="text-white/60 text-xs mb-2"
              style={{ transform: "translateZ(5px)" }}
            >
              {address}
            </motion.div>
          </div>
          <div className="flex flex-col items-end" style={{ transform: "translateZ(5px)" }}>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <motion.svg
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(rating) ? "text-ev-orange" : "text-white/20"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  initial={{ rotate: -30, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * i, duration: 0.3 }}
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </motion.svg>
              ))}
            </div>
            <motion.div 
              className={`text-sm font-medium mt-1 flex items-center ${available ? 'text-ev-green' : 'text-red-500'}`}
              whileHover={{ scale: 1.05 }}
            >
              {available ? (
                <>
                  <motion.div 
                    className="w-2 h-2 bg-ev-green rounded-full mr-2"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  {availablePorts}/{totalPorts} Available
                </>
              ) : (
                <>
                  <motion.div className="w-2 h-2 bg-red-500 rounded-full mr-2" />
                  Currently Busy
                </>
              )}
            </motion.div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-2 mb-3" style={{ transform: "translateZ(15px)" }}>
          {[...new Set(chargerTypes)].map((type, index) => (
            <motion.span 
              key={index} 
              className="bg-white/10 px-2 py-1 rounded-md text-xs flex items-center"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + (index * 0.1) }}
            >
              <Battery className="w-3 h-3 mr-1 text-ev-blue" />
              {type}
            </motion.span>
          ))}
        </div>

        <div className="flex items-center gap-3 mb-4 text-xs text-white/70" style={{ transform: "translateZ(15px)" }}>
          <div className="flex items-center">
            <Zap className="w-3 h-3 mr-1 text-ev-blue" />
            <span>{price}/kWh</span>
          </div>
          <div className="flex items-center">
            <Users className="w-3 h-3 mr-1 text-ev-blue" />
            <span>{currentUsers} Users Now</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-3 h-3 mr-1 text-ev-blue" />
            <span>24/7</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-3" style={{ transform: "translateZ(5px)" }}>
          <motion.div 
            className="flex items-center"
            whileHover={{ x: 3 }}
          >
            <span className="bg-white/10 px-2 py-1 rounded-lg text-white/90 text-xs">
              Average Session: ~45 min
            </span>
          </motion.div>
          
          <motion.div
            initial={false}
            animate={{ width: isBooking ? "100%" : "auto" }}
            transition={{ duration: 0.3 }}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    className={`bg-blue-green-gradient hover:opacity-90 transition-all text-white rounded-full px-4 py-2 text-sm shadow-neon-blue overflow-hidden ${!available && 'opacity-50 cursor-not-allowed'}`}
                    onClick={handleBookNow}
                    disabled={!available || isBooking}
                    aria-label={available ? "Book this charging station" : "Station not available"}
                  >
                    <motion.div
                      className="flex items-center justify-center w-full"
                      initial={false}
                      animate={{ 
                        scale: isBooking ? [1, 0.9, 1] : 1,
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      {isBooking ? (
                        <motion.svg
                          className="w-5 h-5 text-white"
                          viewBox="0 0 24 24"
                          fill="none"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        >
                          <motion.path
                            d="M20 6L9 17L4 12"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </motion.svg>
                      ) : (
                        "Book Now"
                      )}
                    </motion.div>
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-black/80 border-ev-blue/30 text-white">
                  {available ? "Book this charging station" : "Station currently unavailable"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.div>
        </div>
        
        {/* Interactive hover gradient */}
        <motion.div 
          className="absolute inset-0 opacity-0 bg-gradient-radial from-ev-blue/20 to-transparent rounded-2xl pointer-events-none"
          style={{
            x,
            y,
            scale: 1.5,
          }}
          animate={{
            opacity: [0, 0.4, 0]
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <DialogContent className="bg-gradient-to-br from-black/80 to-black/95 border-ev-blue/30 text-white max-w-md w-[90vw] rounded-2xl shadow-neon-blue pointer-events-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center gradient-text">Book {name}</DialogTitle>
          </DialogHeader>
          <BookingForm 
            stationId={stationId}
            stationName={name} 
            price={price} 
            onBookingComplete={() => setShowBookingDialog(false)} 
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StationCard;
