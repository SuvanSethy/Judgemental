import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, ShoppingBag, Heart, LogOut, Settings } from 'lucide-react';
import MatrixBackground from '@/components/MatrixBackground';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/auth/login');
  };

  return (
    <div className="relative min-h-screen">
      <MatrixBackground opacity={30} />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Profile Header */}
          <div className="bg-black/50 backdrop-blur-lg rounded-lg p-8 mb-8 border border-neon-blue/30 shadow-[0_0_15px_rgba(0,255,255,0.3)]">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{user.name || 'User'}</h1>
                <p className="text-neon-blue">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-black/50 backdrop-blur-lg rounded-lg p-6 border border-neon-green/30 shadow-[0_0_15px_rgba(0,255,0,0.3)]"
            >
              <div className="flex items-center gap-4">
                <ShoppingBag className="w-8 h-8 text-neon-green" />
                <div>
                  <h3 className="text-xl font-bold text-white">Orders</h3>
                  <p className="text-neon-green">0 Active</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-black/50 backdrop-blur-lg rounded-lg p-6 border border-neon-purple/30 shadow-[0_0_15px_rgba(255,0,255,0.3)]"
            >
              <div className="flex items-center gap-4">
                <Heart className="w-8 h-8 text-neon-purple" />
                <div>
                  <h3 className="text-xl font-bold text-white">Wishlist</h3>
                  <p className="text-neon-purple">0 Items</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-black/50 backdrop-blur-lg rounded-lg p-6 border border-neon-blue/30 shadow-[0_0_15px_rgba(0,255,255,0.3)]"
            >
              <div className="flex items-center gap-4">
                <Settings className="w-8 h-8 text-neon-blue" />
                <div>
                  <h3 className="text-xl font-bold text-white">Settings</h3>
                  <p className="text-neon-blue">Manage Account</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Recent Orders */}
          <div className="bg-black/50 backdrop-blur-lg rounded-lg p-8 border border-neon-blue/30 shadow-[0_0_15px_rgba(0,255,255,0.3)]">
            <h2 className="text-2xl font-bold text-white mb-6">Recent Orders</h2>
            <div className="text-center text-gray-400 py-8">
              No orders yet. Start shopping to see your orders here.
            </div>
          </div>

          {/* Logout Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className="mt-8 w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile; 