"use client"
import { motion } from "framer-motion"

const Rope = () => {
  return (
    <g>
      {/* First rope (Green) */}
      <defs>
        <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="50%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#4ade80" />
        </linearGradient>
      </defs>
      <motion.path
        d="M-200 70 C100 65, 600 75, 1000 65 C1300 55, 1600 75, 1800 70"
        stroke="url(#greenGradient)"
        strokeWidth={3}
        fill="none"
        strokeLinecap="round"
        animate={{
          d: [
            "M-200 70 C100 65, 600 75, 1000 65 C1300 55, 1600 75, 1800 70",
            "M-200 70 C100 67, 600 77, 1000 67 C1300 57, 1600 77, 1800 70",
            "M-200 70 C100 63, 600 73, 1000 63 C1300 53, 1600 73, 1800 70",
            "M-200 70 C100 65, 600 75, 1000 65 C1300 55, 1600 75, 1800 70",
          ],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        }}
        style={{ filter: "drop-shadow(0 0 6px rgba(74, 222, 128, 0.8))" }}
      />

      {/* Second rope (Blue) */}
      <defs>
        <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      <motion.path
        d="M-200 60 C100 75, 600 55, 1000 75 C1300 85, 1600 65, 1800 60"
        stroke="url(#blueGradient)"
        strokeWidth={3}
        fill="none"
        strokeLinecap="round"
        animate={{
          d: [
            "M-200 60 C100 75, 600 55, 1000 75 C1300 85, 1600 65, 1800 60",
            "M-200 60 C100 77, 600 57, 1000 77 C1300 87, 1600 67, 1800 60",
            "M-200 60 C100 73, 600 53, 1000 73 C1300 83, 1600 63, 1800 60",
            "M-200 60 C100 75, 600 55, 1000 75 C1300 85, 1600 65, 1800 60",
          ],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          delay: 0.5,
        }}
        style={{ filter: "drop-shadow(0 0 6px rgba(59, 130, 246, 0.8))" }}
      />

      {/* Third rope (Red) */}
      <defs>
        <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f87171" />
          <stop offset="50%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#f87171" />
        </linearGradient>
      </defs>
      <motion.path
        d="M-200 80 C100 65, 600 85, 1000 65 C1300 55, 1600 75, 1800 80"
        stroke="url(#redGradient)"
        strokeWidth={3}
        fill="none"
        strokeLinecap="round"
        animate={{
          d: [
            "M-200 80 C100 65, 600 85, 1000 65 C1300 55, 1600 75, 1800 80",
            "M-200 80 C100 67, 600 87, 1000 67 C1300 57, 1600 77, 1800 80",
            "M-200 80 C100 63, 600 83, 1000 63 C1300 53, 1600 73, 1800 80",
            "M-200 80 C100 65, 600 85, 1000 65 C1300 55, 1600 75, 1800 80",
          ],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          delay: 1,
        }}
        style={{ filter: "drop-shadow(0 0 6px rgba(248, 113, 113, 0.8))" }}
      />

      {/* Fourth rope (Yellow) */}
      <defs>
        <linearGradient id="yellowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#facc15" />
          <stop offset="50%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#facc15" />
        </linearGradient>
      </defs>
      <motion.path
        d="M-200 50 C100 60, 600 40, 1000 60 C1300 70, 1600 50, 1800 50"
        stroke="url(#yellowGradient)"
        strokeWidth={3}
        fill="none"
        strokeLinecap="round"
        animate={{
          d: [
            "M-200 50 C100 60, 600 40, 1000 60 C1300 70, 1600 50, 1800 50",
            "M-200 50 C100 62, 600 42, 1000 62 C1300 72, 1600 52, 1800 50",
            "M-200 50 C100 58, 600 38, 1000 58 C1300 68, 1600 48, 1800 50",
            "M-200 50 C100 60, 600 40, 1000 60 C1300 70, 1600 50, 1800 50",
          ],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          delay: 1.5,
        }}
        style={{ filter: "drop-shadow(0 0 6px rgba(250, 204, 21, 0.8))" }}
      />

      {/* Fifth rope (Purple) */}
      <defs>
        <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="50%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <motion.path
        d="M-200 90 C100 80, 600 100, 1000 80 C1300 70, 1600 90, 1800 90"
        stroke="url(#purpleGradient)"
        strokeWidth={3}
        fill="none"
        strokeLinecap="round"
        animate={{
          d: [
            "M-200 90 C100 80, 600 100, 1000 80 C1300 70, 1600 90, 1800 90",
            "M-200 90 C100 82, 600 102, 1000 82 C1300 72, 1600 92, 1800 90",
            "M-200 90 C100 78, 600 98, 1000 78 C1300 68, 1600 88, 1800 90",
            "M-200 90 C100 80, 600 100, 1000 80 C1300 70, 1600 90, 1800 90",
          ],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          delay: 2,
        }}
        style={{ filter: "drop-shadow(0 0 6px rgba(168, 85, 247, 0.8))" }}
      />

      {/* Highlight strokes */}
      <motion.path
        d="M100 70 C300 65, 800 75, 1000 65"
        stroke="white"
        strokeWidth={1.5}
        strokeOpacity={0.5}
        fill="none"
        strokeLinecap="round"
        animate={{
          d: [
            "M100 70 C300 65, 800 75, 1000 65",
            "M100 70 C300 67, 800 77, 1000 67",
            "M100 70 C300 63, 800 73, 1000 63",
            "M100 70 C300 65, 800 75, 1000 65",
          ],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        }}
        style={{ filter: "drop-shadow(0 0 3px rgba(255,255,255,0.6))" }}
      />
    </g>
  )
}

export default Rope