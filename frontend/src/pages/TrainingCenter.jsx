import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, MousePointerClick, CheckCircle, Clock, Award } from 'lucide-react'
import axios from 'axios'
import TrainingModal from '../components/TrainingModal'

const MOCK_TRAINING = {
  mistake_explanation:
    'You clicked on a link in a simulated phishing email. This email used urgency tactics and impersonated a trusted internal system to trick you into clicking.',
  why_dangerous:
    'In a real attack, clicking this link could have: (1) Installed malware on your device, (2) Stolen your login credentials, (3) Compromised your corporate network, (4) Led to a data breach affecting the entire organization.',
  prevention_tips: [
    "Always verify the sender's email address — hover over the sender name to see the actual address",
    "Be suspicious of urgency — legitimate systems rarely require 'immediate action within 24 hours'",
    'Before clicking any link, hover over it to preview the actual URL destination',
  ],
  awareness_summary:
    'Phishing attacks exploit human psychology using urgency, authority, and fear. Always pause before clicking links in emails, especially those demanding immediate action. When in doubt, navigate directly to the website by typing the URL, or contact the sender through a known phone number.',
}

const MOCK_HISTORY = [
  { id: 1, simulation: 'Account Verification', date: '2024-01-15', result: 'Passed', score: 95 },
  { id: 2, simulation: 'Benefits Enrollment', date: '2024-01-10', result: 'Failed', score: 40 },
  { id: 3, simulation: 'Invoice Approval', date: '2024-01-05', result: 'Passed', score: 88 },
  { id: 4, simulation: 'Password Reset', date: '2023-12-28', result: 'Passed', score: 92 },
  { id: 5, simulation: 'CEO Fraud', date: '2023-12-20', result: 'Failed', score: 35 },
]

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function TrainingCenter() {
  const [modalOpen, setModalOpen] = useState(false)
  const [training, setTraining] = useState(null)
  const [loading, setLoading] = useState(false)

  const viewTraining = async () => {
    setLoading(true)
    try {
      const { data } = await axios.post('/api/generate-training', {
        user_id: 'demo-user',
        simulation_id: 'SIM-00001',
        mistake_type: 'clicked_link',
      })
      setTraining(data)
    } catch {
      setTraining(MOCK_TRAINING)
    } finally {
      setLoading(false)
      setModalOpen(true)
    }
  }

  const passed = MOCK_HISTORY.filter((h) => h.result === 'Passed').length
  const total = MOCK_HISTORY.length

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div className="mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-cyber-green/20 rounded-xl border border-cyber-green/30">
            <GraduationCap className="w-6 h-6 text-cyber-green" />
          </div>
          <h1 className="text-3xl font-bold text-white">Training Center</h1>
        </div>
        <p className="text-slate-400">AI-powered micro-training based on your phishing simulation results</p>
      </motion.div>

      {/* Stats Row */}
      <motion.div
        className="grid grid-cols-3 gap-4 mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={itemVariants} className="glass-card p-5 border border-cyber-green/20 text-center">
          <div className="text-3xl font-bold text-cyber-green">{passed}</div>
          <div className="text-slate-400 text-sm mt-1">Trainings Passed</div>
        </motion.div>
        <motion.div variants={itemVariants} className="glass-card p-5 border border-cyber-red/20 text-center">
          <div className="text-3xl font-bold text-cyber-red">{total - passed}</div>
          <div className="text-slate-400 text-sm mt-1">Trainings Failed</div>
        </motion.div>
        <motion.div variants={itemVariants} className="glass-card p-5 border border-cyber-blue/20 text-center">
          <div className="text-3xl font-bold text-cyber-blue">{Math.round((passed / total) * 100)}%</div>
          <div className="text-slate-400 text-sm mt-1">Completion Rate</div>
        </motion.div>
      </motion.div>

      {/* Active Scenario Card */}
      <motion.div
        className="glass-card p-6 border border-cyber-yellow/20 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <MousePointerClick className="w-5 h-5 text-cyber-yellow" />
              <h2 className="text-white font-semibold">Active Training Scenario</h2>
              <span className="px-2 py-0.5 bg-cyber-red/20 border border-cyber-red/40 text-cyber-red text-xs rounded-full">
                Requires Action
              </span>
            </div>
            <p className="text-slate-300 text-sm mb-1">
              <strong className="text-white">Simulation:</strong> Account Verification Phishing
            </p>
            <p className="text-slate-300 text-sm mb-1">
              <strong className="text-white">Incident:</strong> You clicked a suspicious link on Jan 18, 2024
            </p>
            <p className="text-slate-400 text-sm">
              Complete the security training below to improve your phishing awareness score.
            </p>
          </div>
        </div>

        <motion.button
          onClick={viewTraining}
          disabled={loading}
          className="mt-4 flex items-center gap-2 px-6 py-2.5 bg-cyber-yellow/20 hover:bg-cyber-yellow/30 border border-cyber-yellow/40 text-cyber-yellow font-semibold rounded-xl transition-colors disabled:opacity-50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <GraduationCap className="w-4 h-4" />
          {loading ? 'Loading...' : 'View Training'}
        </motion.button>
      </motion.div>

      {/* History Table */}
      <motion.div
        className="glass-card p-6 border border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-slate-400" />
          Training History
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-slate-400 py-2 pr-4">Simulation</th>
                <th className="text-left text-slate-400 py-2 pr-4">Date</th>
                <th className="text-left text-slate-400 py-2 pr-4">Result</th>
                <th className="text-left text-slate-400 py-2">Score</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_HISTORY.map((item, i) => (
                <motion.tr
                  key={item.id}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.07 }}
                >
                  <td className="py-3 pr-4 text-white">{item.simulation}</td>
                  <td className="py-3 pr-4 text-slate-400">{item.date}</td>
                  <td className="py-3 pr-4">
                    <span
                      className={`flex items-center gap-1 w-fit px-2 py-1 rounded-full text-xs font-semibold border ${
                        item.result === 'Passed'
                          ? 'bg-cyber-green/20 border-cyber-green/40 text-cyber-green'
                          : 'bg-cyber-red/20 border-cyber-red/40 text-cyber-red'
                      }`}
                    >
                      {item.result === 'Passed' ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <Award className="w-3 h-3" />
                      )}
                      {item.result}
                    </span>
                  </td>
                  <td className="py-3 text-slate-300">{item.score}%</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Modal */}
      <TrainingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} training={training} />
    </div>
  )
}
