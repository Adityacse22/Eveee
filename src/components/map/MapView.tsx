
import React from 'react';

const MapView: React.FC = () => {
  return (
    <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] w-full overflow-hidden rounded-2xl glass-card">
      {/* This would be replaced with actual map integration */}
      <div className="absolute inset-0 bg-gradient-to-br from-ev-navy to-black opacity-70"></div>
      
      {/* Placeholder map content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <div className="text-center p-6 glass-card max-w-md">
          <h3 className="text-xl font-bold mb-2 gradient-text">Map Integration</h3>
          <p className="text-white/70 mb-4">
            This is where the Google Maps integration would appear, showing nearby EV charging stations.
          </p>
          
          {/* Simulated map markers */}
          <div className="relative w-full h-32 my-4">
            <div className="absolute top-1/4 left-1/4 animate-pulse-glow">
              <div className="w-4 h-4 bg-ev-blue rounded-full"></div>
            </div>
            <div className="absolute top-1/3 right-1/3 animate-pulse-glow" style={{animationDelay: "0.5s"}}>
              <div className="w-4 h-4 bg-ev-green rounded-full"></div>
            </div>
            <div className="absolute bottom-1/4 left-1/2 animate-pulse-glow" style={{animationDelay: "1s"}}>
              <div className="w-4 h-4 bg-ev-orange rounded-full"></div>
            </div>
            
            {/* Current location marker */}
            <div className="absolute top-1/2 left-1/3 animate-pulse">
              <div className="w-6 h-6 bg-blue-500 rounded-full border-4 border-white"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
