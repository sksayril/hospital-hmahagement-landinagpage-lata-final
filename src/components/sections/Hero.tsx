import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';
import { Search, Calendar, MapPin, Stethoscope, ChevronRight } from 'lucide-react';

const Hero = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Cards with specialties to cycle through
  const specialtyCards = [
    { name: "Cardiology", icon: "❤️" },
    { name: "Neurology", icon: "🧠" },
    { name: "Orthopedics", icon: "🦴" },
    { name: "Pediatrics", icon: "👶" },
    { name: "Dermatology", icon: "🧬" }
  ];

  // Automatic cycling through cards
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % specialtyCards.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Track mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-blue-50 to-white z-0"></div>
      
      {/* Floating circles - motion based on mouse position */}
      <div 
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-500 opacity-10 blur-3xl"
        style={{ 
          transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
          transition: 'transform 0.3s ease-out'
        }}
      ></div>
      <div 
        className="absolute -bottom-48 -left-24 w-80 h-80 rounded-full bg-blue-600 opacity-10 blur-3xl"
        style={{ 
          transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
          transition: 'transform 0.3s ease-out'
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
              Your Health, <span className="text-blue-600">Our Priority</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-xl mx-auto lg:mx-0">
              Find and book appointments with top doctors across multiple hospitals in your area. Quality healthcare is just a click away.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="primary" size="lg">
                Find a Doctor
              </Button>
              <Button variant="outline" size="lg">
                Explore Hospitals
              </Button>
            </div>
          </div>
          
          <div className="relative mt-8 lg:mt-0">
            {/* Interactive specialty showcase */}
            <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-3xl shadow-xl max-w-md mx-auto border border-blue-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-blue-800">Find Specialists</h3>
                <div className="flex space-x-1">
                  {specialtyCards.map((_, index) => (
                    <div 
                      key={index}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === activeCard ? "w-6 bg-blue-600" : "w-2 bg-blue-200"
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
              
              {/* Animated cards */}
              <div className="relative h-64 mb-6 overflow-hidden rounded-2xl">
                {specialtyCards.map((specialty, index) => (
                  <div 
                    key={index}
                    className={`absolute inset-0 p-6 bg-white rounded-2xl shadow-lg flex flex-col justify-between transition-all duration-500 ease-in-out ${
                      index === activeCard 
                        ? "opacity-100 translate-x-0" 
                        : index < activeCard 
                          ? "opacity-0 -translate-x-full" 
                          : "opacity-0 translate-x-full"
                    }`}
                    style={{ 
                      transform: `perspective(1000px) 
                                rotateY(${mousePosition.x * 5}deg) 
                                rotateX(${mousePosition.y * -5}deg)`,
                      transition: 'transform 0.2s ease-out, opacity 0.5s ease-in-out, translate 0.5s ease-in-out'
                    }}
                  >
                    <div>
                      <div className="inline-block p-4 bg-blue-100 rounded-2xl mb-4">
                        <span className="text-4xl">{specialty.icon}</span>
                      </div>
                      <h4 className="text-xl font-semibold text-gray-800">{specialty.name}</h4>
                      <p className="text-gray-600 mt-2">
                        Connect with top {specialty.name.toLowerCase()} specialists in your area for expert care and treatment.
                      </p>
                    </div>
                    {/* <div className="flex justify-end">
                      <Button variant="primary" size="sm" className="mt-4">
                        Find Specialist <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div> */}
                  </div>
                ))}
              </div>
              
              {/* Quick action buttons */}
              <div className="grid grid-cols-3 gap-3">
                <button className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all duration-300 flex flex-col items-center">
                  <Calendar className="w-6 h-6 text-blue-600 mb-2" />
                  <span className="text-xs font-medium">Book Now</span>
                </button>
                <button className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all duration-300 flex flex-col items-center">
                  <MapPin className="w-6 h-6 text-blue-600 mb-2" />
                  <span className="text-xs font-medium">Locations</span>
                </button>
                <button className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all duration-300 flex flex-col items-center">
                  <Stethoscope className="w-6 h-6 text-blue-600 mb-2" />
                  <span className="text-xs font-medium">All Doctors</span>
                </button>
              </div>
            </div>
            
            {/* Animated decorative elements */}
            <div 
              className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-500 rounded-full opacity-20"
              style={{
                animation: 'pulse 3s infinite ease-in-out',
                transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
                transition: 'transform 0.5s ease-out'
              }}
            ></div>
            <div 
              className="absolute -top-4 -left-4 w-16 h-16 bg-blue-600 rounded-full opacity-20"
              style={{
                animation: 'pulse 4s infinite ease-in-out reverse',
                transform: `translate(${mousePosition.x * -10}px, ${mousePosition.y * -10}px)`,
                transition: 'transform 0.5s ease-out'
              }}
            ></div>

            {/* Global CSS for animations - would typically go in a separate CSS file */}
            <style jsx>{`
              @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.2); }
                100% { transform: scale(1); }
              }
            `}</style>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;