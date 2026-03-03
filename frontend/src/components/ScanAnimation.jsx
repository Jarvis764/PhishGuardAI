import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ScanAnimation({ isScanning }) {
  return (
    <AnimatePresence>
      {isScanning && (
        <motion.div
          className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Blinking border */}
          <motion.div
            className="absolute inset-0 rounded-xl border-2 border-cyber-cyan"
            animate={{ opacity: [1, 0.3, 1], boxShadow: ['0 0 10px #06b6d4', '0 0 30px #06b6d4', '0 0 10px #06b6d4'] }}
            transition={{ duration: 1, repeat: Infinity }}
          />

          {/* Scan line */}
          <motion.div
            className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyber-cyan to-transparent"
            style={{ boxShadow: '0 0 20px #06b6d4' }}
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />

          {/* Semi-transparent overlay */}
          <div className="absolute inset-0 bg-cyber-cyan/5" />

          {/* Scanning text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="bg-cyber-darker/90 border border-cyber-cyan/50 rounded-lg px-6 py-3 flex items-center gap-3"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              <motion.div
                className="w-3 h-3 rounded-full bg-cyber-cyan"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.6, repeat: Infinity }}
              />
              <span className="text-cyber-cyan font-mono font-bold tracking-widest text-sm">
                SCANNING...
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
