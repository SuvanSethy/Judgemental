
import React from 'react';

interface CurseFlameProps {
  color?: 'red' | 'blue' | 'purple';
  className?: string;
}

const CurseFlame: React.FC<CurseFlameProps> = ({ 
  color = 'red',
  className = ''
}) => {
  const flameColor = {
    red: 'from-curse-red/70 to-curse-red/30',
    blue: 'from-curse-blue/70 to-curse-blue/30',
    purple: 'from-curse-purple/70 to-curse-purple/30',
  }[color];

  const shadowColor = {
    red: 'rgba(255, 0, 34, 0.7)',
    blue: 'rgba(0, 163, 255, 0.7)',
    purple: 'rgba(102, 0, 204, 0.7)',
  }[color];

  return (
    <div 
      className={`absolute pointer-events-none animate-flicker-flame ${className}`}
      style={{ filter: `drop-shadow(0 0 6px ${shadowColor})` }}
    >
      <div className={`bg-gradient-to-t ${flameColor} w-full h-full opacity-70`} />
    </div>
  );
};

export default CurseFlame;
