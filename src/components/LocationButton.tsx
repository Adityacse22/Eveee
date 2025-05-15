import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { toast } from 'sonner';

const LocationButton: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGetLocation = async () => {
    try {
      setIsLoading(true);
      
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by your browser');
      }

      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        });
      });

      const { latitude, longitude } = position.coords;
      
      // Here you would typically use these coordinates to find nearby stations
      // For now, we'll just show a success message
      toast.success('Location found! Searching for nearby stations...');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      if (error instanceof GeolocationPositionError) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            toast.error('Please allow location access to find nearby stations');
            break;
          case error.POSITION_UNAVAILABLE:
            toast.error('Location information is unavailable');
            break;
          case error.TIMEOUT:
            toast.error('Location request timed out');
            break;
          default:
            toast.error('An error occurred while getting your location');
        }
      } else {
        toast.error('Failed to get location');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleGetLocation}
      disabled={isLoading}
      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      <MapPin className="w-5 h-5 mr-2" />
      {isLoading ? 'Finding Location...' : 'Use My Location'}
    </button>
  );
};

export default LocationButton; 