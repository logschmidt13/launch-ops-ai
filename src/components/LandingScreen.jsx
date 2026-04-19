const MODES = [
  {
    id: 'copilot',
    num: '01',
    title: 'CONSOLE COPILOT',
    tag: 'MULTI-ROLE · LAUNCH OPS',
    desc: 'Select your console role and monitor your systems. ARIA listens to all radio channels and keeps you in the loop.',
  },
  {
    id: 'fsae',
    num: '02',
    title: 'FSAE RACE ENGINEER',
    tag: 'MOTORSPORT · FORMULA SAE',
    desc: 'Pre-race sequence and live in-race telemetry for Formula SAE teams. From driver brief to checkered flag.',
  },
  {
    id: 'autonomous',
    num: '03',
    title: 'AUTONOMOUS OPS',
    tag: 'SOLO · ATC STYLE',
    desc: 'ARIA runs the show. One operator, one click to approve each step. ATC-style mission control for solo launches.',
  },
]

export default function LandingScreen({ onSelect }) {
  return (
    <div className="landing">
      <div className="landing-logo">
        <div className="landing-wordmark">LAUNCH OPS AI</div>
        <div className="landing-tagline">SELECT OPERATING MODE TO CONTINUE</div>
      </div>
      <div className="mode-cards">
        {MODES.map(m => (
          <div key={m.id} className="mode-card">
            <span className="mode-card-num">MODE {m.num}</span>
            <div className="mode-card-title">{m.title}</div>
            <div className="mode-card-tag">{m.tag}</div>
            <div className="mode-card-desc">{m.desc}</div>
            <button className="mode-card-btn" onClick={() => onSelect(m.id)}>ENTER →</button>
          </div>
        ))}
      </div>
      <div className="landing-footer">APEX-7 · STUDENT LAUNCH INITIATIVE · ALL SYSTEMS NOMINAL</div>
    </div>
  )
}
