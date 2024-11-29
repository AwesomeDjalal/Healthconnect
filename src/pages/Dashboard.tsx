import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { AppointmentList } from '../components/dashboard/AppointmentList';
import { DashboardStats } from '../components/dashboard/DashboardStats';
import { useAppointments } from '../hooks/useAppointments';

export default function Dashboard() {
  const { appointments, isLoading, error } = useAppointments();

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Patient Dashboard</h1>
          <Link
            to="/book-appointment"
            className="flex items-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90"
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            Book Appointment
          </Link>
        </div>

        <DashboardStats appointments={appointments} />

        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Appointments</h2>
            {error ? (
              <div className="text-center py-8 text-red-600">{error}</div>
            ) : (
              <AppointmentList appointments={appointments} isLoading={isLoading} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}