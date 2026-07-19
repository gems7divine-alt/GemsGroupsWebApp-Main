import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import gemsGroupsLogo from '../assets/images/gems-groups.png'; 

const Footer = () => {
  const location = useLocation();

  return (
    <footer className="bg-dark-bg/95 border-t border-white/5 pt-16 pb-8 relative z-20 backdrop-blur-md">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-10 md:mb-16">
          
          {/* Logo and Contact Banner */}
          <div className="lg:col-span-1">
            <div className="flex flex-col gap-2 mb-6">
              <img src={gemsGroupsLogo} alt="Gems Groups" className="h-12 w-12 rounded-full object-cover self-start" />
              <span className="text-xl font-extrabold tracking-wider leading-tight text-white mt-2">GEMS GROUPS</span>
            </div>
            <h4 className="text-sm font-semibold text-gold-primary mb-2">Presence :</h4>
            <p className="text-gray-400 text-sm mb-6">Vietnam · India · USA – Est · 2020</p>
            <h4 className="text-sm font-semibold text-gold-primary mb-2">Mail :</h4>
            <a href="mailto:gems7.divine@gmail.com" className="text-gray-400 text-sm hover:text-white transition-colors">gems7.divine@gmail.com</a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-serif text-white mb-6 uppercase tracking-widest">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link 
                  to="/" 
                  onClick={(e) => {
                    if (location.pathname === '/') {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  className="text-gray-400 hover:text-gold-primary transition-colors text-sm font-medium"
                >
                  Home
                </Link>
              </li>
              <li><Link to="/contact" className="text-gray-400 hover:text-gold-primary transition-colors text-sm font-medium">Contact</Link></li>
              <li><Link to="/#services" className="text-gray-400 hover:text-gold-primary transition-colors text-sm font-medium">Services</Link></li>
              <li><Link to="/#about" className="text-gray-400 hover:text-gold-primary transition-colors text-sm font-medium">About Us</Link></li>
            </ul>
          </div>

          {/* Project Banner */}
          <div className="lg:col-span-2 bg-gradient-to-br from-gold-primary/5 to-transparent border border-gold-primary/10 p-6 md:p-8 rounded-xl h-fit">
            <h3 className="text-xl md:text-2xl font-serif text-white mb-2">Have a Project in Mind?</h3>
            <p className="text-gray-400 text-sm mb-6">We’re here to turn your ideas into reality.</p>
            
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="text-gold-primary text-xs font-bold uppercase tracking-wider min-w-[80px]">Email:</span>
                <a href="mailto:gems7.divine@gmail.com" className="text-gray-300 hover:text-white text-sm font-medium">gems7.divine@gmail.com</a>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <span className="text-gold-primary text-xs font-bold uppercase tracking-wider min-w-[80px] mt-1">Phone 1:</span>
                <span className="text-gray-300 text-sm font-medium">+84 379 290 233 | +1 (256) 415-3929</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <span className="text-gold-primary text-xs font-bold uppercase tracking-wider min-w-[80px] mt-1">Phone 2:</span>
                <span className="text-gray-300 text-sm font-medium">+91 733 873 0245 (or) +91 733 874 0245</span>
              </div>
            </div>
          </div>
          
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-medium">
          <p>Copyright © 2020 Gems Groups | All Rights Reserved</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
