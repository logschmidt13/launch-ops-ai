import { useState } from 'react'
import { SUBSYSTEM_CONFIG } from '../data/telemetry'

function Sparkline({ data, color, width = 88, height = 28 }) {
  if (!data || data.length < 2) return null
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 0.001

  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - ((v - min) / range) * (height - 4) - 2
    return `${x.toFixed(1)},${y.toFixed(1)}`
  }).join(' ')

  return (
    <svg width={width} height={height} className="sparkline">
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity="0.9"
      />
    </svg>
  )
}

const STATUS_COLOR = {
  nominal: 'var(--green)',
  warning: 'var(--yellow)',
  critical: 'var(--red)',
}

export default function SubsystemCard({ id, data, dimmed }) {
  const [expanded, setExpanded] = useState(false)
  const config = SUBSYSTEM_CONFIG[id]
  if (!config || !data) return null

  const { status, metrics, history } = data
  const dotColor = STATUS_COLOR[status] ?? 'var(--green)'
  const sparkColor = STATUS_COLOR[status] ?? 'var(--green)'
  const sparkData = history[config.primaryMetric]

  const displayMetrics = expanded ? config.metrics : config.metrics.slice(0, 2)

  return (
    <div
      className={`subsystem-card ${status !== 'nominal' ? `card-${status}` : ''} ${expanded ? 'card-expanded' : ''} ${dimmed ? 'card-dimmed' : ''}`}
      onClick={() => setExpanded(e => !e)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && setExpanded(v => !v)}
    >
      <div className="card-header">
        <div className="card-title-row">
          <span className="status-dot-sm" style={{ background: dotColor, boxShadow: `0 0 6px ${dotColor}` }} />
          <span className="card-label">{config.label}</span>
        </div>
        <span className="card-status-text" style={{ color: dotColor }}>
          {status.toUpperCase()}
        </span>
      </div>

      <div className="card-metrics">
        {displayMetrics.map(m => (
          <div key={m.key} className="metric-row">
            <span className="metric-label">{m.label}</span>
            <span className="metric-value" style={{ color: m.key === config.primaryMetric && status !== 'nominal' ? dotColor : 'var(--white)' }}>
              {metrics[m.key]}{m.unit}
            </span>
          </div>
        ))}
      </div>

      <div className="card-footer">
        <Sparkline data={sparkData} color={sparkColor} />
        <span className="expand-hint">{expanded ? '▲ LESS' : '▼ MORE'}</span>
      </div>
    </div>
  )
}
