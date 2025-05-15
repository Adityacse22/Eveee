
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import StationCard from './StationCard';
import FilterBar from '../ui/FilterBar';

// Sample data for demonstration
const stationData = [
  {
    id: 1,
    name: 'Tesla Supercharger',
    distance: '0.8 miles',
    chargerTypes: ['DC Fast', 'Type 2'],
    price: '$0.45',
    available: true,
    rating: 5
  },
  {
    id: 2,
    name: 'ChargePoint Station',
    distance: '1.2 miles',
    chargerTypes: ['AC', 'CCS'],
    price: '$0.30',
    available: true,
    rating: 4
  },
  {
    id: 3,
    name: 'EVgo Fast Charging',
    distance: '2.5 miles',
    chargerTypes: ['DC Fast', 'CCS', 'CHAdeMO'],
    price: '$0.50',
    available: false,
    rating: 4
  }
];

const StationList: React.FC = () => {
  const [visibleStations, setVisibleStations] = useState(stationData);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <div className="w-full">
      <motion.div 
        className="flex justify-between items-center mb-4"
        variants={itemVariants}
      >
        <motion.h2 
          className="text-xl font-semibold text-white"
          whileHover={{ scale: 1.05, x: 5 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          Nearby Stations
        </motion.h2>
        <motion.span 
          className="text-white/70 text-sm"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          {visibleStations.length} stations found
        </motion.span>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <FilterBar />
      </motion.div>
      
      <motion.div 
        className="mt-4 space-y-4 max-h-[500px] overflow-y-auto pr-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {visibleStations.map((station) => (
          <motion.div key={station.id} variants={itemVariants}>
            <StationCard
              name={station.name}
              distance={station.distance}
              chargerTypes={station.chargerTypes}
              price={station.price}
              available={station.available}
              rating={station.rating}
            />
          </motion.div>
        ))}
      </motion.div>
      
      {/* Idle animation elements */}
      {visibleStations.length > 0 && (
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
        >
          <motion.div 
            className="w-8 h-1 bg-ev-blue/30 rounded-full mx-auto"
            animate={{ 
              width: ["2rem", "6rem", "2rem"],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </motion.div>
      )}
    </div>
  );
};

export default StationList;
