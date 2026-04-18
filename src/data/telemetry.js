export const SUBSYSTEM_CONFIG = {
  PROPULSION: {
    label: 'PROPULSION',
    primaryMetric: 'oxTankPres',
    metrics: [
      { key: 'oxTankPres',   label: 'OX TANK PRES', unit: 'PSI', base: 847,  variance: 3,   decimals: 0 },
      { key: 'fuelTemp',     label: 'FUEL TEMP',    unit: '°C',  base: 18.4, variance: 0.4, decimals: 1 },
      { key: 'chamberPres',  label: 'CHAMBER PRES', unit: 'PSI', base: 0,    variance: 0.2, decimals: 1 },
    ],
  },
  AVIONICS: {
    label: 'AVIONICS',
    primaryMetric: 'bayTemp',
    metrics: [
      { key: 'bayTemp',  label: 'BAY TEMP',  unit: '°C', base: 24.1, variance: 0.3, decimals: 1 },
      { key: 'cpuLoad',  label: 'CPU LOAD',  unit: '%',  base: 23,   variance: 4,   decimals: 0 },
      { key: 'gpsSats',  label: 'GPS SATS',  unit: '',   base: 12,   variance: 1,   decimals: 0 },
    ],
  },
  GROUND_SUPPORT: {
    label: 'GROUND SUPPORT',
    primaryMetric: 'gsePressure',
    metrics: [
      { key: 'gsePressure', label: 'GSE PRES',  unit: 'PSI', base: 115,  variance: 2,   decimals: 0 },
      { key: 'padTemp',     label: 'PAD TEMP',  unit: '°C',  base: 31.2, variance: 0.5, decimals: 1 },
      { key: 'humidity',    label: 'HUMIDITY',  unit: '%',   base: 42,   variance: 2,   decimals: 0 },
    ],
  },
  RANGE_SAFETY: {
    label: 'RANGE SAFETY',
    primaryMetric: 'windSpeed',
    metrics: [
      { key: 'windSpeed', label: 'WIND SPD', unit: 'kts', base: 8.4,  variance: 1.5, decimals: 1 },
      { key: 'windDir',   label: 'WIND DIR', unit: '°',   base: 247,  variance: 5,   decimals: 0 },
      { key: 'visibility',label: 'VIS',      unit: 'mi',  base: 10.0, variance: 0.2, decimals: 1 },
    ],
  },
  POWER: {
    label: 'POWER',
    primaryMetric: 'busVoltage',
    metrics: [
      { key: 'busVoltage',  label: 'BUS VOLT',  unit: 'V', base: 28.2, variance: 0.1, decimals: 1 },
      { key: 'currentDraw', label: 'CURRENT',   unit: 'A', base: 4.7,  variance: 0.3, decimals: 1 },
      { key: 'batterySoc',  label: 'BATT SOC',  unit: '%', base: 98,   variance: 0.5, decimals: 0 },
    ],
  },
  COMMS: {
    label: 'COMMS',
    primaryMetric: 'signalStr',
    metrics: [
      { key: 'signalStr',    label: 'SIGNAL',    unit: 'dBm',  base: -67,  variance: 2,  decimals: 0 },
      { key: 'uplinkRate',   label: 'UPLINK',    unit: 'Kbps', base: 512,  variance: 20, decimals: 0 },
      { key: 'downlinkRate', label: 'DOWNLINK',  unit: 'Kbps', base: 1024, variance: 30, decimals: 0 },
    ],
  },
}
