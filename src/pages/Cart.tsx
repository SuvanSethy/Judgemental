import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowLeft } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import MatrixBackground from '@/components/MatrixBackground';
import { useCart } from '@/contexts/CartContext';

const Cart: React.FC = () => {
  const { toast } = useToast();
  const { items, updateQuantity, removeFromCart, total } = useCart();
  const shipping = 10;
  const finalTotal = total + shipping;

  const handleQuantityChange = (id: number, change: number) => {
    const item = items.find(item => item.id === id);
    if (item) {
      const newQuantity = Math.max(1, item.quantity + change);
      updateQuantity(id, newQuantity);
    }
  };

  const handleRemoveItem = (id: number) => {
    removeFromCart(id);
  };

  const handleCheckout = () => {
    toast({
      title: "Coming soon!",
      description: "Checkout functionality will be available soon.",
      className: "bg-black/90 text-white border-neon-purple",
    });
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
          {/* Back to Shop */}
          <Link 
            to="/shop"
            className="inline-flex items-center text-white hover:text-neon-blue transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Shop
          </Link>

          <h1 className="text-3xl font-bold text-white mb-8">Your Cart</h1>

          {items.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-black/50 backdrop-blur-lg rounded-lg p-4 border border-neon-blue/30 shadow-[0_0_15px_rgba(0,255,255,0.3)]"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-gray-800 rounded-lg overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold">{item.name}</h3>
                        <p className="text-neon-blue">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleQuantityChange(item.id, -1)}
                          className="p-1 text-white hover:text-neon-blue transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </motion.button>
                        <span className="text-white w-8 text-center">{item.quantity}</span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleQuantityChange(item.id, 1)}
                          className="p-1 text-white hover:text-neon-blue transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </motion.button>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-2 text-white hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-black/50 backdrop-blur-lg rounded-lg p-6 border border-neon-purple/30 shadow-[0_0_15px_rgba(255,0,255,0.3)]">
                  <h2 className="text-xl font-bold text-white mb-4">Order Summary</h2>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-gray-300">
                      <span>Subtotal</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-white/10 my-2"></div>
                    <div className="flex justify-between text-white font-bold">
                      <span>Total</span>
                      <span>${finalTotal.toFixed(2)}</span>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-neon-purple to-neon-pink text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                  >
                    Checkout
                  </motion.button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 mb-4">Your cart is empty</p>
              <Link
                to="/shop"
                className="inline-block px-6 py-2 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Start Shopping
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Cart; 