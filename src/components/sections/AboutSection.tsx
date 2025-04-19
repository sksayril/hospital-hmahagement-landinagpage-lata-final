import React from 'react';
import { Heart, Award, Users, Stethoscope, CheckCircle } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About MedConnect</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connecting patients with quality healthcare providers for a better medical experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="order-2 lg:order-1">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Your Gateway to Quality Healthcare</h3>
            <p className="text-gray-600 mb-6">
              MedConnect is a state-of-the-art platform designed to bridge the gap between patients and healthcare 
              providers. We understand that finding the right doctor at the right hospital can be challenging, 
              which is why we've created a comprehensive solution that makes healthcare accessible to everyone.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-800">Extensive Network</h4>
                  <p className="text-gray-600">Access to hundreds of doctors across multiple hospitals and specialties.</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-800">Simple Booking Process</h4>
                  <p className="text-gray-600">Book appointments with just a few clicks, no phone calls required.</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-800">Verified Reviews</h4>
                  <p className="text-gray-600">Read authentic patient reviews to make informed decisions.</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-800">Smart Recommendations</h4>
                  <p className="text-gray-600">Get personalized doctor recommendations based on your health needs.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md transform hover:-translate-y-2 transition-all duration-300">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Heart className="w-7 h-7 text-blue-600" />
                </div>
                <h4 className="text-xl font-semibold text-center text-gray-800 mb-2">Patient-Centered</h4>
                <p className="text-center text-gray-600">Your health and comfort are our top priorities.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md transform hover:-translate-y-2 transition-all duration-300">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Award className="w-7 h-7 text-blue-600" />
                </div>
                <h4 className="text-xl font-semibold text-center text-gray-800 mb-2">Quality Care</h4>
                <p className="text-center text-gray-600">Partner with only the best healthcare providers.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md transform hover:-translate-y-2 transition-all duration-300">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Users className="w-7 h-7 text-blue-600" />
                </div>
                <h4 className="text-xl font-semibold text-center text-gray-800 mb-2">Accessibility</h4>
                <p className="text-center text-gray-600">Making healthcare accessible to everyone.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md transform hover:-translate-y-2 transition-all duration-300">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Stethoscope className="w-7 h-7 text-blue-600" />
                </div>
                <h4 className="text-xl font-semibold text-center text-gray-800 mb-2">Expert Doctors</h4>
                <p className="text-center text-gray-600">Connect with experienced specialists in every field.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;