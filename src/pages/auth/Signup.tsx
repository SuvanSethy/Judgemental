import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import MatrixBackground from '@/components/MatrixBackground';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Mock authentication - replace with your actual auth logic
      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Error",
          description: "Passwords do not match.",
          variant: "destructive",
          className: "bg-black/90 text-white border-red-500",
        });
        return;
      }

      if (formData.email && formData.password && formData.name) {
        // Store user data and token
        localStorage.setItem('token', 'mock-token');
        localStorage.setItem('user', JSON.stringify({
          name: formData.name,
          email: formData.email,
        }));

        toast({
          title: "Welcome to Curse Mark!",
          description: "Your account has been created successfully.",
          className: "bg-black/90 text-white border-neon-blue",
        });

        // Redirect to profile page
        navigate('/profile');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
        className: "bg-black/90 text-white border-red-500",
      });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <MatrixBackground opacity={30} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md p-8 bg-black/50 backdrop-blur-lg rounded-lg border border-neon-purple/30 shadow-[0_0_15px_rgba(255,0,255,0.3)]"
      >
        <h1 className="text-3xl font-bold text-center text-white mb-8">Create Account</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 bg-black/50 border border-neon-purple/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neon-purple"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 bg-black/50 border border-neon-purple/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neon-purple"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 bg-black/50 border border-neon-purple/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neon-purple"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="w-full px-4 py-2 bg-black/50 border border-neon-purple/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neon-purple"
              required
            />
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-neon-purple to-neon-pink text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Create Account
          </motion.button>
        </form>
        
        <p className="mt-6 text-center text-gray-400">
          Already have an account?{' '}
          <Link to="/auth/login" className="text-neon-purple hover:text-neon-pink transition-colors">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup; 