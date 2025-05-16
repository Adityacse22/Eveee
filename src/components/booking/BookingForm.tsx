
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Zap, CreditCard, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface BookingFormProps {
  stationName?: string;
  price?: string;
  onBookingComplete?: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ 
  stationName = "Charging Station",
  price = "$0.45",
  onBookingComplete
}) => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [duration, setDuration] = useState(30);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  
  const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];
  const durations = [30, 60, 90, 120];

  // Calculate estimated cost based on duration and price
  const priceNumber = parseFloat(price?.replace('$', '') || '0.45');
  const estimatedCost = ((priceNumber * duration) / 60 * 7).toFixed(2); // kW rate * hours * estimated kW
  
  const handleBookNow = () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Booking Error",
        description: "Please select both date and time for your booking",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setBookingStep(2); // Move to confirmation step
      
      // Show success toast
      toast({
        title: "Booking Confirmed!",
        description: `Your booking at ${stationName} on ${selectedDate} at ${selectedTime} has been confirmed.`,
      });
      
      // After showing confirmation for a moment, close the dialog
      setTimeout(() => {
        if (onBookingComplete) {
          onBookingComplete();
        }
      }, 3000);
    }, 1500);
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 20
      }
    }
  };

  return (
    <motion.div 
      className="p-4 animate-fade-in"
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      {bookingStep === 1 ? (
        <motion.div className="space-y-6">
          <motion.div variants={itemVariants}>
            <label className="block text-white mb-2 text-sm">Select Date</label>
            <div className="relative">
              <input 
                type="date" 
                className="glass-input w-full pl-10 bg-white/5 border border-white/10 rounded-lg p-3 text-white"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-ev-blue" />
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-white mb-2 text-sm">Select Time</label>
            <div className="relative">
              <select 
                className="glass-input w-full pl-10 appearance-none bg-white/5 border border-white/10 rounded-lg p-3 text-white"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              >
                <option value="">Select a time slot</option>
                {timeSlots.map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-ev-blue" />
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-white mb-2 text-sm">Session Duration</label>
            <div className="flex flex-wrap gap-2">
              {durations.map((mins) => (
                <motion.button
                  key={mins}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    duration === mins
                      ? 'bg-ev-blue text-white shadow-neon-blue' 
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                  onClick={() => setDuration(mins)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {mins} min
                </motion.button>
              ))}
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="pt-4 border-t border-white/10">
            <div className="flex justify-between items-center mb-3">
              <span className="text-white/70 flex items-center">
                <Zap className="w-4 h-4 mr-1 text-ev-blue" /> Charging rate:
              </span>
              <span className="text-white">{price}/kWh</span>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-white/70">Estimated cost:</span>
              <span className="text-white font-medium">${estimatedCost}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">Duration:</span>
              <span className="text-white">{duration} minutes</span>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Button 
              onClick={handleBookNow} 
              className="w-full bg-blue-green-gradient hover:opacity-90 transition-all text-white rounded-full py-6 mt-4 shadow-neon-blue"
              disabled={isSubmitting || !selectedDate || !selectedTime}
              aria-label="Confirm Booking"
            >
              {isSubmitting ? (
                <motion.div
                  className="flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                >
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </motion.div>
              ) : (
                <div className="flex items-center justify-center">
                  <CreditCard className="mr-2" />
                  Confirm Booking
                </div>
              )}
            </Button>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div 
          className="flex flex-col items-center justify-center py-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", damping: 15 }}
        >
          <motion.div 
            className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6"
            animate={{ 
              boxShadow: ["0 0 0 0 rgba(74, 222, 128, 0)", "0 0 0 20px rgba(74, 222, 128, 0)"],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Check className="w-10 h-10 text-green-500" />
          </motion.div>
          <h3 className="text-xl font-bold text-white mb-2">Booking Confirmed!</h3>
          <p className="text-white/70 text-center mb-4">
            Your charging session has been scheduled for<br/>
            <span className="text-white">{selectedDate} at {selectedTime}</span>
          </p>
          <p className="text-ev-blue text-sm">
            A confirmation has been sent to your email
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default BookingForm;
