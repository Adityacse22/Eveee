import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Button } from './button';
import { Input } from './input';
import LocationFinder from '../LocationFinder';
import { ChargingStation } from '../LocationFinder';
import { toast } from 'sonner';

interface SearchBarProps {
  onStationsFound?: (stations: ChargingStation[]) => void;
}

export default function SearchBar({ onStationsFound }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showLocationFinder, setShowLocationFinder] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError(null);
      
      if (!searchQuery.trim()) {
        toast.warning('Please enter a location to search');
        return;
      }

      // Here you would typically make an API call to search for locations
      // For now, we'll just show the location finder
      setShowLocationFinder(true);
    } catch (err) {
      console.error('Error in search:', err);
      setError('Failed to perform search');
      toast.error('Search failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStationsFound = (stations: ChargingStation[]) => {
    try {
      if (onStationsFound) {
        onStationsFound(stations);
      }
      setShowLocationFinder(false);
    } catch (err) {
      console.error('Error handling found stations:', err);
      toast.error('Failed to process found stations');
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative flex items-center">
          <Input
            type="text"
            placeholder="Search for a location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
          />
          <Search className="absolute left-3 text-gray-400 h-5 w-5" />
          <Button
            type="submit"
            className="absolute right-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
            disabled={isLoading}
          >
            {isLoading ? 'Searching...' : 'Search'}
          </Button>
        </div>
      </form>

      {error && (
        <div className="mt-2 text-red-500 text-sm">
          {error}
        </div>
      )}

      {showLocationFinder && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50">
          <LocationFinder onStationsFound={handleStationsFound} />
        </div>
      )}
    </div>
  );
}
