import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, Loader2 } from 'lucide-react';
import { appointments } from '../lib/api';

export default function BookAppointment() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    doctor_id: '',
    appointment_date: '',
    appointment_time: '',
    reason: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await appointments.create(formData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to book appointment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white">
      <div className="relative bg-gradient-to-b from-primary/10 to-white">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Book an Appointment
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Schedule a consultation with one of our healthcare professionals.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-6 py-16 lg:px-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="doctor" className="block text-sm font-medium text-gray-700">
              Select Doctor
            </label>
            <div className="mt-1 relative">
              <select
                id="doctor"
                required
                value={formData.doctor_id}
                onChange={(e) => setFormData({ ...formData, doctor_id: e.target.value })}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              >
                <option value="">Select a doctor</option>
                <option value="1">Dr. Sarah Johnson - Primary Care</option>
                <option value="2">Dr. Michael Chen - Cardiology</option>
                <option value="3">Dr. Emily Rodriguez - Mental Health</option>
              </select>
              <User className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Appointment Date
            </label>
            <div className="mt-1 relative">
              <input
                type="date"
                id="date"
                required
                min={new Date().toISOString().split('T')[0]}
                value={formData.appointment_date}
                onChange={(e) => setFormData({ ...formData, appointment_date: e.target.value })}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
              <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700">
              Preferred Time
            </label>
            <div className="mt-1 relative">
              <select
                id="time"
                required
                value={formData.appointment_time}
                onChange={(e) => setFormData({ ...formData, appointment_time: e.target.value })}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              >
                <option value="">Select a time</option>
                <option value="09:00">9:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="14:00">2:00 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="16:00">4:00 PM</option>
              </select>
              <Clock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
              Reason for Visit
            </label>
            <textarea
              id="reason"
              rows={4}
              required
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              placeholder="Please describe your symptoms or reason for consultation"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                  Booking appointment...
                </>
              ) : (
                'Book Appointment'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}