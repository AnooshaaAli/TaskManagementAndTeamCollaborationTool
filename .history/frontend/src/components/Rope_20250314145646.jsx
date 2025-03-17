"use client"
import React from "react"
import { motion } from "framer-motion"

const Rope = () => {
  return (
    <g>
      {/* First rope (Green) */}
      <motion.path
        d="M-200 70 C400 65, 1000 75, 1600 65 C2200 55, 2800 75, 3000 70"
        stroke="#4ade80"
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
        animate={{
          d: [
            "M-200 70 C400 65, 1000 75, 1600 65 C2200 55, 2800 75, 3000 70",
            "M-200 70 C400 67, 1000 77, 1600 67 C2200 57, 2800 77, 3000 70",
            "M-200 70 C400 63, 1000 73, 1600 63 C2200 53, 2800 73, 3000 70",
            "M-200 70 C400 65, 1000 75, 1600 65 C2200 55, 2800 75, 3000 70",
          ]
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        }}
        style={{ filter: "drop-shadow(0 0 1px rgba(255,255,255,0.3))" }}
      />
      
      {/* Second rope (Blue) */}
      <motion.path
        d="M-200 60 C400 75, 1000 55, 1600 75 C2200 85, 2800 65, 3000 60"
        stroke="#3b82f6"
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
        animate={{
          d: [
            "M-200 60 C400 75, 1000 55, 1600 75 C2200 85, 2800 65, 3000 60",
            "M-200 60 C400 77, 1000 57, 1600 77 C2200 87, 2800 67, 3000 60",
            "M-200 60 C400 73, 1000 53, 1600 73 C2200 83, 2800 63, 3000 60",
            "M-200 60 C400 75, 1000 55, 1600 75 C2200 85, 2800 65, 3000 60",
          ]
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          delay: 0.5,
        }}
        style={{ filter: "drop-shadow(0 0 1px rgba(255,255,255,0.3))" }}
      />
      
      {/* Third rope (Red) */}
      <motion.path
        d="M-200 80 C400 65, 1000 85, 1600 65 C2200 55, 2800 75, 3000 80"
        stroke="#f87171"
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
        animate={{
          d: [
            "M-200 80 C400 65, 1000 85, 1600 65 C2200 55, 2800 75, 3000 80",
            "M-200 80 C400 67, 1000 87, 1600 67 C2200 57, 2800 77, 3000 80",
            "M-200 80 C400 63, 1000 83, 1600 63 C2200 53, 2800 73, 3000 80",
            "M-200 80 C400 65, 1000 85, 1600 65 C2200 55, 2800 75, 3000 80",
          ]
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          delay: 1,
        }}
        style={{ filter: "drop-shadow(0 0 1px rgba(255,255,255,0.3))" }}
      />
      
      {/* Fourth rope (Yellow) */}
      <motion.path
        d="M-200 50 C400 60, 1000 40, 1600 60 C2200 70, 2800 50, 3000 50"
        stroke="#facc15"
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
        animate={{
          d: [
            "M-200 50 C400 60, 1000 40, 1600 60 C2200 70, 2800 50, 3000 50",
            "M-200 50 C400 62, 1000 42, 1600 62 C2200 72, 2800 52, 3000 50",
            "M-200 50 C400 58, 1000 38, 1600 58 C2200 68, 2800 48, 3000 50",
            "M-200 50 C400 60, 1000 40, 1600 60 C2200 70, 2800 50, 3000 50",
          ]
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          delay: 1.5,
        }}
        style={{ filter: "drop-shadow(0 0 1px rgba(255,255,255,0.3))" }}
      />
      
      {/* Fifth rope (Purple) */}
      <motion.path
        d="M-200 90 C400 80, 1000 100, 1600 80 C2200 70, 2800 90, 3000 90"
        stroke="#a855f7"
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
        animate={{
          d: [
            "M-200 90 C400 80, 1000 100, 1600 80 C2200 70, 2800 90, 3000 90",
            "M-200 90 C400 82, 1000 102, 1600 82 C2200 72, 2800 92, 3000 90",
            "M-200 90 C400 78, 1000 98, 1600 78 C2200 68, 2800 88, 3000 90",
            "M-200 90 C400 80, 1000 100, 1600 80 C2200 70, 2800 90, 3000 90",
          ]
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          delay: 2,
        }}
        style={{ filter: "drop-shadow(0 0 1px rgba(255,255,255,0.3))" }}
      />
    </g>
  )
}

export default Rope
