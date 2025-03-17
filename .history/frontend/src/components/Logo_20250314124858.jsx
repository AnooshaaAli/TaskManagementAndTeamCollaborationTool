import React from "react";
import { motion } from "framer-motion";
import '../styles/logo.css';

const Logo = () => {
  return (
    <motion.svg
      width="160"
      height="160"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="astronaut-logo"
    >
      {/* Pendant loop */}
      <circle cx="100" cy="20" r="8" stroke="#D1D5DB" strokeWidth="2.5" fill="none" />
      
      {/* Astronaut helmet - made rounder */}
      <circle cx="100" cy="60" r="32" fill="#1E1E24" stroke="#E5E7EB" strokeWidth="3.5" />
      
      {/* Face shine */}
      <circle cx="110" cy="50" r="10" fill="white" opacity="0.4" />
      <circle cx="85" cy="60" r="5" fill="white" opacity="0.2" />
      
      {/* Eyes - to make it cuter */}
      <circle cx="90" cy="60" r="4" fill="white" />
      <circle cx="110" cy="60" r="4" fill="white" />
      <circle cx="90" cy="60" r="2" fill="#121418" />
      <circle cx="110" cy="60" r="2" fill="#121418" />
      
      {/* Small smile */}
      <path d="M90 72 Q100 80 110 72" stroke="white" strokeWidth="2" fill="none" />
      
      {/* Stars around helmet */}
      <polygon 
        points="60,45 63,52 55,48 65,48 60,52" 
        fill="white" 
        opacity="0.9"
      />
      
      <polygon 
        points="140,60 144,70 135,65 150,65 140,70" 
        fill="white" 
        opacity="0.9"
      />
      
      {/* Astronaut body - made rounder */}
      <rect x="80" y="90" width="40" height="45" rx="15" fill="#D9D9D9" stroke="#BDBDBD" strokeWidth="2.5" />
      
      {/* Rope texture lines for body */}
      <line x1="80" y1="100" x2="120" y2="100" stroke="#BDBDBD" strokeWidth="1.5" />
      <line x1="80" y1="110" x2="120" y2="110" stroke="#BDBDBD" strokeWidth="1.5" />
      <line x1="80" y1="120" x2="120" y2="120" stroke="#BDBDBD" strokeWidth="1.5" />
      
      {/* Arms with rope texture - made shorter and rounder */}
      <line x1="80" y1="100" x2="60" y2="110" stroke="#D9D9D9" strokeWidth="8" strokeLinecap="round" />
      <line x1="120" y1="100" x2="140" y2="90" stroke="#D9D9D9" strokeWidth="8" strokeLinecap="round" />
      
      {/* Star in hand - now brighter */}
      <polygon 
        points="140,85 144,100 158,100 147,110 151,125 140,115 129,125 133,110 122,100 136,100" 
        fill="white" 
        stroke="#BDBDBD" 
        strokeWidth="1" 
      />
      
      {/* Legs with rope texture - shorter and rounder */}
      <line x1="90" y1="135" x2="85" y2="155" stroke="#D9D9D9" strokeWidth="8" strokeLinecap="round" />
      <line x1="110" y1="135" x2="115" y2="155" stroke="#D9D9D9" strokeWidth="8" strokeLinecap="round" />
    </motion.svg>
  );
};

export default Logo;

/* Logo component styles */
.logo {
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Adjusted sizes */
.logo-sm {
    width: 16px;
    height: 16px;
}

.logo-md {
    width: 18px;
    height: 18px;
}

.logo-lg {
    width: 40px;
    height: 40px;
}

/* Apply a metallic silver effect with improved glow for dark UI */
.astronaut-logo {
    filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.5));
}

/* Enhanced metallic effect */
.astronaut-logo polygon,
.astronaut-logo rect,
.astronaut-logo line {
    /* Silver metallic gradient effect */
    fill: #E5E7EB;
    stroke: #BDBDBD;
}

/* Keep the helmet dark to match UI theme */
.astronaut-logo circle:nth-child(2) {
    fill: #1E1E24;
    stroke: #E5E7EB;
}