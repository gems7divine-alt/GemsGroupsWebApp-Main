import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from './Button';
import Industries from './Industries';
import StatsCard from './StatsCard';

const Hero = ({ onIndustryClick }) => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="container relative z-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Side Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col justify-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-1 tracking-wider text-[#C9A227] leading-tight font-cinzel">
              GEMS GROUPS
            </h1>

            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 text-gray-300 tracking-wide">
              <span className="text-[#C9A227]">FOUR INDUSTRIES.</span> ONE VISION.
            </h2>

            <h3 className="text-lg md:text-xl lg:text-2xl font-medium text-gray-400 mb-2">
              Transforming Businesses. <br className="hidden md:block" /> Empowering Lives.
            </h3>

            <p className="text-gray-400 text-lg mb-2 max-w-lg leading-relaxed">
              At GEMS Groups, we unite innovation, technology, travel, automotive excellence, and strategic media to create world-class business solutions that empower companies across the globe.
            </p>

            <Industries onIndustryClick={onIndustryClick} />

            <div className="flex flex-wrap gap-4 mt-2">
              <Button variant="primary" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>Our Services</Button>
              <Button variant="secondary" onClick={() => navigate('/contact')}>Contact Us</Button>
            </div>
          </motion.div>

          {/* Right Side Content */}
          <div className="relative h-full flex flex-col items-center justify-center lg:items-end mt-12 lg:mt-0">
            {/* The background component handles most of the right side visuals, 
                so we place the stats card here as the floating foreground element */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="mt-20 lg:mt-64 relative z-30 lg:translate-x-[50px]"
            >
              <StatsCard />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
