import React, { useState } from 'react';
import { Download, Filter, X } from 'lucide-react';

const FilterBar = ({ onDownload, onFilter }) => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  return (
    <div className="glass-card p-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div>
          <label className="block text-xs text-gray-400 mb-1 ml-1">From Date</label>
          <input 
            type="date" 
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="bg-dark-bg/50 border border-white/10 text-gray-200 text-sm rounded-lg focus:ring-gold-primary focus:border-gold-primary block w-full p-2.5 transition-colors min-h-[44px]" 
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1 ml-1">To Date</label>
          <input 
            type="date" 
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="bg-dark-bg/50 border border-white/10 text-gray-200 text-sm rounded-lg focus:ring-gold-primary focus:border-gold-primary block w-full p-2.5 transition-colors min-h-[44px]" 
          />
        </div>
        <div className="flex items-end">
          <button 
            onClick={() => onFilter && onFilter(fromDate, toDate)}
            className="min-h-[44px] px-4 bg-white/5 hover:bg-white/10 text-gold-secondary border border-gold-primary/30 rounded-lg transition-colors flex items-center justify-center"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          {(fromDate || toDate) && (
            <button 
              onClick={() => { setFromDate(''); setToDate(''); onFilter && onFilter('', ''); }}
              className="min-h-[44px] px-3 ml-2 bg-transparent hover:bg-red-500/10 text-gray-400 hover:text-red-400 rounded-lg transition-colors flex items-center justify-center"
              title="Clear Filters"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
      
      <div>
        <button 
          onClick={onDownload}
          className="min-h-[44px] w-full md:w-auto px-4 bg-gold-primary hover:bg-gold-secondary text-black rounded-lg transition-colors flex items-center justify-center font-semibold"
        >
          <Download className="w-4 h-4 mr-2" />
          Download CSV
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
