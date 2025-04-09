import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import MatrixBackground from '@/components/MatrixBackground';

const Home: React.FC = () => {
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowLogo(prev => !prev);
    }, 3000); // Switch every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen">
      <MatrixBackground opacity={30} />
      
      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
        <AnimatePresence mode="wait">
          {showLogo ? (
            <motion.img
              key="logo"
              src="/images/logo.png"
              alt="JUDGEMENTAL"
              className="h-40 w-auto mb-6 glow-effect"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{
                filter: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.6)) drop-shadow(0 0 25px rgba(255, 255, 255, 0.4))'
              }}
            />
          ) : (
            <motion.h1
              key="text"
              className="text-6xl font-bold mb-6 gradient-text text-glow"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              Welcome to JUDGEMENTAL
            </motion.h1>
          )}
        </AnimatePresence>
        
        {/* Subtitle and CTA */}
        <motion.p 
          className="text-lg text-white/70 max-w-2xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Experience the future of fashion with our cutting-edge designs and unique style
        </motion.p>
        <motion.div 
          className="flex gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link 
            to="/shop"
            className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Shop Now
          </Link>
          <Link 
            to="/lore"
            className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-black transition-all duration-300"
          >
            Explore Lore
          </Link>
        </motion.div>
      </section>

      {/* Featured Collections */}
      <section className="relative z-10 py-20 px-4">
        <motion.h2 
          className="text-4xl font-bold text-center mb-12 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Featured Collections
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Gojo Collection */}
          <motion.div 
            className="relative group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="aspect-square bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-all duration-300" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                <h3 className="text-2xl font-bold mb-4">Gojo Collection</h3>
                <p className="text-center mb-6">The strongest sorcerer's signature style</p>
                <Link 
                  to="/shop?collection=gojo"
                  className="px-6 py-2 bg-white text-black rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-300"
                >
                  Shop Collection
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Sukuna Collection */}
          <motion.div 
            className="relative group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="aspect-square bg-gradient-to-br from-red-500 to-orange-600 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-all duration-300" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                <h3 className="text-2xl font-bold mb-4">Sukuna Collection</h3>
                <p className="text-center mb-6">The King of Curses' dark aesthetic</p>
                <Link 
                  to="/shop?collection=sukuna"
                  className="px-6 py-2 bg-white text-black rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-300"
                >
                  Shop Collection
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Blue Lock Collection */}
          <motion.div 
            className="relative group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="aspect-square bg-gradient-to-br from-green-500 to-blue-600 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-all duration-300" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                <h3 className="text-2xl font-bold mb-4">Blue Lock Collection</h3>
                <p className="text-center mb-6">The ultimate striker's gear</p>
                <Link 
                  to="/shop?collection=bluelock"
                  className="px-6 py-2 bg-white text-black rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-300"
                >
                  Shop Collection
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home; 