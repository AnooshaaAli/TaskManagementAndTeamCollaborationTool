import React from "react";
import { motion } from "framer-motion";
import '..'

const Logo = () => {
  return (
    <motion.svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Pendant loop */}
      <circle cx="100" cy="20" r="10" stroke="black" strokeWidth="3" fill="none" />
      
      {/* Astronaut helmet */}
      <circle cx="100" cy="60" r="30" fill="black" stroke="white" strokeWidth="4" />
      <circle cx="110" cy="50" r="8" fill="white" opacity="0.5" />
      
      {/* Astronaut body */}
      <rect x="80" y="90" width="40" height="50" rx="10" fill="white" stroke="black" strokeWidth="3" />
      
      {/* Arms */}
      <line x1="80" y1="100" x2="50" y2="120" stroke="black" strokeWidth="6" strokeLinecap="round" />
      <line x1="120" y1="100" x2="150" y2="80" stroke="black" strokeWidth="6" strokeLinecap="round" />
      
      {/* Star in hand */}
      <polygon points="150,75 155,90 170,90 158,100 162,115 150,105 138,115 142,100 130,90 145,90" fill="yellow" stroke="black" strokeWidth="2" />
      
      {/* Legs */}
      <line x1="90" y1="140" x2="90" y2="170" stroke="black" strokeWidth="6" strokeLinecap="round" />
      <line x1="110" y1="140" x2="110" y2="170" stroke="black" strokeWidth="6" strokeLinecap="round" />
    </motion.svg>
  );
};

export default Logo;
