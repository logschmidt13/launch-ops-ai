import { useState, useEffect } from 'react'
import TopBar from './TopBar'
import SubsystemGrid from './SubsystemGrid'
import Checklist from './Checklist'
import AICompanion from './AICompanion'
import { useCountdown } from '../hooks/useCountdown'
import { useFsaeTelemetry } from '../hooks/useFsaeTelemetry'
import {
  FSAE_SUBSYSTEM_CONFIG,
  FSAE_SUBSYSTEM_ORDER,
  FSAE_CHECKLIST_ITEMS,
  FSAE_CHECKLIST_PHASES,
  FSAE_ARIA_TIMELINE,
  FSAE_RADIO,
} from '../data/fsae'

const WELCOME_MSG = {
  id: 'fsae-welcome',
  text: 'Race Engineer AI online. Pre-race sequence initiated. T-5:00 to grid release. Monitoring all vehicle systems.',
  type: 'system',
  timestamp: Date.now(),
}

export default function FSAEDashboard({ onHome, theme, onToggleTheme }) {
  const { remaining, isHolding, isComplete, hold, resume } = useCountdown(300)
  const { telemetry, setRemaining } = useFsaeTelemetry(isHolding)

  const [ariaMessages, setAriaMessages] = useState([WELCOME_MSG])
  const [triggered, setTriggered] = useState(new Set())

  useEffect(() => { setRemaining(remaining) }, [remaining])

  // ARIA timeline
  useEffect(() => {
    if (isHolding) return
    FSAE_ARIA_TIMELINE.forEach(msg => {
      if (remaining <= msg.triggerAt && !triggered.has(msg.id)) {
        setTriggered(prev => new Set([...prev, msg.id]))
        setAriaMessages(prev => [...prev, { ...msg, timestamp: Date.now() }])
      }
    })
  }, [remaining, isHolding])

  // Radio chatter
  useEffect(() => {
    if (isHolding) return
    FSAE_RADIO.forEach(msg => {
      if (remaining <= msg.triggerAt && !triggered.has(msg.id)) {
        setTriggered(prev => new Set([...prev, msg.id]))
        setAriaMessages(prev => [...prev, {
          id: msg.id,
          text: msg.text,
          type: 'radio',
          from: msg.from,
          roleColor: msg.color,
          timestamp: Date.now(),
        }])
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
        theme={theme}
        onToggleTheme={onToggleTheme}
        onHome={onHome}
        title="RACE ENGINEER AI"
        subtitle="APEX FSAE · ENDURANCE EVENT"
      />
      <main className="main-content">
        <SubsystemGrid
          telemetry={telemetry}
          config={FSAE_SUBSYSTEM_CONFIG}
          order={FSAE_SUBSYSTEM_ORDER}
          title="VEHICLE SYSTEMS"
        />
        <Checklist
          remaining={remaining}
          isHolding={isHolding}
          items={FSAE_CHECKLIST_ITEMS}
          phases={FSAE_CHECKLIST_PHASES}
          title="PRE-RACE SEQUENCE"
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
