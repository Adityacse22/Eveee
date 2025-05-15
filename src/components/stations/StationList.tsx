import React, { useState, useEffect } from 'react';
import { MapPin, Star, ChargingStation } from 'lucide-react';
import { Button } from '../ui/button';
import { ChargingStation as StationType } from '../LocationFinder';
import { toast } from 'sonner';

interface StationListProps {
  nearbyStations: StationType[];
}

export default function StationList({ nearbyStations }: StationListProps) {
  const [stations, setStations] = useState<StationType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setStations(nearbyStations);
    } catch (err) {
      console.error('Error setting stations:', err);
      setError('Failed to load stations');
      toast.error('Failed to load charging stations');
    }
  }, [nearbyStations]);

  const handleBookNow = async (stationId: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // Here you would typically make an API call to book the station
      // For now, we'll just show a success message
      toast.success('Station booked successfully!');
    } catch (err) {
      console.error('Error booking station:', err);
      setError('Failed to book station');
      toast.error('Failed to book charging station');
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
        <Button
          onClick={() => setError(null)}
          className="mt-4"
          variant="outline"
        >
          Try Again
        </Button>
      </div>
    );
  }

  if (stations.length === 0) {
    return (
      <div className="text-center py-8">
        <ChargingStation className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Stations Found</h3>
        <p className="text-gray-500">
          Try searching in a different location or use your current location
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Nearby Stations</h2>
      <div className="space-y-4">
        {stations.map((station) => (
          <div
            key={station.id}
            className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-gray-900">{station.name}</h3>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{station.address}</span>
                </div>
                <div className="flex items-center mt-2">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="text-sm text-gray-600">
                    {station.rating.toFixed(1)} ({station.distance.toFixed(1)} km away)
                  </span>
                </div>
              </div>
              <Button
                onClick={() => handleBookNow(station.id)}
                disabled={isLoading || !station.available}
                className="ml-4"
              >
                {isLoading ? 'Booking...' : 'Book Now'}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
