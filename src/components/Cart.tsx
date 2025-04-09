import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Matrix animation effect
  useEffect(() => {
    if (!isOpen || !canvasRef.current) return;
    
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
  }, [isOpen]);

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    try {
      await updateQuantity(itemId, newQuantity);
      toast.success('Cart updated successfully', {
        style: {
          background: 'rgba(0, 0, 0, 0.9)',
          color: '#fff',
          border: '1px solid rgba(0, 255, 0, 0.5)',
          boxShadow: '0 0 10px rgba(0, 255, 0, 0.5)',
          borderRadius: '4px',
          padding: '12px 16px',
          fontSize: '14px',
          fontWeight: 'bold'
        }
      });
    } catch (error) {
      toast.error('Failed to update cart', {
        style: {
          background: 'rgba(0, 0, 0, 0.9)',
          color: '#fff',
          border: '1px solid rgba(255, 0, 0, 0.5)',
          boxShadow: '0 0 10px rgba(255, 0, 0, 0.5)',
          borderRadius: '4px',
          padding: '12px 16px',
          fontSize: '14px',
          fontWeight: 'bold'
        }
      });
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      await removeFromCart(itemId);
      toast.success('Item removed from cart', {
        style: {
          background: 'rgba(0, 0, 0, 0.9)',
          color: '#fff',
          border: '1px solid rgba(0, 255, 0, 0.5)',
          boxShadow: '0 0 10px rgba(0, 255, 0, 0.5)',
          borderRadius: '4px',
          padding: '12px 16px',
          fontSize: '14px',
          fontWeight: 'bold'
        }
      });
    } catch (error) {
      toast.error('Failed to remove item', {
        style: {
          background: 'rgba(0, 0, 0, 0.9)',
          color: '#fff',
          border: '1px solid rgba(255, 0, 0, 0.5)',
          boxShadow: '0 0 10px rgba(255, 0, 0, 0.5)',
          borderRadius: '4px',
          padding: '12px 16px',
          fontSize: '14px',
          fontWeight: 'bold'
        }
      });
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
      toast.success('Cart cleared successfully', {
        style: {
          background: 'rgba(0, 0, 0, 0.9)',
          color: '#fff',
          border: '1px solid rgba(0, 255, 0, 0.5)',
          boxShadow: '0 0 10px rgba(0, 255, 0, 0.5)',
          borderRadius: '4px',
          padding: '12px 16px',
          fontSize: '14px',
          fontWeight: 'bold'
        }
      });
    } catch (error) {
      toast.error('Failed to clear cart', {
        style: {
          background: 'rgba(0, 0, 0, 0.9)',
          color: '#fff',
          border: '1px solid rgba(255, 0, 0, 0.5)',
          boxShadow: '0 0 10px rgba(255, 0, 0, 0.5)',
          borderRadius: '4px',
          padding: '12px 16px',
          fontSize: '14px',
          fontWeight: 'bold'
        }
      });
    }
  };

  const subtotal = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
            onClick={onClose}
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-gradient-to-b from-zinc-950 to-black border-l border-white/10 z-50 overflow-hidden"
          >
            {/* Matrix Background Animation */}
            <canvas 
              ref={canvasRef} 
              className="absolute inset-0 opacity-90 pointer-events-none"
            />
            
            {/* Futuristic Top Border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-curse-red via-curse-blue to-curse-purple"></div>
            
            {/* Scanning Line Effect */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-1/3"
              initial={{ y: '-100%' }}
              animate={{ y: '200%' }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
            
            {/* Glowing Grid Lines */}
            <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 pointer-events-none">
              {Array.from({ length: 100 }).map((_, i) => (
                <div 
                  key={i} 
                  className="border border-white/5"
                  style={{
                    animation: `pulse ${2 + Math.random() * 3}s infinite alternate`,
                    animationDelay: `${Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
            
            {/* Neon Circuit Lines */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 20 }).map((_, i) => (
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
            
            <div className="flex flex-col h-full relative z-10">
              {/* Header */}
              <div className="p-4 border-b border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-curse-red/10 via-transparent to-curse-blue/10 opacity-50"></div>
                <div className="flex items-center justify-between relative z-10">
                  <h2 className="text-xl font-semibold text-white tracking-wider">
                    <span className="bg-gradient-to-r from-curse-red via-curse-blue to-curse-purple bg-clip-text text-transparent">Your Cart</span>
                  </h2>
                  <motion.button
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-5 h-5 text-white" />
                  </motion.button>
                </div>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4">
                {cart.items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <ShoppingBag className="w-16 h-16 text-curse-red/40 mb-4" />
                    </motion.div>
                    <motion.p 
                      className="text-white/60 text-lg"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      Your cart is empty
                    </motion.p>
                    <motion.p 
                      className="text-white/40 text-sm mt-2"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      Add some futuristic items to your collection
                    </motion.p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-4 p-4 rounded-lg bg-black/50 border border-white/10 backdrop-blur-sm relative overflow-hidden group"
                      >
                        {/* Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-curse-red/10 via-transparent to-curse-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        {/* Neon Border on Hover */}
                        <div className="absolute inset-0 border border-transparent group-hover:border-neon-green group-hover:shadow-[0_0_10px_rgba(0,255,0,0.5)] transition-all duration-300 rounded-lg"></div>
                        
                        <div className="relative z-10 w-20 h-20 rounded-md overflow-hidden border border-white/10">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        
                        <div className="flex-1 relative z-10">
                          <h3 className="text-white font-medium group-hover:text-neon-green transition-colors">{item.name}</h3>
                          <p className="text-white/60">${item.price}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <motion.button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="p-1 rounded-full bg-black/50 border border-white/10 hover:bg-white/10 hover:border-neon-blue hover:shadow-[0_0_5px_rgba(0,255,255,0.5)] transition-all"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              -
                            </motion.button>
                            <span className="text-white w-6 text-center">{item.quantity}</span>
                            <motion.button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="p-1 rounded-full bg-black/50 border border-white/10 hover:bg-white/10 hover:border-neon-blue hover:shadow-[0_0_5px_rgba(0,255,255,0.5)] transition-all"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              +
                            </motion.button>
                          </div>
                        </div>
                        
                        <motion.button
                          onClick={() => handleRemoveItem(item.id)}
                          className="p-2 rounded-full hover:bg-white/10 transition-colors text-curse-red relative z-10 hover:border-neon-red hover:shadow-[0_0_5px_rgba(255,0,0,0.5)]"
                          whileHover={{ scale: 1.1, rotate: 90 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Trash2 className="w-5 h-5" />
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {cart.items.length > 0 && (
                <div className="p-4 border-t border-white/10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-curse-red/5 via-transparent to-curse-blue/5 opacity-50"></div>
                  
                  <div className="relative z-10">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-white/60">Subtotal</span>
                      <span className="text-white font-semibold text-lg">${subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex gap-2">
                      <motion.button
                        onClick={handleClearCart}
                        className="flex-1 py-2 px-4 rounded-md bg-black/50 border border-white/10 text-white hover:bg-white/10 hover:border-neon-purple hover:shadow-[0_0_10px_rgba(255,0,255,0.5)] transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Clear Cart
                      </motion.button>
                      
                      <motion.button
                        onClick={() => {
                          // TODO: Implement checkout
                          toast.info('Checkout functionality coming soon!', {
                            style: {
                              background: 'rgba(0, 0, 0, 0.9)',
                              color: '#fff',
                              border: '1px solid rgba(0, 255, 255, 0.5)',
                              boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
                              borderRadius: '4px',
                              padding: '12px 16px',
                              fontSize: '14px',
                              fontWeight: 'bold'
                            }
                          });
                        }}
                        className="flex-1 py-2 px-4 rounded-md bg-gradient-to-r from-curse-red via-curse-blue to-curse-purple text-white hover:opacity-90 hover:shadow-[0_0_15px_rgba(0,255,255,0.7)] transition-all flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Checkout
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart; 