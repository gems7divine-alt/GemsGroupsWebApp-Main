import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../api/authApi';
import Button from '../components/Button';
import AnimatedBackground from '../components/AnimatedBackground';
import { UserPlus, AlertCircle } from 'lucide-react';

const CreateAccount = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!password) {
      setError('Please provide a password.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const data = await registerUser(fullName, email, password);
      console.log('Registration successful:', data);
      navigate('/sign-in'); 
    } catch (err) {
      setError(err.message || 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-dark-bg text-white overflow-hidden py-12 px-4">
      <AnimatedBackground />

      <div className="absolute top-8 left-8 z-50">
        <Button variant="secondary" onClick={() => navigate('/')} className="!py-2 !px-4 !text-sm">
          &larr; Back to Home
        </Button>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-card w-full max-w-md relative z-20"
      >
        <div className="p-6 border-b border-gold-primary/20 flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-gold-primary/10 flex items-center justify-center mb-3">
            <UserPlus className="text-gold-primary" size={24} />
          </div>
          <h2 className="text-2xl font-bold tracking-wide">Create Account</h2>
          <p className="text-gray-400 text-sm mt-1 text-center">Join the employee network</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-300">Full Name</label>
            <input
              type="text"
              placeholder="Your name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-dark-bg/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-gold-primary/50 transition-colors min-h-[44px]"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-300">Email Address</label>
            <input
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-dark-bg/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-gold-primary/50 transition-colors min-h-[44px]"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-dark-bg/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-700 tracking-widest focus:outline-none focus:border-gold-primary/50 transition-colors min-h-[44px]"
              required
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

          <Button 
            type="submit" 
            variant="primary" 
            className="w-full justify-center mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>

          <div className="mt-4 text-center text-sm text-gray-400">
            Already have an account? <Link to="/sign-in" className="text-gold-primary font-semibold hover:text-gold-secondary transition-colors">Sign in</Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateAccount;
