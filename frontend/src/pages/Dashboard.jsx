import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts'
import { Users, Activity, ShieldAlert, MousePointerClick } from 'lucide-react'
import axios from 'axios'
import StatCard from '../components/StatCard'

const MOCK_STATS = {
  total_employees: 247,
  active_simulations: 12,
  company_risk_index: 43,
  click_rate: 18.5,
  high_risk_employees: [
    { id: 1, name: 'Alice Johnson', email: 'alice@company.com', department: 'Finance', risk_score: 87, risk_level: 'High' },
    { id: 2, name: 'Bob Martinez', email: 'bob@company.com', department: 'HR', risk_score: 74, risk_level: 'High' },
    { id: 3, name: 'Carol White', email: 'carol@company.com', department: 'IT', risk_score: 68, risk_level: 'High' },
    { id: 4, name: 'David Lee', email: 'david@company.com', department: 'Sales', risk_score: 61, risk_level: 'High' },
    { id: 5, name: 'Eva Brown', email: 'eva@company.com', department: 'Marketing', risk_score: 58, risk_level: 'Medium' },
  ],
}

const MOCK_DISTRIBUTION = [
  { name: 'Low Risk', value: 142, color: '#10b981' },
  { name: 'Medium Risk', value: 73, color: '#f59e0b' },
  { name: 'High Risk', value: 32, color: '#ef4444' },
]

const MOCK_TREND = [
  { day: 'Mon', risk: 48, simulations: 3 },
  { day: 'Tue', risk: 52, simulations: 5 },
  { day: 'Wed', risk: 45, simulations: 2 },
  { day: 'Thu', risk: 61, simulations: 7 },
  { day: 'Fri', risk: 43, simulations: 4 },
  { day: 'Sat', risk: 38, simulations: 1 },
  { day: 'Sun', risk: 43, simulations: 2 },
]

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

function RiskBadge({ level, score }) {
  const colors = {
    High: 'bg-cyber-red/20 text-cyber-red border-cyber-red/40',
    Medium: 'bg-cyber-yellow/20 text-cyber-yellow border-cyber-yellow/40',
    Low: 'bg-cyber-green/20 text-cyber-green border-cyber-green/40',
  }
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${colors[level] || colors.Low}`}>
      {score} - {level}
    </span>
  )
}

export default function Dashboard() {
  const [stats, setStats] = useState(MOCK_STATS)
  const [distribution, setDistribution] = useState(MOCK_DISTRIBUTION)
  const [trend, setTrend] = useState(MOCK_TREND)

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [s, d, t] = await Promise.all([
          axios.get('/api/dashboard'),
          axios.get('/api/risk-distribution'),
          axios.get('/api/risk-trend'),
        ])
        setStats(s.data)
        setDistribution(d.data.data)
        setTrend(t.data.data)
      } catch {
        // Use mock data as fallback
      }
    }
    fetchAll()
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-white glow-text">Cyber Intelligence Dashboard</h1>
        <p className="text-slate-400 mt-1">Real-time phishing threat monitoring and analytics</p>
      </motion.div>

      {/* Stat Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={itemVariants}>
          <StatCard icon={Users} value={stats.total_employees} label="Total Employees" gradient="blue" trend={2.1} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard icon={Activity} value={stats.active_simulations} label="Active Simulations" gradient="cyan" trend={-1.5} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard icon={ShieldAlert} value={stats.company_risk_index} label="Company Risk Index" gradient="yellow" suffix="%" trend={5.2} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard icon={MousePointerClick} value={stats.click_rate} label="Phishing Click Rate" gradient="red" suffix="%" trend={3.1} />
        </motion.div>
      </motion.div>

      {/* Charts Row */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Line Chart */}
        <motion.div variants={itemVariants} className="lg:col-span-2 glass-card p-6 border border-cyber-blue/20">
          <h2 className="text-white font-semibold mb-4">7-Day Risk Trend</h2>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="day" stroke="#64748b" tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis stroke="#64748b" tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip
                contentStyle={{ background: '#0f172a', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '8px', color: '#e2e8f0' }}
              />
              <Line
                type="monotone"
                dataKey="risk"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: '#3b82f6', r: 4 }}
                activeDot={{ r: 6, fill: '#06b6d4' }}
              />
              <Line
                type="monotone"
                dataKey="simulations"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={{ fill: '#8b5cf6', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie Chart */}
        <motion.div variants={itemVariants} className="glass-card p-6 border border-cyber-purple/20">
          <h2 className="text-white font-semibold mb-4">Risk Distribution</h2>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={distribution}
                cx="50%"
                cy="45%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {distribution.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: '#0f172a', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '8px', color: '#e2e8f0' }}
              />
              <Legend
                formatter={(value) => <span style={{ color: '#94a3b8', fontSize: 12 }}>{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.div>

      {/* High Risk Employees Table */}
      <motion.div
        className="glass-card p-6 border border-cyber-red/20"
        variants={itemVariants}
        initial="hidden"
        animate="show"
      >
        <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-cyber-red" />
          High Risk Employees
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-slate-400 py-2 pr-4">Name</th>
                <th className="text-left text-slate-400 py-2 pr-4">Email</th>
                <th className="text-left text-slate-400 py-2 pr-4">Department</th>
                <th className="text-left text-slate-400 py-2">Risk Score</th>
              </tr>
            </thead>
            <tbody>
              {stats.high_risk_employees.map((emp, i) => (
                <motion.tr
                  key={emp.id}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <td className="py-3 pr-4 text-white font-medium">{emp.name}</td>
                  <td className="py-3 pr-4 text-slate-400">{emp.email}</td>
                  <td className="py-3 pr-4 text-slate-300">{emp.department}</td>
                  <td className="py-3">
                    <RiskBadge level={emp.risk_level} score={emp.risk_score} />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
