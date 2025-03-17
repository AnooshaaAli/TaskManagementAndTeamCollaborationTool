import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import '../styles/logo.css';

const Logo = ({ size = "md" }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    // Update screen width on resize
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  // Astronaut position (center of the screen)
  const astronautX = screenWidth / 2;
  const astronautY = 100; // Slightly below the rope

  return (
    <motion.svg
      width={screenWidth}
      height="200"
      viewBox={`0 0 ${screenWidth} 200`}
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
        <linearGradient id={ropeGradient.id} x1="0%" y1="50%" x2="100%" y2="100%">
          {ropeGradient.stops.map((stop, index) => (
            <stop key={index} offset={stop.offset} stopColor={stop.color} />
          ))}
        </linearGradient>
      </defs>
      
      {/* Rope stretching across the entire screen width */}
      <path
        d={`M0 50 Q${screenWidth / 4} 30, ${screenWidth / 2} 50 T${screenWidth} 50`}
        fill="url(#ropeGradient)"
        opacity="0.9"
      />

      {/* Astronaut hanging on rope */}
      <circle cx={astronautX} cy={astronautY} r="24" fill="#1E1E24" stroke="#E5E7EB" strokeWidth="3" />
      <circle cx={astronautX + 8} cy={astronautY - 8} r="6" fill="white" opacity="0.5" />
      
      {/* Star near helmet */}
      <polygon 
        points="40,70 43,78 35,74 48,74 40,78" 
        fill="white" 
        opacity="0.9"
      />
      
      {/* Astronaut body */}
      <rect x={astronautX - 15} y={astronautY + 24} width="30" height="40" rx="10" fill="#E5E7EB" stroke="#BDBDBD" strokeWidth="2" />
      
      {/* Rope texture lines for body */}
      <line x1={astronautX - 10} y1={astronautY + 30} x2={astronautX + 10} y2={astronautY + 30} stroke="#BDBDBD" strokeWidth="1.5" />
      <line x1={astronautX - 10} y1={astronautY + 40} x2={astronautX + 10} y2={astronautY + 40} stroke="#BDBDBD" strokeWidth="1.5" />
      <line x1={astronautX - 10} y1={astronautY + 50} x2={astronautX + 10} y2={astronautY + 50} stroke="#BDBDBD" strokeWidth="1.5" />
      
      {/* Arms */}
      <line x1={astronautX - 15} y1={astronautY + 34} x2={astronautX - 35} y2={astronautY + 44} stroke="#E5E7EB" strokeWidth="5" strokeLinecap="round" />
      <line x1={astronautX + 15} y1={astronautY + 34} x2={astronautX + 35} y2={astronautY + 24} stroke="#E5E7EB" strokeWidth="5" strokeLinecap="round" />

      {/* Star in astronaut's hand */}
      <polygon 
        points={`${astronautX + 20},${astronautY + 24} ${astronautX + 23},${astronautY + 34} ${astronautX + 33},${astronautY + 34} ${astronautX + 26},${astronautY + 30} ${astronautX + 18},${astronautY + 40} ${astronautX + 10},${astronautY + 34} ${astronautX + 2},${astronautY + 40} ${astronautX + 4},${astronautY + 30} ${astronautX - 4},${astronautY + 24} ${astronautX + 7},${astronautY + 24}`} 
        fill="white" 
        opacity="0.9"
      />
      
      {/* Legs */}
      <line x1={astronautX - 5} y1={astronautY + 64} x2={astronautX - 10} y2={astronautY + 84} stroke="#E5E7EB" strokeWidth="5" strokeLinecap="round" />
      <line x1={astronautX + 5} y1={astronautY + 64} x2={astronautX + 10} y2={astronautY + 84} stroke="#E5E7EB" strokeWidth="5" strokeLinecap="round" />

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

