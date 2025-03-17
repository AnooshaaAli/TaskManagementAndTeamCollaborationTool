import React from "react";
import { motion } from "framer-motion";
import '../styles/logo.css';

const Logo = ({ size = "md" }) => {
  // Define rope gradient colors that match the dark UI theme
  const ropeGradient = {
    id: "ropeGradient",
    stops: [
      { offset: "0%", color: "#4ade80" },   // Green
      { offset: "25%", color: "#3b82f6" },  // Blue
      { offset: "50%", color: "#f87171" },  // Red
      { offset: "75%", color: "#facc15" },  // Yellow
      { offset: "100%", color: "#a855f7" }  // Purple
    ]
  };

  return (
    <motion.svg
      width={size === "sm" ? "80" : size === "md" ? "100" : "120"}
      height={size === "sm" ? "120" : size === "md" ? "140" : "160"}
      viewBox="0 0 140 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5,
        y: {
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }
      }}
      className="astronaut-logo"
    >
      {/* Define gradient for rope */}
      <defs>
        <linearGradient id={ropeGradient.id} x1="0%" y1="50%" x2="100%" y2="50%">
          {ropeGradient.stops.map((stop, index) => (
            <stop key={index} offset={stop.offset} stopColor={stop.color} />
          ))}
        </linearGradient>
      </defs>
      
      {/* Rope connecting to the top */}
      <path 
        d="M70 0 Q60 10, 70 20 Q80 30, 70 40 Q60 50, 70 60 L70 0" 
        fill="url(#ropeGradient)" 
        opacity="0.9"
      />
      
      {/* Astronaut hanging on rope */}
      <circle cx="70" cy="70" r="24" fill="#1E1E24" stroke="#E5E7EB" strokeWidth="3" />
      <circle cx="78" cy="62" r="6" fill="white" opacity="0.5" />
      
      {/* Star near helmet */}
      <polygon 
        points="40,70 43,78 35,74 48,74 40,78" 
        fill="white" 
        opacity="0.9"
      />
      
      {/* Astronaut body */}
      <rect x="55" y="94" width="30" height="40" rx="10" fill="#E5E7EB" stroke="#BDBDBD" strokeWidth="2" />
      
      {/* Rope texture lines for body */}
      <line x1="55" y1="104" x2="85" y2="104" stroke="#BDBDBD" strokeWidth="1.5" />
      <line x1="55" y1="114" x2="85" y2="114" stroke="#BDBDBD" strokeWidth="1.5" />
      <line x1="55" y1="124" x2="85" y2="124" stroke="#BDBDBD" strokeWidth="1.5" />
      
      {/* Arms */}
      <line x1="55" y1="104" x2="35" y2="114" stroke="#E5E7EB" strokeWidth="5" strokeLinecap="round" />
      <line x1="85" y1="104" x2="105" y2="94" stroke="#E5E7EB" strokeWidth="5" strokeLinecap="round" />
      
      {/* Star in hand */}
      <polygon 
        points="105,94 108,104 118,104 111,110 113,120 105,114 97,120 99,110 91,104 102,104" 
        fill="white" 
        opacity="0.9"
      />
      
      {/* Legs */}
      <line x1="65" y1="134" x2="60" y2="154" stroke="#E5E7EB" strokeWidth="5" strokeLinecap="round" />
      <line x1="75" y1="134" x2="80" y2="154" stroke="#E5E7EB" strokeWidth="5" strokeLinecap="round" />
      
      {/* Add another star for decoration */}
      <polygon 
        points="120,140 123,148 130,148 125,153 127,160 120,155 113,160 115,153 110,148 117,148" 
        fill="white" 
        opacity="0.9"
      />
    </motion.svg>
  );
};

export default Logo;

