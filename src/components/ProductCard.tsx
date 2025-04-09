import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';
import '@/styles/products.css';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  inStock: boolean;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, name, price, image, description, inStock, category } = product;
  const [isWishlist, setIsWishlist] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleQuickAdd = () => {
    if (!inStock) {
      toast({
        title: "Out of Stock",
        description: "This item is currently out of stock.",
        className: "bg-black/90 text-white border-neon-red",
      });
      return;
    }
    
    addToCart({ id, name, price, image });
  };

  const handleWishlist = () => {
    setIsWishlist(!isWishlist);
    toast({
      title: isWishlist ? "Removed from Wishlist" : "Added to Wishlist",
      description: isWishlist ? `${name} removed from your wishlist.` : `${name} added to your wishlist!`,
      className: "bg-black/90 text-white border-neon-purple",
    });
  };

  const getPlaceholderClass = () => {
    const productName = name.toLowerCase().replace(/\s+/g, '-');
    return `product-placeholder ${productName}`;
  };

  return (
    <motion.div
      className="group relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Futuristic Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon-red/10 via-transparent to-neon-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <Link to={`/product/${id}`}>
          {!imageError ? (
            <motion.img
              src={image}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              initial={{ scale: 1 }}
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.5 }}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className={getPlaceholderClass()}>
              <div className="circuit-pattern"></div>
              <div className="glow-border"></div>
              <div className="scan-line"></div>
            </div>
          )}
          
          {/* Futuristic Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </Link>
        
        {/* Quick Add Button */}
        <motion.button
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-neon-red text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg shadow-neon-red/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3 }}
          onClick={handleQuickAdd}
          disabled={!inStock}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Quick Add</span>
        </motion.button>
        
        {/* Wishlist Button */}
        <motion.button
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white transition-colors"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
          transition={{ duration: 0.3 }}
          onClick={handleWishlist}
        >
          <Star className={`w-4 h-4 ${isWishlist ? 'fill-neon-red text-neon-red' : ''}`} />
        </motion.button>
        
        {/* Out of Stock Badge */}
        {!inStock && (
          <div className="absolute top-4 left-4 bg-black/80 text-white text-xs px-2 py-1 rounded-full">
            Out of Stock
          </div>
        )}
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <Link to={`/product/${id}`} className="block">
          <h3 className="text-white font-medium mb-1 group-hover:text-neon-red transition-colors">{name}</h3>
          <p className="text-white/70 text-sm mb-2 line-clamp-2">{description}</p>
          <div className="flex justify-between items-center">
            <span className="text-white font-bold">${price.toFixed(2)}</span>
            <span className="text-xs text-white/50 uppercase">{category}</span>
          </div>
        </Link>
      </div>
      
      {/* Scanning Line Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-1/3"
        initial={{ y: '-100%' }}
        animate={{ y: '200%' }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      />
    </motion.div>
  );
};

export default ProductCard;
