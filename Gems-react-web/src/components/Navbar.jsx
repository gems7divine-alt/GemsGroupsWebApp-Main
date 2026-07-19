import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, Menu, X } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import gemsGroupsLogo from '../assets/images/gems-groups.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/', isRouterLink: true },
    { name: 'Membership Plan', href: '#membership', isRouterLink: false },
    { name: 'Services', href: '#services', isRouterLink: false },
    { name: 'Contact', href: '/contact', isRouterLink: true },
    { name: 'About Us', href: '#about', isRouterLink: false },
    { name: 'Staff Login', href: '/staff-login', isRouterLink: true },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-nav py-3' : 'bg-transparent py-5'}`}>
      <div className="container">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <motion.div 
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="flex items-center justify-center"
            >
              <img src={gemsGroupsLogo} alt="Gems Groups Logo" className="h-10 w-10 rounded-full object-cover" />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-extrabold tracking-wider leading-tight">GEMS GROUPS</span>
              <div className="flex items-center gap-2 mt-0.5">
                <div className="h-[1px] w-4 bg-gold-primary"></div>
                <span className="text-[10px] text-gold-primary tracking-widest uppercase font-medium">Since 2020</span>
                <div className="h-[1px] w-4 bg-gold-primary"></div>
              </div>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => {
              const LinkComponent = link.isRouterLink ? Link : 'a';
              return (
                <LinkComponent
                  key={link.name}
                  to={link.isRouterLink ? link.href : undefined}
                  href={!link.isRouterLink && !link.onClick ? link.href : undefined}
                  onClick={(e) => {
                    if (link.onClick) {
                      e.preventDefault();
                      link.onClick();
                    } else if (link.name === 'Home' && location.pathname === '/') {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else if (!link.isRouterLink && link.href.startsWith('#')) {
                      e.preventDefault();
                      if (location.pathname !== '/') {
                        navigate('/' + link.href);
                      } else {
                        document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                  }}
                  className="relative text-sm font-medium text-gray-300 hover:text-white group transition-colors"
                >
                  <motion.span
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {link.name}
                  </motion.span>
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gold-primary transition-all duration-300 group-hover:w-full"></span>
                </LinkComponent>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-gold-primary transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden glass-nav border-t border-white/5 mt-3"
        >
          <div className="px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => {
              const LinkComponent = link.isRouterLink ? Link : 'a';
              return (
                <LinkComponent 
                  key={link.name} 
                  to={link.isRouterLink ? link.href : undefined}
                  href={!link.isRouterLink && !link.onClick ? link.href : undefined}
                  onClick={(e) => {
                    setIsMobileMenuOpen(false);
                    if (link.onClick) {
                      e.preventDefault();
                      link.onClick();
                    } else if (link.name === 'Home' && location.pathname === '/') {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else if (!link.isRouterLink && link.href.startsWith('#')) {
                      e.preventDefault();
                      if (location.pathname !== '/') {
                        navigate('/' + link.href);
                      } else {
                        // Add a small delay for mobile menu close animation
                        setTimeout(() => {
                          document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }
                    }
                  }}
                  className="text-gray-300 hover:text-gold-primary transition-colors text-sm font-medium"
                >
                  {link.name}
                </LinkComponent>
              );
            })}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
