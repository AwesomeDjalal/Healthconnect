import { Calendar, Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { type Appointment } from '../../types/appointment';

interface AppointmentListProps {
  appointments: Appointment[];
  isLoading: boolean;
}

export function AppointmentList({ appointments, isLoading }: AppointmentListProps) {
  if (isLoading) {
    return <div className="text-center py-8">Loading appointments...</div>;
  }

  if (appointments.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No appointments found.</p>
        <Link
          to="/book-appointment"
          className="mt-4 inline-flex items-center text-primary hover:text-primary/80"
        >
          Book your first appointment
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Doctor
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Specialization
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date & Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <User className="h-5 w-5 text-gray-400 mr-2" />
                  <span>
                    Dr. {appointment.doctor_first_name} {appointment.doctor_last_name}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {appointment.specialization}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(appointment.appointment_date).toLocaleDateString()} at{' '}
                {appointment.appointment_time}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                    appointment.status === 'scheduled'
                      ? 'bg-blue-100 text-blue-800'
                      : appointment.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}