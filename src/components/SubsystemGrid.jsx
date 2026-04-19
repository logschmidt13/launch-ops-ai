import SubsystemCard from './SubsystemCard'
import { ROLES } from '../data/modes'

const SUBSYSTEM_ORDER = ['PROPULSION', 'AVIONICS', 'GROUND_SUPPORT', 'RANGE_SAFETY', 'POWER', 'COMMS']

export default function SubsystemGrid({ telemetry, role }) {
  const ownedSubs = role && ROLES[role] ? new Set(ROLES[role].subsystems) : null

  return (
    <aside className="subsystem-grid">
      <div className="panel-header">
        <span className="panel-title">SUBSYSTEM STATUS</span>
        <span className="panel-subtitle">6 SYSTEMS MONITORED</span>
      </div>
      <div className="card-list">
        {SUBSYSTEM_ORDER.map(id => (
          <SubsystemCard
            key={id}
            id={id}
            data={telemetry[id]}
            dimmed={ownedSubs !== null && !ownedSubs.has(id)}
          />
        ))}
      </div>
    </aside>
  )
}
