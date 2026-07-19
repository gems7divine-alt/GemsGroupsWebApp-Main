import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const WeeklyChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="glass-card p-5 h-60 flex items-center justify-center">
        <p className="text-gray-500">No chart data available.</p>
      </div>
    );
  }

  return (
    <div className="glass-card p-5 flex flex-col h-full">
      <h3 className="text-lg font-semibold text-white mb-2 font-cinzel">Weekly Summary</h3>
      <div className="flex-1 w-full text-sm min-h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 0, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff1a" vertical={false} />
            <XAxis dataKey="day" stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} tickLine={false} axisLine={false} />
            <YAxis stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{ backgroundColor: 'rgba(5, 5, 5, 0.9)', borderColor: 'rgba(212, 175, 55, 0.3)', color: '#fff', borderRadius: '8px' }}
              itemStyle={{ color: '#FFD76A' }}
            />
            <Line
              type="monotone"
              dataKey="hours"
              stroke="#D4AF37"
              strokeWidth={3}
              dot={{ fill: '#D4AF37', strokeWidth: 2 }}
              activeDot={{ r: 6, fill: '#FFD76A' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeeklyChart;
