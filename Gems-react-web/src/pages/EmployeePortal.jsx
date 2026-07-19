import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, LogOut, Users, Briefcase, Settings, Shield } from 'lucide-react';
import Button from '../components/Button';
import AnimatedBackground from '../components/AnimatedBackground';

const EmployeePortal = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, you would clear auth tokens here
    navigate('/');
  };

  const menuItems = [
    { title: 'Dashboard', icon: LayoutDashboard },
    { title: 'Admin Dashboard', icon: Shield },
  ];

  return (
    <div className="relative min-h-screen bg-dark-bg text-white overflow-hidden">
      <AnimatedBackground />

      {/* Navbar for portal */}
      <nav className="relative z-50 glass-nav py-4 px-8 flex justify-between items-center">
        <div className="flex items-center gap-3 text-gold-primary font-bold text-xl tracking-widest">
          GEMS GROUPS <span className="text-white">PORTAL</span>
        </div>
        <Button variant="secondary" onClick={handleLogout} className="!py-2 !px-4 !text-sm flex gap-2">
          <LogOut size={16} />
          Logout
        </Button>
      </nav>

      {/* Portal Content */}
      <div className="relative z-20 container py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-extrabold mb-2">Welcome Back to Employee Access Portal</h1>
          <p className="text-gray-400 mb-10">Access your dashboard, manage projects, and connect with your team.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => {
                  if (item.title === 'Dashboard') {
                    navigate('/sign-in');
                  } else if (item.title === 'Admin Dashboard') {
                    navigate('/admin-login');
                  }
                }}
                className="glass-card p-6 cursor-pointer group hover:bg-gold-primary/5 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-gold-primary/10 flex items-center justify-center mb-4 group-hover:bg-gold-primary/20 transition-colors">
                  <item.icon className="text-gold-primary" size={24} />
                </div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-sm text-gray-500 mt-2">Manage {item.title.toLowerCase()} settings and data.</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EmployeePortal;
