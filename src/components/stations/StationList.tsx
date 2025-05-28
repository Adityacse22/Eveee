
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import StationCard from './StationCard';
import FilterBar from '../ui/FilterBar';
import { useStations } from '@/hooks/useStations';
import { Loader2 } from 'lucide-react';

const StationList: React.FC = () => {
  const { data: stations, isLoading, error } = useStations();
  const [visibleStations, setVisibleStations] = useState(stations || []);
  
  React.useEffect(() => {
    if (stations) {
      setVisibleStations(stations);
    }
  }, [stations]);
  
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

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center space-x-2 text-white"
        >
          <Loader2 className="h-6 w-6 animate-spin text-ev-blue" />
          <span>Loading charging stations...</span>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full text-center py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400"
        >
          <p>Error loading stations: {error.message}</p>
          <p className="text-sm text-white/50 mt-2">Please try refreshing the page</p>
        </motion.div>
      </div>
    );
  }

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
        className="mt-4 space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {visibleStations.map((station) => {
          // Calculate distance (mock calculation for now)
          const distance = `${(Math.random() * 5).toFixed(1)} miles`;
          
          // Get available connectors
          const availableConnectors = station.connectors.filter(c => c.available);
          const chargerTypes = station.connectors.map(c => c.connector_type);
          
          return (
            <motion.div key={station.id} variants={itemVariants}>
              <StationCard
                stationId={station.id}
                name={station.name}
                distance={distance}
                chargerTypes={chargerTypes}
                price={`$${station.price_per_kwh}`}
                available={station.available && availableConnectors.length > 0}
                rating={station.rating}
                availablePorts={availableConnectors.length}
                totalPorts={station.connectors.length}
                address={station.address}
              />
            </motion.div>
          );
        })}
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
