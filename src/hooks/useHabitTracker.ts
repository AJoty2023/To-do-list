import { useState, useEffect } from 'react'

function getTodayISO(): string {
  return new Date().toISOString().split('T')[0] // "2025-04-04"
}

function makeKey(day: string, blockId: string): string {
  return `habits:${day}:${blockId}:${getTodayISO()}`
}

export function useHabitTracker(day: string, blockId: string) {
  const key = makeKey(day, blockId)

  const [done, setDone] = useState<boolean>(() => {
    try {
      return localStorage.getItem(key) === 'true'
    } catch {
      return false
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, String(done))
    } catch {
      // localStorage not available
    }
  }, [done, key])

  const toggle = () => setDone((prev) => !prev)

  return { done, toggle }
}