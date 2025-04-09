import React from 'react';
import CountdownTimer from '@/components/CountdownTimer';
import CurseFlame from '@/components/CurseFlame';
import CtaButton from '@/components/CtaButton';
import Notification from '@/components/Notification';
import Logo from '@/components/Logo';
import { Link, useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  // Set target date for countdown (30 days from now)
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 30);
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="h-screen w-full relative flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/90 z-0"></div>
        
        {/* Top Logo */}
        <div className="animate-float mb-16 z-10 flex flex-col items-center">
          <Logo />
        </div>
        
        {/* Exclusive Drop Title */}
        <div className="mb-10 z-10 text-center">
          <h2 className="font-metal text-5xl md:text-7xl text-white tracking-wider mb-4 animate-pulse-curse">
            EXCLUSIVE DROP
          </h2>
          <p className="text-white/80 text-lg md:text-xl">
            Gojo, Sukuna and Bluelock Inspired!
          </p>
        </div>
        
        {/* Countdown Timer */}
        <div className="mb-12 z-10">
          <CountdownTimer targetDate={targetDate} />
        </div>
        
        <div className="text-center z-10 mb-6">
          <p className="text-white/70 mb-4">Only 300 pieces are being made</p>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row gap-4 z-10">
          <CtaButton 
            variant="primary" 
            size="lg"
            onClick={() => navigate('/shop')}
          >
            SHOP THE DROP
          </CtaButton>
          <CtaButton 
            variant="secondary" 
            size="lg"
            onClick={() => navigate('/lore')}
          >
            EXPLORE LORE
          </CtaButton>
        </div>
        
        {/* Animated Flame Effects */}
        <CurseFlame color="red" className="bottom-0 left-0 w-1/3 h-1/4" />
        <CurseFlame color="blue" className="bottom-0 right-0 w-1/3 h-1/4" />
      </section>
      
      {/* About Section */}
      <section className="py-20 bg-zinc-950">
        <div className="container mx-auto px-4">
          <h2 className="font-metal text-4xl md:text-5xl text-white text-center mb-12 curse-blue-text-shadow">
            ABOUT THE DROP
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black/50 border border-white/10 p-6 backdrop-blur-sm">
              <h3 className="font-metal text-2xl text-curse-red mb-4">SUKUNA INSPIRED</h3>
              <p className="text-white/80 mb-4">
                Channel the power of the King of Curses with our Sukuna-inspired collection. 
                Dark, powerful designs that embody the malevolent energy of Jujutsu Kaisen's 
                most feared curse.
              </p>
              <Link to="/shop" className="text-curse-red hover:underline">Explore Sukuna Collection →</Link>
            </div>
            
            <div className="bg-black/50 border border-white/10 p-6 backdrop-blur-sm">
              <h3 className="font-metal text-2xl text-curse-blue mb-4">GOJO INSPIRED</h3>
              <p className="text-white/80 mb-4">
                Embrace the confidence and power of Jujutsu Kaisen's strongest sorcerer.
                Our Gojo-inspired pieces feature bold designs that capture his limitless
                energy and iconic style.
              </p>
              <Link to="/shop" className="text-curse-blue hover:underline">Explore Gojo Collection →</Link>
            </div>
            
            <div className="bg-black/50 border border-white/10 p-6 backdrop-blur-sm">
              <h3 className="font-metal text-2xl text-curse-purple mb-4">BLUE LOCK INSPIRED</h3>
              <p className="text-white/80 mb-4">
                For those who strive to be the best. Our Blue Lock collection channels
                the competitive spirit and determination of those chosen for the Blue Lock
                project.
              </p>
              <Link to="/shop" className="text-curse-purple hover:underline">Explore Blue Lock Collection →</Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        <CurseFlame color="red" className="top-0 left-0 w-full h-full opacity-10" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="font-metal text-4xl md:text-5xl text-white mb-6 curse-text-shadow">
              JOIN THE WAITLIST
            </h2>
            <p className="text-white/80 mb-8">
              Be the first to know when our exclusive drop goes live. Early access and special offers for our waitlist members.
            </p>
            
            <form className="flex flex-col md:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 bg-zinc-900 border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-curse-red"
              />
              <CtaButton type="submit" variant="primary" size="lg">
                JOIN NOW
              </CtaButton>
            </form>
          </div>
        </div>
      </section>
      
      <Notification />
    </div>
  );
};

export default Index;
