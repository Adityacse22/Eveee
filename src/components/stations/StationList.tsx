
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import StationCard from './StationCard';
import FilterBar from '../ui/FilterBar';
import { useStations } from '@/hooks/useStations';
import { Loader2, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

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

  // Get user location from localStorage or request it
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
      
      // If no location is available, try to get it
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
      
      // Increased radius to 20km (20000 meters) for wider search area
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${currentLocation.lat},${currentLocation.lng}&radius=20000&type=gas_station&keyword=electric%20vehicle%20charging&key=AIzaSyCXo5DViPSCe7Ngv9xob9VaAS1kH7HyiPs`,
        {
          method: 'GET',
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Google Places API response:', data);
      
      if (data.status === 'OK' && data.results) {
        const formattedStations = data.results.map((place: any) => ({
          id: place.place_id,
          name: place.name,
          address: place.vicinity,
          latitude: place.geometry.location.lat,
          longitude: place.geometry.location.lng,
          price_per_kwh: 0.40, // Default price
          available: place.business_status === 'OPERATIONAL',
          rating: place.rating || 4.0,
          total_reviews: place.user_ratings_total || 0,
          connectors: [
            {
              id: `${place.place_id}_1`,
              station_id: place.place_id,
              connector_type: 'Type 2',
              power_output: 22,
              available: true,
              created_at: new Date().toISOString()
            }
          ]
        }));

        setNearbyStations(formattedStations);
        setVisibleStations(formattedStations);
        toast.success(`Found ${formattedStations.length} nearby charging stations within 20km`);
      } else if (data.status === 'ZERO_RESULTS') {
        toast.error("No nearby charging stations found within 20km");
        setVisibleStations(stations || []);
      } else {
        console.error('Google Places API error:', data);
        toast.error(`Search failed: ${data.status}`);
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

  // Calculate distance between two coordinates
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in km
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

      {/* Search buttons */}
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
          // Calculate distance if user location is available
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
                onBookNow={onStationSelect}
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
