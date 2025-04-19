export interface Hospital {
  _id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface Doctor {
  doctorId: string;
  doctorName: string;
  specialization: string;
  experience: number;
  contact: string;
  doctorImage: string;
}

export interface DoctorResponse {
  msg: string;
  data: Doctor[];
}

export interface Slot {
  startTime: string;
  endTime: string;
  _id: string;
}

export interface SlotResponse {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
  };
  date: string;
  doctorId: string;
  slots: Slot[];
  createdAt: string;
  updatedAt: string;
}

export interface BookingData {
  name: string;
  contactNumber: string;
  diagnosis: string;
  doctorId: string;
  hospitalId: string;
  slotId: string;
}