import { useEffect, useRef } from 'react'
import type { Block, DayKey } from '../types'
import { schedule } from '../data/schedule'

function getTodayKey(): DayKey {
  const map: DayKey[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
  return map[new Date().getDay()]
}

async function requestPermission(): Promise<boolean> {
  if (!('Notification' in globalThis)) return false
  if (Notification.permission === 'granted') return true
  if (Notification.permission === 'denied') return false
  const result = await Notification.requestPermission()
  return result === 'granted'
}

async function getServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (!('serviceWorker' in navigator)) return null
  try {
    return await navigator.serviceWorker.ready
  } catch {
    return null
  }
}

async function scheduleNotification(
  block: Block,
  minutesBefore: number,
  tag: string,
): Promise<void> {
  const sw = await getServiceWorker()
  if (!sw?.active) return

  const now = new Date()
  const currentMinutes = now.getHours() * 60 + now.getMinutes()
  const blockStartMinutes = block.startHour * 60
  const targetMinutes = blockStartMinutes - minutesBefore
  const delayMs = (targetMinutes - currentMinutes) * 60_000

  if (delayMs < 0) return // already passed

  sw.active.postMessage({
    type: 'SCHEDULE_NOTIFICATION',
    title: `Coming up in ${minutesBefore} min`,
    body: `${block.time} — ${block.title}`,
    delayMs,
    tag,
  })
}

export function useBlockNotifications(): void {
  const scheduledRef = useRef<Set<string>>(new Set())

  useEffect(() => {
    async function scheduleAll(): Promise<void> {
      const granted = await requestPermission()
      if (!granted) return

      const todayKey  = getTodayKey()
      const todayData = schedule.find((d) => d.key === todayKey)
      if (!todayData) return

      for (const block of todayData.blocks) {
        const tag5  = `${block.id}-5min`
        const tag15 = `${block.id}-15min`

        if (!scheduledRef.current.has(tag5)) {
          await scheduleNotification(block, 5, tag5)
          scheduledRef.current.add(tag5)
        }

        if (!scheduledRef.current.has(tag15)) {
          await scheduleNotification(block, 15, tag15)
          scheduledRef.current.add(tag15)
        }
      }
    }

    void scheduleAll()
  }, [])
}