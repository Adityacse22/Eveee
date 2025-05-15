import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { toast } from 'sonner';

export default function BookingForm() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [duration, setDuration] = useState('1');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError(null);

      // Validate inputs
      if (!selectedDate || !selectedTime || !duration) {
        throw new Error('Please fill in all fields');
      }

      // Here you would typically make an API call to book the station
      // For now, we'll just show a success message
      toast.success('Booking successful!');
      
      // Reset form
      setSelectedDate('');
      setSelectedTime('');
      setDuration('1');
    } catch (err) {
      console.error('Error submitting booking:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit booking');
      toast.error('Failed to submit booking');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Book a Charging Station</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-md">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full"
            required
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Time
          </label>
          <Input
            type="time"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="w-full"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Duration (hours)
          </label>
          <Input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            min="1"
            max="24"
            className="w-full"
            required
          />
        </div>
        
        <Button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white"
          disabled={isLoading}
        >
          {isLoading ? 'Booking...' : 'Book Now'}
        </Button>
      </form>
    </div>
  );
}
