import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function StatCard({ icon: Icon, value, label, trend, gradient = 'blue', suffix = '' }) {
  const [displayValue, setDisplayValue] = useState(0)

  const colorMap = {
    blue: { text: 'text-cyber-blue', border: 'border-cyber-blue/30', bg: 'bg-cyber-blue/10', glow: 'neon-blue' },
    cyan: { text: 'text-cyber-cyan', border: 'border-cyber-cyan/30', bg: 'bg-cyber-cyan/10', glow: 'neon-cyan' },
    purple: { text: 'text-cyber-purple', border: 'border-cyber-purple/30', bg: 'bg-cyber-purple/10', glow: 'neon-purple' },
    green: { text: 'text-cyber-green', border: 'border-cyber-green/30', bg: 'bg-cyber-green/10', glow: 'neon-green' },
    red: { text: 'text-cyber-red', border: 'border-cyber-red/30', bg: 'bg-cyber-red/10', glow: 'neon-red' },
    yellow: { text: 'text-cyber-yellow', border: 'border-cyber-yellow/30', bg: 'bg-cyber-yellow/10', glow: '' },
  }

  const colors = colorMap[gradient] || colorMap.blue
  const numericValue = parseFloat(value)

  useEffect(() => {
    let start = 0
    const end = numericValue
    const duration = 1500
    const step = end / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= end) {
        setDisplayValue(end)
        clearInterval(timer)
      } else {
        setDisplayValue(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [numericValue])

  return (
    <motion.div
      className={`glass-card p-6 border ${colors.border} ${colors.glow} cursor-pointer`}
      whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(59,130,246,0.4)' }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className={`text-3xl font-bold ${colors.text}`}>
            {displayValue}{suffix}
          </div>
          <div className="text-slate-400 text-sm mt-1">{label}</div>
          {trend !== undefined && (
            <div className={`text-xs mt-2 ${trend >= 0 ? 'text-cyber-red' : 'text-cyber-green'}`}>
              {trend >= 0 ? '▲' : '▼'} {Math.abs(trend)}% from last week
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl ${colors.bg} border ${colors.border}`}>
          <Icon className={`w-6 h-6 ${colors.text}`} />
        </div>
      </div>
    </motion.div>
  )
}
