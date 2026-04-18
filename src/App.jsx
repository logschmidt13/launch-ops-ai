import { useState, useEffect } from 'react'
import TopBar from './components/TopBar'
import SubsystemGrid from './components/SubsystemGrid'
import Checklist from './components/Checklist'
import AICompanion from './components/AICompanion'
import { useCountdown } from './hooks/useCountdown'
import { useTelemetry } from './hooks/useTelemetry'
import { ARIA_TIMELINE } from './data/ariaMessages'

const WELCOME_MSG = {
  id: 'aria-welcome',
  text: 'ARIA online. Mission APEX-7 countdown sequence active. T-10:00 and counting. Monitoring all subsystems. Standing by.',
  type: 'system',
  timestamp: Date.now(),
}

export default function App() {
  const { remaining, isHolding, isComplete, hold, resume } = useCountdown(600)
  const { telemetry, setRemaining } = useTelemetry(isHolding)

  const [ariaMessages, setAriaMessages] = useState([WELCOME_MSG])
  const [triggered, setTriggered] = useState(new Set())

  // Push current remaining into telemetry hook each second
  useEffect(() => {
    setRemaining(remaining)
  }, [remaining])

  // Trigger ARIA timeline messages
  useEffect(() => {
    if (isHolding) return
    ARIA_TIMELINE.forEach(msg => {
      if (remaining <= msg.triggerAt && !triggered.has(msg.id)) {
        setTriggered(prev => new Set([...prev, msg.id]))
        setAriaMessages(prev => [...prev, { ...msg, timestamp: Date.now() }])
      }
    })
  }, [remaining, isHolding])

  return (
    <div className="app">
      <TopBar
        remaining={remaining}
        isHolding={isHolding}
        isComplete={isComplete}
        onHold={hold}
        onResume={resume}
      />
      <main className="main-content">
        <SubsystemGrid telemetry={telemetry} />
        <Checklist remaining={remaining} isHolding={isHolding} />
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
