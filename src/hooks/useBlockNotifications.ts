import { useEffect, useRef } from 'react'
import type { Block, DayKey } from '../types'
import { schedule } from '../data/schedule'

function getTodayKey(): DayKey {
  const map: DayKey[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
  return map[new Date().getDay()]
}

function getUpcomingBlock(blocks: Block[]): Block | null {
  const now = new Date()
  const currentMinutes = now.getHours() * 60 + now.getMinutes()

  // Find the next block starting within 5 minutes
  return blocks.find((block) => {
    const blockStart = block.startHour * 60
    const diff = blockStart - currentMinutes
    return diff >= 0 && diff <= 5
  }) ?? null
}

function sendNotification(block: Block) {
  if (!('Notification' in globalThis)) return
  if (Notification.permission !== 'granted') return

  new Notification('Daily Routine — coming up next', {
    body: `${block.time}\n${block.title}`,
    icon: '/vite.svg',
    tag: block.id, // prevents duplicate notifications for same block
  })
}

export function useBlockNotifications() {
  const notifiedIds = useRef<Set<string>>(new Set())

  useEffect(() => {
    function check() {
      const todayKey  = getTodayKey()
      const todayData = schedule.find((d) => d.key === todayKey)
      if (!todayData) return

      const upcoming = getUpcomingBlock(todayData.blocks)
      if (!upcoming) return

      // Only notify once per block per session
      if (notifiedIds.current.has(upcoming.id)) return
      notifiedIds.current.add(upcoming.id)

      sendNotification(upcoming)
    }

    check() // run immediately
    const interval = setInterval(check, 60_000) // check every minute
    return () => clearInterval(interval)
  }, [])
}