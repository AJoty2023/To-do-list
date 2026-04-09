import { useEffect, useMemo } from 'react'
import { schedule } from '../data/schedule'
import { coreTasks } from '../data/coreTasks'
import type { DayKey } from '../types'

const DAY_ORDER: DayKey[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

const DAY_LABELS: Record<DayKey, string> = {
  mon: 'Monday', tue: 'Tuesday', wed: 'Wednesday',
  thu: 'Thursday', fri: 'Friday', sat: 'Saturday', sun: 'Sunday',
}

function getTodayJsDay(): number {
  return new Date().getDay() // 0=Sun, 6=Sat
}

function isSunday(): boolean {
  return getTodayJsDay() === 0
}

function getWeekDates(): Record<DayKey, string> {
  const today = new Date()
  const jsDay = today.getDay()
  const monday = new Date(today)
  monday.setDate(today.getDate() - ((jsDay + 6) % 7))

  const result = {} as Record<DayKey, string>
  DAY_ORDER.forEach((key, i) => {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    result[key] = d.toISOString().split('T')[0]
  })
  return result
}

function getHabitValue(dayKey: DayKey, blockId: string, dateISO: string): boolean {
  try {
    return localStorage.getItem(`habits:${dayKey}:${blockId}:${dateISO}`) === 'true'
  } catch {
    return false
  }
}

function getDayCompletion(dayKey: DayKey, dateISO: string): number {
  const daySchedule = schedule.find((d) => d.key === dayKey)
  if (!daySchedule || daySchedule.blocks.length === 0) return 0
  const done = daySchedule.blocks.filter((b) =>
    getHabitValue(dayKey, b.id, dateISO)
  ).length
  return Math.round((done / daySchedule.blocks.length) * 100)
}

function getCoreCompletion(dayKey: DayKey, dateISO: string): number {
  const done = coreTasks.filter((t) =>
    getHabitValue(dayKey, t.id, dateISO)
  ).length
  return Math.round((done / coreTasks.length) * 100)
}

export interface DaySummary {
  key: DayKey
  label: string
  routinePercent: number
  corePercent: number
}

export interface WeeklySummaryData {
  isSunday: boolean
  weekPercent: number
  bestDay: DaySummary | null
  worstDay: DaySummary | null
  fullDays: number
  daySummaries: DaySummary[]
  coreWeekPercent: number
}

async function scheduleWeeklyNotification(weekPercent: number): Promise<void> {
  if (!('serviceWorker' in navigator)) return
  if (!('Notification' in globalThis)) return
  if (Notification.permission !== 'granted') return

  try {
    const sw = await navigator.serviceWorker.ready
    if (!sw.active) return

    // Schedule for 8 PM Sunday (20:00)
    const now = new Date()
    const target = new Date(now)
    target.setHours(20, 0, 0, 0)

    const delayMs = target.getTime() - now.getTime()

    // Only schedule if 8 PM hasn't passed yet today
    if (delayMs <= 0) return

    const emoji =
      function getWeeklyEmojiLabel(weekPercent: number): string {
  if (weekPercent >= 80) return 'Great'
  if (weekPercent >= 50) return 'Decent'
  return 'Tough'
}

    sw.active.postMessage({
      type: 'SCHEDULE_NOTIFICATION',
      title: `Weekly summary — ${emoji} week`,
      body: `You completed ${weekPercent}% of your routine this week. Check the app for details.`,
      delayMs,
      tag: `weekly-summary-${now.toISOString().split('T')[0]}`,
    })
  } catch {
    // SW not available
  }
}

export function useWeeklySummary(): WeeklySummaryData {
  const weekDates = useMemo(() => getWeekDates(), [])

  const daySummaries: DaySummary[] = useMemo(() =>
    DAY_ORDER.map((key) => ({
      key,
      label: DAY_LABELS[key],
      routinePercent: getDayCompletion(key, weekDates[key]),
      corePercent: getCoreCompletion(key, weekDates[key]),
    })),
  [weekDates])

  const weekPercent = useMemo(() => {
    const total = daySummaries.reduce((s, d) => s + d.routinePercent, 0)
    return Math.round(total / daySummaries.length)
  }, [daySummaries])

  const coreWeekPercent = useMemo(() => {
    const total = daySummaries.reduce((s, d) => s + d.corePercent, 0)
    return Math.round(total / daySummaries.length)
  }, [daySummaries])

  const sortedByRoutine = [...daySummaries].sort(
    (a, b) => b.routinePercent - a.routinePercent,
  )
  const bestDay  = sortedByRoutine[0] ?? null
const worstDay = sortedByRoutine.at(-1) ?? null

  const fullDays = daySummaries.filter((d) => d.routinePercent === 100).length

  // Schedule the 8 PM Sunday notification
  useEffect(() => {
    if (!isSunday()) return
    void scheduleWeeklyNotification(weekPercent)
  }, [weekPercent])

  return {
    isSunday: isSunday(),
    weekPercent,
    bestDay,
    worstDay,
    fullDays,
    daySummaries,
    coreWeekPercent,
  }
}