import { useState, useEffect, useRef } from 'react'
import { SUBSYSTEM_CONFIG } from '../data/telemetry'

const HISTORY_LENGTH = 20

function initState() {
  const state = {}
  Object.entries(SUBSYSTEM_CONFIG).forEach(([key, config]) => {
    const metrics = {}
    const history = {}
    config.metrics.forEach(m => {
      metrics[m.key] = m.base
      history[m.key] = Array(HISTORY_LENGTH).fill(m.base)
    })
    state[key] = { status: 'nominal', metrics, history }
  })
  return state
}

function nextValue(metric, key, remaining) {
  let base = metric.base
  // Avionics bay temp anomaly: T-4:30 (270s) until T-2:00 (120s)
  if (key === 'AVIONICS' && metric.key === 'bayTemp' && remaining <= 270 && remaining > 120) {
    base = metric.base + 2.3
  }
  const delta = (Math.random() - 0.5) * metric.variance * 2
  return parseFloat((base + delta).toFixed(metric.decimals ?? 1))
}

export function useTelemetry(isHolding) {
  const [telemetry, setTelemetry] = useState(initState)
  const remainingRef = useRef(600)
  const isHoldingRef = useRef(isHolding)

  useEffect(() => { isHoldingRef.current = isHolding }, [isHolding])

  // exposed setter so App can push remaining into this hook
  const setRemaining = (r) => { remainingRef.current = r }

  useEffect(() => {
    const interval = setInterval(() => {
      if (isHoldingRef.current) return
      const rem = remainingRef.current

      setTelemetry(prev => {
        const next = {}
        Object.entries(SUBSYSTEM_CONFIG).forEach(([key, config]) => {
          const metrics = {}
          const history = {}
          config.metrics.forEach(m => {
            const val = nextValue(m, key, rem)
            metrics[m.key] = val
            history[m.key] = [...(prev[key].history[m.key].slice(1)), val]
          })

          let status = 'nominal'
          if (key === 'AVIONICS' && rem <= 270 && rem > 120) status = 'warning'

          next[key] = { status, metrics, history }
        })
        return next
      })
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return { telemetry, setRemaining }
}
