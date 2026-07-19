import React from 'react';
import { motion } from 'framer-motion';
import { Users, Star, Clock, HeadphonesIcon } from 'lucide-react';

const StatsCard = () => {
  const stats = [
    { label: 'Clients', value: '100+', icon: Users },
    { label: 'Client Satisfaction', value: '100%', icon: Star },
    { label: 'Years Experience', value: '5+', icon: Clock },
    { label: 'Support', value: '24/7', icon: HeadphonesIcon },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="glass-card p-6 inline-block"
      style={{
        boxShadow: '0 20px 40px -15px rgba(212,175,55,0.15)'
      }}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            whileHover={{ y: -5 }}
            className="flex flex-col items-center justify-center text-center group"
          >
            <div className="w-12 h-12 rounded-full bg-gold-primary/10 flex items-center justify-center mb-3 group-hover:bg-gold-primary/20 transition-colors">
              <stat.icon className="text-gold-primary" size={24} />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default StatsCard;
