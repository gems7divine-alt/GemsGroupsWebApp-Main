import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CalendarDays, LogOut, UserCircle } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="w-64 glass-nav border-r border-gold-primary/20 text-white hidden md:flex flex-col h-full z-20">
      <div className="h-16 flex items-center px-6 border-b border-gold-primary/20">
        <UserCircle className="w-8 h-8 text-gold-primary mr-2" />
        <span className="text-xl font-bold tracking-wider text-white font-cinzel">EMS Portal</span>
      </div>
      
      <nav className="flex-1 py-6 px-4 space-y-2">
        <NavLink
          to="/employee-dashboard"
          end
          className={({ isActive }) =>
            `flex items-center px-4 py-3 rounded-lg transition-colors ${
              isActive
                ? 'bg-gold-primary/20 text-gold-secondary border border-gold-primary/30'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`
          }
        >
          <LayoutDashboard className="w-5 h-5 mr-3" />
          Dashboard
        </NavLink>
        
        <NavLink
          to="/employee-dashboard/attendance"
          className={({ isActive }) =>
            `flex items-center px-4 py-3 rounded-lg transition-colors ${
              isActive
                ? 'bg-gold-primary/20 text-gold-secondary border border-gold-primary/30'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`
          }
        >
          <CalendarDays className="w-5 h-5 mr-3" />
          Attendance
        </NavLink>
      </nav>

      <div className="p-4 border-t border-gold-primary/20">
        <button className="flex items-center w-full px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-red-400 rounded-lg transition-colors">
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
