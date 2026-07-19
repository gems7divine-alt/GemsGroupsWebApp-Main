import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Code2, Car, Megaphone } from 'lucide-react';
import gemsTravel from '../assets/images/gems-travel-images.png';
import gemsSoftware from '../assets/images/gems-software.png';
import gemsCar from '../assets/images/gems-car.png';
import gemsDigital from '../assets/images/gems-digital.png';

const Industries = ({ onIndustryClick }) => {
  const industries = [
    { name: 'Luxury Travel Membership', icon: Plane, imageSrc: gemsTravel },
    { name: 'Software & IT Services', icon: Code2, imageSrc: gemsSoftware },
    { name: 'Automotive Solutions', icon: Car, imageSrc: gemsCar },
    { name: 'Strategic Media & Digital Marketing', icon: Megaphone, imageSrc: gemsDigital },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 mb-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {industries.map((industry, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className="flex flex-col items-center text-center group cursor-pointer"
          onClick={() => onIndustryClick && onIndustryClick(index)}
        >
          {/* Circle Wrapper */}
          <div className="relative w-16 h-16 mb-2 flex items-center justify-center">
            {/* Outer Circle border */}
            <div className="absolute inset-0 rounded-full bg-gold-primary/20 group-hover:bg-gold-primary transition-colors duration-500"></div>
            {/* Inner Circle background */}
            <div className="absolute inset-[2px] rounded-full bg-dark-bg z-10 flex items-center justify-center group-hover:bg-dark-bg/80 transition-colors duration-500 overflow-hidden">
              {industry.imageSrc ? (
                <img src={industry.imageSrc} alt={industry.name} className="w-[92%] h-[92%] object-contain object-center group-hover:scale-110 transition-transform duration-500" />
              ) : (
                <industry.icon className="text-gold-primary group-hover:text-white transition-colors duration-500" size={32} />
              )}
            </div>
            {/* Glow effect on hover */}
            <div className="absolute inset-0 rounded-full bg-gold-primary opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-500 z-0"></div>
          </div>

          <h3 className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors max-w-[150px]">
            {industry.name}
          </h3>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Industries;
