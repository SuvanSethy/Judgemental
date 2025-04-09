import React from 'react';
import { motion } from 'framer-motion';

const Logo = () => {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative w-40 h-12">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-curse-red/20 via-curse-blue/20 to-curse-red/20 blur-md rounded-lg"></div>
        
        {/* Logo Image */}
        <img 
          src="/images/logo.svg" 
          alt="JUDGEMENT" 
          className="relative z-10 w-full h-full object-contain"
        />
        
        {/* Hover Glow */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-curse-red/30 via-curse-blue/30 to-curse-red/30 blur-lg rounded-lg opacity-0"
          initial={false}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        {/* Scanning Line Effect */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent h-1/3"
          initial={{ y: '-100%' }}
          animate={{ y: '200%' }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </motion.div>
  );
};

export default Logo; 