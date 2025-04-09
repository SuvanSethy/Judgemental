import React, { useEffect, useRef } from 'react';

interface MatrixBackgroundProps {
  opacity?: number;
  className?: string;
}

const MatrixBackground: React.FC<MatrixBackgroundProps> = ({ 
  opacity = 30,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
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
  }, []);

  return (
    <>
      {/* Matrix Background Animation */}
      <canvas 
        ref={canvasRef} 
        className={`absolute inset-0 opacity-${opacity} pointer-events-none ${className}`}
      />
      
      {/* Neon Circuit Lines */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
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
    </>
  );
};

export default MatrixBackground; 