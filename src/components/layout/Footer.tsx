import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Mail, MessageSquare, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function Footer() {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    
    if (email) {
      toast.success("Thanks for subscribing to our newsletter!");
      (form.elements.namedItem('email') as HTMLInputElement).value = '';
    }
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
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        damping: 12
      }
    }
  };

  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Eveee</h3>
            <p className="text-gray-600">
              Making electric vehicle charging accessible and convenient for everyone.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-800 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Home</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Stations</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">About</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-800 mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Help Center</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">FAQs</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-800 mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="text-gray-600">Email: support@eveee.com</li>
              <li className="text-gray-600">Phone: (555) 123-4567</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Eveee. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
