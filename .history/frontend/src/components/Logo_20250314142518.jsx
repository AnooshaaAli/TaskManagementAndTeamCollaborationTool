import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "../styles/logo.css";

const Logo = ({ size = "md" }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Define multi-line rope effect
  const ropeLines = Array.from({ length: 5 }, (_, i) => (
    <path
      key={i}
      d={`M0 50 Q${screenWidth / 4} ${30 + i * 2}, ${screenWidth / 2} 50 T${screenWidth} 50`}
      stroke="url(#ropeGradient)"
      strokeWidth="5"
      fill="none"
      opacity="0.9"
    />
  ));

  return (
    <motion.svg
      width="100vw"
      height={size === "sm" ? "120" : size === "md" ? "140" : "160"}
      viewBox={`0 0 ${screenWidth} 160`}
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
          ease: "easeInOut",
        },
      }}
      className="astronaut-logo"
    >
      {/* Define gradient for rope */}
      <defs>
        <linearGradient id="ropeGradient" x1="0%" y1="50%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="25%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#f87171" />
          <stop offset="75%" stopColor="#facc15" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>

      {/* Multi-line rope effect */}
      {ropeLines}

      {/* Astronaut hanging on the rope */}
      <circle cx={screenWidth / 2} cy="70" r="24" fill="#1E1E24" stroke="#E5E7EB" strokeWidth="3" />
      <circle cx={screenWidth / 2 + 8} cy="62" r="6" fill="white" opacity="0.5" />

      {/* Astronaut body */}
      <rect
        x={screenWidth / 2 - 15}
        y="94"
        width="30"
        height="40"
        rx="10"
        fill="#E5E7EB"
        stroke="#BDBDBD"
        strokeWidth="2"
      />

      {/* Arms */}
      <line x1={screenWidth / 2 - 15} y1="104" x2={screenWidth / 2 - 35} y2="114" stroke="#E5E7EB" strokeWidth="5" strokeLinecap="round" />
      <line x1={screenWidth / 2 + 15} y1="104" x2={screenWidth / 2 + 35} y2="94" stroke="#E5E7EB" strokeWidth="5" strokeLinecap="round" />

      {/* Legs */}
      <line x1={screenWidth / 2 - 5} y1="134" x2={screenWidth / 2 - 10} y2="154" stroke="#E5E7EB" strokeWidth="5" strokeLinecap="round" />
      <line x1={screenWidth / 2 + 5} y1="134" x2={screenWidth / 2 + 10} y2="154" stroke="#E5E7EB" strokeWidth="5" strokeLinecap="round" />
    </motion.svg>
  );
};

export default Logo;
