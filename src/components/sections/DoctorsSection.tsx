import React, { useState, useEffect } from 'react';
import { getAllDoctors } from '../../api/hospitalApi';
import { Doctor } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Calendar, Star, Award, Clock, Filter } from 'lucide-react';

const DoctorsSection: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('');
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const data = await getAllDoctors();
        setDoctors(data);
        setFilteredDoctors(data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDoctors();
  }, []);

  const specialties = Array.from(new Set(doctors.map(doctor => doctor.specialization)));

  const filterBySpecialty = (specialty: string) => {
    setSelectedSpecialty(specialty);
    
    if (specialty === '') {
      setFilteredDoctors(doctors);
    } else {
      const filtered = doctors.filter(doctor => doctor.specialization === specialty);
      setFilteredDoctors(filtered);
    }
    
    setVisibleCount(8);
  };

  const loadMore = () => {
    setVisibleCount(prev => prev + 8);
  };

  const renderStars = (count: number) => {
    return Array(count).fill(0).map((_, index) => (
      <Star key={index} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
    ));
  };

  if (loading) {
    return (
      <section id="doctors" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full border-t-4 border-blue-600 border-r-4 border-gray-200 animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading doctors...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="doctors" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Specialists</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meet our team of experienced doctors who are committed to providing the highest quality of care.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-center md:justify-between flex-wrap gap-4">
            <div className="flex items-center">
              <Filter className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-gray-700 font-medium">Filter by specialty:</span>
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedSpecialty === '' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => filterBySpecialty('')}
              >
                All
              </button>
              
              {specialties.map(doctorspecialization => (
                <button
                  key={doctorspecialization}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedSpecialty === doctorspecialization 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => filterBySpecialty(doctorspecialization)}
                >
                  {doctorspecialization}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDoctors.slice(0, visibleCount).map((doctor) => (
            <Card key={doctor.doctorId} className="flex flex-col h-full transform hover:-translate-y-1 transition-all duration-300">
              <div className="p-4 flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden mr-4 border-2 border-blue-100">
                    <img 
                      src={doctor.doctordoctorImage} 
                      alt={doctor.doctordoctorImage} 
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
                      {renderStars(4 + Math.floor(Math.random()))}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3 mb-4 flex-grow">
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
                  className="w-full mt-auto"
                  onClick={() => window.location.href = '#book'}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Appointment
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {visibleCount < filteredDoctors.length && (
          <div className="mt-10 text-center">
            <Button variant="secondary" onClick={loadMore}>
              Load More Doctors
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default DoctorsSection;