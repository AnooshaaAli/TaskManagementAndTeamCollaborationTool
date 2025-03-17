"use client"
import { motion } from "framer-motion"

const MultiColoredRope = () => {
  // Define colors for the different ropes with more vibrant neon colors
  const ropeColors = [
    "#4ade80", // Neon Green
    "#3b82f6", // Neon Blue
    "#f87171", // Neon Red
    "#facc15", // Neon Yellow
    "#a855f7", // Neon Purple
  ]

  // Define filter for neon glow effect
  const neonGlowFilter = {
    filter: "url(#neonGlow)",
  }

  return (
    <g>
      {/* Define filters for neon glow effect */}
      <defs>
        <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feFlood result="flood" floodColor="#ffffff" floodOpacity="0.2" />
          <feComposite in="flood" result="mask" in2="SourceGraphic" operator="in" />
          <feGaussianBlur in="mask" result="blurred" stdDeviation="3" />
          <feMerge>
            <feMergeNode in="blurred" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Individual color glows */}
        <filter id="greenGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feFlood result="flood" floodColor="#4ade80" floodOpacity="0.6" />
          <feComposite in="flood" result="mask" in2="SourceGraphic" operator="in" />
          <feGaussianBlur in="mask" result="blurred" stdDeviation="4" />
          <feMerge>
            <feMergeNode in="blurred" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="blueGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feFlood result="flood" floodColor="#3b82f6" floodOpacity="0.6" />
          <feComposite in="flood" result="mask" in2="SourceGraphic" operator="in" />
          <feGaussianBlur in="mask" result="blurred" stdDeviation="4" />
          <feMerge>
            <feMergeNode in="blurred" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="redGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feFlood result="flood" floodColor="#f87171" floodOpacity="0.6" />
          <feComposite in="flood" result="mask" in2="SourceGraphic" operator="in" />
          <feGaussianBlur in="mask" result="blurred" stdDeviation="4" />
          <feMerge>
            <feMergeNode in="blurred" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="yellowGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feFlood result="flood" floodColor="#facc15" floodOpacity="0.6" />
          <feComposite in="flood" result="mask" in2="SourceGraphic" operator="in" />
          <feGaussianBlur in="mask" result="blurred" stdDeviation="4" />
          <feMerge>
            <feMergeNode in="blurred" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="purpleGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feFlood result="flood" floodColor="#a855f7" floodOpacity="0.6" />
          <feComposite in="flood" result="mask" in2="SourceGraphic" operator="in" />
          <feGaussianBlur in="mask" result="blurred" stdDeviation="4" />
          <feMerge>
            <feMergeNode in="blurred" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Create a horizontal braided rope that spans the full width */}

      {/* First rope (Green) */}
      <motion.path
        d="M0 70 C60 65, 120 75, 180 65 C240 55, 300 75, 360 70 C420 65, 480 75, 540 70"
        stroke="#4ade80"
        strokeWidth={4}
        fill="none"
        strokeLinecap="round"
        filter="url(#greenGlow)"
        animate={{
          d: [
            "M0 70 C60 65, 120 75, 180 65 C240 55, 300 75, 360 70 C420 65, 480 75, 540 70",
            "M0 70 C60 67, 120 77, 180 67 C240 57, 300 77, 360 72 C420 67, 480 77, 540 70",
            "M0 70 C60 63, 120 73, 180 63 C240 53, 300 73, 360 68 C420 63, 480 73, 540 70",
            "M0 70 C60 65, 120 75, 180 65 C240 55, 300 75, 360 70 C420 65, 480 75, 540 70",
          ],
          filter: ["url(#greenGlow)", "url(#neonGlow)", "url(#greenGlow)", "url(#neonGlow)"],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        }}
      />

      {/* Second rope (Blue) - crosses over and under */}
      <motion.path
        d="M0 60 C60 75, 120 55, 180 75 C240 85, 300 65, 360 60 C420 75, 480 55, 540 60"
        stroke="#3b82f6"
        strokeWidth={4}
        fill="none"
        strokeLinecap="round"
        filter="url(#blueGlow)"
        animate={{
          d: [
            "M0 60 C60 75, 120 55, 180 75 C240 85, 300 65, 360 60 C420 75, 480 55, 540 60",
            "M0 60 C60 77, 120 57, 180 77 C240 87, 300 67, 360 62 C420 77, 480 57, 540 60",
            "M0 60 C60 73, 120 53, 180 73 C240 83, 300 63, 360 58 C420 73, 480 53, 540 60",
            "M0 60 C60 75, 120 55, 180 75 C240 85, 300 65, 360 60 C420 75, 480 55, 540 60",
          ],
          filter: ["url(#blueGlow)", "url(#neonGlow)", "url(#blueGlow)", "url(#neonGlow)"],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          delay: 0.5,
        }}
      />

      {/* Third rope (Red) - creates another braid pattern */}
      <motion.path
        d="M0 80 C60 65, 120 85, 180 65 C240 55, 300 75, 360 80 C420 65, 480 85, 540 80"
        stroke="#f87171"
        strokeWidth={4}
        fill="none"
        strokeLinecap="round"
        filter="url(#redGlow)"
        animate={{
          d: [
            "M0 80 C60 65, 120 85, 180 65 C240 55, 300 75, 360 80 C420 65, 480 85, 540 80",
            "M0 80 C60 67, 120 87, 180 67 C240 57, 300 77, 360 82 C420 67, 480 87, 540 80",
            "M0 80 C60 63, 120 83, 180 63 C240 53, 300 73, 360 78 C420 63, 480 83, 540 80",
            "M0 80 C60 65, 120 85, 180 65 C240 55, 300 75, 360 80 C420 65, 480 85, 540 80",
          ],
          filter: ["url(#redGlow)", "url(#neonGlow)", "url(#redGlow)", "url(#neonGlow)"],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          delay: 1,
        }}
      />

      {/* Fourth rope (Yellow) */}
      <motion.path
        d="M0 50 C60 60, 120 40, 180 60 C240 70, 300 50, 360 50 C420 60, 480 40, 540 50"
        stroke="#facc15"
        strokeWidth={4}
        fill="none"
        strokeLinecap="round"
        filter="url(#yellowGlow)"
        animate={{
          d: [
            "M0 50 C60 60, 120 40, 180 60 C240 70, 300 50, 360 50 C420 60, 480 40, 540 50",
            "M0 50 C60 62, 120 42, 180 62 C240 72, 300 52, 360 52 C420 62, 480 42, 540 50",
            "M0 50 C60 58, 120 38, 180 58 C240 68, 300 48, 360 48 C420 58, 480 38, 540 50",
            "M0 50 C60 60, 120 40, 180 60 C240 70, 300 50, 360 50 C420 60, 480 40, 540 50",
          ],
          filter: ["url(#yellowGlow)", "url(#neonGlow)", "url(#yellowGlow)", "url(#neonGlow)"],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          delay: 1.5,
        }}
      />

      {/* Fifth rope (Purple) */}
      <motion.path
        d="M0 90 C60 80, 120 100, 180 80 C240 70, 300 90, 360 90 C420 80, 480 100, 540 90"
        stroke="#a855f7"
        strokeWidth={4}
        fill="none"
        strokeLinecap="round"
        filter="url(#purpleGlow)"
        animate={{
          d: [
            "M0 90 C60 80, 120 100, 180 80 C240 70, 300 90, 360 90 C420 80, 480 100, 540 90",
            "M0 90 C60 82, 120 102, 180 82 C240 72, 300 92, 360 92 C420 82, 480 102, 540 90",
            "M0 90 C60 78, 120 98, 180 78 C240 68, 300 88, 360 88 C420 78, 480 98, 540 90",
            "M0 90 C60 80, 120 100, 180 80 C240 70, 300 90, 360 90 C420 80, 480 100, 540 90",
          ],
          filter: ["url(#purpleGlow)", "url(#neonGlow)", "url(#purpleGlow)", "url(#neonGlow)"],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          delay: 2,
        }}
      />

      {/* Add highlight strokes to enhance the braided effect */}
      <motion.path
        d="M60 70 C120 65, 180 75, 240 65"
        stroke="white"
        strokeWidth={1.5}
        strokeOpacity={0.5}
        fill="none"
        strokeLinecap="round"
        animate={{
          d: [
            "M60 70 C120 65, 180 75, 240 65",
            "M60 70 C120 67, 180 77, 240 67",
            "M60 70 C120 63, 180 73, 240 63",
            "M60 70 C120 65, 180 75, 240 65",
          ],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        }}
      />

      <motion.path
        d="M120 60 C180 75, 240 55, 300 75"
        stroke="white"
        strokeWidth={1.5}
        strokeOpacity={0.5}
        fill="none"
        strokeLinecap="round"
        animate={{
          d: [
            "M120 60 C180 75, 240 55, 300 75",
            "M120 60 C180 77, 240 57, 300 77",
            "M120 60 C180 73, 240 53, 300 73",
            "M120 60 C180 75, 240 55, 300 75",
          ],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          delay: 0.5,
        }}
      />
    </g>
  )
}

export default MultiColoredRope

