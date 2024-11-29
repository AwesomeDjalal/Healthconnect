import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, UserPlus, Activity, Calendar, Loader2 } from 'lucide-react';
import api from '../lib/api';

interface DashboardStats {
  totalPatients: number;
  totalDoctors: number;
  totalAppointments: number;
  completedAppointments: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/admin/statistics');
        setStats(response.data);
      } catch (error) {
        console.error('Failed to fetch statistics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-primary" />
              <div className="ml-4">
                <h2 className="text-lg font-semibold text-gray-900">Total Patients</h2>
                <p className="text-3xl font-bold text-primary">{stats?.totalPatients}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <UserPlus className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <h2 className="text-lg font-semibold text-gray-900">Total Doctors</h2>
                <p className="text-3xl font-bold text-blue-500">{stats?.totalDoctors}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <h2 className="text-lg font-semibold text-gray-900">Total Appointments</h2>
                <p className="text-3xl font-bold text-green-500">{stats?.totalAppointments}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-yellow-500" />
              <div className="ml-4">
                <h2 className="text-lg font-semibold text-gray-900">Completed</h2>
                <p className="text-3xl font-bold text-yellow-500">{stats?.completedAppointments}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Recent Patients</h2>
                <Link
                  to="/admin/patients"
                  className="text-sm font-medium text-primary hover:text-primary/80"
                >
                  View all
                </Link>
              </div>
              {/* Patient list will be implemented here */}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Recent Appointments</h2>
                <Link
                  to="/admin/appointments"
                  className="text-sm font-medium text-primary hover:text-primary/80"
                >
                  View all
                </Link>
              </div>
              {/* Appointment list will be implemented here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}