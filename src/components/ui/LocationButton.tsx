
import React from 'react';
import { MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";

const LocationButton: React.FC = () => {
  const handleLocationClick = () => {
    // Handle location detection here
    console.log("Getting current location");
  };

  return (
    <Button 
      className="glass-button flex items-center gap-2 px-4 py-2 animate-pulse-glow"
      onClick={handleLocationClick}
    >
      <MapPin className="h-5 w-5 text-white" />
      <span className="text-white">Use My Location</span>
    </Button>
  );
};

export default LocationButton;
