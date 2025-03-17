"use client"
import { motion } from "framer-motion"

const Rope = () => {
  // Define colors for the different ropes
  const ropeColors = [
    "#4ade80", // Green
    "#3b82f6", // Blue
    "#f87171", // Red
    "#facc15", // Yellow
    "#a855f7", // Purple
  ]

  return (
    <g>
      {/* First rope (Green) */}
      <motion.path
        d="M-100 70 C100 65, 300 75, 500 65 C700 55, 900 75, 1100 70"
        stroke="#4ade80"
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
        animate={{
          d: [
            "M-100 70 C100 65, 300 75, 500 65 C700 55, 900 75, 1100 70",
            "M-100 70 C100 67, 300 77, 500 67 C700 57, 900 77, 1100 70",
            "M-100 70 C100 63, 300 73, 500 63 C700 53, 900 73, 1100 70",
            "M-100 70 C100 65, 300 75, 500 65 C700 55, 900 75, 1100 70",
          ],
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
        d="M-100 60 C100 75, 300 55, 500 75 C700 85, 900 65, 1100 60"
        stroke="#3b82f6"
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
        animate={{
          d: [
            "M-100 60 C100 75, 300 55, 500 75 C700 85, 900 65, 1100 60",
            "M-100 60 C100 77, 300 57, 500 77 C700 87, 900 67, 1100 60",
            "M-100 60 C100 73, 300 53, 500 73 C700 83, 900 63, 1100 60",
            "M-100 60 C100 75, 300 55, 500 75 C700 85, 900 65, 1100 60",
          ],
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
        d="M-100 80 C100 65, 300 85, 500 65 C700 55, 900 75, 1100 80"
        stroke="#f87171"
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
        animate={{
          d: [
            "M-100 80 C100 65, 300 85, 500 65 C700 55, 900 75, 1100 80",
            "M-100 80 C100 67, 300 87, 500 67 C700 57, 900 77, 1100 80",
            "M-100 80 C100 63, 300 83, 500 63 C700 53, 900 73, 1100 80",
            "M-100 80 C100 65, 300 85, 500 65 C700 55, 900 75, 1100 80",
          ],
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
        d="M-100 50 C100 60, 300 40, 500 60 C700 70, 900 50, 1100 50"
        stroke="#facc15"
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
        animate={{
          d: [
            "M-100 50 C100 60, 300 40, 500 60 C700 70, 900 50, 1100 50",
            "M-100 50 C100 62, 300 42, 500 62 C700 72, 900 52, 1100 50",
            "M-100 50 C100 58, 300 38, 500 58 C700 68, 900 48, 1100 50",
            "M-100 50 C100 60, 300 40, 500 60 C700 70, 900 50, 1100 50",
          ],
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
        d="M-100 90 C100 80, 300 100, 500 80 C700 70, 900 90, 1100 90"
        stroke="#a855f7"
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
        animate={{
          d: [
            "M-100 90 C100 80, 300 100, 500 80 C700 70, 900 90, 1100 90",
            "M-100 90 C100 82, 300 102, 500 82 C700 72, 900 92, 1100 90",
            "M-100 90 C100 78, 300 98, 500 78 C700 68, 900 88, 1100 90",
            "M-100 90 C100 80, 300 100, 500 80 C700 70, 900 90, 1100 90",
          ],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          delay: 2,
        }}
        style={{ filter: "drop-shadow(0 0 1px rgba(255,255,255,0.3))" }}
      />

      {/* Highlight strokes */}
      <motion.path
        d="M100 70 C300 65, 500 75, 700 65"
        stroke="white"
        strokeWidth={1}
        strokeOpacity={0.3}
        fill="none"
        strokeLinecap="round"
        animate={{
          d: [
            "M100 70 C300 65, 500 75, 700 65",
            "M100 70 C300 67, 500 77, 700 67",
            "M100 70 C300 63, 500 73, 700 63",
            "M100 70 C300 65, 500 75, 700 65",
          ],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        }}
      />
    </g>
  )
}

export default Rope