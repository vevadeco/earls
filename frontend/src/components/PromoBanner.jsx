import { useState, useEffect } from "react";
import { X, Clock, Percent } from "lucide-react";

const PromoBanner = ({ onClose }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Set deadline to March 1st of the current or next year
    const getDeadline = () => {
      const now = new Date();
      let deadline = new Date(now.getFullYear(), 2, 1); // March 1st
      if (now > deadline) {
        deadline = new Date(now.getFullYear() + 1, 2, 1);
      }
      return deadline;
    };

    const deadline = getDeadline();

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = deadline - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeBlock = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1 min-w-[40px] sm:min-w-[50px]">
        <span className="font-heading text-lg sm:text-2xl font-bold text-white">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-[10px] sm:text-xs text-white/80 mt-1 font-body uppercase">
        {label}
      </span>
    </div>
  );

  return (
    <div
      className="bg-accent text-accent-foreground relative z-50"
      data-testid="promo-banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Promo Text */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden sm:flex items-center justify-center w-10 h-10 bg-white/20 rounded-full">
              <Percent className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-body font-bold text-white text-sm sm:text-base">
                Spring Cleanup Special - 15% OFF!
              </p>
              <p className="font-body text-white/90 text-xs sm:text-sm">
                Book by March 1st to save on your spring landscaping
              </p>
            </div>
          </div>

          {/* Center: Countdown Timer */}
          <div className="hidden md:flex items-center gap-2">
            <Clock className="w-4 h-4 text-white/80" />
            <div className="flex items-center gap-1">
              <TimeBlock value={timeLeft.days} label="Days" />
              <span className="text-white/60 text-lg font-bold mx-0.5">:</span>
              <TimeBlock value={timeLeft.hours} label="Hrs" />
              <span className="text-white/60 text-lg font-bold mx-0.5">:</span>
              <TimeBlock value={timeLeft.minutes} label="Min" />
              <span className="text-white/60 text-lg font-bold mx-0.5">:</span>
              <TimeBlock value={timeLeft.seconds} label="Sec" />
            </div>
          </div>

          {/* Right: CTA + Close */}
          <div className="flex items-center gap-2">
            <a
              href="#hero"
              className="hidden sm:inline-flex items-center px-4 py-1.5 bg-white text-accent font-body font-semibold text-sm rounded-full hover:bg-white/90 transition-colors"
              data-testid="promo-cta-btn"
            >
              Claim Offer
            </a>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Close promotion banner"
              data-testid="promo-close-btn"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Mobile Timer */}
        <div className="md:hidden flex items-center justify-center gap-1 mt-2 pt-2 border-t border-white/20">
          <Clock className="w-3 h-3 text-white/80" />
          <span className="font-body text-xs text-white/80 mr-2">Ends in:</span>
          <div className="flex items-center gap-1">
            <span className="font-body font-bold text-white text-sm">
              {timeLeft.days}d
            </span>
            <span className="text-white/60">:</span>
            <span className="font-body font-bold text-white text-sm">
              {String(timeLeft.hours).padStart(2, "0")}h
            </span>
            <span className="text-white/60">:</span>
            <span className="font-body font-bold text-white text-sm">
              {String(timeLeft.minutes).padStart(2, "0")}m
            </span>
            <span className="text-white/60">:</span>
            <span className="font-body font-bold text-white text-sm">
              {String(timeLeft.seconds).padStart(2, "0")}s
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
