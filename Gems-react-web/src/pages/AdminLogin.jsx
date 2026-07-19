import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Shield, UserCheck, AlertCircle } from 'lucide-react';
import Button from '../components/Button';
import AnimatedBackground from '../components/AnimatedBackground';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'David@2003') {
      setError('');
      navigate('/admin-dashboard');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-bg text-white px-4">
      <AnimatedBackground />

      {/* Return button */}
      <div className="absolute top-8 left-8 z-50">
        <Button variant="secondary" onClick={() => navigate('/employee-portal')} className="!py-2 !px-4 !text-sm">
          &larr; Back to Portal
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-card w-full max-w-md p-8 relative z-20"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gold-primary/10 flex items-center justify-center mb-4">
            <Shield className="text-gold-primary" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-wide">Admin Access</h2>
          <p className="text-gray-400 text-sm mt-2 text-center">
            Restricted area. Please enter the admin password to continue.
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div className="relative">
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-dark-bg/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold-primary/50 transition-colors min-h-[44px]"
            />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20"
            >
              <AlertCircle size={16} />
              <span>{error}</span>
            </motion.div>
          )}

          <Button type="submit" variant="primary" className="w-full justify-center">
            <UserCheck size={20} />
            Authenticate
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
