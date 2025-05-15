
import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import MapView from '../components/map/MapView';
import LocationButton from '../components/ui/LocationButton';
import StationList from '../components/stations/StationList';
import BookingForm from '../components/booking/BookingForm';
import SearchBar from '../components/ui/SearchBar';

const Index = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  
  // This would be triggered when a station is selected
  const toggleBooking = () => {
    setIsBookingOpen(!isBookingOpen);
  };

  return (
    <div className="min-h-screen w-full pb-24">
      <Navbar />
      
      <main className="container pt-24 px-4">
        <div className="mb-6 md:hidden">
          <SearchBar />
        </div>
        
        <div className="mb-6 flex items-center justify-center">
          <LocationButton />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <MapView />
            
            {/* Mobile view station toggle button */}
            <div className="md:hidden mt-4 flex justify-center">
              <button 
                className="glass-button py-2 px-4 flex items-center gap-2"
                onClick={toggleBooking}
              >
                <span>{isBookingOpen ? "View Map" : "View Stations"}</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            
            {/* Mobile view station list or booking (conditionally rendered) */}
            <div className={`md:hidden mt-6 ${isBookingOpen ? 'block' : 'hidden'}`}>
              {isBookingOpen ? <BookingForm /> : <StationList />}
            </div>
          </div>
          
          {/* Desktop sidebar for station list */}
          <div className="hidden md:block">
            <div className="glass-card p-5 h-full">
              <StationList />
            </div>
          </div>
        </div>
        
        {/* Footer with app information */}
        <footer className="mt-16 text-center">
          <p className="text-white/50 text-sm">EV Charge Platform - Find and book charging stations</p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
