import { ROLES } from '../data/modes'

export default function RolePicker({ onSelect, onBack }) {
  return (
    <div className="role-picker">
      <div className="role-picker-header">
        <div className="role-picker-title">SELECT YOUR CONSOLE ROLE</div>
        <div className="role-picker-sub">YOUR SYSTEMS AND CHECKLIST ITEMS WILL BE HIGHLIGHTED</div>
      </div>
      <div className="role-grid">
        {Object.entries(ROLES).map(([id, r]) => (
          <div
            key={id}
            className="role-card"
            onMouseEnter={e => e.currentTarget.style.borderColor = r.color}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}
            onClick={() => onSelect(id)}
          >
            <span className="role-callsign" style={{ color: r.color }}>{r.callsign}</span>
            <span className="role-label">{r.label}</span>
            <span className="role-systems">
              {r.subsystems.length
                ? r.subsystems.map(s => s.replace(/_/g, ' ')).join(', ')
                : 'All systems'}
            </span>
          </div>
        ))}
      </div>
      <button className="role-picker-back" onClick={onBack}>← BACK TO MODE SELECT</button>
    </div>
  )
}
