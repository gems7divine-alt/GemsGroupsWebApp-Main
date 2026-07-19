import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Contact from '../components/Contact';
import AnimatedBackground from '../components/AnimatedBackground';
import Footer from '../components/Footer';

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-dark-bg text-white relative flex flex-col">
      <AnimatedBackground />
      <Navbar />
      <div className="flex-grow">
        <Contact />
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
