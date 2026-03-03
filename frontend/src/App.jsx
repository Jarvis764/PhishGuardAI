import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import ParticleBackground from './components/ParticleBackground'
import Dashboard from './pages/Dashboard'
import EmailAnalyzer from './pages/EmailAnalyzer'
import SimulationGenerator from './pages/SimulationGenerator'
import TrainingCenter from './pages/TrainingCenter'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
}

function PageWrapper({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen grid-overlay">
      <ParticleBackground />
      <Navbar />
      <main className="pt-16 relative z-10">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><Dashboard /></PageWrapper>} />
            <Route path="/analyzer" element={<PageWrapper><EmailAnalyzer /></PageWrapper>} />
            <Route path="/simulation" element={<PageWrapper><SimulationGenerator /></PageWrapper>} />
            <Route path="/training" element={<PageWrapper><TrainingCenter /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  )
}
