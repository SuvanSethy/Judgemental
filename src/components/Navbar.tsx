import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { useCart } from '@/contexts/CartContext';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { items } = useCart();
 
  const isAuthenticated = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
      className: "bg-black/90 text-white border-neon-blue",
    });
    navigate('/auth/login');
  };

  const isActive = (path: string) => location.pathname === path;

  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="/images/logo.png" alt="JUDGEMENTAL" className="h-10 w-auto hover:opacity-90 transition-opacity" />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/shop"
              className={`text-sm font-medium transition-colors ${
                isActive('/shop') ? 'text-neon-blue' : 'text-white/70 hover:text-white'
              }`}
            >
              SHOP
            </Link>
            <Link
              to="/lore"
              className={`text-sm font-medium transition-colors ${
                isActive('/lore') ? 'text-neon-blue' : 'text-white/70 hover:text-white'
              }`}
            >
              LORE
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/cart')}
              className="relative p-2 text-white/70 hover:text-white transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-neon-red text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </motion.button>

            {isAuthenticated ? (
              <>
                {/* Profile Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/profile')}
                  className="p-2 text-white/70 hover:text-white transition-colors"
                >
                  <User className="w-6 h-6" />
                </motion.button>

                {/* Logout Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="p-2 text-white/70 hover:text-neon-red transition-colors"
                >
                  <LogOut className="w-6 h-6" />
                </motion.button>
              </>
            ) : (
              <Link
                to="/auth/login"
                className="px-4 py-2 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
