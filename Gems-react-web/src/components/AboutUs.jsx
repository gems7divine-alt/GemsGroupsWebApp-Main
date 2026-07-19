import React from 'react';
import { motion } from 'framer-motion';
import { Target, Shield, Trophy, Globe2 } from 'lucide-react';

const AboutUs = () => {
  const features = [
    {
      icon: Globe2,
      title: 'Global Reach',
      description: 'Operations spanning across Vietnam, India, and the USA.'
    },
    {
      icon: Trophy,
      title: 'Premium Excellence',
      description: 'Delivering unmatched luxury and quality in every service.'
    },
    {
      icon: Shield,
      title: 'Trusted Partner',
      description: 'Built on integrity, transparency, and client success.'
    },
    {
      icon: Target,
      title: 'Innovative Vision',
      description: 'Pioneering solutions that redefine industry standards.'
    }
  ];

  return (
    <section id="about" className="relative z-10 min-h-screen flex items-center pt-16 pb-4">
      <div className="container w-full">
        
        {/* Header */}
        <div className="text-center mb-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif text-gold-primary mb-2 uppercase tracking-wider"
          >
            About Us
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="w-24 h-1 bg-gold-primary mx-auto rounded-full mb-4"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
          
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 uppercase tracking-wide leading-snug">
              Empowering Global Business Through Innovation and Luxury
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed mb-3">
              <strong className="text-gold-primary">GEMS Groups</strong> is a premier conglomerate spanning four dynamic industries: Luxury Travel, Software & IT, Automotive Solutions, and Strategic Media. Founded with a vision to deliver excellence, we provide world-class services that transform businesses and empower lives across the globe.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed mb-4">
              Our commitment to quality, innovation, and client success drives everything we do. Whether you are looking for exclusive travel experiences, scalable enterprise software, premium fleet management, or high-impact digital marketing, GEMS Groups is your trusted partner for growth and luxury.
            </p>

            <div className="flex flex-wrap gap-3 sm:gap-4">
              <div className="px-4 sm:px-6 py-3 sm:py-4 glass-card border-l-4 border-gold-primary text-center flex-grow sm:flex-grow-0">
                <span className="block text-2xl sm:text-3xl font-bold text-white mb-1">4</span>
                <span className="text-[10px] sm:text-xs text-gold-primary uppercase tracking-wider font-semibold">Core Industries</span>
              </div>
              <div className="px-4 sm:px-6 py-3 sm:py-4 glass-card border-l-4 border-gold-primary text-center flex-grow sm:flex-grow-0">
                <span className="block text-2xl sm:text-3xl font-bold text-white mb-1">3</span>
                <span className="text-[10px] sm:text-xs text-gold-primary uppercase tracking-wider font-semibold">Global Locations</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -5 }}
                className="glass-card p-4 sm:p-5 flex flex-col items-start hover:border-gold-primary/30 transition-all duration-300 group"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gold-primary/10 flex items-center justify-center mb-2 sm:mb-3 group-hover:bg-gold-primary/20 transition-colors">
                  <feature.icon className="text-gold-primary w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h4 className="text-white font-bold mb-1 uppercase tracking-wide text-xs sm:text-sm">{feature.title}</h4>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutUs;
