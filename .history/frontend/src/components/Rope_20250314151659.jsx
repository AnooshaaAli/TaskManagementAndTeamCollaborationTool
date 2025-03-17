"use client"
import { motion } from "framer-motion"

const Rope = () => {
  return (
    <g>
      {/* Cyan/Teal rope */}
      <defs>
        <linearGradient id="cyanGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="50%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      <motion.path
        d="M-200 75 C600 70, 1200 80, 1800 75"
        stroke="url(#cyanGradient)"
        strokeWidth={1.5}
        fill="none"
        strokeLinecap="round"
        animate={{
          d: [
            "M-200 75 C600 70, 1200 80, 1800 75",
            "M-200 75 C600 72, 1200 82, 1800 75",
            "M-200 75 C600 68, 1200 78, 1800 75",
            "M-200 75 C600 70, 1200 80, 1800 75",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        }}
        style={{ filter: "drop-shadow(0 0 3px #06b6d4)" }}
      />

      {/* Purple rope */}
      <defs>
        <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="50%" stopColor="#7e22ce" />
          <stop offset="100%" stopColor="#9333ea" />
        </linearGradient>
      </defs>
      <motion.path
        d="M-200 65 C600 60, 1200 70, 1800 65"
        stroke="url(#purpleGradient)"
        strokeWidth={1.5}
        fill="none"
        strokeLinecap="round"
        animate={{
          d: [
            "M-200 65 C600 60, 1200 70, 1800 65",
            "M-200 65 C600 62, 1200 72, 1800 65",
            "M-200 65 C600 58, 1200 68, 1800 65",
            "M-200 65 C600 60, 1200 70, 1800 65",
          ],
        }}
        transition={{
          duration: 7,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          delay: 0.3,
        }}
        style={{ filter: "drop-shadow(0 0 3px #9333ea)" }}
      />

      {/* Pink rope */}
      <defs>
        <linearGradient id="pinkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ec4899" />
          <stop offset="50%" stopColor="#db2777" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      <motion.path
        d="M-200 55 C600 50, 1200 60, 1800 55"
        stroke="url(#pinkGradient)"
        strokeWidth={1.5}
        fill="none"
        strokeLinecap="round"
        animate={{
          d: [
            "M-200 55 C600 50, 1200 60, 1800 55",
            "M-200 55 C600 52, 1200 62, 1800 55",
            "M-200 55 C600 48, 1200 58, 1800 55",
            "M-200 55 C600 50, 1200 60, 1800 55",
          ],
        }}
        transition={{
          duration: 9,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          delay: 0.6,
        }}
        style={{ filter: "drop-shadow(0 0 3px #ec4899)" }}
      />

      {/* Yellow/Orange rope */}
      <defs>
        <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="50%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      <motion.path
        d="M-200 85 C600 80, 1200 90, 1800 85"
        stroke="url(#orangeGradient)"
        strokeWidth={1.5}
        fill="none"
        strokeLinecap="round"
        animate={{
          d: [
            "M-200 85 C600 80, 1200 90, 1800 85",
            "M-200 85 C600 82, 1200 92, 1800 85",
            "M-200 85 C600 78, 1200 88, 1800 85",
            "M-200 85 C600 80, 1200 90, 1800 85",
          ],
        }}
        transition={{
          duration: 7.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          delay: 0.9,
        }}
        style={{ filter: "drop-shadow(0 0 3px #f59e0b)" }}
      />

      {/* Blue rope */}
      <defs>
        <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      <motion.path
        d="M-200 45 C600 40, 1200 50, 1800 45"
        stroke="url(#blueGradient)"
        strokeWidth={1.5}
        fill="none"
        strokeLinecap="round"
        animate={{
          d: [
            "M-200 45 C600 40, 1200 50, 1800 45",
            "M-200 45 C600 42, 1200 52, 1800 45",
            "M-200 45 C600 38, 1200 48, 1800 45",
            "M-200 45 C600 40, 1200 50, 1800 45",
          ],
        }}
        transition={{
          duration: 8.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          delay: 1.2,
        }}
        style={{ filter: "drop-shadow(0 0 3px #3b82f6)" }}
      />

      {/* Green rope */}
      <defs>
        <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="50%" stopColor="#059669" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
      </defs>
      <motion.path
        d="M-200 95 C600 90, 1200 100, 1800 95"
        stroke="url(#greenGradient)"
        strokeWidth={1.5}
        fill="none"
        strokeLinecap="round"
        animate={{
          d: [
            "M-200 95 C600 90, 1200 100, 1800 95",
            "M-200 95 C600 92, 1200 102, 1800 95",
            "M-200 95 C600 88, 1200 98, 1800 95",
            "M-200 95 C600 90, 1200 100, 1800 95",
          ],
        }}
        transition={{
          duration: 9.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          delay: 1.5,
        }}
        style={{ filter: "drop-shadow(0 0 3px #10b981)" }}
      />
    </g>
  )
}

export default Rope