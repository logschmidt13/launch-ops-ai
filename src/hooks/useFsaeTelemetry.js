import { useState, useEffect, useRef } from 'react'

function jitter(base, range) {
  return base + (Math.random() - 0.5) * range * 2
}

function fmt(v, decimals) {
  return parseFloat(v.toFixed(decimals))
}

function initState() {
  return {
    POWERTRAIN: {
      status: 'nominal',
      metrics: { rpm: 3200, throttle: 0, waterTemp: 65.1, oilPress: 3.8 },
      history: { rpm: Array(20).fill(3200) },
    },
    AERO: {
      status: 'nominal',
      metrics: { frontDF: 2, rearDF: 3, rideHeightF: 32.0, rideHeightR: 28.5 },
      history: { frontDF: Array(20).fill(2) },
    },
    SUSPENSION: {
      status: 'nominal',
      metrics: { rollAngle: 0.2, flTravel: 12.4, frTravel: 11.8, tireTemp: 42 },
      history: { rollAngle: Array(20).fill(0.2) },
    },
    DAQ: {
      status: 'nominal',
      metrics: { dataRate: 100, canLoad: 42, gpsLock: 12, storage: 8420 },
      history: { dataRate: Array(20).fill(100) },
    },
    DRIVER: {
      status: 'nominal',
      metrics: { gLat: 0.02, gLon: 0.01, steer: 0, brakePres: 0.0 },
      history: { gLat: Array(20).fill(0.02) },
    },
    RACE_CONTROL: {
      status: 'nominal',
      metrics: { lapNum: 0, lapTime: 0.00, bestLap: 0.00, fuelLevel: 100 },
      history: { fuelLevel: Array(20).fill(100) },
    },
  }
}

export function useFsaeTelemetry(isHolding) {
  const [telemetry, setTelemetry] = useState(initState)
  const [remaining, setRemaining] = useState(300)
  const remainingRef = useRef(300)

  useEffect(() => {
    remainingRef.current = remaining
  }, [remaining])

  useEffect(() => {
    const t = setInterval(() => {
      if (isHolding) return
      const r = remainingRef.current

      setTelemetry(prev => {
        // --- POWERTRAIN ---
        const warmupDone = r < 195
        const targetTemp = warmupDone
          ? fmt(jitter(87, 1.5), 1)
          : fmt(65 + (300 - r) * 0.115, 1)
        const targetRpm = warmupDone
          ? (Math.random() > 0.82 ? Math.round(jitter(4200, 400)) : 3200)
          : Math.round(3200 + (300 - r) * 2.5)
        const clampedRpm = Math.min(targetRpm, 4800)
        const throttle = warmupDone && Math.random() > 0.85 ? Math.round(Math.random() * 35) : 0
        const pwStatus = targetTemp > 95 ? 'warning' : 'nominal'

        // --- SUSPENSION ---
        const tireBase = 42 + (300 - r) * 0.04
        const roll = fmt(Math.abs(jitter(0.1, 0.12)), 1)

        // --- DRIVER ---
        const gL = fmt(Math.abs(jitter(0.01, 0.025)), 2)
        const gN = fmt(Math.abs(jitter(0.01, 0.02)), 2)

        return {
          POWERTRAIN: {
            status: pwStatus,
            metrics: {
              rpm: clampedRpm,
              throttle,
              waterTemp: Math.min(targetTemp, 92),
              oilPress: fmt(jitter(3.85, 0.08), 1),
            },
            history: { rpm: [...prev.POWERTRAIN.history.rpm.slice(1), clampedRpm] },
          },
          AERO: {
            status: 'nominal',
            metrics: {
              frontDF: Math.round(jitter(2, 2)),
              rearDF: Math.round(jitter(3, 2)),
              rideHeightF: fmt(jitter(32.0, 0.25), 1),
              rideHeightR: fmt(jitter(28.5, 0.25), 1),
            },
            history: { frontDF: [...prev.AERO.history.frontDF.slice(1), 2] },
          },
          SUSPENSION: {
            status: 'nominal',
            metrics: {
              rollAngle: roll,
              flTravel: fmt(jitter(12.4, 0.4), 1),
              frTravel: fmt(jitter(11.8, 0.4), 1),
              tireTemp: Math.round(jitter(tireBase, 0.5)),
            },
            history: { rollAngle: [...prev.SUSPENSION.history.rollAngle.slice(1), roll] },
          },
          DAQ: {
            status: 'nominal',
            metrics: {
              dataRate: 100,
              canLoad: Math.round(jitter(42, 3)),
              gpsLock: 12,
              storage: Math.max(0, Math.round(prev.DAQ.metrics.storage - 0.6)),
            },
            history: { dataRate: [...prev.DAQ.history.dataRate.slice(1), 100] },
          },
          DRIVER: {
            status: 'nominal',
            metrics: {
              gLat: gL,
              gLon: gN,
              steer: Math.round(jitter(0, 1.5)),
              brakePres: fmt(Math.max(0, jitter(0, 0.04)), 1),
            },
            history: { gLat: [...prev.DRIVER.history.gLat.slice(1), gL] },
          },
          RACE_CONTROL: {
            status: 'nominal',
            metrics: { ...prev.RACE_CONTROL.metrics, fuelLevel: 100 },
            history: { fuelLevel: [...prev.RACE_CONTROL.history.fuelLevel.slice(1), 100] },
          },
        }
      })
    }, 2000)

    return () => clearInterval(t)
  }, [isHolding])

  return { telemetry, setRemaining }
}
