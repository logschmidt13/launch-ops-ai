import { useState, useEffect } from 'react'
import { ROLES } from '../data/modes'

function formatCountdown(seconds) {
  if (seconds <= 0) return 'T+00:00'
  const m = Math.floor(seconds / 60).toString().padStart(2, '0')
  const s = (seconds % 60).toString().padStart(2, '0')
  return `T-${m}:${s}`
}

export default function TopBar({ remaining, isHolding, isComplete, onHold, onResume, theme, onToggleTheme, role, onHome }) {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const status = isComplete ? 'LAUNCH' : isHolding ? 'HOLD' : 'NOMINAL'
  const statusClass = isComplete ? 'status-launch' : isHolding ? 'status-hold' : 'status-nominal'
  const cdClass = isComplete ? 'countdown-launch' : isHolding ? 'countdown-hold' : ''

  return (
    <header className="topbar">
      <div className="topbar-left">
        <span className="wordmark">LAUNCH OPS AI</span>
        <span className="mission-name">APEX-7 · STUDENT LAUNCH INITIATIVE</span>
      </div>

      <div className="topbar-center">
        <div className={`countdown-display ${cdClass}`}>
          {isComplete ? 'LAUNCH' : formatCountdown(remaining)}
        </div>
        <div className="countdown-controls">
          <button className="btn-hold" onClick={onHold} disabled={isHolding || isComplete}>HOLD</button>
          <button className="btn-resume" onClick={onResume} disabled={!isHolding || isComplete}>RESUME</button>
        </div>
        <div className="live-clock">
          <span className="clock-entry">
            <span className="clock-tz">{Intl.DateTimeFormat().resolvedOptions().timeZone}</span>
            {now.toLocaleTimeString('en-US', { hour12: false })}
          </span>
          <span className="clock-sep">·</span>
          <span className="clock-entry">
            <span className="clock-tz">UTC</span>
            {now.toLocaleTimeString('en-US', { hour12: false, timeZone: 'UTC' })}
          </span>
        </div>
      </div>

      <div className="topbar-right">
        {role && ROLES[role] && (
          <div className="role-badge" style={{ color: ROLES[role].color, borderColor: ROLES[role].color }}>
            {ROLES[role].callsign}
          </div>
        )}
        {onToggleTheme && (
          <button className="theme-toggle" onClick={onToggleTheme}>
            {theme === 'dark' ? '☀ LIGHT' : '☾ DARK'}
          </button>
        )}
        {onHome && (
          <button className="theme-toggle home-btn" onClick={onHome}>⌂ HOME</button>
        )}
        <div className={`status-badge ${statusClass}`}>
          <span className="status-dot" />
          {status}
        </div>
      </div>

      {isHolding && <div className="hold-banner">⏸ COUNT HOLD — AWAITING RESUME</div>}
    </header>
  )
}
