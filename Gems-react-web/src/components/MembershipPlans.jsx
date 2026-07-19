import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'ECONOMY',
    price: '$99/MONTH',
    features: [
      'UP TO 10% FLIGHT DISCOUNT',
      '5% HOTEL DISCOUNT',
      'EMAIL SUPPORT'
    ],
    cardStyle: 'bg-gradient-to-b from-[#3a1b0b]/40 to-transparent border-t border-[#5a2b1b]/50',
    buttonStyle: 'bg-[#876615] hover:bg-[#A67E1D] text-white',
  },
  {
    name: 'PREMIUM',
    price: '$299/MONTH',
    features: [
      'UP TO 20% DISCOUNT ON FLIGHTS',
      'PRIORITY SUPPORT',
      'FREE ITINERARY'
    ],
    cardStyle: 'bg-gradient-to-b from-[#4a3b1b]/40 to-transparent border-t border-[#6a5b2b]/50 relative',
    buttonStyle: 'bg-[#876615] hover:bg-[#A67E1D] text-white',
  },
  {
    name: 'FIRST CLASS PLAN',
    price: '$599/MONTH',
    features: [
      'UP TO 30% FLIGHT DISCOUNT',
      'VIP SUPPORT',
      'TRAVEL MANAGER'
    ],
    cardStyle: 'bg-gradient-to-b from-[#0f1b2b]/40 to-transparent border-t border-[#1f2b3b]/50',
    buttonStyle: 'bg-[#876615] hover:bg-[#A67E1D] text-white',
  }
];

const MembershipPlans = () => {
  return (
    <section id="membership" className="relative z-10 min-h-screen flex items-center pt-20 pb-10">
      <div className="container w-full">
        <div className="text-center mb-8 md:mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif text-gold-primary mb-4 sm:mb-6 uppercase tracking-wider"
          >
            Membership Plans
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xs sm:text-sm md:text-base text-gray-200 max-w-4xl mx-auto uppercase tracking-wide leading-relaxed font-semibold"
          >
            Enjoy luxury perks, professional website development, and social media management — crafted for every journey.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`rounded-2xl p-5 sm:p-6 flex flex-col items-center justify-between h-full border border-gray-800/30 backdrop-blur-md ${plan.cardStyle}`}
            >
              <div className="w-full text-center">
                <h3 className="text-base md:text-lg font-serif text-gold-primary mt-2 mb-3 uppercase tracking-widest">{plan.name}</h3>
                <div className="w-2/3 h-[1px] bg-gold-primary/30 mx-auto mb-4 sm:mb-6"></div>
                
                <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
                  <div className="w-4 h-4 md:w-5 md:h-5 rounded-full border-2 border-white flex items-center justify-center">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-xl md:text-2xl font-medium text-white tracking-wide">{plan.price}</span>
                </div>

                <ul className="space-y-3 text-[10px] sm:text-xs text-gray-300 uppercase tracking-widest font-semibold text-center">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center justify-center gap-2">
                      <div className="w-3.5 h-3.5 rounded-full border-[1.5px] border-gray-400 flex flex-shrink-0 items-center justify-center">
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link to="/global-membership" className={`mt-6 mb-2 px-6 sm:px-10 py-3 rounded uppercase tracking-widest text-xs font-bold transition-colors duration-300 ${plan.buttonStyle} flex items-center justify-center text-center w-full min-h-[44px]`}>
                View Plan
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MembershipPlans;
