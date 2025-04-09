
import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: Date;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex justify-center items-center gap-4 md:gap-6">
      <div className="flex flex-col items-center">
        <div className="bg-zinc-900/80 border border-white/10 backdrop-blur-sm w-16 md:w-24 h-16 md:h-24 flex items-center justify-center rounded-sm">
          <span className="text-white text-2xl md:text-4xl font-metal animate-pulse-curse">
            {String(timeLeft.days).padStart(2, '0')}
          </span>
        </div>
        <span className="text-white/70 text-xs md:text-sm mt-2">Days</span>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="bg-zinc-900/80 border border-white/10 backdrop-blur-sm w-16 md:w-24 h-16 md:h-24 flex items-center justify-center rounded-sm">
          <span className="text-white text-2xl md:text-4xl font-metal animate-pulse-curse">
            {String(timeLeft.hours).padStart(2, '0')}
          </span>
        </div>
        <span className="text-white/70 text-xs md:text-sm mt-2">Hours</span>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="bg-zinc-900/80 border border-white/10 backdrop-blur-sm w-16 md:w-24 h-16 md:h-24 flex items-center justify-center rounded-sm">
          <span className="text-white text-2xl md:text-4xl font-metal animate-pulse-curse">
            {String(timeLeft.minutes).padStart(2, '0')}
          </span>
        </div>
        <span className="text-white/70 text-xs md:text-sm mt-2">Mins</span>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="bg-zinc-900/80 border border-white/10 backdrop-blur-sm w-16 md:w-24 h-16 md:h-24 flex items-center justify-center rounded-sm">
          <span className="text-white text-2xl md:text-4xl font-metal animate-pulse-curse">
            {String(timeLeft.seconds).padStart(2, '0')}
          </span>
        </div>
        <span className="text-white/70 text-xs md:text-sm mt-2">Secs</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
