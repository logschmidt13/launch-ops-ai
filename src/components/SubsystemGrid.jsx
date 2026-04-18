import SubsystemCard from './SubsystemCard'

const SUBSYSTEM_ORDER = ['PROPULSION', 'AVIONICS', 'GROUND_SUPPORT', 'RANGE_SAFETY', 'POWER', 'COMMS']

export default function SubsystemGrid({ telemetry }) {
  return (
    <aside className="subsystem-grid">
      <div className="panel-header">
        <span className="panel-title">SUBSYSTEM STATUS</span>
        <span className="panel-subtitle">6 SYSTEMS MONITORED</span>
      </div>
      <div className="card-list">
        {SUBSYSTEM_ORDER.map(id => (
          <SubsystemCard key={id} id={id} data={telemetry[id]} />
        ))}
      </div>
    </aside>
  )
}
