
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface FilterOption {
  id: string;
  label: string;
  value: string;
}

const chargerTypes: FilterOption[] = [
  { id: 'all', label: 'All', value: 'all' },
  { id: 'type1', label: 'Type 1', value: 'type1' },
  { id: 'type2', label: 'Type 2', value: 'type2' },
  { id: 'ccs', label: 'CCS', value: 'ccs' },
  { id: 'chademo', label: 'CHAdeMO', value: 'chademo' }
];

const FilterBar: React.FC = () => {
  const [activeChargerType, setActiveChargerType] = useState<string>('all');
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [selectedPower, setSelectedPower] = useState<string[]>([]);
  const [showFastCharging, setShowFastCharging] = useState<boolean>(false);

  const handleChargerTypeChange = (value: string) => {
    setActiveChargerType(value);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="mb-4">
      {/* Mobile Filter Toggle */}
      <div className="flex justify-between items-center mb-3 md:hidden">
        <h3 className="text-lg font-medium text-white/90">Chargers</h3>
        
        {/* Fix: Wrap Button with motion.div for animations */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="ghost"
            className="glass-button px-3 py-1 text-sm"
            onClick={toggleFilter}
          >
            Filters
            <motion.svg
              className="ml-1 w-4 h-4"
              animate={{ rotate: isFilterOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </motion.svg>
          </Button>
        </motion.div>
      </div>
      
      {/* Filter Content */}
      <motion.div
        className={`glass-card p-3 overflow-hidden ${isFilterOpen ? 'block' : 'hidden'} md:block`}
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isFilterOpen ? 'auto' : 0,
          opacity: isFilterOpen ? 1 : 0,
          display: isFilterOpen ? 'block' : 'none'
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="space-y-4">
          {/* Charger Types */}
          <div>
            <h4 className="text-sm font-medium text-white/80 mb-2">Charger Type</h4>
            <ToggleGroup 
              type="single" 
              value={activeChargerType} 
              onValueChange={(value) => {
                if (value) handleChargerTypeChange(value);
              }}
              className="flex flex-wrap gap-2"
            >
              {chargerTypes.map((type) => (
                <ToggleGroupItem
                  key={type.id}
                  value={type.value}
                  className={`rounded-full glass-button text-xs px-3 py-1 ${
                    activeChargerType === type.value ? 'bg-ev-blue/30 border-ev-blue text-white' : 'text-white/70'
                  }`}
                >
                  {type.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
          
          {/* Power Range */}
          <div>
            <h4 className="text-sm font-medium text-white/80 mb-2">Power Range</h4>
            <ToggleGroup
              type="multiple"
              value={selectedPower}
              onValueChange={setSelectedPower}
              className="flex flex-wrap gap-2"
            >
              <ToggleGroupItem
                value="slow"
                className={`rounded-full glass-button text-xs px-3 py-1 ${
                  selectedPower.includes('slow') ? 'bg-ev-blue/30 border-ev-blue text-white' : 'text-white/70'
                }`}
              >
                Slow (≤ 7kW)
              </ToggleGroupItem>
              <ToggleGroupItem
                value="medium"
                className={`rounded-full glass-button text-xs px-3 py-1 ${
                  selectedPower.includes('medium') ? 'bg-ev-blue/30 border-ev-blue text-white' : 'text-white/70'
                }`}
              >
                Medium (≤ 22kW)
              </ToggleGroupItem>
              <ToggleGroupItem
                value="fast"
                className={`rounded-full glass-button text-xs px-3 py-1 ${
                  selectedPower.includes('fast') ? 'bg-ev-blue/30 border-ev-blue text-white' : 'text-white/70'
                }`}
              >
                Fast (≤ 50kW)
              </ToggleGroupItem>
              <ToggleGroupItem
                value="superfast"
                className={`rounded-full glass-button text-xs px-3 py-1 ${
                  selectedPower.includes('superfast') ? 'bg-ev-blue/30 border-ev-blue text-white' : 'text-white/70'
                }`}
              >
                Ultra (> 50kW)
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FilterBar;
