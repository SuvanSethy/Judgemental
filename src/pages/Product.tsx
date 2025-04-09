
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '@/data/products';
import CtaButton from '@/components/CtaButton';
import CurseFlame from '@/components/CurseFlame';
import { useToast } from '@/components/ui/use-toast';
import { ChevronLeft, ChevronRight, Plus, Minus, Heart } from 'lucide-react';

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState(getProductById(Number(id)));
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // Update product when ID changes
    if (id) {
      const fetchedProduct = getProductById(Number(id));
      setProduct(fetchedProduct);
      if (fetchedProduct) {
        setSelectedImage(0);
      }
    }
  }, [id]);
  
  if (!product) {
    return (
      <div className="min-h-screen pt-28 bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-metal text-4xl text-white mb-4">PRODUCT NOT FOUND</h1>
          <p className="text-white/70 mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/shop">
            <CtaButton>RETURN TO SHOP</CtaButton>
          </Link>
        </div>
      </div>
    );
  }
  
  const { name, description, price, image, gallery, inspiration, category, inStock, limited, limitedCount } = product;
  
  const increaseQuantity = () => {
    if (quantity < 10) setQuantity(quantity + 1);
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };
  
  const addToCart = () => {
    toast({
      title: "Added to Cart",
      description: `${quantity}x ${name} added to your cart!`,
    });
  };
  
  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from Wishlist" : "Added to Wishlist",
      description: isWishlisted ? `${name} removed from your wishlist.` : `${name} added to your wishlist!`,
    });
  };
  
  const nextImage = () => {
    if (gallery && selectedImage < gallery.length - 1) {
      setSelectedImage(selectedImage + 1);
    }
  };
  
  const prevImage = () => {
    if (selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    }
  };
  
  const curseColor = inspiration === 'Gojo' 
    ? 'blue' 
    : inspiration === 'Sukuna' 
      ? 'red' 
      : 'purple';

  return (
    <div className="min-h-screen pt-20 bg-black">
      <div className="container mx-auto px-4 py-8">
        <Link to="/shop" className="inline-flex items-center text-white/70 hover:text-white mb-8">
          <ChevronLeft size={18} />
          <span>Back to shop</span>
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="relative">
            <div className="relative aspect-square bg-zinc-900 mb-4 overflow-hidden">
              <img 
                src={gallery?.[selectedImage] || image} 
                alt={name}
                className="w-full h-full object-cover"
              />
              
              <CurseFlame 
                color={curseColor} 
                className="inset-0 opacity-30"
              />
              
              {gallery && gallery.length > 1 && (
                <>
                  <button 
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/60 rounded-full p-2 text-white hover:bg-black"
                    onClick={prevImage}
                    disabled={selectedImage === 0}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/60 rounded-full p-2 text-white hover:bg-black"
                    onClick={nextImage}
                    disabled={selectedImage === gallery.length - 1}
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>
            
            {gallery && gallery.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {gallery.map((img, idx) => (
                  <button 
                    key={idx}
                    className={`w-20 h-20 flex-shrink-0 bg-zinc-900 ${selectedImage === idx ? 'border-2 border-curse-red' : 'border border-white/10'}`}
                    onClick={() => setSelectedImage(idx)}
                  >
                    <img src={img} alt={`${name}-${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="font-metal text-3xl md:text-4xl text-white mb-2">{name}</h1>
                <div className="flex gap-3">
                  <span className={`text-xs uppercase px-2 py-1 rounded-sm ${
                    inspiration === 'Gojo' 
                      ? 'bg-curse-blue/20 text-curse-blue' 
                      : inspiration === 'Sukuna' 
                        ? 'bg-curse-red/20 text-curse-red' 
                        : 'bg-curse-purple/20 text-curse-purple'
                  }`}>
                    {inspiration}
                  </span>
                  <span className="text-xs uppercase px-2 py-1 rounded-sm bg-zinc-800 text-white/70">
                    {category}
                  </span>
                </div>
              </div>
              <button 
                className={`text-white p-2 rounded-full border ${isWishlisted ? 'border-curse-red bg-curse-red/20' : 'border-white/20 hover:border-curse-red'}`}
                onClick={toggleWishlist}
              >
                <Heart size={20} fill={isWishlisted ? "#FF0022" : "none"} />
              </button>
            </div>
            
            <div className="mb-6">
              <p className="text-white text-3xl font-bold">${price.toFixed(2)}</p>
              {inStock ? (
                <p className="text-green-500 text-sm">In Stock</p>
              ) : (
                <p className="text-curse-red text-sm">Sold Out</p>
              )}
              {limited && limitedCount && (
                <p className="text-white/70 text-sm mt-1">Only {limitedCount} pieces available</p>
              )}
            </div>
            
            <div className="mb-8">
              <p className="text-white/80 leading-relaxed">{description}</p>
            </div>
            
            {inStock && (
              <>
                <div className="mb-6">
                  <label className="block text-white mb-2">Quantity</label>
                  <div className="flex items-center">
                    <button 
                      className="bg-zinc-900 border border-white/20 text-white w-10 h-10 flex items-center justify-center hover:bg-zinc-800"
                      onClick={decreaseQuantity}
                      disabled={quantity <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <input 
                      type="number" 
                      value={quantity} 
                      onChange={(e) => setQuantity(parseInt(e.target.value) || 1)} 
                      className="w-16 text-center bg-zinc-900 border-y border-white/20 h-10 text-white"
                      min="1"
                      max="10"
                    />
                    <button 
                      className="bg-zinc-900 border border-white/20 text-white w-10 h-10 flex items-center justify-center hover:bg-zinc-800"
                      onClick={increaseQuantity}
                      disabled={quantity >= 10}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <CtaButton 
                    variant={inspiration === 'Gojo' ? 'secondary' : inspiration === 'Sukuna' ? 'primary' : 'accent'} 
                    size="lg"
                    className="flex-1"
                    onClick={addToCart}
                  >
                    ADD TO CART
                  </CtaButton>
                  <CtaButton variant="primary" size="lg" className="flex-1">
                    BUY NOW
                  </CtaButton>
                </div>
              </>
            )}
            
            <div className="mt-8 pt-8 border-t border-white/10">
              <h3 className="font-metal text-white text-xl mb-4">PRODUCT DETAILS</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-white/70 text-sm">Category</p>
                  <p className="text-white">{category}</p>
                </div>
                <div>
                  <p className="text-white/70 text-sm">Inspiration</p>
                  <p className="text-white">{inspiration}</p>
                </div>
                <div>
                  <p className="text-white/70 text-sm">Limited Edition</p>
                  <p className="text-white">{limited ? 'Yes' : 'No'}</p>
                </div>
                {limited && limitedCount && (
                  <div>
                    <p className="text-white/70 text-sm">Available</p>
                    <p className="text-white">{limitedCount} pieces</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
