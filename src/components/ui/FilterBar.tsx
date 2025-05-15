
import React, { useState } from 'react';
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
          <Filter className="h-4 w-4" />
          <span>Filters</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </Button>
        
        <Button variant="ghost" className="text-ev-blue hover:text-ev-blue/80 p-0 text-sm">
          Clear All
        </Button>
      </div>

      {showFilters && (
        <div className="flex flex-wrap gap-2 py-2 animate-fade-in">
          {filters.map((filter, index) => (
            <button
              key={filter.label}
              className={`px-3 py-1 rounded-full text-sm transition-all ${
                filter.active 
                  ? 'bg-ev-blue text-white shadow-neon-blue' 
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
              onClick={() => toggleFilter(index)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterBar;
