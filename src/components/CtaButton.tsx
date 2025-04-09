
import React from 'react';
import { useToast } from '@/components/ui/use-toast';

interface CtaButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

const CtaButton: React.FC<CtaButtonProps> = ({
  children,
  onClick,
  className = '',
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
}) => {
  const { toast } = useToast();

  const baseClasses = "relative font-metal uppercase tracking-wider inline-flex items-center justify-center transition-transform hover:scale-105 active:scale-95";
  
  const variantClasses = {
    primary: "bg-curse-red text-white hover:bg-curse-red/90",
    secondary: "bg-curse-blue text-white hover:bg-curse-blue/90",
    accent: "bg-curse-purple text-white hover:bg-curse-purple/90",
  }[variant];
  
  const sizeClasses = {
    sm: "px-3 py-1 text-sm",
    md: "px-6 py-2 text-base",
    lg: "px-8 py-3 text-lg",
  }[size];

  const handleClick = () => {
    if (disabled) return;
    
    if (onClick) {
      onClick();
    } else {
      // Default behavior if no onClick provided
      toast({
        title: "Coming Soon",
        description: "This feature will be available when the drop goes live!",
      });
    }
  };

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={handleClick}
      disabled={disabled}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity"></span>
    </button>
  );
};

export default CtaButton;
