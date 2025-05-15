
import React from 'react';
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
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Nearby Stations</h2>
        <span className="text-white/70 text-sm">3 stations found</span>
      </div>
      
      <FilterBar />
      
      <div className="mt-4 space-y-4 max-h-[500px] overflow-y-auto pr-2">
        {stationData.map((station) => (
          <StationCard
            key={station.id}
            name={station.name}
            distance={station.distance}
            chargerTypes={station.chargerTypes}
            price={station.price}
            available={station.available}
            rating={station.rating}
          />
        ))}
      </div>
    </div>
  );
};

export default StationList;
