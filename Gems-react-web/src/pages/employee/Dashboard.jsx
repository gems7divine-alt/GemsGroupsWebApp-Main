import React, { useEffect, useState } from 'react';
import { Briefcase, Clock, Calendar } from 'lucide-react';
import StatusCard from '../../components/employee/StatusCard';
import ActionButtons from '../../components/employee/ActionButtons';
import WeeklyChart from '../../components/employee/WeeklyChart';
import { getDashboard } from '../../api/attendanceApi';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const result = await getDashboard();
        setData(result);
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold-primary"></div>
      </div>
    );
  }



  return (
    <div className="space-y-4 animate-in fade-in duration-500 relative z-10">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1 font-cinzel text-gradient">Overview</h1>
        <p className="text-gray-400 text-xs">Monitor your daily attendance and work hours.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatusCard
          title="Today's Status"
          value={data?.todayStatus}
          icon={Briefcase}
          colorClass="bg-gold-primary/10 text-gold-primary border-gold-primary/30"
          subtitle={data?.todayStatus === 'Present' ? 'On Track' : 'Off Track'}
        />
        <StatusCard
          title="Check In"
          value={data?.checkIn}
          icon={Clock}
          colorClass="bg-white/5 text-gray-200 border-white/20"
        />
        <StatusCard
          title="Working Hours"
          value={data?.workingHours}
          icon={Clock}
          colorClass="bg-gold-primary/10 text-gold-secondary border-gold-primary/30"
          subtitle="Today"
        />
        <StatusCard
          title="Weekly Hours"
          value={data?.weeklyHours}
          icon={Calendar}
          colorClass="bg-white/5 text-gray-200 border-white/20"
          subtitle="Out of 30h"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 flex">
          <div className="w-full">
            <WeeklyChart data={data?.weeklyChart} />
          </div>
        </div>
        <div className="xl:col-span-1 flex">
          <div className="w-full">
            <ActionButtons status={data?.todayStatus} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
