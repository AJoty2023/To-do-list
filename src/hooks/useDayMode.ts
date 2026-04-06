import { useState, useEffect } from 'react'

export type DayMode = 'normal' | 'flexible' | 'off'

function getTodayISO(): string {
  return new Date().toISOString().split('T')[0]
}

function storageKey(): string {
  return `daymode:${getTodayISO()}`
}

function getStoredMode(): DayMode {
  try {
    const stored = localStorage.getItem(storageKey())
    if (stored === 'normal' || stored === 'flexible' || stored === 'off') {
      return stored
    }
  } catch {
    // localStorage unavailable
  }
  return 'normal'
}

export function useDayMode(): {
  mode: DayMode
  setMode: (mode: DayMode) => void
} {
  const [mode, setMode] = useState<DayMode>(getStoredMode)

  useEffect(() => {
    try {
      localStorage.setItem(storageKey(), mode)
    } catch {
      // localStorage unavailable
    }
  }, [mode])

  return { mode, setMode }
}