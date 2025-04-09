import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, ChevronDown, Mail, Phone, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What are Curse Marks?",
    answer: "Curse Marks are ancient symbols of power that grant their bearers unique abilities. Each mark has its own history and specific powers."
  },
  {
    question: "How do I activate a Curse Mark?",
    answer: "Curse Marks activate automatically upon purchase. Each mark comes with detailed instructions for proper use and activation rituals."
  },
  {
    question: "Are Curse Marks dangerous?",
    answer: "While powerful, our Curse Marks are carefully curated and tested for safety. Each mark comes with safety guidelines and usage instructions."
  },
  {
    question: "What happens if I lose my Curse Mark?",
    answer: "Contact our support team immediately. We can help track and potentially recover your mark, though some marks may be permanently lost."
  },
  {
    question: "Can I return a Curse Mark?",
    answer: "Due to the mystical nature of our products, returns are only accepted within 7 days of purchase and if the mark remains unactivated."
  }
];

const FAQItem: React.FC<{ item: FAQItem }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left"
      >
        <span className="text-white font-medium">{item.question}</span>
        <ChevronDown
          className={`w-5 h-5 text-white/70 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-white/70 mt-2">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Footer = () => {
  const [isFAQOpen, setIsFAQOpen] = useState(false);

  return (
    <footer className="bg-black/50 backdrop-blur-md border-t border-white/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-metal text-white text-xl mb-4">JUDGEMENT</h3>
            <p className="text-white/70 mb-4">Exclusive anime-inspired streetwear drops. Limited editions inspired by Gojo, Sukuna, and Blue Lock.</p>
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-curse-red transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-curse-blue transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-curse-purple transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-metal text-white text-xl mb-4">QUICK LINKS</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-white/70 hover:text-white transition-colors">Home</Link>
              <Link to="/shop" className="text-white/70 hover:text-white transition-colors">Shop</Link>
              <Link to="/lore" className="text-white/70 hover:text-white transition-colors">Lore</Link>
              <Link to="/account" className="text-white/70 hover:text-white transition-colors">Account</Link>
            </nav>
          </div>
          
          <div>
            <h3 className="font-metal text-white text-xl mb-4">NEWSLETTER</h3>
            <p className="text-white/70 mb-4">Sign up to get notified about upcoming drops.</p>
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-zinc-900 border border-white/10 px-4 py-2 text-white focus:outline-none focus:border-curse-red flex-1"
              />
              <button className="bg-curse-red px-4 py-2 text-white font-metal">JOIN</button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-white/70">
                <Mail className="w-5 h-5" />
                <span>support@cursemark.com</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <Phone className="w-5 h-5" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <MapPin className="w-5 h-5" />
                <span>123 Curse Street, Mystic City</span>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div>
            <button
              onClick={() => setIsFAQOpen(!isFAQOpen)}
              className="flex items-center gap-2 text-white font-bold text-lg mb-4"
            >
              <span>FAQ</span>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  isFAQOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            <AnimatePresence>
              {isFAQOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-2">
                    {faqData.map((item, index) => (
                      <FAQItem key={index} item={item} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-white/50">
          <p>&copy; {new Date().getFullYear()} JUDGEMENT. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
