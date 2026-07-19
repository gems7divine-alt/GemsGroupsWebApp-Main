import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Code2, Car, Megaphone, X, CheckCircle2 } from 'lucide-react';

const services = [
  {
    title: 'Luxury Travel Membership',
    description: 'Experience the world with exclusive access to premium flights, luxury accommodations, and curated itineraries. Our travel management services ensure every journey is exceptional.',
    fullDetails: [
      'Dedicated Travel Designers providing 24/7 personalized concierge planning.',
      'Exclusive Access & VIP Treatment at sold-out properties and events.',
      'Preferred Amenities including room upgrades, daily breakfast, and spa credits.',
      'Wholesale and members-only pricing on premium accommodations.',
      'Curated Networks of handpicked luxury villas and resorts globally.'
    ],
    icon: Plane,
  },
  {
    title: 'Software & IT Services',
    description: 'Innovative software solutions tailored for your business. From custom web development to complex IT infrastructure, we deliver robust and scalable technology services.',
    fullDetails: [
      'Enterprise Solutions: ERP, CRM, and BI platform integrations.',
      'Custom Development tailored perfectly to specific business logic and workflows.',
      'Full project lifecycle: discovery, UI/UX design, custom coding, QA, and deployment.',
      'Expertise in cloud-native architecture, AI/ML integration, and DevOps.',
      'Robust security and compliance standards (ISO 27001, SOC 2).'
    ],
    icon: Code2,
  },
  {
    title: 'Automotive Solutions',
    description: 'Comprehensive automotive services offering premium vehicle access, maintenance solutions, and fleet management for individuals and corporations.',
    fullDetails: [
      'Premium Fleet Management for corporate and executive mobility needs.',
      'End-to-end acquisition, leasing, and strategic consultancy.',
      'Advanced telematics, GPS tracking, and safety compliance systems.',
      'Luxury Vehicle Services including discreet professional chauffeur services.',
      'Exclusive rentals and concierge after-sales support for high-performance cars.'
    ],
    icon: Car,
  },
  {
    title: 'Media & Digital Marketing',
    description: 'Elevate your brand with our strategic media and digital marketing services. We craft compelling campaigns that drive engagement, visibility, and growth.',
    fullDetails: [
      'Strategic Alignment of campaigns with broader business growth objectives.',
      'Data-Driven Campaigns leveraging real-time analytics and KPI monitoring.',
      'Customer-Centric approach mapping the entire journey from awareness to conversion.',
      'Multichannel Integration across SEO, social media, email, and paid advertising.',
      'Predictable ROI and sustainable competitive advantage in digital landscapes.'
    ],
    icon: Megaphone,
  }
];

const Services = ({ openServiceIndex, onCloseService }) => {
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    if (openServiceIndex !== undefined && openServiceIndex !== null) {
      setSelectedService(services[openServiceIndex]);
    }
  }, [openServiceIndex]);

  const handleClose = () => {
    setSelectedService(null);
    if (onCloseService) {
      onCloseService();
    }
  };

  // Close modal when clicking outside
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedService]);

  return (
    <section id="services" className={`relative min-h-screen flex items-center pt-16 pb-4 ${selectedService ? 'z-[100]' : 'z-10'}`}>
      <div className="container w-full">
        <div className="text-center mb-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif text-gold-primary mb-2 uppercase tracking-wider"
          >
            Our Services
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xs sm:text-sm md:text-base text-gray-300 max-w-4xl mx-auto uppercase tracking-wide leading-relaxed font-semibold"
          >
            Delivering excellence across diverse industries to meet your unique business and lifestyle needs.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-2xl p-4 sm:p-5 border border-gray-800/30 backdrop-blur-md bg-gradient-to-b from-[#1a1a1a]/60 to-transparent hover:border-gold-primary/30 transition-all duration-500 group flex flex-col h-full cursor-pointer"
              onClick={() => setSelectedService(service)}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-dark-bg border border-gray-700/50 flex items-center justify-center group-hover:border-gold-primary/50 group-hover:scale-110 transition-all duration-500 flex-shrink-0">
                  <service.icon className="text-gold-primary w-5 h-5 group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-serif text-white tracking-wider uppercase group-hover:text-gold-primary transition-colors duration-500">{service.title}</h3>
              </div>
              <p className="text-gray-400 text-xs leading-snug flex-grow font-medium">
                {service.description}
              </p>
              
              <div className="mt-3 pt-3 border-t border-gray-800/50 flex justify-between items-center group-hover:border-gold-primary/30 transition-colors duration-500">
                 <span className="text-gold-primary text-[10px] sm:text-[11px] uppercase tracking-widest font-bold group-hover:text-white transition-colors duration-500">Learn More</span>
                 <div className="w-8 h-[1px] bg-gold-primary group-hover:w-12 group-hover:bg-white transition-all duration-500"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal for Full Details */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
            onClick={handleBackdropClick}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-dark-bg border border-gold-primary/30 rounded-2xl p-5 sm:p-6 md:p-10 max-w-2xl w-[95%] relative shadow-[0_0_40px_rgba(201,162,39,0.15)] mx-auto"
            >
              <button 
                onClick={handleClose}
                className="absolute top-6 right-6 text-gray-400 hover:text-white hover:rotate-90 transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <X size={24} />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-full bg-gold-primary/10 text-gold-primary">
                  <selectedService.icon size={32} />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-serif text-white uppercase tracking-wider">
                  {selectedService.title}
                </h3>
              </div>

              <div className="w-16 h-[2px] bg-gold-primary mb-8"></div>

              <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8 font-medium">
                {selectedService.description}
              </p>

              <div className="space-y-4">
                <h4 className="text-gold-primary text-sm uppercase tracking-widest font-bold mb-4">What We Provide</h4>
                <ul className="space-y-4">
                  {selectedService.fullDetails.map((detail, idx) => (
                    <motion.li 
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 + 0.2 }}
                      className="flex items-start gap-3 text-gray-400 text-sm md:text-base"
                    >
                      <CheckCircle2 className="text-gold-primary flex-shrink-0 mt-0.5" size={18} />
                      <span className="leading-relaxed">{detail}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 flex justify-end">
                <button 
                  onClick={handleClose}
                  className="px-8 py-3 rounded-full border-2 border-gold-primary text-gold-primary hover:bg-gold-primary hover:text-black font-bold uppercase tracking-widest text-xs transition-all duration-300 min-h-[44px]"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Services;
