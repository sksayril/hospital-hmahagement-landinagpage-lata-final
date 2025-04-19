import React, { useState, useEffect } from 'react';
import { Menu, X, Stethoscope, UserRound, Info, Calendar, ChevronDown,Home } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activePath, setActivePath] = useState('#');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Set active path based on current hash
    const setPath = () => {
      const path = window.location.hash || '#';
      setActivePath(path);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('hashchange', setPath);
    setPath();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', setPath);
    };
  }, []);

  const navItems = [
    { name: 'Home', href: '#', icon: <Home className="w-5 h-5 mr-2" /> },
    { name: 'Hospitals', href: '#hospitals', icon: <Stethoscope className="w-5 h-5 mr-2" /> },
    { name: 'Doctors & Specialists', href: '#doctors', icon: <UserRound className="w-5 h-5 mr-2" /> },
    { name: 'About Us', href: '#about', icon: <Info className="w-5 h-5 mr-2" /> },
    { name: 'Book Now', href: '#book', icon: <Calendar className="w-5 h-5 mr-2" /> },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white shadow-lg py-2' 
          : 'bg-transparent backdrop-blur-sm bg-white/70 py-4'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center group cursor-pointer">
            <Stethoscope className="h-8 w-8 text-blue-600 transition-all duration-300 group-hover:rotate-12" />
            <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              MedConnect
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1 items-center">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`relative flex items-center text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 ${
                  item.name === 'Book Now'
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transform hover:-translate-y-1'
                    : `${activePath === item.href ? 'text-blue-600' : 'text-gray-700'} hover:bg-blue-50`
                }`}
              >
                {item.icon}
                {item.name}
                {activePath === item.href && item.name !== 'Book Now' && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-blue-600 rounded-full" />
                )}
              </a>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-700 hover:text-blue-600 focus:outline-none p-2 rounded-full hover:bg-blue-50 transition-colors duration-300"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={`md:hidden bg-white border-t border-gray-100 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100 shadow-lg' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`flex items-center px-3 py-3 rounded-md text-base font-medium transition-all duration-300 ${
                activePath === item.href
                  ? 'bg-blue-50 text-blue-600'
                  : item.name === 'Book Now'
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
              }`}
              onClick={() => setIsOpen(false)}
            >
              <span className="mr-2 transition-transform duration-300 transform group-hover:rotate-12">
                {item.icon}
              </span>
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;