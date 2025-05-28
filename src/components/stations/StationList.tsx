import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import StationCard from './StationCard';
import FilterBar from '../ui/FilterBar';
import { useStations } from '@/hooks/useStations';
import { Loader2, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface StationListProps {
  onStationSelect?: (stationId: string, stationName: string) => void;
}

const StationList: React.FC<StationListProps> = ({ onStationSelect }) => {
  const { data: stations, isLoading, error } = useStations();
  const [visibleStations, setVisibleStations] = useState(stations || []);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [nearbyStations, setNearbyStations] = useState<any[]>([]);
  const [searchingNearby, setSearchingNearby] = useState(false);
  
  React.useEffect(() => {
    if (stations) {
      setVisibleStations(stations);
    }
  }, [stations]);

  useEffect(() => {
    const savedLocation = localStorage.getItem('userLocation');
    if (savedLocation) {
      try {
        const location = JSON.parse(savedLocation);
        if (location.latitude && location.longitude) {
          setUserLocation({ lat: location.latitude, lng: location.longitude });
        }
      } catch (error) {
        console.error('Error parsing saved location:', error);
      }
    }
  }, []);

  const getCurrentLocation = (): Promise<{ lat: number; lng: number }> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by your browser"));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = { lat: latitude, lng: longitude };
          setUserLocation(location);
          localStorage.setItem('userLocation', JSON.stringify({ latitude, longitude }));
          resolve(location);
        },
        (error) => {
          reject(new Error(`Location error: ${error.message}`));
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
      );
    });
  };

  const searchNearbyStations = async () => {
    setSearchingNearby(true);
    
    try {
      let currentLocation = userLocation;
      
      if (!currentLocation) {
        try {
          currentLocation = await getCurrentLocation();
          toast.success("Location detected successfully!");
        } catch (locationError) {
          toast.error("Please enable location access first");
          setSearchingNearby(false);
          return;
        }
      }

      console.log('Searching with location:', currentLocation);
      
      const { data, error } = await supabase.functions.invoke('nearby-stations', {
        body: {
          latitude: currentLocation.lat,
          longitude: currentLocation.lng,
          radius: 20000
        }
      });

      if (error) {
        throw error;
      }

      console.log('Edge Function response:', data);
      
      if (data.status === 'OK' && data.results) {
        setNearbyStations(data.results);
        setVisibleStations(data.results);
        toast.success(`Found ${data.count} nearby charging stations within 20km`);
      } else {
        toast.error(data.message || "No nearby charging stations found within 20km");
        setVisibleStations(stations || []);
      }
    } catch (error) {
      console.error('Error searching nearby stations:', error);
      toast.error("Failed to search nearby stations. Using local data instead.");
      setVisibleStations(stations || []);
    } finally {
      setSearchingNearby(false);
    }
  };

  const showLocalStations = () => {
    setVisibleStations(stations || []);
    setNearbyStations([]);
    toast.success("Showing local stations");
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };
  
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
          {nearbyStations.length > 0 ? 'Nearby Stations (20km radius)' : 'Available Stations'}
        </motion.h2>
        <motion.span 
          className="text-white/70 text-sm"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          {visibleStations.length} stations found
        </motion.span>
      </motion.div>

      <motion.div className="flex gap-2 mb-4" variants={itemVariants}>
        <Button
          onClick={searchNearbyStations}
          disabled={searchingNearby}
          className="glass-button flex items-center gap-2 text-sm"
        >
          {searchingNearby ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <MapPin className="h-4 w-4" />
          )}
          {searchingNearby ? 'Searching...' : 'Find Nearby (20km)'}
        </Button>
        
        {nearbyStations.length > 0 && (
          <Button
            onClick={showLocalStations}
            className="glass-button text-sm"
          >
            Show Local Stations
          </Button>
        )}
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
          let distance = `${(Math.random() * 5).toFixed(1)} miles`;
          if (userLocation && station.latitude && station.longitude) {
            const distanceKm = calculateDistance(
              userLocation.lat, 
              userLocation.lng, 
              station.latitude, 
              station.longitude
            );
            distance = `${distanceKm.toFixed(1)} km`;
          }
          
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
                onBookNow={onStationSelect}
              />
            </motion.div>
          );
        })}
      </motion.div>
      
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
