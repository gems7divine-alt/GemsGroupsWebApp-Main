import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import MembershipPlans from '../components/MembershipPlans';
import Services from '../components/Services';
import AnimatedBackground from '../components/AnimatedBackground';
import AboutUs from '../components/AboutUs';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home = () => {
  const [openServiceIndex, setOpenServiceIndex] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  const handleIndustryClick = (index) => {
    setOpenServiceIndex(index);
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white relative">
      <AnimatedBackground />
      <Navbar />
      <Hero onIndustryClick={handleIndustryClick} />
      <MembershipPlans />
      <Services openServiceIndex={openServiceIndex} onCloseService={() => setOpenServiceIndex(null)} />
      <AboutUs />
      <Footer />
    </div>
  );
};

export default Home;
