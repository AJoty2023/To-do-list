import { useState, useEffect } from 'react'
import type { Block } from '../types'

function getCurrentHourMinute(): { hour: number; minute: number } {
  const now = new Date()
  return { hour: now.getHours(), minute: now.getMinutes() }
}

function parseBlockHours(block: Block): { start: number; end: number } | null {
  // time string examples: "9:00–9:30 AM", "11:00 AM–12:00 PM", "10:00–11:00 PM"
  // We use startHour and endHour already stored in the block data
  return { start: block.startHour, end: block.endHour }
}

function isBlockActive(block: Block, hour: number, minute: number): boolean {
  const range = parseBlockHours(block)
  if (!range) return false

  const currentMinutes = hour * 60 + minute
  const startMinutes   = range.start * 60
  // endHour is sometimes same as startHour for short blocks — give 30 min minimum
  const endMinutes     = range.end > range.start
    ? range.end * 60
    : range.start * 60 + 30

  return currentMinutes >= startMinutes && currentMinutes < endMinutes
}

export function useCurrentBlock(blocks: Block[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(() => {
    const { hour, minute } = getCurrentHourMinute()
    return blocks.find((b) => isBlockActive(b, hour, minute))?.id ?? null
  })

  useEffect(() => {
    function check() {
      const { hour, minute } = getCurrentHourMinute()
      const active = blocks.find((b) => isBlockActive(b, hour, minute))
      setActiveId(active?.id ?? null)
    }

    // Check every 60 seconds
    const interval = setInterval(check, 60_000)
    return () => clearInterval(interval)
  }, [blocks])

  return activeId
}


export function useLiveClock(): string {
  const [time, setTime] = useState<string>(() =>
    new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    })
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      )
    }, 1_000)
    return () => clearInterval(interval)
  }, [])

  return time
}