import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "When is exact date of 1st drop?",
    answer: "Our first drop will be around 30th April 2025. It is getting delayed because we're trying to get the best import quality."
  },
  {
    question: "Do you ship all over India? and is it free?",
    answer: "We provide FREE shipping to ALL OVER INDIA, that too within 4-9 days."
  },
  {
    question: "What will be the price range (after discount)?",
    answer: "Only 1549 INR for Oversized Cropped fit Bluelock Jersey. Only 1649 INR for Oversized Cropped fit Gojo and Sukuna Shirt."
  },
  {
    question: "What if I get damaged product?",
    answer: "We'll see the proof of damage, and we'll immediately refund 100% amount. Or if you like, instead of refunding, we'll place a replacement order."
  },
  {
    question: "What if I order the wrong size?",
    answer: "We will provide very simple and easy to understand size guides in our website. As we're a small brand, we can't refund but we can replace if you have ordered a wrong size."
  },
  {
    question: "Why should I pre-register?",
    answer: "We're only making 300 pieces for our first drop. If you don't register now, you'll be way too late and we'll be out of stock by the time you come to buy. So register ASAP ;)"
  },
  {
    question: "Do you have COD?",
    answer: "We'll have partial COD. Which means, you'll have to pay 99 INR while placing the order. You will pay the rest of the amount on COD when the delivery arrives. We have this feature to filter fake orders. Being a part of this community, I know you'll understand."
  }
];

const FAQItem: React.FC<{ item: FAQItem }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      className="halloween-faq"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div 
        className="halloween-faq-header"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium">{item.question}</h3>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="halloween-faq-content"
          >
            <p>{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'shipping' | 'payment' | 'product'>('all');

  const filteredFAQs = activeTab === 'all' 
    ? faqData 
    : faqData.filter(item => {
        if (activeTab === 'shipping') return item.question.includes('ship');
        if (activeTab === 'payment') return item.question.includes('COD') || item.question.includes('price');
        if (activeTab === 'product') return item.question.includes('product') || item.question.includes('size');
        return true;
      });

  return (
    <div className="min-h-screen bg-transparent">
      {/* Floating Ghosts */}
      <div className="floating-ghost ghost-1"></div>
      <div className="floating-ghost ghost-2"></div>
      <div className="floating-ghost ghost-3"></div>

      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 halloween-title">Frequently Asked Questions</h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Find answers to common questions about our products, shipping, and more.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-6 py-2 rounded-full transition-all ${
              activeTab === 'all' 
                ? 'bg-curse-red text-white' 
                : 'bg-black/50 text-white/70 hover:bg-black/70'
            }`}
          >
            All Questions
          </button>
          <button
            onClick={() => setActiveTab('shipping')}
            className={`px-6 py-2 rounded-full transition-all ${
              activeTab === 'shipping' 
                ? 'bg-curse-red text-white' 
                : 'bg-black/50 text-white/70 hover:bg-black/70'
            }`}
          >
            Shipping
          </button>
          <button
            onClick={() => setActiveTab('payment')}
            className={`px-6 py-2 rounded-full transition-all ${
              activeTab === 'payment' 
                ? 'bg-curse-red text-white' 
                : 'bg-black/50 text-white/70 hover:bg-black/70'
            }`}
          >
            Payment
          </button>
          <button
            onClick={() => setActiveTab('product')}
            className={`px-6 py-2 rounded-full transition-all ${
              activeTab === 'product' 
                ? 'bg-curse-red text-white' 
                : 'bg-black/50 text-white/70 hover:bg-black/70'
            }`}
          >
            Products
          </button>
        </div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto space-y-4">
          {filteredFAQs.map((item, index) => (
            <FAQItem key={index} item={item} />
          ))}
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl font-bold mb-4 halloween-text">Still Have Questions?</h2>
          <p className="text-white/70 mb-6">
            Can't find the answer you're looking for? Please chat with our friendly team.
          </p>
          <button className="halloween-button px-8 py-3 rounded-md">
            Contact Us
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ; 