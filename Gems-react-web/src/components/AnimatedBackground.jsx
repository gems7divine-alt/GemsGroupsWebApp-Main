import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import bgImage from '../assets/images/background.png';

const AnimatedBackground = () => {
  const [windowSize, setWindowSize] = useState({ 
    width: typeof window !== 'undefined' ? window.innerWidth : 1000, 
    height: typeof window !== 'undefined' ? window.innerHeight : 800 
  });
  
  const mouseX = useMotionValue(windowSize.width / 2);
  const mouseY = useMotionValue(windowSize.height / 2);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [mouseX, mouseY]);

  // 3D Parallax Transformations (Moves slightly opposite to the mouse)
  const bgX = useSpring(useTransform(mouseX, [0, windowSize.width], [25, -25]), { stiffness: 40, damping: 20 });
  const bgY = useSpring(useTransform(mouseY, [0, windowSize.height], [25, -25]), { stiffness: 40, damping: 20 });

  // Mouse spotlight gradient
  const spotlight = useMotionTemplate`radial-gradient(circle 800px at ${mouseX}px ${mouseY}px, rgba(212,175,55,0.15), transparent 80%)`;

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden max-w-[100vw] overflow-x-hidden pointer-events-none z-0 bg-dark-bg perspective-1000">
      
      {/* 3D Background Image Layer */}
      <motion.div 
        className="absolute inset-[-60px] w-[calc(100%+120px)] h-[calc(100%+120px)] z-0"
        style={{ x: bgX, y: bgY }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-no-repeat opacity-100 bg-[10%_center]"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
        {/* Gold tint overlay to make the image more gold colored */}
        <div className="absolute inset-0 bg-gold-primary/30 mix-blend-color z-10" />
        {/* Uniform dark overlay to maintain text contrast across the whole image */}
        <div className="absolute inset-0 bg-dark-bg/60 z-10" />
      </motion.div>

      {/* Interactive Mouse Spotlight Layer */}
      <motion.div 
        className="absolute inset-0 z-10 mix-blend-screen"
        style={{ background: spotlight }}
      />

      {/* Ambient Pulsing Orb */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gold-primary/10 rounded-full blur-[120px] mix-blend-screen z-10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Enhanced Floating Twinkling particles */}
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gold-primary rounded-full z-20"
          initial={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0,
            scale: 0,
          }}
          animate={{
            y: [null, Math.random() * -100 - 50],
            opacity: [0, Math.random() * 0.8 + 0.2, 0],
            scale: [0, Math.random() * 1.5 + 0.5, 0],
          }}
          transition={{
            duration: Math.random() * 8 + 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;
