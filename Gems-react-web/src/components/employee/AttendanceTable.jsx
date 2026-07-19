import React from 'react';

const AttendanceTable = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="glass-card p-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold-primary"></div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="glass-card p-8 text-center">
        <p className="text-gray-500">No attendance records found.</p>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'present':
        return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'absent':
        return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'leave':
        return 'text-gold-secondary bg-gold-primary/10 border-gold-primary/20';
      default:
        return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  return (
    <div className="glass-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse whitespace-nowrap md:whitespace-normal">
          <thead>
            <tr className="bg-white/5 border-b border-gold-primary/20 text-gold-secondary text-sm font-medium">
              <th className="py-4 px-6 font-cinzel">Date</th>
              <th className="py-4 px-6 font-cinzel">Check In</th>
              <th className="py-4 px-6 font-cinzel">Check Out</th>
              <th className="py-4 px-6 font-cinzel">Total Hours</th>
              <th className="py-4 px-6 font-cinzel">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gold-primary/10 text-gray-300">
            {data.map((record) => (
              <tr key={record.id} className="hover:bg-white/5 transition-colors">
                <td className="py-4 px-6 whitespace-nowrap">{record.date}</td>
                <td className="py-4 px-6">{record.checkIn}</td>
                <td className="py-4 px-6">{record.checkOut}</td>
                <td className="py-4 px-6 font-medium text-white">{record.totalHours}</td>
                <td className="py-4 px-6">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(record.status)}`}>
                    {record.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceTable;
