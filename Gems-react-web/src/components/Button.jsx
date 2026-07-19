import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = "px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2 min-h-[44px]";
  
  const variants = {
    primary: "bg-[#C9A227] text-black hover:bg-[#d5b035] shadow-[0_0_15px_rgba(201,162,39,0.4)] hover:shadow-[0_0_25px_rgba(201,162,39,0.6)]",
    secondary: "bg-transparent border-2 border-[#C9A227] text-[#C9A227] hover:bg-[#C9A227]/10",
  };

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
