export const CHECKLIST_PHASES = ['PRE-LAUNCH', 'TERMINAL COUNT', 'FINAL']

export const CHECKLIST_ITEMS = [
  // PRE-LAUNCH  (T-10:00 → T-5:00)
  { id: 1,  phase: 'PRE-LAUNCH',     name: 'Propellant tanking complete',       role: 'PROP',     triggerAt: 592, type: 'auto'   },
  { id: 2,  phase: 'PRE-LAUNCH',     name: 'Subsystem power-on verified',        role: 'AVIONICS', triggerAt: 570, type: 'auto'   },
  { id: 3,  phase: 'PRE-LAUNCH',     name: 'Range safety brief complete',        role: 'RSO',      triggerAt: 540, type: 'auto'   },
  { id: 4,  phase: 'PRE-LAUNCH',     name: 'Ground support equipment nominal',   role: 'GSE',      triggerAt: 510, type: 'auto'   },
  { id: 5,  phase: 'PRE-LAUNCH',     name: 'Communication links established',    role: 'COMMS',    triggerAt: 480, type: 'auto'   },
  { id: 6,  phase: 'PRE-LAUNCH',     name: 'Airspace clearance confirmed',       role: 'RSO',      triggerAt: 450, type: 'auto'   },
  { id: 7,  phase: 'PRE-LAUNCH',     name: 'Avionics arm sequence initiated',    role: 'AVIONICS', triggerAt: 420, type: 'auto'   },
  { id: 8,  phase: 'PRE-LAUNCH',     name: 'Propellant pressurization nominal',  role: 'PROP',     triggerAt: 360, type: 'manual' },

  // TERMINAL COUNT  (T-5:00 → T-1:00)
  { id: 9,  phase: 'TERMINAL COUNT', name: 'Flight computer final check',        role: 'AVIONICS', triggerAt: 300, type: 'auto'   },
  { id: 10, phase: 'TERMINAL COUNT', name: 'Umbilical disconnect ready',         role: 'GSE',      triggerAt: 270, type: 'auto'   },
  { id: 11, phase: 'TERMINAL COUNT', name: 'Internal battery power transfer',    role: 'POWER',    triggerAt: 240, type: 'auto'   },
  { id: 12, phase: 'TERMINAL COUNT', name: 'Destruct system armed',              role: 'RSO',      triggerAt: 210, type: 'auto'   },
  { id: 13, phase: 'TERMINAL COUNT', name: 'Launch pad area cleared',            role: 'SAFETY',   triggerAt: 180, type: 'auto'   },
  { id: 14, phase: 'TERMINAL COUNT', name: 'Final avionics verification',        role: 'AVIONICS', triggerAt: 150, type: 'manual' },
  { id: 15, phase: 'TERMINAL COUNT', name: 'Igniter continuity check',           role: 'PROP',     triggerAt: 120, type: 'auto'   },

  // FINAL  (T-1:00 → T-0)
  { id: 16, phase: 'FINAL',          name: 'Range safety clearance granted',     role: 'RSO',      triggerAt: 60,  type: 'auto'   },
  { id: 17, phase: 'FINAL',          name: 'Launch commit poll — all GO',        role: 'ALL',      triggerAt: 45,  type: 'auto'   },
  { id: 18, phase: 'FINAL',          name: 'Ignition sequence initiated',        role: 'PROP',     triggerAt: 30,  type: 'auto'   },
  { id: 19, phase: 'FINAL',          name: 'Final go/no-go confirmation',        role: 'FD',       triggerAt: 15,  type: 'auto'   },
  { id: 20, phase: 'FINAL',          name: 'Ignition armed — launch imminent',   role: 'PROP',     triggerAt: 10,  type: 'auto'   },
]
