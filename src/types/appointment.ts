export interface Appointment {
  id: number;
  doctor_first_name: string;
  doctor_last_name: string;
  specialization: string;
  appointment_date: string;
  appointment_time: string;
  status: 'scheduled' | 'completed' | 'canceled';
}