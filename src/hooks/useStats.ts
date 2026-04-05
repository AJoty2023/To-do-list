import { useMemo } from 'react'
import { schedule } from '../data/schedule'
import { prepSchedule } from '../data/prepSchedule'
import type { DayKey, Tag } from '../types'

const DAYS: DayKey[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

const DAY_LABELS: Record<DayKey, string> = {
  mon: 'Mon', tue: 'Tue', wed: 'Wed',
  thu: 'Thu', fri: 'Fri', sat: 'Sat', sun: 'Sun',
}

const CATEGORY_CONFIG: { label: string; tag: Tag | 'prep'; color: string }[] = [
  { label: 'IELTS / GRE', tag: 'prep',    color: '#7C3AED' },
  { label: 'YouTube',     tag: 'youtube', color: '#EF4444' },
  { label: 'C++',         tag: 'cpp',     color: '#3B82F6' },
  { label: 'GitHub',      tag: 'github',  color: '#10B981' },
  { label: 'Skill',       tag: 'skill',   color: '#14B8A6' },
]

export interface DayStats {
  key: DayKey
  label: string
  total: number
  done: number
  percent: number
}

export interface CategoryStats {
  label: string
  tag: Tag | 'prep'
  done: number
  total: number
  percent: number
  color: string
}

export interface StatsResult {
  dayStats: DayStats[]
  categoryStats: CategoryStats[]
  streak: number
  todayPercent: number
  weekPercent: number
}

// --- Helpers ---

function getHabitValue(day: DayKey, blockId: string, dateISO: string): boolean {
  try {
    return localStorage.getItem(`habits:${day}:${blockId}:${dateISO}`) === 'true'
  } catch {
    return false
  }
}

function getCurrentWeekDates(): Record<DayKey, string> {
  const today = new Date()
  const dayOfWeek = today.getDay()
  const monday = new Date(today)
  monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7))

  const result = {} as Record<DayKey, string>
  DAYS.forEach((key, i) => {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    result[key] = d.toISOString().split('T')[0]
  })
  return result
}

function countPrepCategory(
  day: DayKey,
  dateISO: string,
): { total: number; done: number } {
  const dayPrep = prepSchedule.find((d) => d.key === day)
  if (!dayPrep) return { total: 0, done: 0 }

  let total = 0
  let done = 0
  for (const session of dayPrep.sessions) {
    total++
    if (getHabitValue(day, session.id, dateISO)) done++
  }
  return { total, done }
}

function countTagCategory(
  day: DayKey,
  dateISO: string,
  tag: Tag,
): { total: number; done: number } {
  const daySchedule = schedule.find((d) => d.key === day)
  if (!daySchedule) return { total: 0, done: 0 }

  let total = 0
  let done = 0
  for (const block of daySchedule.blocks) {
    if (block.tags.includes(tag)) {
      total++
      if (getHabitValue(day, block.id, dateISO)) done++
    }
  }
  return { total, done }
}

function getTodayDayIndex(): number {
  const jsDay = new Date().getDay() // 0=Sun
  const map: DayKey[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
  return DAYS.indexOf(map[jsDay])
}

// --- Hook ---

export function useStats(): StatsResult {
  return useMemo(() => {
    const weekDates = getCurrentWeekDates()

    // Per-day completion stats
    const dayStats: DayStats[] = DAYS.map((key) => {
      const dateISO = weekDates[key]
      const daySchedule = schedule.find((d) => d.key === key)
      if (!daySchedule) {
        return { key, label: DAY_LABELS[key], total: 0, done: 0, percent: 0 }
      }

      let total = 0
      let done = 0
      for (const block of daySchedule.blocks) {
        total++
        if (getHabitValue(key, block.id, dateISO)) done++
      }
      const percent = total > 0 ? Math.round((done / total) * 100) : 0
      return { key, label: DAY_LABELS[key], total, done, percent }
    })

    // Streak: consecutive days ending today with >= 80%
    const todayDayIndex = getTodayDayIndex()
    let streak = 0
    for (let i = todayDayIndex; i >= 0; i--) {
      if (dayStats[i].percent >= 80) streak++
      else break
    }

    // Category breakdown across the week
    const categoryStats: CategoryStats[] = CATEGORY_CONFIG.map(({ label, tag, color }) => {
      let total = 0
      let done = 0

      for (const day of DAYS) {
        const dateISO = weekDates[day]
        const counts =
          tag === 'prep'
            ? countPrepCategory(day, dateISO)
            : countTagCategory(day, dateISO, tag)
        total += counts.total
        done  += counts.done
      }

      const percent = total > 0 ? Math.round((done / total) * 100) : 0
      return { label, tag, done, total, percent, color }
    })

    // Overall today and week percentages
    const todayKey  = DAYS[todayDayIndex] ?? 'mon'
    const todayStat = dayStats.find((d) => d.key === todayKey)
    const todayPercent = todayStat?.percent ?? 0

    const weekTotal   = dayStats.reduce((sum, d) => sum + d.total, 0)
    const weekDone    = dayStats.reduce((sum, d) => sum + d.done, 0)
    const weekPercent = weekTotal > 0 ? Math.round((weekDone / weekTotal) * 100) : 0

    return { dayStats, categoryStats, streak, todayPercent, weekPercent }
  }, [])
}