import React, { useState } from 'react';
import CtaButton from '@/components/CtaButton';
import CurseFlame from '@/components/CurseFlame';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const Account = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Invalid Input",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: isLogin ? "Login functionality coming soon!" : "Registration functionality coming soon!",
      description: "This feature will be available when the drop goes live.",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/auth/login');
  };

  return (
    <div className="min-h-screen pt-20 bg-black">
      {/* Hero */}
      <section className="relative w-full py-16 bg-zinc-950 overflow-hidden">
        <CurseFlame color="purple" className="bottom-0 left-0 w-full h-full opacity-20" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="font-metal text-4xl md:text-5xl text-white mb-4 animate-pulse-curse">
            {isLogin ? 'LOGIN' : 'CREATE ACCOUNT'}
          </h1>
          
          <p className="text-white/80 max-w-2xl mx-auto">
            {isLogin ? 
              'Access your account to track orders, get early drop access, and more.' : 
              'Join our community to get early access to exclusive drops, special offers, and more.'}
          </p>
        </div>
      </section>
      
      {/* Login/Register Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-zinc-900/50 backdrop-blur-md border border-white/10 p-8">
            <div className="flex mb-8 border-b border-white/10">
              <button 
                className={`flex-1 pb-4 text-center font-medium ${isLogin ? 'text-white border-b-2 border-curse-red' : 'text-white/60 hover:text-white'}`}
                onClick={() => setIsLogin(true)}
              >
                LOGIN
              </button>
              <button 
                className={`flex-1 pb-4 text-center font-medium ${!isLogin ? 'text-white border-b-2 border-curse-blue' : 'text-white/60 hover:text-white'}`}
                onClick={() => setIsLogin(false)}
              >
                REGISTER
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="mb-4">
                  <label htmlFor="name" className="block text-white mb-2">Full Name</label>
                  <input 
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-black border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-curse-red"
                    placeholder="Your name"
                  />
                </div>
              )}
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-white mb-2">Email</label>
                <input 
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-curse-red"
                  placeholder="Your email"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="password" className="block text-white mb-2">Password</label>
                <input 
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-curse-red"
                  placeholder="Your password"
                />
              </div>
              
              <CtaButton type="submit" variant={isLogin ? "primary" : "secondary"} className="w-full">
                {isLogin ? 'LOGIN' : 'CREATE ACCOUNT'}
              </CtaButton>
              
              {isLogin && (
                <div className="mt-4 text-center">
                  <a href="#" className="text-white/70 hover:text-white text-sm">
                    Forgot password?
                  </a>
                </div>
              )}
            </form>
            
            <div className="mt-8 pt-8 border-t border-white/10 text-center">
              <p className="text-white/70 mb-4">Or continue with</p>
              <div className="flex gap-4 justify-center">
                <button className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-2 font-medium">
                  Google
                </button>
                <button className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-2 font-medium">
                  Discord
                </button>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/10 text-center">
              <button 
                onClick={handleLogout}
                className="text-curse-red hover:text-white transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 bg-zinc-950">
        <div className="container mx-auto px-4">
          <h2 className="font-metal text-3xl text-white text-center mb-12">
            MEMBER BENEFITS
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black/50 border border-white/10 p-6 backdrop-blur-sm">
              <h3 className="font-metal text-xl text-curse-red mb-4">EARLY ACCESS</h3>
              <p className="text-white/70">
                Get exclusive early access to all drops before they open to the public.
              </p>
            </div>
            
            <div className="bg-black/50 border border-white/10 p-6 backdrop-blur-sm">
              <h3 className="font-metal text-xl text-curse-blue mb-4">EXCLUSIVE ITEMS</h3>
              <p className="text-white/70">
                Access to member-only editions and exclusive colorways.
              </p>
            </div>
            
            <div className="bg-black/50 border border-white/10 p-6 backdrop-blur-sm">
              <h3 className="font-metal text-xl text-curse-purple mb-4">EARN CURSE POINTS</h3>
              <p className="text-white/70">
                Collect points with every purchase to unlock rare items and special offers.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Account;
