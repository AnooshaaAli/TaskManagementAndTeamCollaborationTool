"use client"
import { motion } from "framer-motion"
import MultiColoredRope from "./MultiColoredRope"
import "../styles/logo.css"

const Logo = ({ size = "md" }) => {
  // Get the height based on size
  const getHeight = () => {
    if (size === "sm") return "110px"
    if (size === "md") return "130px"
    return "150px" // lg
  }

  return (
    <div className={`logo logo-${size}`} style={{ width: "100%", overflow: "hidden" }}>
      <motion.svg
        width="100%"
        height={getHeight()}
        viewBox="0 0 1200 160"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          y: {
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          },
        }}
        className="astronaut-logo"
        style={{ overflow: "visible" }}
      >
        <MultiColoredRope />

        {/* Center the astronaut in the middle of the viewBox */}
        <g transform="translate(530, 0)">
          {/* Astronaut hanging on rope */}
          <circle cx="70" cy="70" r="24" fill="#1E1E24" stroke="#E5E7EB" strokeWidth="3" />
          <circle cx="78" cy="62" r="6" fill="white" opacity="0.5" />

          {/* Star near helmet */}
          <polygon points="40,70 43,78 35,74 48,74 40,78" fill="white" opacity="0.9" />

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
        </g>
      </motion.svg>
    </div>
  )
}

export default Logo

