import React from "react";
import { motion } from "framer-motion";
import '../styles/logo.css';

const Logo = ({ size = "md" }) => {
  // Define updated rope gradient with more colors
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
      
      {/* Horizontal Rope */}
      <path 
        d="M10 30 Q40 10, 70 30 T130 30" 
        stroke="url(#ropeGradient)" 
        strokeWidth="5" 
        fill="none"
      />
      
      {/* Astronaut hanging on rope (smaller size) */}
      <circle cx="70" cy="60" r="18" fill="#1E1E24" stroke="#E5E7EB" strokeWidth="2" />
      <circle cx="75" cy="55" r="5" fill="white" opacity="0.5" />
      
      {/* Astronaut body */}
      <rect x="60" y="75" width="20" height="30" rx="8" fill="#E5E7EB" stroke="#BDBDBD" strokeWidth="1.5" />
      
      {/* Arms */}
      <line x1="60" y1="85" x2="45" y2="95" stroke="#E5E7EB" strokeWidth="4" strokeLinecap="round" />
      <line x1="80" y1="85" x2="95" y2="80" stroke="#E5E7EB" strokeWidth="4" strokeLinecap="round" />
      
      {/* Legs */}
      <line x1="65" y1="105" x2="60" y2="120" stroke="#E5E7EB" strokeWidth="4" strokeLinecap="round" />
      <line x1="75" y1="105" x2="80" y2="120" stroke="#E5E7EB" strokeWidth="4" strokeLinecap="round" />
      
      {/* Star Decoration */}
      <polygon 
        points="110,40 113,50 120,50 115,55 117,65 110,60 103,65 105,55 100,50 107,50" 
        fill="white" 
        opacity="0.8"
      />
    </motion.svg>
  );
};

export default Logo;
