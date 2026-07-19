import React from 'react';

const StatusCard = ({ title, value, icon: Icon, subtitle, colorClass }) => {
  return (
    <div className="glass-card p-5 flex items-start justify-between hover:-translate-y-1 transition-transform duration-300">
      <div>
        <p className="text-sm font-medium text-gray-400 mb-1 font-sans">{title}</p>
        <h3 className="text-2xl font-bold text-white mb-1 font-cinzel">{value || '-'}</h3>
        {subtitle && (
          <p className="text-xs text-gray-500 font-sans">{subtitle}</p>
        )}
      </div>
      <div className={`p-2.5 rounded-lg border ${colorClass}`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
  );
};

export default StatusCard;
