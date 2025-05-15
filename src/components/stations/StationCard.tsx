
import React from 'react';
import { Battery, Clock, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface StationCardProps {
  name: string;
  distance: string;
  chargerTypes: string[];
  price: string;
  available: boolean;
  rating: number;
}

const StationCard: React.FC<StationCardProps> = ({
  name,
  distance,
  chargerTypes,
  price,
  available,
  rating
}) => {
  return (
    <div className="glass-card p-4 mb-3 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-neon-blue">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-white text-lg">{name}</h3>
          <div className="flex items-center text-white/70 text-sm mb-2">
            <MapPin className="w-3 h-3 mr-1" />
            <span>{distance} away</span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < rating ? "text-ev-orange" : "text-white/20"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            ))}
          </div>
          <div className={`text-sm font-medium mt-1 ${available ? 'text-ev-green' : 'text-red-500'}`}>
            {available ? 'Available Now' : 'Currently Busy'}
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mt-2 mb-3">
        {chargerTypes.map((type, index) => (
          <span 
            key={index} 
            className="bg-white/10 px-2 py-1 rounded-md text-xs flex items-center"
          >
            <Battery className="w-3 h-3 mr-1 text-ev-blue" />
            {type}
          </span>
        ))}
      </div>
      
      <div className="flex justify-between items-center mt-3">
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-1 text-white/70" />
          <span className="text-white/70 text-sm">
            <span className="text-ev-blue font-medium">{price}</span>/kWh
          </span>
        </div>
        
        <Button className="bg-blue-green-gradient hover:opacity-90 transition-all text-white rounded-full px-4 py-2 text-sm shadow-neon-blue">
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default StationCard;
