import { useState, useEffect } from 'react';
import { patients } from '../lib/api';
import { type Appointment } from '../types/appointment';

export function useAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await patients.getAppointments();
        setAppointments(response.data);
      } catch (err) {
        setError('Failed to fetch appointments. Please try again later.');
        console.error('Error fetching appointments:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return { appointments, isLoading, error };
}