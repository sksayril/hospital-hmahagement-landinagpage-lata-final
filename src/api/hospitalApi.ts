import { Hospital, Doctor, SlotResponse, BookingData, DoctorResponse } from '../types';

const API_BASE_URL = 'http://localhost:3100/api';

export const getAllHospitals = async (): Promise<Hospital[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/get-all-hospital`);
    if (!response.ok) {
      throw new Error('Failed to fetch hospitals');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching hospitals:', error);
    return [];
  }
};

export const getAllDoctors = async (): Promise<Doctor[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/getall-doctors`);
    if (!response.ok) {
      throw new Error('Failed to fetch doctors');
    }
    const data: DoctorResponse = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return [];
  }
};

export const getDoctorsByHospital = async (hospitalId: string): Promise<Doctor[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/get-all-doctors-byhospital/${hospitalId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch doctors');
    }
    const data = await response.json();
    return data.data[0].doctors;
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return [];
  }
};

export const getDoctorSlots = async (doctorId: string): Promise<SlotResponse[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/get-all-slots/${doctorId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch slots');
    }
    const data = await response.json();
    return data.slots;
  } catch (error) {
    console.error('Error fetching slots:', error);
    return [];
  }
};

export const bookAppointment = async (bookingData: BookingData): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/patients/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to book appointment');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error booking appointment:', error);
    throw error;
  }
};