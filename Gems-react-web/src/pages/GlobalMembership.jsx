import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnimatedBackground from '../components/AnimatedBackground';
import { sendContactEmail } from '../api/mailApi';

const pricing = {
  Vietnam: { economy: '2,499,000 ₫', premium: '7,499,000 ₫', firstClass: '14,999,000 ₫' },
  India: { economy: '₹7,999', premium: '₹24,999', firstClass: '₹49,999' },
  USA: { economy: '$99', premium: '$299', firstClass: '$599' }
};

const getPlans = (country) => [
  {
    name: 'Economy',
    price: `${pricing[country].economy}/month`,
    desc: 'Perfect for occasional travelers seeking essential savings, convenience, and reliable support.',
    features: [
      'Up to 10% discount on flights',
      '5% discount on hotels',
      'Dedicated email support',
      'Access to seasonal offers',
      '2 social media content per month'
    ],
    validity: [
      'Monthly Plan: 30 Days',
      'Yearly Plan: 12 Months'
    ],
    cardStyle: 'bg-gradient-to-b from-[#3a1b0b]/60 to-transparent border-t border-[#5a2b1b]/70',
    buttonStyle: 'bg-[#876615] hover:bg-[#A67E1D] text-white',
  },
  {
    name: 'Premium',
    price: `${pricing[country].premium}/month`,
    desc: 'Designed for frequent travelers who require enhanced savings, priority assistance, and premium travel support.',
    features: [
      'Up to 20% discount on flights',
      '15% discount on hotels',
      'Priority support along with email (Call & Chat)',
      'Complimentary itinerary planning',
      'Early access to exclusive deals',
      '4 social media contents per month'
    ],
    validity: [
      'Monthly Plan: 30 Days',
      'Yearly Plan: 12 Months'
    ],
    cardStyle: 'bg-gradient-to-b from-[#4a3b1b]/60 to-transparent border-t border-[#6a5b2b]/70 relative transform lg:-translate-y-4 shadow-2xl shadow-gold-primary/10',
    buttonStyle: 'bg-[#876615] hover:bg-[#A67E1D] text-white',
  },
  {
    name: 'First Class',
    price: `${pricing[country].firstClass}/month`,
    desc: 'An elite membership crafted for luxury travelers seeking personalized experiences and exclusive privileges.',
    features: [
      'Up to 30% discount on flights',
      '25% discount on hotels & resorts',
      '24/7 VIP support',
      'Dedicated personal travel manager',
      'Complimentary travel insurance on selected trips',
      '8 social media contents per month'
    ],
    validity: [
      'Monthly Plan: 30 Days',
      'Yearly Plan: 12 Months'
    ],
    cardStyle: 'bg-gradient-to-b from-[#0f1b2b]/60 to-transparent border-t border-[#1f2b3b]/70',
    buttonStyle: 'bg-[#876615] hover:bg-[#A67E1D] text-white',
  }
];

