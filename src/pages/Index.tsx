import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/Footer';
import LocationButton from '../components/LocationButton';
import StationList from '../components/stations/StationList';
import BookingForm from '../components/booking/BookingForm';
import SearchBar from '../components/ui/SearchBar';
import HeroSection from '../components/ui/HeroSection';

const Index: React.FC = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedStation, setSelectedStation] = useState<any>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleStationSelect = (station: any) => {
    try {
      setSelectedStation(station);
      setShowBookingForm(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError('Failed to select station. Please try again.');
      toast.error('Failed to select station');
    }
  };

  const handleBookingSubmit = async (bookingData: any) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Booking successful!');
      setShowBookingForm(false);
      setSelectedStation(null);
    } catch (err) {
      setError('Failed to submit booking. Please try again.');
      toast.error('Failed to submit booking');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Search completed');
    } catch (err) {
      setError('Search failed. Please try again.');
      toast.error('Search failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar hasScrolled={hasScrolled} />
      
      <main>
        <HeroSection />
        
        <section className="py-16">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto"
            >
              <SearchBar onSearch={handleSearch} />
              <div className="mt-4 flex justify-center">
                <LocationButton />
              </div>
            </motion.div>
          </div>
        </section>

        {error && (
          <div className="container">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          </div>
        )}

        {showBookingForm && selectedStation && (
          <section className="py-16 bg-white dark:bg-gray-800">
            <div className="container">
              <BookingForm
                station={selectedStation}
                onSubmit={handleBookingSubmit}
                onCancel={() => setShowBookingForm(false)}
                isLoading={isLoading}
              />
            </div>
          </section>
        )}

        <section className="py-16">
          <div className="container">
            <StationList onStationSelect={handleStationSelect} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
