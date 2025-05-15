import React, { useState, useEffect } from 'react';
import { MapPin, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';

export interface ChargingStation {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  available: boolean;
  rating: number;
  distance: number;
}

interface LocationFinderProps {
  onStationsFound?: (stations: ChargingStation[]) => void;
}

export default function LocationFinder({ onStationsFound }: LocationFinderProps) {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [chargingStations, setChargingStations] = useState<ChargingStation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getUserLocation = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by your browser');
      }

      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        });
      });

      const { latitude, longitude } = position.coords;
      setUserLocation({ lat: latitude, lng: longitude });
      
      // Find nearby charging stations
      await findNearbyChargingStations(latitude, longitude);
    } catch (err) {
      console.error('Error getting location:', err);
      setError('Failed to get your location. Please check your browser settings.');
      toast.error('Location access denied or failed');
    } finally {
      setIsLoading(false);
    }
  };

  const findNearbyChargingStations = async (latitude: number, longitude: number) => {
    try {
      setIsLoading(true);
      setError(null);

      // Here you would typically make an API call to get nearby charging stations
      // For now, we'll use mock data
      const mockStations: ChargingStation[] = [
        {
          id: '1',
          name: 'Downtown Charging Station',
          address: '123 Main St, City',
          latitude: latitude + 0.01,
          longitude: longitude + 0.01,
          available: true,
          rating: 4.5,
          distance: 0.5
        },
        {
          id: '2',
          name: 'Shopping Mall Charger',
          address: '456 Market St, City',
          latitude: latitude - 0.01,
          longitude: longitude - 0.01,
          available: true,
          rating: 4.2,
          distance: 0.8
        }
      ];

      setChargingStations(mockStations);
      if (onStationsFound) {
        onStationsFound(mockStations);
      }
    } catch (err) {
      console.error('Error finding charging stations:', err);
      setError('Failed to find nearby charging stations');
      toast.error('Failed to fetch charging stations');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Find Charging Stations</h2>
        <Button
          onClick={getUserLocation}
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <MapPin className="h-4 w-4" />
          )}
          <span>Use My Location</span>
        </Button>
      </div>

      {error && (
        <div className="text-red-500 text-sm mb-4">
          {error}
        </div>
      )}

      {isLoading && (
        <div className="flex items-center justify-center py-4">
          <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
        </div>
      )}

      {userLocation && !isLoading && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">
            Your location: {userLocation.lat.toFixed(6)}, {userLocation.lng.toFixed(6)}
          </p>
          {chargingStations.length > 0 ? (
            <div className="space-y-2">
              {chargingStations.map(station => (
                <div
                  key={station.id}
                  className="p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-medium">{station.name}</h3>
                  <p className="text-sm text-gray-600">{station.address}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-gray-500">
                      {station.distance.toFixed(1)} km away
                    </span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">
                      Rating: {station.rating}/5
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">
              No charging stations found nearby
            </p>
          )}
        </div>
      )}
    </div>
  );
} 