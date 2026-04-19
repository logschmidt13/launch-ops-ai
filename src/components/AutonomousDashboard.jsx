import { useState, useEffect, useCallback } from 'react'
import TopBar from './TopBar'
import SubsystemGrid from './SubsystemGrid'
import ApprovalQueue from './ApprovalQueue'
import AICompanion from './AICompanion'
import { useCountdown } from '../hooks/useCountdown'
import { useTelemetry } from '../hooks/useTelemetry'
import { AUTONOMOUS_STEPS, AUTONOMOUS_ARIA_TIMELINE } from '../data/autonomous'

const WELCOME_MSG = {
  id: 'auto-welcome',
  text: 'ARIA online. Autonomous operations mode active. I will manage the launch sequence and request your authorization at each critical decision point. Standing by.',
  type: 'system',
  timestamp: Date.now(),
}

export default function AutonomousDashboard({ onHome, theme, onToggleTheme }) {
  const { remaining, isHolding, isComplete, hold, resume } = useCountdown(600)
  const { telemetry, setRemaining } = useTelemetry(isHolding)

  const [ariaMessages, setAriaMessages] = useState([WELCOME_MSG])
  const [triggered, setTriggered] = useState(new Set())
  const [approved, setApproved] = useState(new Set())
  const [approvedLog, setApprovedLog] = useState([])

  useEffect(() => { setRemaining(remaining) }, [remaining])

  // ARIA timeline messages
  useEffect(() => {
    if (isHolding) return
    AUTONOMOUS_ARIA_TIMELINE.forEach(msg => {
      if (remaining <= msg.triggerAt && !triggered.has(msg.id)) {
        setTriggered(prev => new Set([...prev, msg.id]))
        setAriaMessages(prev => [...prev, { ...msg, timestamp: Date.now() }])
      }
    })
  }, [remaining, isHolding])

  const handleApprove = useCallback((step) => {
    setApproved(prev => new Set([...prev, step.id]))
    setApprovedLog(prev => [...prev, { ...step, ts: Date.now() }])
    setAriaMessages(prev => [...prev, {
      id: `confirm-${step.id}`,
      text: `[AUTHORIZED: ${step.action}] ${step.confirm}`,
      type: 'success',
      timestamp: Date.now(),
    }])
  }, [])

  return (
    <div className="app">
      <TopBar
        remaining={remaining}
        isHolding={isHolding}
        isComplete={isComplete}
        onHold={hold}
        onResume={resume}
        theme={theme}
        onToggleTheme={onToggleTheme}
        onHome={onHome}
        title="AUTONOMOUS OPS"
        subtitle="APEX-7 · ARIA SEQUENCER ACTIVE"
      />
      <main className="main-content">
        <SubsystemGrid telemetry={telemetry} />
        <ApprovalQueue
          remaining={remaining}
          approved={approved}
          approvedLog={approvedLog}
          onApprove={handleApprove}
          onHold={hold}
          isHolding={isHolding}
          isComplete={isComplete}
        />
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
