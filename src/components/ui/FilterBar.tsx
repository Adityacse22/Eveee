
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";

type FilterOption = {
  label: string;
  active: boolean;
};

const FilterBar: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOption[]>([
    { label: 'AC Chargers', active: false },
    { label: 'DC Fast Charging', active: false },
    { label: 'Available Now', active: true },
    { label: 'Free Charging', active: false },
  ]);

  const toggleFilter = (index: number) => {
    const newFilters = [...filters];
    newFilters[index].active = !newFilters[index].active;
    setFilters(newFilters);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <Button 
          variant="ghost"
          className="text-white/70 p-0 flex items-center gap-2 hover:text-white"
          onClick={() => setShowFilters(!showFilters)}
        >
          <motion.div
            animate={{ rotate: showFilters ? [0, 180, 360] : 0 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
          >
            <Filter className="h-4 w-4" />
          </motion.div>
          <span>Filters</span>
          <motion.div
            animate={{ rotate: showFilters ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </Button>
        
        <Button 
          variant="ghost" 
          className="text-ev-blue hover:text-ev-blue/80 p-0 text-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Clear All
        </Button>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div 
            className="flex flex-wrap gap-2 py-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filters.map((filter, index) => (
              <motion.button
                key={filter.label}
                className={`px-3 py-1 rounded-full text-sm transition-all overflow-hidden relative ${
                  filter.active 
                    ? 'bg-ev-blue text-white shadow-neon-blue' 
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
                onClick={() => toggleFilter(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Ripple effect */}
                {filter.active && (
                  <motion.span
                    className="absolute inset-0 bg-white"
                    initial={{ scale: 0, opacity: 0.7 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                )}
                
                {filter.label}
                
                {/* Animated indicator */}
                {filter.active && (
                  <motion.span
                    className="inline-block w-1 h-1 bg-white rounded-full ml-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    layoutId="activeIndicator"
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterBar;
