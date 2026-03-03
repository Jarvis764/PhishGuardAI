import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Target, Send, Copy, ExternalLink, CheckCircle } from 'lucide-react'
import axios from 'axios'

const MOCK_RESULT = {
  subject: '[URGENT] Your AcmeCorp account requires immediate verification',
  body: `Dear IT Support Team Member,

Our security systems have detected unusual login activity on your corporate account. To protect your account and prevent unauthorized access, you must verify your credentials within the next 24 hours.

⚠️ FAILURE TO VERIFY WILL RESULT IN ACCOUNT SUSPENSION

Please click the link below to verify your identity:

[Verify My Account Now]

This link expires in 24 hours. If you did not initiate this request, contact IT Support immediately.

Best regards,
IT Security Team
AcmeCorp`,
  fake_link: 'https://company-secure-verify.phishguard-sim.internal/auth',
  simulation_id: 'SIM-47291',
}

export default function SimulationGenerator() {
  const [form, setForm] = useState({ company_name: '', department: 'IT Support', simulation_type: 'IT Support' })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [deployed, setDeployed] = useState(false)
  const [copied, setCopied] = useState(false)

  const generate = async () => {
    if (!form.company_name.trim()) return
    setLoading(true)
    setResult(null)
    setDeployed(false)
    try {
      const { data } = await axios.post('/api/generate-simulation', form)
      setResult(data)
    } catch {
      setResult({ ...MOCK_RESULT, subject: MOCK_RESULT.subject.replace('AcmeCorp', form.company_name) })
    } finally {
      setLoading(false)
    }
  }

  const deploy = () => {
    setDeployed(true)
    setTimeout(() => setDeployed(false), 3000)
  }

  const copyLink = () => {
    if (result) navigator.clipboard.writeText(result.fake_link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div className="mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-cyber-purple/20 rounded-xl border border-cyber-purple/30">
            <Target className="w-6 h-6 text-cyber-purple" />
          </div>
          <h1 className="text-3xl font-bold text-white">Simulation Generator</h1>
        </div>
        <p className="text-slate-400">Create realistic phishing simulations to test employee awareness</p>
      </motion.div>

      {/* Form */}
      <motion.div
        className="glass-card p-6 border border-cyber-purple/20 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-slate-400 text-sm mb-2">Company Name</label>
            <input
              type="text"
              value={form.company_name}
              onChange={(e) => setForm({ ...form, company_name: e.target.value })}
              placeholder="AcmeCorp"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyber-purple/50 focus:ring-1 focus:ring-cyber-purple/30 transition-all"
            />
          </div>
          <div>
            <label className="block text-slate-400 text-sm mb-2">Department</label>
            <select
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value, simulation_type: e.target.value })}
              className="w-full bg-cyber-dark border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyber-purple/50 transition-all"
            >
              <option value="IT Support">IT Support</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
            </select>
          </div>
          <div>
            <label className="block text-slate-400 text-sm mb-2">Simulation Type</label>
            <select
              value={form.simulation_type}
              onChange={(e) => setForm({ ...form, simulation_type: e.target.value })}
              className="w-full bg-cyber-dark border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyber-purple/50 transition-all"
            >
              <option value="IT Support">Account Verification</option>
              <option value="HR">Benefits Enrollment</option>
              <option value="Finance">Invoice Approval</option>
            </select>
          </div>
        </div>

        <motion.button
          onClick={generate}
          disabled={loading || !form.company_name.trim()}
          className="flex items-center gap-2 px-6 py-2.5 bg-cyber-purple/20 hover:bg-cyber-purple/30 border border-cyber-purple/40 text-cyber-purple font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Target className="w-4 h-4" />
          {loading ? 'Generating...' : 'Generate Simulation'}
        </motion.button>
      </motion.div>

      {/* Result */}
      <AnimatePresence>
        {result && (
          <motion.div
            className="glass-card border border-cyber-purple/20 overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', damping: 20 }}
          >
            {/* Email header bar */}
            <div className="bg-white/5 border-b border-white/10 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-slate-400 text-xs uppercase tracking-wider">Simulation ID:</span>
                <span className="px-2 py-1 bg-cyber-purple/20 border border-cyber-purple/40 text-cyber-purple text-xs font-mono rounded">
                  {result.simulation_id}
                </span>
              </div>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-cyber-red/60" />
                <div className="w-3 h-3 rounded-full bg-cyber-yellow/60" />
                <div className="w-3 h-3 rounded-full bg-cyber-green/60" />
              </div>
            </div>

            <div className="p-6">
              {/* Subject */}
              <div className="mb-4 pb-4 border-b border-white/10">
                <span className="text-slate-400 text-xs uppercase tracking-wider mr-2">Subject:</span>
                <span className="text-white font-semibold">{result.subject}</span>
              </div>

              {/* Body */}
              <pre className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-sans mb-6">
                {result.body}
              </pre>

              {/* Fake link */}
              <div className="p-3 bg-cyber-red/10 border border-cyber-red/30 rounded-xl mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 text-cyber-red" />
                    <span className="text-cyber-red text-xs font-mono truncate max-w-sm">{result.fake_link}</span>
                  </div>
                  <button
                    onClick={copyLink}
                    className="flex items-center gap-1 px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 text-xs rounded-lg transition-colors"
                  >
                    {copied ? <CheckCircle className="w-3 h-3 text-cyber-green" /> : <Copy className="w-3 h-3" />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* Deploy button */}
              <motion.button
                onClick={deploy}
                className={`flex items-center gap-2 px-6 py-2.5 border font-semibold rounded-xl transition-colors ${
                  deployed
                    ? 'bg-cyber-green/20 border-cyber-green/40 text-cyber-green'
                    : 'bg-cyber-cyan/20 hover:bg-cyber-cyan/30 border-cyber-cyan/40 text-cyber-cyan'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {deployed ? <CheckCircle className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                {deployed ? 'Deployed Successfully!' : 'Deploy to Team'}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
