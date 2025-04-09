import * as React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import { Search } from 'lucide-react';

// Sample product data
const products = [
  {
    id: 1,
    name: 'Neon Dreams Jacket',
    price: 199.99,
    image: '/images/products/neon-jacket.jpg',
    description: 'A futuristic jacket with LED accents and holographic patterns.',
    inStock: true,
    category: 'Outerwear'
  },
  {
    id: 2,
    name: 'Cyberpunk Pants',
    price: 149.99,
    image: '/images/products/cyber-pants.jpg',
    description: 'Smart fabric pants with reactive color-changing technology.',
    inStock: true,
    category: 'Bottoms'
  },
  {
    id: 3,
    name: 'Quantum Boots',
    price: 299.99,
    image: '/images/products/quantum-boots.jpg',
    description: 'Advanced footwear with adaptive cushioning and LED soles.',
    inStock: false,
    category: 'Footwear'
  },
  {
    id: 4,
    name: 'Holographic Hoodie',
    price: 179.99,
    image: '/images/products/holo-hoodie.jpg',
    description: 'A sleek hoodie featuring iridescent holographic details.',
    inStock: true,
    category: 'Outerwear'
  },
  {
    id: 5,
    name: 'Neural Network Tee',
    price: 89.99,
    image: '/images/products/neural-tee.jpg',
    description: 'Smart fabric t-shirt with subtle circuit patterns.',
    inStock: true,
    category: 'Tops'
  },
  {
    id: 6,
    name: 'Digital Gloves',
    price: 129.99,
    image: '/images/products/digital-gloves.jpg',
    description: 'Touch-sensitive gloves with haptic feedback.',
    inStock: true,
    category: 'Accessories'
  }
];

const categories = ['All', 'Outerwear', 'Tops', 'Bottoms', 'Footwear', 'Accessories'];

const Shop: React.FC = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    const filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowLogo(prev => !prev);
    }, 3000); // Switch every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="text-center mb-12">
        <AnimatePresence mode="wait">
          {showLogo ? (
            <motion.img
              key="logo"
              src="/images/logo.png"
              alt="JUDGEMENTAL"
              className="h-40 w-auto mx-auto mb-4 glow-effect"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{
                filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5)) drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))'
              }}
            />
          ) : (
            <motion.h1
              key="text"
              className="text-5xl font-bold mb-4 gradient-text text-glow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              Future Collection
            </motion.h1>
          )}
        </AnimatePresence>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-3 pl-12 text-white placeholder-white/50 focus:outline-none focus:border-curse-red/50 transition-colors"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-curse-red text-white'
                    : 'bg-white/5 text-white/70 hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-white/70 text-lg">
              No products found matching your criteria.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Shop;
