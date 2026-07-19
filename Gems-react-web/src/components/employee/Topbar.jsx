import React from 'react';
import { Menu } from 'lucide-react';

const Topbar = ({ onMenuClick }) => {
  return (
    <header className="h-16 glass-nav border-b border-gold-primary/20 flex items-center justify-between px-4 lg:px-8 text-white z-10 sticky top-0">
      <div className="flex items-center">
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 mr-2 text-gray-400 hover:text-gold-primary hover:bg-white/5 rounded-lg"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-semibold hidden sm:block font-cinzel text-gradient">Welcome back, John Doe</h2>
      </div>

      
      
    </header>
  );
};

export default Topbar;
