"use client"
import { motion } from "framer-motion"

const Rope = () => {
  return (
    <g>
      {/* Green rope */}
      <defs>
        <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="50%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#4ade80" />
        </linearGradient>
      </defs>
      <motion.path
        d="M-200 70 C600 65, 1200 75, 1800 70"
        stroke="url(#greenGradient)"
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
        animate={{
          d: [
            "M-200 70 C600 65, 1200 75, 1800 70",
            "M-200 70 C600 67, 1200 77, 1800 70",
            "M-200 70 C600 63, 1200 73, 1800 70",
            "M-200 70 C600 65, 1200 75, 1800 70",
          ],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        }}
        style={{ filter: "drop-shadow(0 0 2px #4ade80) drop-shadow(0 0 4px rgba(74, 222, 128, 0.6))" }}
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
        d="M-200 60 C600 55, 1200 65, 1800 60"
        stroke="url(#blueGradient)"
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
        animate={{
          d: [
            "M-200 60 C600 55, 1200 65, 1800 60",
            "M-200 60 C600 57, 1200 67, 1800 60",
            "M-200 60 C600 53, 1200 63, 1800 60",
            "M-200 60 C600 55, 1200 65, 1800 60",
          ],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          delay: 0.5,
        }}
        style={{ filter: "drop-shadow(0 0 2px #3b82f6) drop-shadow(0 0 4px rgba(59, 130, 246, 0.6))" }}
      />

      {/* Yellow rope */}
      <defs>
        <linearGradient id="yellowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#facc15" />
          <stop offset="50%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#facc15" />
        </linearGradient>
      </defs>
      <motion.path
        d="M-200 80 C600 85, 1200 75, 1800 80"
        stroke="url(#yellowGradient)"
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
        animate={{
          d: [
            "M-200 80 C600 85, 1200 75, 1800 80",
            "M-200 80 C600 87, 1200 77, 1800 80",
            "M-200 80 C600 83, 1200 73, 1800 80",
            "M-200 80 C600 85, 1200 75, 1800 80",
          ],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          delay: 1,
        }}
        style={{ filter: "drop-shadow(0 0 2px #facc15) drop-shadow(0 0 4px rgba(250, 204, 21, 0.6))" }}
      />

      {/* Red rope */}
      <defs>
        <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f87171" />
          <stop offset="50%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#f87171" />
        </linearGradient>
      </defs>
      <motion.path
        d="M-200 50 C600 45, 1200 55, 1800 50"
        stroke="url(#redGradient)"
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
        animate={{
          d: [
            "M-200 50 C600 45, 1200 55, 1800 50",
            "M-200 50 C600 47, 1200 57, 1800 50",
            "M-200 50 C600 43, 1200 53, 1800 50",
            "M-200 50 C600 45, 1200 55, 1800 50",
          ],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          delay: 1.5,
        }}
        style={{ filter: "drop-shadow(0 0 2px #f87171) drop-shadow(0 0 4px rgba(248, 113, 113, 0.6))" }}
      />

      {/* Purple rope */}
      <defs>
        <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="50%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <motion.path
        d="M-200 90 C600 95, 1200 85, 1800 90"
        stroke="url(#purpleGradient)"
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
        animate={{
          d: [
            "M-200 90 C600 95, 1200 85, 1800 90",
            "M-200 90 C600 97, 1200 87, 1800 90",
            "M-200 90 C600 93, 1200 83, 1800 90",
            "M-200 90 C600 95, 1200 85, 1800 90",
          ],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          delay: 2,
        }}
        style={{ filter: "drop-shadow(0 0 2px #a855f7) drop-shadow(0 0 4px rgba(168, 85, 247, 0.6))" }}
      />
    </g>
  )
}

export default Rope