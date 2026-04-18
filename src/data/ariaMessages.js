export const ARIA_TIMELINE = [
  {
    id: 'msg-930',
    triggerAt: 570,
    text: 'All subsystems nominal. Propellant loading sequence confirmed complete. Recommend proceeding to terminal count.',
    type: 'info',
  },
  {
    id: 'msg-700',
    triggerAt: 420,
    text: 'Range Safety confirm: airspace clear. Wind 8.4 kts from 247°, well within limits. Proceed with avionics arm sequence.',
    type: 'info',
  },
  {
    id: 'msg-430',
    triggerAt: 270,
    text: '⚠ ANOMALY DETECTED — Avionics bay temp reading 2.3°C above nominal (26.4°C vs baseline 24.1°C). Monitoring trend. No action required yet. I\'ll alert you if this continues.',
    type: 'warning',
  },
  {
    id: 'msg-300',
    triggerAt: 180,
    text: 'Avionics bay temp stabilizing. Delta returning toward baseline. Likely sensor artifact or minor airflow disruption. Confidence: 87%. Recommend continue count.',
    type: 'info',
  },
  {
    id: 'msg-100',
    triggerAt: 60,
    text: 'ALL SYSTEMS GO. Final checklist complete. All subsystems nominal. Awaiting Range Safety clearance for launch commit.',
    type: 'success',
  },
  {
    id: 'msg-010',
    triggerAt: 10,
    text: 'LAUNCH COMMIT CONFIRMED. Ignition sequence armed. T-10 seconds.',
    type: 'launch',
  },
]

export const SUBSYSTEM_EXPLANATIONS = {
  PROPULSION: 'Propulsion subsystem monitors oxidizer tank pressure (nominal: 847 PSI), fuel line temperature, and chamber pressure. Currently in pre-ignition standby. Propellant loading completed at T-9:50. All values within green band.',
  AVIONICS: 'Avionics suite includes primary flight computer, GPS receiver (12 satellites locked), and IMU. Bay temperature is the key health indicator — nominal range 22–26°C. CPU load at 23% in pre-launch idle mode.',
  GROUND_SUPPORT: 'Ground Support Equipment provides ground-side pressurization, power, and umbilical connections. GSE pressure nominal at 115 PSI. Pad temperature within limits. Umbilical disconnect ready for T-0.',
  RANGE_SAFETY: 'Range Safety monitors flight corridor integrity, wind conditions, and range exclusion zones. Current wind 8.4 kts from 247° — within the 15 kt launch limit. Visibility 10 miles. Range is CLEAR.',
  POWER: 'Power subsystem manages 28V main bus, battery state of charge, and current draw. Battery SOC at 98%. Bus voltage nominal at 28.2V. Current draw of 4.7A consistent with pre-launch avionics load.',
  COMMS: 'Communications system maintains telemetry uplink and downlink with ground station. Signal strength -67 dBm (excellent). Uplink 512 Kbps, downlink 1024 Kbps. No packet loss detected.',
}
