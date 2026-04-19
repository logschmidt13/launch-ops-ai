export const FSAE_SUBSYSTEM_CONFIG = {
  POWERTRAIN: {
    label: 'Powertrain',
    primaryMetric: 'rpm',
    metrics: [
      { key: 'rpm',        label: 'Engine RPM',   unit: ' rpm' },
      { key: 'throttle',   label: 'Throttle',     unit: '%'    },
      { key: 'waterTemp',  label: 'Water Temp',   unit: '°C'   },
      { key: 'oilPress',   label: 'Oil Pressure', unit: ' bar' },
    ],
  },
  AERO: {
    label: 'Aero Package',
    primaryMetric: 'frontDF',
    metrics: [
      { key: 'frontDF',     label: 'Front DF',    unit: ' N'   },
      { key: 'rearDF',      label: 'Rear DF',     unit: ' N'   },
      { key: 'rideHeightF', label: 'RH Front',    unit: ' mm'  },
      { key: 'rideHeightR', label: 'RH Rear',     unit: ' mm'  },
    ],
  },
  SUSPENSION: {
    label: 'Suspension',
    primaryMetric: 'rollAngle',
    metrics: [
      { key: 'rollAngle',  label: 'Roll Angle',   unit: '°'    },
      { key: 'flTravel',   label: 'FL Travel',    unit: ' mm'  },
      { key: 'frTravel',   label: 'FR Travel',    unit: ' mm'  },
      { key: 'tireTemp',   label: 'FL Tire Temp', unit: '°C'   },
    ],
  },
  DAQ: {
    label: 'Data Acquisition',
    primaryMetric: 'dataRate',
    metrics: [
      { key: 'dataRate',   label: 'Log Rate',     unit: ' Hz'  },
      { key: 'canLoad',    label: 'CAN Bus',      unit: '%'    },
      { key: 'gpsLock',    label: 'GPS Sats',     unit: ''     },
      { key: 'storage',    label: 'Storage Free', unit: ' MB'  },
    ],
  },
  DRIVER: {
    label: 'Driver Inputs',
    primaryMetric: 'gLat',
    metrics: [
      { key: 'gLat',       label: 'Lateral G',    unit: 'g'    },
      { key: 'gLon',       label: 'Longit. G',    unit: 'g'    },
      { key: 'steer',      label: 'Steer Angle',  unit: '°'    },
      { key: 'brakePres',  label: 'Brake Press',  unit: ' bar' },
    ],
  },
  RACE_CONTROL: {
    label: 'Race Control',
    primaryMetric: 'fuelLevel',
    metrics: [
      { key: 'lapNum',     label: 'Lap',          unit: ''     },
      { key: 'lapTime',    label: 'Last Lap',     unit: 's'    },
      { key: 'bestLap',    label: 'Best Lap',     unit: 's'    },
      { key: 'fuelLevel',  label: 'Fuel Level',   unit: '%'    },
    ],
  },
}

export const FSAE_SUBSYSTEM_ORDER = ['POWERTRAIN', 'AERO', 'SUSPENSION', 'DAQ', 'DRIVER', 'RACE_CONTROL']

export const FSAE_CHECKLIST_PHASES = ['PRE-GRID', 'FORMATION', 'RACE START']

