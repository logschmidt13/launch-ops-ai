import SubsystemCard from './SubsystemCard'
import { ROLES } from '../data/modes'

const DEFAULT_ORDER = ['PROPULSION', 'AVIONICS', 'GROUND_SUPPORT', 'RANGE_SAFETY', 'POWER', 'COMMS']

export default function SubsystemGrid({ telemetry, role, config, order, title = 'SUBSYSTEM STATUS' }) {
  const subsystemOrder = order ?? DEFAULT_ORDER
  const ownedSubs = role && ROLES[role] ? new Set(ROLES[role].subsystems) : null

  return (
    <aside className="subsystem-grid">
      <div className="panel-header">
        <span className="panel-title">{title}</span>
        <span className="panel-subtitle">{subsystemOrder.length} SYSTEMS MONITORED</span>
      </div>
      <div className="card-list">
        {subsystemOrder.map(id => (
          <SubsystemCard
            key={id}
            id={id}
            data={telemetry[id]}
            config={config?.[id]}
            dimmed={ownedSubs !== null && !ownedSubs.has(id)}
          />
        ))}
      </div>
    </aside>
  )
}
