import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Phone, Send, CheckCircle2 } from 'lucide-react';
import { sendContactEmail } from '../api/mailApi';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState('idle'); // 'idle', 'submitting', 'success', 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('submitting');
    try {
      await sendContactEmail(formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="relative z-10 bg-transparent min-h-screen flex items-center pt-16 pb-4">
      <div className="container w-full">
        
        {/* Header */}
        <div className="text-center mb-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif text-gold-primary mb-2 uppercase tracking-wider"
          >
            Contact
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xs sm:text-sm md:text-base text-gray-300 max-w-4xl mx-auto uppercase tracking-wide leading-relaxed font-semibold"
          >
            Luxury Travel Membership Contact services by GEMS Groups help clients connect with our team for premium travel memberships, strategic media solutions, and luxury business services worldwide.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Column - Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl font-serif text-white mb-2 uppercase tracking-wide">
              We’re Listening. Let’s Begin!
            </h3>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-4 font-medium">
              Connect with us to bring your vision to life with innovation, performance, and luxury.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-full bg-dark-bg border border-gold-primary/30 flex items-center justify-center group-hover:bg-gold-primary/20 transition-colors flex-shrink-0">
                  <Mail className="text-gold-primary group-hover:text-white transition-colors" size={20} />
                </div>
                <div>
                  <h4 className="text-white text-sm uppercase tracking-widest font-bold mb-1">Email</h4>
                  <a href="mailto:gems7.divine@gmail.com" className="text-gray-400 hover:text-gold-primary transition-colors text-sm">
                    gems7.divine@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-full bg-dark-bg border border-gold-primary/30 flex items-center justify-center group-hover:bg-gold-primary/20 transition-colors flex-shrink-0">
                  <MapPin className="text-gold-primary group-hover:text-white transition-colors" size={20} />
                </div>
                <div>
                  <h4 className="text-white text-sm uppercase tracking-widest font-bold mb-1">Locations</h4>
                  <p className="text-gray-400 text-sm">Vietnam - India - USA</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-full bg-dark-bg border border-gold-primary/30 flex items-center justify-center group-hover:bg-gold-primary/20 transition-colors flex-shrink-0">
                  <Phone className="text-gold-primary group-hover:text-white transition-colors" size={20} />
                </div>
                <div>
                  <h4 className="text-white text-sm uppercase tracking-widest font-bold mb-2">Phone</h4>
                  <div className="space-y-1 text-sm text-gray-400">
                    <p><span className="text-gray-500 w-8 inline-block">VN:</span> +84 379 290 233</p>
                    <p><span className="text-gray-500 w-8 inline-block">IN:</span> +91 73387 30245 | +91 73387 40245</p>
                    <p><span className="text-gray-500 w-8 inline-block">US:</span> +1 (256) 415-3929</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-4 sm:p-6 relative overflow-hidden w-full max-w-lg lg:max-w-none mx-auto"
          >
            {/* Decorative background blur inside card */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-gold-primary/10 rounded-full blur-3xl z-0 pointer-events-none"></div>
            
            <h3 className="text-xl sm:text-2xl font-serif text-white mb-4 uppercase tracking-wide relative z-10">Message Us</h3>
            
            <form onSubmit={handleSubmit} className="space-y-3 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-widest font-semibold text-gray-400 ml-1">Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter Your Name" 
                    required
                    className="w-full bg-dark-bg/50 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gold-primary/50 focus:ring-1 focus:ring-gold-primary/50 transition-all min-h-[44px]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-widest font-semibold text-gray-400 ml-1">Phone <span className="text-red-500">*</span></label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter Your Phone Number" 
                    required
                    className="w-full bg-dark-bg/50 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gold-primary/50 focus:ring-1 focus:ring-gold-primary/50 transition-all min-h-[44px]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs uppercase tracking-widest font-semibold text-gray-400 ml-1">Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address" 
                  required
                  className="w-full bg-dark-bg/50 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gold-primary/50 focus:ring-1 focus:ring-gold-primary/50 transition-all min-h-[44px]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs uppercase tracking-widest font-semibold text-gray-400 ml-1">Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you?" 
                  rows="3"
                  required
                  className="w-full bg-dark-bg/50 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gold-primary/50 focus:ring-1 focus:ring-gold-primary/50 transition-all resize-none min-h-[44px]"
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
                <p className="text-red-400 text-xs mt-2 text-center absolute -bottom-6 w-full left-0">Failed to send. Please try again.</p>
              )}
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
