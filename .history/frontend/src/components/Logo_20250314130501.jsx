import React from "react";
import { motion } from "framer-motion";
import '../styles/logo.css';

const Logo = ({ size = "md" }) => {
  // Define rope gradient colors that match the dark UI theme
  const ropeGradient = {
    id: "ropeGradient",
    stops: [
      { offset: "0%", color: "#4ade80" },   // Green from + button
      { offset: "50%", color: "#3b82f6" },  // Blue
      { offset: "100%", color: "#f87171" }  // Red
    ]
  };

  return (
    <motion.svg
      width={size === "sm" ? "100" : size === "md" ? "120" : "140"}
      height={size === "sm" ? "160" : size === "md" ? "180" : "200"}
      viewBox="0 0 140 200"
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
        <linearGradient id={ropeGradient.id} x1="0%" y1="0%" x2="0%" y2="100%">
          {ropeGradient.stops.map((stop, index) => (
            <stop key={index} offset={stop.offset} stopColor={stop.color} />
          ))}
        </linearGradient>
      </defs>