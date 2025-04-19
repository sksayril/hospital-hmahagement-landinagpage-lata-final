import React, { useState, useEffect } from 'react';
import { getAllHospitals, getDoctorsByHospital } from '../../api/hospitalApi';
import { Hospital, Doctor } from '../../types';
import Card from '../ui/Card';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { Phone, MapPin, Mail, ChevronRight, Star, Award, Clock, Calendar, Building2 } from 'lucide-react';

const HospitalsSection: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(4);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingDoctors, setLoadingDoctors] = useState(false);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const data = await getAllHospitals();
        setHospitals(data);
      } catch (error) {
        console.error('Error fetching hospitals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  const handleViewDoctors = async (hospital: Hospital) => {
    setSelectedHospital(hospital);
    setIsModalOpen(true);
    setLoadingDoctors(true);

    try {
      const doctorsData = await getDoctorsByHospital(hospital._id);
      setDoctors(doctorsData);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    } finally {
      setLoadingDoctors(false);
    }
  };

  const loadMore = () => {
    setVisibleCount(prev => prev + 4);
  };

  if (loading) {
    return (
      <section id="hospitals" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full border-t-4 border-blue-600 border-r-4 border-gray-200 animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading hospitals...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="hospitals" className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Partner Hospitals</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We've partnered with the finest healthcare institutions to provide you with top-quality medical services and care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {hospitals.slice(0, visibleCount).map((hospital) => (
            <Card key={hospital._id} className="group flex flex-col h-full transform hover:-translate-y-2 transition-all duration-300">
              <div className="relative h-48 overflow-hidden rounded-t-xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <img 
                  src={hospital.imageUrl} 
                  alt={hospital.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2128&q=80';
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                  <h3 className="text-xl font-semibold text-white mb-1">{hospital.name}</h3>
                  <div className="flex items-center text-white/90 text-sm">
                    <Building2 className="w-4 h-4 mr-1" />
                    <span>Multi-Specialty Hospital</span>
                  </div>
                </div>
              </div>
              
              <div className="p-5 flex-grow bg-white">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                    <p className="text-gray-600 text-sm">{hospital.address}</p>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" />
                    <p className="text-gray-600 text-sm">{hospital.phone}</p>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" />
                    <p className="text-gray-600 text-sm truncate">{hospital.email}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-5 pt-0 mt-auto bg-white rounded-b-xl">
                <Button 
                  variant="primary" 
                  className="w-full group-hover:shadow-lg transition-shadow"
                  onClick={() => handleViewDoctors(hospital)}
                >
                  View Doctors
                  <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {visibleCount < hospitals.length && (
          <div className="mt-10 text-center">
            <Button variant="secondary" onClick={loadMore}>
              Load More Hospitals
            </Button>
          </div>
        )}

        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          title={`Doctors at ${selectedHospital?.name}`}
        >
          {loadingDoctors ? (
            <div className="py-12">
              <div className="w-12 h-12 rounded-full border-t-4 border-blue-600 border-r-4 border-gray-200 animate-spin mx-auto"></div>
              <p className="text-center mt-4 text-gray-600">Loading doctors...</p>
            </div>
          ) : doctors.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-gray-600">No doctors found for this hospital.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[70vh] overflow-y-auto p-4">
              {doctors.map((doctor) => (
                <Card key={doctor.doctorId} className="flex flex-col h-full">
                  <div className="p-4">
                    <div className="flex items-center mb-4">
                      <div className="w-20 h-20 rounded-full overflow-hidden mr-4 border-2 border-blue-100">
                        <img 
                          src={doctor.doctorImage} 
                          alt={doctor.doctorName} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://randomuser.me/api/portraits/men/1.jpg';
                          }}
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{doctor.doctorName}</h3>
                        <p className="text-blue-600 font-medium">{doctor.specialization}</p>
                        <div className="flex mt-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              className="w-4 h-4 text-yellow-400 fill-yellow-400" 
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center">
                        <Award className="w-5 h-5 text-blue-600 mr-2" />
                        <p className="text-gray-600 text-sm">{doctor.experience}+ years experience</p>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <p className="text-gray-600 text-sm">Available Mon-Fri</p>
                      </div>
                    </div>
                    
                    <Button 
                      variant="primary" 
                      className="w-full"
                      onClick={() => window.location.href = '#book'}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Appointment
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Modal>
      </div>
    </section>
  );
};

export default HospitalsSection;