const GlobalMembership = () => {
  const [selectedCountry, setSelectedCountry] = useState('USA');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle'); // 'idle', 'submitting', 'success', 'error'
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const activePlans = getPlans(selectedCountry);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('submitting');
    try {
      await sendContactEmail(formData);
      setSubmitStatus('success');
      setFormData({ name: '', phone: '', email: '', message: '' });
      setTimeout(() => {
        setSubmitStatus('idle');
        setIsModalOpen(false);
      }, 3000); // Close modal after 3 seconds of success
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white relative flex flex-col">
      <AnimatedBackground />
      <Navbar />

      <main className="relative z-10 pt-16 pb-2 flex-grow flex flex-col justify-center">
        <div className="container flex flex-col justify-center h-full">
          
          {/* Header */}
          <div className="text-center mb-2 max-w-4xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl sm:text-3xl md:text-4xl font-serif text-gold-primary mb-1 tracking-wider"
            >
              Global Membership Plans
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-300 text-[11px] leading-tight mb-2"
            >
              Global Membership Plans by GEMS Groups provide premium travel experiences, luxury lifestyle benefits, automotive solutions, and strategic business services across Vietnam, India, and the USA.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[10px] font-semibold mt-1"
            >
              <button 
                onClick={() => setSelectedCountry('Vietnam')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all duration-300 min-h-[44px] ${selectedCountry === 'Vietnam' ? 'bg-gold-primary/20 text-white border border-gold-primary/50' : 'text-gray-400 hover:text-white border border-transparent'}`}
              >
                <span className="font-bold">VN</span> Vietnam
              </button>
              
              <span className="text-gold-primary hidden md:block">•</span>
              
              <button 
                onClick={() => setSelectedCountry('India')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all duration-300 min-h-[44px] ${selectedCountry === 'India' ? 'bg-gold-primary/20 text-white border border-gold-primary/50' : 'text-gray-400 hover:text-white border border-transparent'}`}
              >
                <span className="font-bold">IN</span> India
              </button>
              
              <span className="text-gold-primary hidden md:block">•</span>
              
              <button 
                onClick={() => setSelectedCountry('USA')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all duration-300 min-h-[44px] ${selectedCountry === 'USA' ? 'bg-gold-primary/20 text-white border border-gold-primary/50' : 'text-gray-400 hover:text-white border border-transparent'}`}
              >
                <span className="font-bold">US</span> USA
              </button>
            </motion.div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4 mb-2">
            {activePlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className={`rounded-2xl p-2.5 flex flex-col h-full border border-gray-700/50 backdrop-blur-md bg-gradient-to-b from-[#1a1a1a]/60 to-transparent`}
              >
                <div className="mb-2">
                  <h3 className="text-lg font-serif text-gold-primary mb-1 tracking-wide">{plan.name}</h3>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="text-gold-primary text-sm">◉</span>
                    <span className="text-lg font-bold text-white tracking-wide">{plan.price}</span>
                  </div>
                  <p className="text-[10px] text-gray-300 leading-tight mb-2">
                    {plan.desc}
                  </p>
                </div>

                <div className="w-full h-[1px] bg-gray-800 my-2"></div>

                <div className="flex-grow">
                  <h4 className="text-gold-primary font-bold uppercase tracking-widest text-[10px] mb-1">Benefits</h4>
                  <ul className="space-y-1 text-[10px] text-gray-200 font-medium mb-2">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-1.5">
                        <div className="w-1 h-1 bg-gold-primary rounded-full mt-1 flex-shrink-0"></div>
                        <span className="leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <h4 className="text-gold-primary font-bold uppercase tracking-widest text-[10px] mb-1">Validity</h4>
                  <ul className="space-y-1 text-[10px] text-gray-300 font-medium">
                    {plan.validity.map((v, vIndex) => (
                      <li key={vIndex} className="flex items-center gap-1.5">
                        <div className="w-1 h-1 bg-gray-500 rounded-full flex-shrink-0"></div>
                        <span>{v}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button 
                  onClick={() => setIsModalOpen(true)}
                  className={`w-full mt-2 py-2 rounded-lg uppercase tracking-widest text-[10px] font-bold transition-all duration-300 shadow-lg hover:shadow-gold-primary/20 inline-block text-center bg-[#876615] hover:bg-[#A67E1D] text-white min-h-[44px]`}
                >
                  Join Membership
                </button>
              </motion.div>
            ))}
          </div>

          {/* Contact Banner */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-gold-primary/20 via-gold-primary/5 to-transparent border border-gold-primary/20 rounded-2xl p-2.5 sm:p-3 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-2"
          >
            <div>
              <h3 className="text-base font-serif text-white mb-0.5">Encountering an issue?</h3>
              <p className="text-gray-300 text-[10px] max-w-2xl leading-none">
                Or interested in a Custom Enterprise Membership tailored to your needs?<br/>
                Feel free to reach out to us—we're here to help!
              </p>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="whitespace-nowrap px-3 py-1.5 bg-white text-dark-bg hover:bg-gray-200 font-bold uppercase tracking-widest text-[9px] rounded-lg transition-colors inline-block text-center min-h-[44px]"
            >
              Contact GEMS Groups
            </button>
          </motion.div>

        </div>
      </main>

      {/* Membership Form Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-dark-bg border border-gray-800 rounded-2xl p-5 sm:p-6 md:p-8 w-[95%] lg:w-full max-w-2xl relative shadow-2xl shadow-gold-primary/10 overflow-y-auto max-h-[90vh] mx-auto"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <X size={24} />
              </button>

              <h2 className="text-xl md:text-2xl font-serif text-white mb-6 md:mb-8 uppercase tracking-widest">Message Us</h2>

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-semibold text-gray-400 ml-1">Name</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter Your Name" 
                      required
                      className="w-full bg-dark-bg/50 border border-gray-700 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gold-primary/50 focus:ring-1 focus:ring-gold-primary/50 transition-all min-h-[44px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-semibold text-gray-400 ml-1">Phone <span className="text-red-500">*</span></label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter Your Phone Number" 
                      required
                      className="w-full bg-dark-bg/50 border border-gray-700 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gold-primary/50 focus:ring-1 focus:ring-gold-primary/50 transition-all min-h-[44px]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-semibold text-gray-400 ml-1">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address" 
                    required
                    className="w-full bg-dark-bg/50 border border-gray-700 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gold-primary/50 focus:ring-1 focus:ring-gold-primary/50 transition-all min-h-[44px]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-semibold text-gray-400 ml-1">Message</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you?" 
                    rows="4"
                    required
                    className="w-full bg-dark-bg/50 border border-gray-700 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gold-primary/50 focus:ring-1 focus:ring-gold-primary/50 transition-all resize-none min-h-[44px]"
                  ></textarea>
                </div>

                <AnimatePresence mode="wait">
                  {submitStatus === 'success' ? (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="w-full bg-green-500/20 border border-green-500/50 text-green-400 font-bold uppercase tracking-widest text-sm py-4 rounded-lg flex items-center justify-center gap-2 mt-4"
                    >
                      <CheckCircle2 size={18} />
                      Message Sent Successfully!
                    </motion.div>
                  ) : (
                    <motion.button 
                      key="submit"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      type="submit"
                      disabled={submitStatus === 'submitting'}
                      className={`w-full bg-gold-primary text-black font-bold uppercase tracking-widest text-sm py-4 rounded-lg hover:bg-gold-secondary transition-colors duration-300 flex items-center justify-center gap-2 mt-4 min-h-[44px] ${submitStatus === 'submitting' ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      <Send size={18} className={submitStatus === 'submitting' ? 'animate-pulse' : ''} />
                      {submitStatus === 'submitting' ? 'Sending...' : 'Message Us'}
                    </motion.button>
                  )}
                </AnimatePresence>

                {submitStatus === 'error' && (
                  <p className="text-red-400 text-xs mt-2 text-center absolute -bottom-6 w-full left-0">Failed to send request. Please try again.</p>
                )}
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GlobalMembership;
