import React, { useState, useEffect } from 'react';
import { getAllHospitals, getDoctorsByHospital, getDoctorSlots, bookAppointment } from '../../api/hospitalApi';
import { Hospital, Doctor, SlotResponse, Slot, BookingData } from '../../types';
import Button from '../ui/Button';
import { Calendar, Clock, CheckCircle } from 'lucide-react';

const BookingSection: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [slots, setSlots] = useState<SlotResponse[]>([]);
  const [selectedHospital, setSelectedHospital] = useState<string>('');
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    diagnosis: '',
  });

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const data = await getAllHospitals();
        setHospitals(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching hospitals:', error);
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      if (selectedHospital) {
        try {
          const doctorsData = await getDoctorsByHospital(selectedHospital);
          setDoctors(doctorsData);
          setSelectedDoctor('');
          setSlots([]);
        } catch (error) {
          console.error('Error fetching doctors:', error);
        }
      } else {
        setDoctors([]);
      }
    };

    fetchDoctors();
  }, [selectedHospital]);

  useEffect(() => {
    const fetchSlots = async () => {
      if (selectedDoctor) {
        try {
          const slotsData = await getDoctorSlots(selectedDoctor);
          setSlots(slotsData);
          setSelectedSlot('');
        } catch (error) {
          console.error('Error fetching slots:', error);
        }
      } else {
        setSlots([]);
      }
    };

    fetchSlots();
  }, [selectedDoctor]);

  const handleHospitalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedHospital(e.target.value);
  };

  const handleDoctorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDoctor(e.target.value);
  };

  const handleSlotChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSlot(e.target.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const bookingData: BookingData = {
        name: formData.name,
        contactNumber: formData.contactNumber,
        diagnosis: formData.diagnosis,
        doctorId: selectedDoctor,
        hospitalId: selectedHospital,
        slotId: selectedSlot
      };

      await bookAppointment(bookingData);
      
      // Show success message
      setFormSubmitted(true);
      
      // Reset form after submission
      setTimeout(() => {
        setFormData({
          name: '',
          contactNumber: '',
          diagnosis: ''
        });
        setSelectedHospital('');
        setSelectedDoctor('');
        setSelectedSlot('');
        setFormSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Failed to book appointment. Please try again.');
    }
  };

  if (loading) {
    return (
      <section id="book" className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full border-t-4 border-blue-600 border-r-4 border-gray-200 animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="book" className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Book Your Appointment</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Schedule a visit with our top doctors in just a few clicks and take the first step towards better health.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {formSubmitted ? (
              <div className="p-8 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Appointment Booked Successfully!</h3>
                <p className="text-gray-600 mb-6">
                  Thank you for booking an appointment with us. You will receive a confirmation shortly.
                </p>
                <Button 
                  variant="primary" 
                  onClick={() => setFormSubmitted(false)}
                >
                  Book Another Appointment
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="hospital" className="block text-sm font-medium text-gray-700 mb-1">
                        Select Hospital*
                      </label>
                      <select
                        id="hospital"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={selectedHospital}
                        onChange={handleHospitalChange}
                        required
                      >
                        <option value="">Select a hospital</option>
                        {hospitals.map((hospital) => (
                          <option key={hospital._id} value={hospital._id}>
                            {hospital.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="doctor" className="block text-sm font-medium text-gray-700 mb-1">
                        Select Doctor*
                      </label>
                      <select
                        id="doctor"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={selectedDoctor}
                        onChange={handleDoctorChange}
                        disabled={!selectedHospital}
                        required
                      >
                        <option value="">Select a doctor</option>
                        {doctors.map((doctor) => (
                          <option key={doctor.doctorId} value={doctor.doctorId}>
                            {doctor.doctorName} - {doctor.specialization}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="slot" className="block text-sm font-medium text-gray-700 mb-1">
                      Available Slots*
                    </label>
                    <select
                      id="slot"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={selectedSlot}
                      onChange={handleSlotChange}
                      disabled={!selectedDoctor}
                      required
                    >
                      <option value="">Select a time slot</option>
                      {slots.map((slotData) => (
                        slotData.slots.map((slot) => (
                          <option key={slot._id} value={slot._id}>
                            {slotData.date} ({slot.startTime} - {slot.endTime})
                          </option>
                        ))
                      ))}
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name*
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Contact Number*
                      </label>
                      <input
                        type="tel"
                        id="contactNumber"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="+1 (555) 123-4567"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="diagnosis" className="block text-sm font-medium text-gray-700 mb-1">
                      Reason for Visit*
                    </label>
                    <textarea
                      id="diagnosis"
                      name="diagnosis"
                      value={formData.diagnosis}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Please briefly describe your symptoms or reason for the appointment..."
                      required
                    />
                  </div>
                  
                  <Button 
                    variant="primary" 
                    type="submit" 
                    className="w-full"
                    size="lg"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Confirm Booking
                  </Button>
                </div>
                
                <div className="bg-blue-50 p-6 border-t border-blue-100">
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <Clock className="w-5 h-5 text-blue-600 mr-2" />
                    Important Information
                  </h4>
                  <ul className="text-gray-600 text-sm space-y-2">
                    <li>• Please arrive 15 minutes before your scheduled appointment time.</li>
                    <li>• Bring any relevant medical records or test results.</li>
                    <li>• You can reschedule or cancel your appointment up to 24 hours in advance.</li>
                    <li>• A confirmation will be sent to your contact number.</li>
                  </ul>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;