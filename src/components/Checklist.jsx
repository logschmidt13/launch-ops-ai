import { useState, useEffect, useRef } from 'react'
import { CHECKLIST_ITEMS, CHECKLIST_PHASES } from '../data/checklist'

function formatTrigger(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0')
  const s = (seconds % 60).toString().padStart(2, '0')
  return `T-${m}:${s}`
}

export default function Checklist({ remaining, isHolding }) {
  const [manualChecked, setManualChecked] = useState(new Set())
  const activeRef = useRef(null)

  const isChecked = (item) => {
    if (remaining <= item.triggerAt) {
      if (item.type === 'auto') return true
      if (item.type === 'manual') return manualChecked.has(item.id)
    }
    return false
  }

  const isActionRequired = (item) =>
    item.type === 'manual' && remaining <= item.triggerAt && !manualChecked.has(item.id)

  const isPending = (item) => remaining > item.triggerAt

  // active = first action-required, or last auto-completed
  const activeItem = (() => {
    const actionRequired = CHECKLIST_ITEMS.find(isActionRequired)
    if (actionRequired) return actionRequired.id
    const completed = [...CHECKLIST_ITEMS].reverse().find(item => !isPending(item) && isChecked(item))
    return completed ? completed.id : null
  })()

  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [activeItem])

  const toggle = (item) => {
    if (item.type !== 'manual') return
    if (isHolding) return
    setManualChecked(prev => {
      const next = new Set(prev)
      next.has(item.id) ? next.delete(item.id) : next.add(item.id)
      return next
    })
  }

  return (
    <section className="checklist-panel">
      <div className="panel-header">
        <span className="panel-title">COUNTDOWN CHECKLIST</span>
        <span className="panel-subtitle">
          {CHECKLIST_ITEMS.filter(isChecked).length} / {CHECKLIST_ITEMS.length} COMPLETE
        </span>
      </div>

      <div className="checklist-scroll">
        {CHECKLIST_PHASES.map(phase => {
          const items = CHECKLIST_ITEMS.filter(i => i.phase === phase)
          const allDone = items.every(isChecked)
          return (
            <div key={phase} className="checklist-phase">
              <div className={`phase-header ${allDone ? 'phase-done' : ''}`}>
                <span className="phase-label">{phase}</span>
                {allDone && <span className="phase-complete-badge">COMPLETE</span>}
              </div>

              {items.map(item => {
                const checked = isChecked(item)
                const pending = isPending(item)
                const actionReq = isActionRequired(item)
                const isActive = item.id === activeItem

                let statusText = 'PENDING'
                let statusClass = 'status-pending'
                if (checked) { statusText = 'COMPLETE'; statusClass = 'status-complete' }
                else if (actionReq) { statusText = 'ACTION REQUIRED'; statusClass = 'status-action' }

                return (
                  <div
                    key={item.id}
                    ref={isActive ? activeRef : null}
                    className={`checklist-item ${isActive ? 'item-active' : ''} ${checked ? 'item-checked' : ''} ${pending ? 'item-pending' : ''} ${actionReq ? 'item-action' : ''}`}
                    onClick={() => toggle(item)}
                    style={{ cursor: item.type === 'manual' && !checked ? 'pointer' : 'default' }}
                  >
                    <div className="item-check">
                      <div className={`checkbox ${checked ? 'checked' : ''} ${actionReq ? 'checkbox-action' : ''}`}>
                        {checked && <span className="checkmark">✓</span>}
                      </div>
                    </div>

                    <div className="item-body">
                      <span className="item-name">{item.name}</span>
                      <div className="item-meta">
                        <span className="item-role">{item.role}</span>
                        <span className="item-trigger">{formatTrigger(item.triggerAt)}</span>
                        {item.type === 'manual' && <span className="item-type-badge">MANUAL</span>}
                      </div>
                    </div>

                    <div className={`item-status ${statusClass}`}>
                      {statusText}
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </section>
  )
}
