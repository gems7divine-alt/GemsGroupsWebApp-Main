import React, { useEffect, useState } from 'react';
import FilterBar from '../../components/employee/FilterBar';
import AttendanceTable from '../../components/employee/AttendanceTable';
import { getAttendance } from '../../api/attendanceApi';

const Attendance = () => {
  const [data, setData] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const result = await getAttendance();
        setData(result);
        setFullData(result);
      } catch (error) {
        console.error("Failed to fetch attendance data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAttendance();
  }, []);

  const handleFilter = (fromDateStr, toDateStr) => {
    if (!fromDateStr && !toDateStr) {
      setData(fullData);
      return;
    }

    const filtered = fullData.filter(record => {
      const recordDate = new Date(record.date);
      recordDate.setHours(0, 0, 0, 0);
      let isValid = true;
      
      if (fromDateStr) {
        const [year, month, day] = fromDateStr.split('-');
        const from = new Date(year, month - 1, day);
        from.setHours(0, 0, 0, 0);
        if (recordDate < from) isValid = false;
      }
      
      if (toDateStr) {
        const [year, month, day] = toDateStr.split('-');
        const to = new Date(year, month - 1, day);
        to.setHours(23, 59, 59, 999);
        if (recordDate > to) isValid = false;
      }
      
      return isValid;
    });
    
    setData(filtered);
  };

  const handleDownload = () => {
    if (!data || data.length === 0) return;

    // Create CSV header
    const headers = ['Date', 'Check In', 'Check Out', 'Total Hours', 'Status'];
    
    // Create CSV rows
    const csvRows = data.map(record => {
      return [
        record.date,
        record.checkIn,
        record.checkOut,
        record.totalHours,
        record.status
      ].join(',');
    });
    
    // Combine header and rows
    const csvContent = [headers.join(','), ...csvRows].join('\n');
    
    // Create Blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'attendance_records.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative z-10">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2 font-cinzel text-gradient">Attendance Records</h1>
        <p className="text-gray-400 text-sm">View and manage your attendance history.</p>
      </div>

      <FilterBar onDownload={handleDownload} onFilter={handleFilter} />
      <AttendanceTable data={data} loading={loading} />
    </div>
  );
};

export default Attendance;
