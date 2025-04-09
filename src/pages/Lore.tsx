import React, { useEffect, useRef } from 'react';
import CurseFlame from '@/components/CurseFlame';
import CtaButton from '@/components/CtaButton';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Lore = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Matrix animation effect
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size to match container
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Matrix characters - expanded to include more futuristic characters
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];
    const speeds: number[] = [];
    const opacities: number[] = [];
    const colors: string[] = [];
    
    // Initialize drops with varying speeds, opacities, and colors
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -100);
      speeds[i] = 0.5 + Math.random() * 1.5; // Varying speeds
      opacities[i] = 0.3 + Math.random() * 0.7; // Higher opacity range
      
      // Random neon colors
      const colorOptions = [
        'rgba(0, 255, 0, ', // Neon green
        'rgba(0, 255, 255, ', // Cyan
        'rgba(255, 0, 255, ', // Magenta
        'rgba(255, 255, 0, ', // Yellow
        'rgba(0, 0, 255, ', // Blue
        'rgba(255, 0, 0, ' // Red
      ];
      colors[i] = colorOptions[Math.floor(Math.random() * colorOptions.length)];
    }
    
    // Animation loop
    const interval = setInterval(() => {
      // Semi-transparent black background to create fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = chars[Math.floor(Math.random() * chars.length)];
        
        // Set text color and font with varying opacity
        const opacity = opacities[i];
        ctx.fillStyle = `${colors[i]}${opacity})`;
        ctx.font = `${fontSize}px monospace`;
        
        // Draw character
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        
        // Reset drop to top when it reaches bottom
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
          speeds[i] = 0.5 + Math.random() * 1.5; // New random speed
          opacities[i] = 0.3 + Math.random() * 0.7; // New random opacity
          
          // New random neon color
          const colorOptions = [
            'rgba(0, 255, 0, ', // Neon green
            'rgba(0, 255, 255, ', // Cyan
            'rgba(255, 0, 255, ', // Magenta
            'rgba(255, 255, 0, ', // Yellow
            'rgba(0, 0, 255, ', // Blue
            'rgba(255, 0, 0, ' // Red
          ];
          colors[i] = colorOptions[Math.floor(Math.random() * colorOptions.length)];
        }
        
        // Move drop down at varying speeds
        drops[i] += speeds[i];
      }
    }, 33); // ~30fps
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="min-h-screen pt-20 bg-black relative overflow-hidden">
      {/* Matrix Background Animation */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 opacity-30 pointer-events-none"
      />
      
      {/* Neon Circuit Lines */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div 
            key={i} 
            className="absolute h-px w-full bg-gradient-to-r from-transparent via-neon-green to-transparent"
            style={{
              top: `${Math.random() * 100}%`,
              left: '0',
              opacity: 0.3 + Math.random() * 0.7,
              transform: `rotate(${Math.random() * 360}deg)`,
              animation: `glow ${3 + Math.random() * 5}s infinite alternate`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>
      
      {/* Hero */}
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1 
            className="font-metal text-5xl md:text-6xl gradient-text text-glow mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            THE LORE
          </motion.h1>
          
          <motion.p 
            className="text-white/90 max-w-3xl mx-auto text-lg text-glow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Dive into the world that inspired our exclusive collections. Our designs draw from the rich lore of Jujutsu Kaisen and Blue Lock, combining their powerful aesthetics with streetwear sensibilities.
          </motion.p>
        </div>
      </section>
      
      {/* Gojo Section */}
      <section className="py-20 relative overflow-hidden">
        <CurseFlame color="blue" className="top-0 right-0 w-1/3 h-full opacity-20" />
        
        {/* Neon Border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-purple"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-metal text-4xl text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-cyan mb-6">
                GOJO SATORU
              </h2>
              
              <p className="text-white/80 mb-4">
                The strongest jujutsu sorcerer. Bearer of the Six Eyes and master of the Limitless Technique. His confidence and power are unmatched in the world of Jujutsu Kaisen.
              </p>
              
              <p className="text-white/80 mb-6">
                Our Gojo-inspired collection embodies his cool confidence and overwhelming power. The designs feature elements of his Limitless technique, the iconic blindfold, and the blue energy of his Hollow Purple attack.
              </p>
              
              <Link to="/shop">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <CtaButton variant="secondary" className="border border-neon-blue shadow-[0_0_10px_rgba(0,255,255,0.5)]">SHOP GOJO COLLECTION</CtaButton>
                </motion.div>
              </Link>
            </motion.div>
            
            <motion.div 
              className="bg-zinc-900/80 backdrop-blur-sm aspect-square relative border border-neon-blue/30 shadow-[0_0_15px_rgba(0,255,255,0.3)] overflow-hidden"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white font-metal text-xl text-neon-blue">GOJO COLLECTION IMAGE</div>
              </div>
              <CurseFlame color="blue" className="inset-0" />
              
              {/* Glowing Corner Accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-neon-blue"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-neon-blue"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-neon-blue"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-neon-blue"></div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Sukuna Section */}
      <section className="py-20 bg-zinc-950/80 backdrop-blur-sm relative overflow-hidden">
        <CurseFlame color="red" className="top-0 left-0 w-1/3 h-full opacity-20" />
        
        {/* Neon Border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-red via-neon-pink to-neon-purple"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="order-2 md:order-1 bg-zinc-900/80 backdrop-blur-sm aspect-square relative border border-neon-red/30 shadow-[0_0_15px_rgba(255,0,0,0.3)] overflow-hidden"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white font-metal text-xl text-neon-red">SUKUNA COLLECTION IMAGE</div>
              </div>
              <CurseFlame color="red" className="inset-0" />
              
              {/* Glowing Corner Accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-neon-red"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-neon-red"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-neon-red"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-neon-red"></div>
            </motion.div>
            
            <motion.div 
              className="order-1 md:order-2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-metal text-4xl text-transparent bg-clip-text bg-gradient-to-r from-neon-red to-neon-pink mb-6">
                RYOMEN SUKUNA
              </h2>
              
              <p className="text-white/80 mb-4">
                The King of Curses. The unmatched evil of the golden age of jujutsu. His malevolent domain and overwhelming techniques make him the most feared curse in existence.
              </p>
              
              <p className="text-white/80 mb-6">
                Our Sukuna-inspired pieces channel his dark power and fearsome aesthetics. The collection features his iconic curse marks, the blood-red energy of his techniques, and elements of his Malevolent Shrine domain.
              </p>
              
              <Link to="/shop">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <CtaButton variant="primary" className="border border-neon-red shadow-[0_0_10px_rgba(255,0,0,0.5)]">SHOP SUKUNA COLLECTION</CtaButton>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Blue Lock Section */}
      <section className="py-20 relative overflow-hidden">
        <CurseFlame color="purple" className="top-0 right-0 w-1/3 h-full opacity-20" />
        
        {/* Neon Border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-purple via-neon-pink to-neon-blue"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-metal text-4xl text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-pink mb-6">
                BLUE LOCK
              </h2>
              
              <p className="text-white/80 mb-4">
                The revolutionary project designed to create the world's greatest egotistical striker. A place where only the strongest and most determined survive.
              </p>
              
              <p className="text-white/80 mb-6">
                Our Blue Lock collection embodies the competitive spirit and relentless drive of the series. The designs feature elements of the facility, the intense training, and the ego-driven mentality needed to succeed.
              </p>
              
              <Link to="/shop">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <CtaButton variant="accent" className="border border-neon-purple shadow-[0_0_10px_rgba(255,0,255,0.5)]">SHOP BLUE LOCK COLLECTION</CtaButton>
                </motion.div>
              </Link>
            </motion.div>
            
            <motion.div 
              className="bg-zinc-900/80 backdrop-blur-sm aspect-square relative border border-neon-purple/30 shadow-[0_0_15px_rgba(255,0,255,0.3)] overflow-hidden"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white font-metal text-xl text-neon-purple">BLUE LOCK COLLECTION IMAGE</div>
              </div>
              <CurseFlame color="purple" className="inset-0" />
              
              {/* Glowing Corner Accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-neon-purple"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-neon-purple"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-neon-purple"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-neon-purple"></div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Fusion Section */}
      <section className="py-20 bg-zinc-950/80 backdrop-blur-sm text-center relative overflow-hidden">
        {/* Neon Border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-green via-neon-blue to-neon-purple"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.h2 
            className="font-metal text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-neon-green via-neon-blue to-neon-purple mb-8"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            THE FUSION
          </motion.h2>
          
          <motion.p 
            className="text-white/80 max-w-3xl mx-auto mb-12 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            More than just anime merchandise - our exclusive collections fuse the iconic styles of Jujutsu Kaisen and Blue Lock with high-end streetwear aesthetics, creating pieces that stand at the intersection of anime culture and fashion.
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-black/50 border border-neon-green/30 p-6 backdrop-blur-sm shadow-[0_0_10px_rgba(0,255,0,0.2)] hover:shadow-[0_0_15px_rgba(0,255,0,0.4)] transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="font-metal text-xl text-neon-green mb-4">PREMIUM MATERIALS</h3>
              <p className="text-white/70">
                Each piece is crafted from high-quality materials, ensuring comfort, durability, and a premium feel worthy of these iconic characters.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-black/50 border border-neon-blue/30 p-6 backdrop-blur-sm shadow-[0_0_10px_rgba(0,255,255,0.2)] hover:shadow-[0_0_15px_rgba(0,255,255,0.4)] transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="font-metal text-xl text-neon-blue mb-4">LIMITED EDITION</h3>
              <p className="text-white/70">
                Our collections are produced in limited quantities, ensuring exclusivity and making each piece a true collector's item for true fans.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-black/50 border border-neon-purple/30 p-6 backdrop-blur-sm shadow-[0_0_10px_rgba(255,0,255,0.2)] hover:shadow-[0_0_15px_rgba(255,0,255,0.4)] transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="font-metal text-xl text-neon-purple mb-4">UNIQUE DESIGNS</h3>
              <p className="text-white/70">
                Our designs go beyond simple prints, incorporating unique elements that truly capture the essence of each character and series.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Lore;
