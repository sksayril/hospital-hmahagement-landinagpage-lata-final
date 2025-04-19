import React, { useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import HospitalsSection from './components/sections/HospitalsSection';
import DoctorsSection from './components/sections/DoctorsSection';
import AboutSection from './components/sections/AboutSection';
import BookingSection from './components/sections/BookingSection';
import ServicesSection from './components/sections/ServicesSection';
import TestimonialsSection from './components/sections/TestimonialsSection';
import ChatBot from './components/chat/ChatBot';

function App() {
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href') as string);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <ServicesSection />
        <HospitalsSection />
        <DoctorsSection />
        <TestimonialsSection />
        <AboutSection />
        <BookingSection />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
}

export default App;