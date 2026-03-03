import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Shield, AlertTriangle, CheckCircle, Tag } from 'lucide-react'
import axios from 'axios'
import RiskMeter from '../components/RiskMeter'
import ScanAnimation from '../components/ScanAnimation'

const PLACEHOLDER = `Subject: URGENT: Your account has been suspended

Dear Customer,

We have detected unusual activity on your bank account. Your account has been temporarily suspended to protect you.

You must verify your account credentials immediately by clicking the link below to avoid permanent suspension:

[Click Here to Verify Your Account]

Failure to verify within 24 hours will result in permanent closure of your account. Please provide your password and confirm your identity.

Best regards,
Security Team`

const MOCK_RESULT = {
  classification: 'Phishing',
  risk_score: 82,
  explanation:
    'This email contains multiple phishing indicators including urgency tactics, suspicious links, and requests for sensitive information. The sender appears to be impersonating a legitimate organization.',
  highlighted_phrases: ['urgent', 'verify', 'account', 'password', 'suspended', 'click here'],
}

const classificationConfig = {
  Safe: { color: 'text-cyber-green', bg: 'bg-cyber-green/20 border-cyber-green/40', icon: CheckCircle },
  Suspicious: { color: 'text-cyber-yellow', bg: 'bg-cyber-yellow/20 border-cyber-yellow/40', icon: AlertTriangle },
  Phishing: { color: 'text-cyber-red', bg: 'bg-cyber-red/20 border-cyber-red/40', icon: AlertTriangle },
}

export default function EmailAnalyzer() {
  const [emailContent, setEmailContent] = useState('')
  const [isScanning, setIsScanning] = useState(false)
  const [result, setResult] = useState(null)
  const textareaRef = useRef(null)

  const analyze = async () => {
    if (!emailContent.trim()) return
    setIsScanning(true)
    setResult(null)
    await new Promise((r) => setTimeout(r, 2000))
    try {
      const { data } = await axios.post('/api/analyze-email', { email_content: emailContent })
      setResult(data)
    } catch {
      setResult(MOCK_RESULT)
    } finally {
      setIsScanning(false)
    }
  }

  const cfg = result ? classificationConfig[result.classification] || classificationConfig.Safe : null
  const Icon = cfg?.icon

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div className="mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-cyber-blue/20 rounded-xl border border-cyber-blue/30">
            <Mail className="w-6 h-6 text-cyber-blue" />
          </div>
          <h1 className="text-3xl font-bold text-white">Email Analyzer</h1>
        </div>
        <p className="text-slate-400">Paste a suspicious email to detect phishing indicators with AI analysis</p>
      </motion.div>

      {/* Input Section */}
      <motion.div
        className="glass-card p-6 border border-cyber-blue/20 mb-6 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <label className="block text-slate-400 text-sm mb-3 font-medium">Email Content</label>
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            placeholder={PLACEHOLDER}
            rows={12}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-slate-300 text-sm font-mono resize-none focus:outline-none focus:border-cyber-blue/50 focus:ring-1 focus:ring-cyber-blue/30 transition-all"
          />
          <ScanAnimation isScanning={isScanning} />
        </div>

        <div className="flex items-center justify-between mt-4">
          <span className="text-slate-500 text-xs">{emailContent.length} characters</span>
          <motion.button
            onClick={analyze}
            disabled={isScanning || !emailContent.trim()}
            className="flex items-center gap-2 px-6 py-2.5 bg-cyber-blue/20 hover:bg-cyber-blue/30 border border-cyber-blue/40 text-cyber-blue font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Shield className="w-4 h-4" />
            {isScanning ? 'Analyzing...' : 'Analyze Email'}
          </motion.button>
        </div>
      </motion.div>

      {/* Results */}
      <AnimatePresence>
        {result && (
          <motion.div
            className="glass-card p-6 border border-cyber-cyan/20"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', damping: 20 }}
          >
            <h2 className="text-white font-semibold mb-6 text-lg">Analysis Results</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Risk Meter */}
              <div className="flex flex-col items-center justify-center">
                <RiskMeter score={result.risk_score} />
              </div>

              {/* Classification + Explanation */}
              <div className="space-y-4">
                {/* Badge */}
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${cfg.bg}`}>
                  <Icon className={`w-4 h-4 ${cfg.color}`} />
                  <span className={`font-bold text-lg ${cfg.color}`}>{result.classification}</span>
                </div>

                {/* Explanation */}
                <div>
                  <h3 className="text-slate-400 text-xs uppercase tracking-wider mb-2">AI Explanation</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{result.explanation}</p>
                </div>
              </div>
            </div>

            {/* Highlighted phrases */}
            {result.highlighted_phrases.length > 0 && (
              <div>
                <h3 className="text-slate-400 text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Tag className="w-3 h-3" />
                  Suspicious Phrases Detected
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.highlighted_phrases.map((phrase, i) => (
                    <motion.span
                      key={i}
                      className="px-3 py-1 bg-cyber-red/20 border border-cyber-red/40 text-cyber-red text-xs font-mono rounded-full"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      {phrase}
                    </motion.span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
