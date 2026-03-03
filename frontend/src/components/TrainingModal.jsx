import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, AlertTriangle, CheckCircle, Shield } from 'lucide-react'

export default function TrainingModal({ isOpen, onClose, training }) {
  if (!training) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-x-4 bottom-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl z-50 max-h-[90vh] overflow-y-auto"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="glass-card p-6 border border-cyber-yellow/30">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-cyber-yellow/20 rounded-lg border border-cyber-yellow/30">
                    <AlertTriangle className="w-6 h-6 text-cyber-yellow" />
                  </div>
                  <h2 className="text-xl font-bold text-white">⚠️ Security Training</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              {/* Mistake explanation */}
              <div className="mb-5">
                <h3 className="text-cyber-blue font-semibold mb-2 text-sm uppercase tracking-wider">What Happened</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{training.mistake_explanation}</p>
              </div>

              {/* Why dangerous */}
              <div className="mb-5 p-4 bg-cyber-red/10 border border-cyber-red/30 rounded-xl">
                <h3 className="text-cyber-red font-semibold mb-2 text-sm uppercase tracking-wider flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Why This Was Dangerous
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">{training.why_dangerous}</p>
              </div>

              {/* Prevention tips */}
              <div className="mb-5">
                <h3 className="text-cyber-green font-semibold mb-3 text-sm uppercase tracking-wider">Prevention Tips</h3>
                <div className="space-y-2">
                  {training.prevention_tips.map((tip, i) => (
                    <motion.div
                      key={i}
                      className="flex items-start gap-3 p-3 bg-cyber-green/5 border border-cyber-green/20 rounded-lg"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <CheckCircle className="w-4 h-4 text-cyber-green mt-0.5 flex-shrink-0" />
                      <p className="text-slate-300 text-sm">{tip}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Awareness summary */}
              <div className="mb-6 p-4 bg-cyber-blue/10 border border-cyber-blue/30 rounded-xl">
                <h3 className="text-cyber-blue font-semibold mb-2 text-sm uppercase tracking-wider flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Awareness Summary
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">{training.awareness_summary}</p>
              </div>

              {/* Complete button */}
              <motion.button
                onClick={onClose}
                className="w-full py-3 bg-cyber-green/20 hover:bg-cyber-green/30 border border-cyber-green/40 text-cyber-green font-semibold rounded-xl transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                ✓ Mark as Complete
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
