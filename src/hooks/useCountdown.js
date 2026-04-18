import { useState, useEffect, useRef, useCallback } from 'react'

export function useCountdown(initialSeconds = 600) {
  const [remaining, setRemaining] = useState(initialSeconds)
  const [isHolding, setIsHolding] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const isHoldingRef = useRef(false)

  useEffect(() => {
    isHoldingRef.current = isHolding
  }, [isHolding])

  useEffect(() => {
    const interval = setInterval(() => {
      if (isHoldingRef.current) return
      setRemaining(prev => {
        if (prev <= 0) {
          setIsComplete(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const hold = useCallback(() => setIsHolding(true), [])
  const resume = useCallback(() => setIsHolding(false), [])

  return { remaining, isHolding, isComplete, hold, resume }
}
