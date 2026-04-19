import { useRef, useEffect } from 'react'
import { AUTONOMOUS_STEPS } from '../data/autonomous'

function formatTime(ts) {
  return new Date(ts).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

const SYSTEM_COLORS = {
  AVIONICS:      '#00C97A',
  PROPULSION:    '#FF6B6B',
  RANGE_SAFETY:  '#FFB300',
  POWER:         '#7EC8E3',
  COMMS:         '#B8A9FA',
  GROUND_SUPPORT:'#8A8FA8',
}

export default function ApprovalQueue({ remaining, approved, approvedLog, onApprove, onHold, isHolding, isComplete }) {
  const logBottomRef = useRef(null)

  // Steps that have been triggered (remaining has passed their triggerAt)
  const triggered = AUTONOMOUS_STEPS.filter(s => remaining <= s.triggerAt)

  // First triggered step that hasn't been approved yet
  const pending = triggered.find(s => !approved.has(s.id))

  const totalSteps = AUTONOMOUS_STEPS.length
  const approvedCount = approved.size

  useEffect(() => {
    logBottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [approvedLog.length])

  return (
    <section className="approval-panel">
      <div className="panel-header">
        <span className="panel-title">ARIA CONTROL</span>
        <span className="panel-subtitle">{approvedCount} / {totalSteps} AUTHORIZED</span>
      </div>

      <div className="approval-progress-bar">
        <div className="approval-progress-fill" style={{ width: `${(approvedCount / totalSteps) * 100}%` }} />
      </div>

      {isComplete ? (
        <div className="approval-complete">
          <div className="approval-complete-icon">✓</div>
          <div className="approval-complete-title">LAUNCH COMMIT</div>
          <div className="approval-complete-sub">ALL {totalSteps} ACTIONS AUTHORIZED · APEX-7 ASCENDING</div>
        </div>
      ) : pending ? (
        <div className="approval-card">
          <div className="approval-step-num">
            STEP {AUTONOMOUS_STEPS.findIndex(s => s.id === pending.id) + 1} OF {totalSteps}
          </div>
          <div
            className="approval-system-badge"
            style={{ color: SYSTEM_COLORS[pending.system] ?? 'var(--orange)', borderColor: SYSTEM_COLORS[pending.system] ?? 'var(--orange)' }}
          >
            {pending.system.replace('_', ' ')}
          </div>
          <div className="approval-action">{pending.action}</div>
          <div className="approval-prompt">{pending.prompt}</div>
          <div className="approval-btn-group">
            <button
              className="approve-btn"
              onClick={() => onApprove(pending)}
              disabled={isHolding}
            >
              ✓ AUTHORIZE
            </button>
            <button className="hold-approval-btn" onClick={onHold}>
              ⏸ HOLD
            </button>
          </div>
        </div>
      ) : (
        <div className="approval-idle">
          <div className="approval-idle-icon">◈</div>
          <div className="approval-idle-title">ARIA MONITORING</div>
          <div className="approval-idle-sub">AWAITING NEXT DECISION POINT</div>
          {isHolding && <div className="approval-hold-notice">COUNT HOLD ACTIVE</div>}
        </div>
      )}

      <div className="approval-log">
        {approvedLog.length > 0 && (
          <div className="approval-log-header">AUTHORIZATION LOG</div>
        )}
        {approvedLog.map(entry => (
          <div key={entry.id} className="approval-log-item">
            <div className="approval-log-check">
              <span className="approval-log-checkmark">✓</span>
            </div>
            <div className="approval-log-body">
              <div className="approval-log-action">{entry.action}</div>
              <div className="approval-log-confirm">{entry.confirm}</div>
            </div>
            <div className="approval-log-time">{formatTime(entry.ts)}</div>
          </div>
        ))}
        <div ref={logBottomRef} />
      </div>
    </section>
  )
}
