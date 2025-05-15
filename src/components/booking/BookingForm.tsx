
import React, { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";

const BookingForm: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [duration, setDuration] = useState(30);
  
  const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM'];
  const durations = [30, 60, 90, 120];

  return (
    <div className="glass-card p-6 animate-slide-up">
      <h2 className="text-xl font-bold mb-6 gradient-text">Book Your Charging Session</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-white mb-2 text-sm">Select Date</label>
          <div className="relative">
            <input 
              type="date" 
              className="glass-input w-full pl-10"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/70" />
          </div>
        </div>

        <div>
          <label className="block text-white mb-2 text-sm">Select Time</label>
          <div className="relative">
            <select 
              className="glass-input w-full pl-10 appearance-none"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            >
              <option value="">Select a time slot</option>
              {timeSlots.map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/70" />
          </div>
        </div>

        <div>
          <label className="block text-white mb-2 text-sm">Session Duration</label>
          <div className="flex space-x-2">
            {durations.map((mins) => (
              <button
                key={mins}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  duration === mins
                    ? 'bg-ev-blue text-white shadow-neon-blue' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
                onClick={() => setDuration(mins)}
              >
                {mins} min
              </button>
            ))}
          </div>
        </div>
        
        <div className="pt-4 border-t border-white/10">
          <div className="flex justify-between items-center mb-3">
            <span className="text-white/70">Charging rate:</span>
            <span className="text-white">$0.45/kWh</span>
          </div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-white/70">Estimated cost:</span>
            <span className="text-white font-medium">$7.20</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/70">Duration:</span>
            <span className="text-white">{duration} minutes</span>
          </div>
        </div>
        
        <Button className="w-full bg-blue-green-gradient hover:opacity-90 transition-all text-white rounded-full py-3 mt-4 shadow-neon-blue">
          Confirm Booking
        </Button>
      </div>
    </div>
  );
};

export default BookingForm;
