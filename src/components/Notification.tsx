
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { X } from 'lucide-react';
import CtaButton from './CtaButton';

const Notification = () => {
  const [email, setEmail] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Notification Set!",
      description: "You'll be notified when the drop goes live!",
    });
    
    setEmail('');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:bottom-8 md:right-8 md:left-auto md:w-96 bg-zinc-900/90 backdrop-blur-lg border border-white/10 rounded-md p-4 z-50 animate-fade-in shadow-lg">
      <button 
        className="absolute top-2 right-2 text-white/70 hover:text-white"
        onClick={() => setIsVisible(false)}
      >
        <X size={18} />
      </button>
      
      <h3 className="font-metal text-white text-lg mb-2">GET NOTIFIED</h3>
      <p className="text-white/80 text-sm mb-4">Be the first to know when our exclusive drop goes live.</p>
      
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input 
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 bg-black border border-white/20 px-3 py-2 text-white text-sm focus:outline-none focus:border-curse-red"
        />
        <CtaButton type="submit" size="sm" variant="primary">
          NOTIFY
        </CtaButton>
      </form>
    </div>
  );
};

export default Notification;
