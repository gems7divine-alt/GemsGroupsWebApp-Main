import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/employee/Sidebar';
import Topbar from '../components/employee/Topbar';
import { X } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';

const EmployeeLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-dark-bg text-white overflow-hidden relative">
      <AnimatedBackground />

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/60 z-20 md:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}
      
      {/* Sidebar - Desktop & Mobile */}
      <div className={`fixed inset-y-0 left-0 transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out z-30 flex`}>
        <Sidebar />
        {/* Mobile Close Button inside the sidebar area context */}
        {mobileMenuOpen && (
          <button 
            className="md:hidden absolute top-4 right-4 text-gray-400 hover:text-white"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X className="w-6 h-6 text-gold-primary" />
          </button>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative z-10">
        <Topbar onMenuClick={() => setMobileMenuOpen(true)} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-transparent p-4 lg:p-4 lg:py-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmployeeLayout;
