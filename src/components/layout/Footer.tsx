import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Stethoscope } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center mb-4">
              <Stethoscope className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold">MedConnect</span>
            </div>
            <p className="text-gray-400 mb-4">
              Connecting patients with the best healthcare providers across multiple hospitals for quality care and convenient booking.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#hospitals" className="text-gray-400 hover:text-white transition-colors">Hospitals</a>
              </li>
              <li>
                <a href="#doctors" className="text-gray-400 hover:text-white transition-colors">Doctors & Specialists</a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-white transition-colors">About Us</a>
              </li>
              <li>
                <a href="#book" className="text-gray-400 hover:text-white transition-colors">Book Appointment</a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Find a Doctor</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Hospital Comparison</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Online Appointment</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Medical Records</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Health Tips</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-blue-400 mr-2 mt-0.5" />
                <span className="text-gray-400">123 Healthcare Avenue, Medical District, 12345</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-blue-400 mr-2" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-blue-400 mr-2" />
                <span className="text-gray-400">contact@medconnect.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <p className="text-gray-400 text-center text-sm">
            © {new Date().getFullYear()} MedConnect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;