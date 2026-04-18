import { useState, useEffect, useRef } from 'react'
import { SUBSYSTEM_EXPLANATIONS } from '../data/ariaMessages'
import { SUBSYSTEM_CONFIG } from '../data/telemetry'

const TYPE_CLASSES = {
  system:  'msg-system',
  info:    'msg-info',
  warning: 'msg-warning',
  success: 'msg-success',
  launch:  'msg-launch',
  user:    'msg-user',
  response:'msg-response',
}

function formatTime(ts) {
  return new Date(ts).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

function generateStatusReport(telemetry) {
  const lines = Object.entries(SUBSYSTEM_CONFIG).map(([key, cfg]) => {
    const sub = telemetry[key]
    if (!sub) return ''
    const s = sub.status.toUpperCase()
    const primary = cfg.metrics[0]
    const val = sub.metrics[primary.key]
    return `  ${cfg.label.padEnd(16)} ${s.padEnd(8)} ${primary.label}: ${val}${primary.unit}`
  })
  return `SYSTEM STATUS REPORT\n${lines.join('\n')}\n\nAll links nominal. Telemetry streaming at 2s cadence.`
}

function generateSubsystemDetail(subsystem, telemetry) {
  const key = Object.keys(SUBSYSTEM_CONFIG).find(k =>
    k.toLowerCase().includes(subsystem) || SUBSYSTEM_CONFIG[k].label.toLowerCase().includes(subsystem)
  )
  if (!key) return `Unknown subsystem "${subsystem}". Try: propulsion, avionics, ground support, range safety, power, comms.`
  const explanation = SUBSYSTEM_EXPLANATIONS[key]
  const sub = telemetry?.[key]
  if (!sub) return explanation
  const metrics = SUBSYSTEM_CONFIG[key].metrics.map(m =>
    `  ${m.label}: ${sub.metrics[m.key]}${m.unit}`
  ).join('\n')
  return `${explanation}\n\nCURRENT READINGS:\n${metrics}`
}

export default function AICompanion({ messages, telemetry, isHolding, remaining }) {
  const [input, setInput] = useState('')
  const [localMessages, setLocalMessages] = useState([])
  const bottomRef = useRef(null)

  const allMessages = [...messages, ...localMessages].sort((a, b) => a.timestamp - b.timestamp)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [allMessages.length])

  const handleSend = () => {
    const raw = input.trim()
    if (!raw) return
    setInput('')

    const userMsg = { id: `u-${Date.now()}`, text: raw, type: 'user', timestamp: Date.now() }
    const query = raw.toLowerCase()

    let responseText
    if (query === 'status') {
      responseText = generateStatusReport(telemetry)
    } else if (query === 'hold') {
      responseText = isHolding
        ? 'COUNT HOLD is currently active. All systems in standby configuration. Propellants stable. Awaiting RESUME command from Flight Director. No system degradation detected during hold.'
        : 'No active hold conditions. Count proceeding nominally. All constraints satisfied.'
    } else if (query.startsWith('explain ')) {
      const sub = query.replace('explain ', '').trim()
      responseText = generateSubsystemDetail(sub, telemetry)
    } else if (query === 'abort') {
      responseText = 'ABORT command noted. In a live operation, this would initiate safe shutdown sequence. For this simulation, use the HOLD button on the main console.'
    } else {
      responseText = "Monitoring all systems. No action required. Type 'status' for a full report, 'hold' for hold status, or 'explain [subsystem]' for subsystem detail."
    }

    const ariaMsg = { id: `a-${Date.now()}`, text: responseText, type: 'response', timestamp: Date.now() + 1 }
    setLocalMessages(prev => [...prev, userMsg, ariaMsg])
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <aside className="ai-panel">
      <div className="panel-header">
        <div className="aria-header-left">
          <span className="aria-indicator" />
          <span className="panel-title">ARIA</span>
          <span className="aria-subtitle">Autonomous Range Intelligence Assistant</span>
        </div>
        <span className="aria-status-badge">ONLINE</span>
      </div>

      <div className="ai-messages">
        {allMessages.map(msg => (
          <div key={msg.id} className={`message ${TYPE_CLASSES[msg.type] ?? 'msg-info'}`}>
            {msg.type !== 'user' && (
              <div className="msg-sender">
                <span className="aria-tag">ARIA</span>
                <span className="msg-time">{formatTime(msg.timestamp)}</span>
              </div>
            )}
            {msg.type === 'user' && (
              <div className="msg-sender msg-sender-user">
                <span className="user-tag">YOU</span>
                <span className="msg-time">{formatTime(msg.timestamp)}</span>
              </div>
            )}
            <div className="msg-text">{msg.text}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="ai-input-area">
        <div className="ai-input-hint">
          Try: <code>status</code> · <code>hold</code> · <code>explain avionics</code>
        </div>
        <div className="ai-input-row">
          <input
            className="ai-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask ARIA anything..."
            maxLength={200}
          />
          <button className="ai-send-btn" onClick={handleSend}>
            SEND
          </button>
        </div>
      </div>
    </aside>
  )
}
