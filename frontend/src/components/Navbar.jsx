import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Shield, LayoutDashboard, Mail, Target, GraduationCap } from 'lucide-react'

const navLinks = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/analyzer', label: 'Email Analyzer', icon: Mail },
  { to: '/simulation', label: 'Simulation', icon: Target },
  { to: '/training', label: 'Training', icon: GraduationCap },
]

export default function Navbar() {
  const location = useLocation()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cyber-darker/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Shield className="w-8 h-8 text-cyber-cyan" style={{ filter: 'drop-shadow(0 0 8px #06b6d4)' }} />
            </motion.div>
            <span className="text-xl font-bold text-white glow-text">
              PhishGuard <span className="text-cyber-cyan">AI</span>
            </span>
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-1">
            {navLinks.map(({ to, label, icon: Icon }) => {
              const isActive = location.pathname === to
              return (
                <Link key={to} to={to} className="relative px-4 py-2 group">
                  <div className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                    isActive ? 'text-cyber-blue' : 'text-slate-400 hover:text-white'
                  }`}>
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="activeLink"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyber-blue"
                      style={{ boxShadow: '0 0 8px #3b82f6' }}
                    />
                  )}
                </Link>
              )
            })}
          </div>

          {/* LIVE badge */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-cyber-green/30 bg-cyber-green/10">
            <motion.div
              className="w-2 h-2 rounded-full bg-cyber-green"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-cyber-green text-xs font-semibold tracking-widest">LIVE</span>
          </div>
        </div>
      </div>
    </nav>
  )
}