export const FSAE_CHECKLIST_ITEMS = [
  { id: 'fc1',  phase: 'PRE-GRID',   name: 'Tyre pressures verified — 12 PSI all round',  role: 'MECH',       triggerAt: 290, type: 'manual' },
  { id: 'fc2',  phase: 'PRE-GRID',   name: 'Fuel load confirmed — 4.0 L',                 role: 'FUELS',      triggerAt: 275, type: 'auto'   },
  { id: 'fc3',  phase: 'PRE-GRID',   name: 'DAQ logging armed at 100 Hz',                 role: 'DAQ',        triggerAt: 260, type: 'auto'   },
  { id: 'fc4',  phase: 'PRE-GRID',   name: 'Driver weight ballast installed',              role: 'MECH',       triggerAt: 240, type: 'manual' },
  { id: 'fc5',  phase: 'PRE-GRID',   name: 'Wing elements torque-checked',                role: 'AERO',       triggerAt: 220, type: 'manual' },
  { id: 'fc6',  phase: 'PRE-GRID',   name: 'Engine warm-up cycle complete',               role: 'POWERTRAIN', triggerAt: 195, type: 'auto'   },
  { id: 'fc7',  phase: 'FORMATION',  name: 'Driver strapped in',                          role: 'DRIVER',     triggerAt: 178, type: 'manual' },
  { id: 'fc8',  phase: 'FORMATION',  name: 'HANS device and helmet connected',            role: 'SAFETY',     triggerAt: 162, type: 'manual' },
  { id: 'fc9',  phase: 'FORMATION',  name: 'Radio check — driver comms nominal',          role: 'COMMS',      triggerAt: 142, type: 'auto'   },
  { id: 'fc10', phase: 'FORMATION',  name: 'Transponder active',                          role: 'DAQ',        triggerAt: 122, type: 'auto'   },
  { id: 'fc11', phase: 'FORMATION',  name: 'Brake bias set — 60% front',                 role: 'DRIVER',     triggerAt: 102, type: 'manual' },
  { id: 'fc12', phase: 'FORMATION',  name: 'TC map 3 selected',                          role: 'POWERTRAIN', triggerAt: 82,  type: 'manual' },
  { id: 'fc13', phase: 'RACE START', name: 'Race Control grid clearance received',       role: 'RC',         triggerAt: 58,  type: 'auto'   },
  { id: 'fc14', phase: 'RACE START', name: 'All personnel clear of grid',                role: 'SAFETY',     triggerAt: 44,  type: 'auto'   },
  { id: 'fc15', phase: 'RACE START', name: 'Launch control armed',                       role: 'POWERTRAIN', triggerAt: 28,  type: 'manual' },
  { id: 'fc16', phase: 'RACE START', name: 'Start lights sequence ready',                role: 'RC',         triggerAt: 14,  type: 'auto'   },
  { id: 'fc17', phase: 'RACE START', name: 'GO — launch on green',                       role: 'ALL',        triggerAt: 4,   type: 'auto'   },
]

export const FSAE_ARIA_TIMELINE = [
  { id: 'fa1', triggerAt: 245, type: 'info',    text: 'All pre-grid checks proceeding. Powertrain warm-up in progress. Confirm tyre pressures before driver ingress.' },
  { id: 'fa2', triggerAt: 200, type: 'info',    text: 'Engine warm-up complete. Water temp nominal. Ready for driver ingress on your call.' },
  { id: 'fa3', triggerAt: 175, type: 'info',    text: 'Driver ingress confirmed. HANS and harness checks must be complete before T-3:30.' },
  { id: 'fa4', triggerAt: 118, type: 'warning', text: 'T-2:00. All personnel must clear the grid by T-1:00 per Race Control directive 4.2.' },
  { id: 'fa5', triggerAt: 55,  type: 'success', text: 'Race Control clearance received. Grid clear. Launch authority transferred to driver. Car is ready.' },
  { id: 'fa6', triggerAt: 8,   type: 'launch',  text: 'LIGHTS OUT. LAUNCH ON GREEN. GO GO GO.' },
]

export const FSAE_RADIO = [
  { id: 'fr1',  triggerAt: 288, from: 'MECH',       color: '#8A8FA8', text: 'Tyre pressures confirmed. 12.0 all round. Wheel torque good.' },
  { id: 'fr2',  triggerAt: 262, from: 'DAQ',        color: '#7EC8E3', text: 'Logging armed. 100 Hz confirmed. GPS lock 12 satellites.' },
  { id: 'fr3',  triggerAt: 210, from: 'POWERTRAIN', color: '#FF6B6B', text: 'Engine warm-up complete. Water 86°C, oil 3.9 bar. GO for driver ingress.' },
  { id: 'fr4',  triggerAt: 172, from: 'DRIVER',     color: '#00C97A', text: 'In the car. Mirrors set. Ready for harness.' },
  { id: 'fr5',  triggerAt: 156, from: 'SAFETY',     color: '#FFB300', text: 'HANS connected. Helmet nominal. Driver good to go.' },
  { id: 'fr6',  triggerAt: 138, from: 'COMMS',      color: '#B8A9FA', text: 'Radio check driver, how copy?' },
  { id: 'fr7',  triggerAt: 135, from: 'DRIVER',     color: '#00C97A', text: 'Loud and clear. Five by five.' },
  { id: 'fr8',  triggerAt:  98, from: 'DRIVER',     color: '#00C97A', text: 'Brake bias 60 front. TC map 3. Ready.' },
  { id: 'fr9',  triggerAt:  52, from: 'RC',         color: '#FF4D00', text: 'Race Control — grid clear. Formation in 30 seconds.' },
  { id: 'fr10', triggerAt:  22, from: 'DRIVER',     color: '#00C97A', text: 'Launch control armed. Standing by.' },
  { id: 'fr11', triggerAt:   6, from: 'RE',         color: '#FF4D00', text: 'Lights in 5. Execute launch. You got this.' },
]
