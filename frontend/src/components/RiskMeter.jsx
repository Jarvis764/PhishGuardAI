import React from 'react'
import { motion } from 'framer-motion'

function getRiskColor(score) {
  if (score <= 30) return { stroke: '#10b981', text: 'text-cyber-green', label: 'Low Risk' }
  if (score <= 60) return { stroke: '#f59e0b', text: 'text-cyber-yellow', label: 'Medium Risk' }
  return { stroke: '#ef4444', text: 'text-cyber-red', label: 'High Risk' }
}

export default function RiskMeter({ score = 0 }) {
  const { stroke, text, label } = getRiskColor(score)
  const radius = 70
  const circumference = 2 * Math.PI * radius
  const dashOffset = circumference - (score / 100) * circumference
  const isHigh = score > 60

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-48 h-48">
        {/* Outer pulsing ring for high risk */}
        {isHigh && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-cyber-red/50"
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}

        <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
          {/* Background track */}
          <circle
            cx="80" cy="80" r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="12"
          />
          {/* Animated progress arc */}
          <motion.circle
            cx="80" cy="80" r={radius}
            fill="none"
            stroke={stroke}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            style={{ filter: `drop-shadow(0 0 8px ${stroke})` }}
          />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className={`text-4xl font-bold ${text}`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {score}
          </motion.span>
          <span className="text-slate-400 text-xs mt-1">/ 100</span>
        </div>
      </div>
      <motion.div
        className={`mt-2 text-sm font-semibold ${text}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {label}
      </motion.div>
    </div>
  )
}
