import { useState, useEffect } from 'react'

function formatCountdown(seconds) {
  if (seconds <= 0) return 'T+00:00'
  const m = Math.floor(seconds / 60).toString().padStart(2, '0')
  const s = (seconds % 60).toString().padStart(2, '0')
  return `T-${m}:${s}`
}

function formatClock(date) {
  return date.toLocaleTimeString('en-US', { hour12: false, timeZoneName: 'short' })
}

export default function TopBar({ remaining, isHolding, isComplete, onHold, onResume }) {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const status = isComplete ? 'LAUNCH' : isHolding ? 'HOLD' : 'NOMINAL'
  const statusClass = isComplete ? 'status-launch' : isHolding ? 'status-hold' : 'status-nominal'

  return (
    <header className="topbar">
      <div className="topbar-left">
        <span className="wordmark">LAUNCH OPS AI</span>
        <span className="mission-name">APEX-7 · STUDENT LAUNCH INITIATIVE</span>
      </div>

      <div className="topbar-center">
        <div className="live-clock">{formatClock(now)}</div>
        <div className={`countdown-display ${isHolding ? 'countdown-hold' : ''} ${isComplete ? 'countdown-launch' : ''}`}>
          {isComplete ? 'LAUNCH' : formatCountdown(remaining)}
        </div>
        <div className="countdown-controls">
          <button
            className="btn-hold"
            onClick={onHold}
            disabled={isHolding || isComplete}
          >
            HOLD
          </button>
          <button
            className="btn-resume"
            onClick={onResume}
            disabled={!isHolding || isComplete}
          >
            RESUME
          </button>
        </div>
      </div>

      <div className="topbar-right">
        <div className={`status-badge ${statusClass}`}>
          <span className="status-dot" />
          {status}
        </div>
      </div>

      {isHolding && (
        <div className="hold-banner">
          ⏸ COUNT HOLD — AWAITING RESUME
        </div>
      )}
    </header>
  )
}
