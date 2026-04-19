import { useState, useEffect, useCallback } from 'react'
import TopBar from './components/TopBar'
import SubsystemGrid from './components/SubsystemGrid'
import Checklist from './components/Checklist'
import AICompanion from './components/AICompanion'
import LandingScreen from './components/LandingScreen'
import RolePicker from './components/RolePicker'
import FSAEDashboard from './components/FSAEDashboard'
import { useCountdown } from './hooks/useCountdown'
import { useTelemetry } from './hooks/useTelemetry'
import { ARIA_TIMELINE } from './data/ariaMessages'
import { ROLES, RADIO_CHATTER } from './data/modes'

const WELCOME_MSG = {
  id: 'aria-welcome',
  text: 'ARIA online. Mission APEX-7 countdown sequence active. T-10:00 and counting. Monitoring all subsystems. Standing by.',
  type: 'system',
  timestamp: Date.now(),
}

export default function App() {
  const [mode, setMode] = useState(null)
  const [role, setRole] = useState(null)
  const [theme, setTheme] = useState('dark')

  const { remaining, isHolding, isComplete, hold, resume } = useCountdown(600)
  const { telemetry, setRemaining } = useTelemetry(isHolding)

  const [ariaMessages, setAriaMessages] = useState([WELCOME_MSG])
  const [triggered, setTriggered] = useState(new Set())

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = useCallback(() => setTheme(t => t === 'dark' ? 'light' : 'dark'), [])

  useEffect(() => { setRemaining(remaining) }, [remaining])

  // ARIA timeline messages
  useEffect(() => {
    if (isHolding) return
    ARIA_TIMELINE.forEach(msg => {
      if (remaining <= msg.triggerAt && !triggered.has(msg.id)) {
        setTriggered(prev => new Set([...prev, msg.id]))
        setAriaMessages(prev => [...prev, { ...msg, timestamp: Date.now() }])
      }
    })
  }, [remaining, isHolding])

  // Radio chatter (Console Copilot only)
  useEffect(() => {
    if (mode !== 'copilot' || !role || isHolding) return
    RADIO_CHATTER.forEach(msg => {
      if (remaining <= msg.triggerAt && !triggered.has(msg.id)) {
        setTriggered(prev => new Set([...prev, msg.id]))
        setAriaMessages(prev => [...prev, {
          id: msg.id,
          text: msg.text,
          type: 'radio',
          from: msg.from,
          roleColor: ROLES[msg.from]?.color ?? '#8A8FA8',
          timestamp: Date.now(),
        }])
      }
    })
  }, [remaining, isHolding, mode, role])

  const goHome = useCallback(() => { setMode(null); setRole(null) }, [])

  if (!mode) return <LandingScreen onSelect={setMode} />
  if (mode === 'copilot' && !role) return <RolePicker onSelect={setRole} onBack={() => setMode(null)} />
  if (mode === 'fsae') return <FSAEDashboard onHome={goHome} theme={theme} onToggleTheme={toggleTheme} />

  return (
    <div className="app">
      <TopBar
        remaining={remaining}
        isHolding={isHolding}
        isComplete={isComplete}
        onHold={hold}
        onResume={resume}
        theme={theme}
        onToggleTheme={toggleTheme}
        role={role}
        onHome={goHome}
      />
      <main className="main-content">
        <SubsystemGrid telemetry={telemetry} role={role} />
        <Checklist remaining={remaining} isHolding={isHolding} role={role} />
        <AICompanion
          messages={ariaMessages}
          telemetry={telemetry}
          isHolding={isHolding}
          remaining={remaining}
        />
      </main>
    </div>
  )
}
