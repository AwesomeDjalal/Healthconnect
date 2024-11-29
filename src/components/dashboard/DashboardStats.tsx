import { Calendar, Clock, FileText } from 'lucide-react';
import { type Appointment } from '../../types/appointment';

interface StatsCardProps {
  icon: React.ReactNode;
  title: string;
  value: number;
  className?: string;
}

function StatsCard({ icon, title, value, className = 'text-primary' }: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        {icon}
        <div className="ml-4">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <p className={`text-3xl font-bold ${className}`}>{value}</p>
        </div>
      </div>
    </div>
  );
}

interface DashboardStatsProps {
  appointments: Appointment[];
}

export function DashboardStats({ appointments }: DashboardStatsProps) {
  const scheduled = appointments.filter(a => a.status === 'scheduled').length;
  const completed = appointments.filter(a => a.status === 'completed').length;
  const total = appointments.length;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-8">
      <StatsCard
        icon={<Calendar className="h-8 w-8 text-primary" />}
        title="Upcoming"
        value={scheduled}
      />
      <StatsCard
        icon={<Clock className="h-8 w-8 text-green-500" />}
        title="Completed"
        value={completed}
        className="text-green-500"
      />
      <StatsCard
        icon={<FileText className="h-8 w-8 text-blue-500" />}
        title="Total"
        value={total}
        className="text-blue-500"
      />
    </div>
  );
}