import { schedule } from '../data/schedule'
import { coreTasks } from '../data/coreTasks'
import { recoveryTips, type RecoveryTip } from '../data/recoveryTips'
import type { DayKey, Tag } from '../types'

const DAY_ORDER: DayKey[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

function getHabitValue(dayKey: DayKey, blockId: string, dateISO: string): boolean {
  try {
    return localStorage.getItem(`habits:${dayKey}:${blockId}:${dateISO}`) === 'true'
  } catch {
    return false
  }
}

function getYesterdayKey(): { key: DayKey; dateISO: string } | null {
  const today = new Date()
  const jsDay = today.getDay()
  const map: DayKey[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

  const todayKey = map[jsDay]
  const todayIndex = DAY_ORDER.indexOf(todayKey)

  const yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)

  if (todayIndex === 0) {
    return { key: 'sun', dateISO: yesterday.toISOString().split('T')[0] }
  }

  return {
    key: DAY_ORDER[todayIndex - 1],
    dateISO: yesterday.toISOString().split('T')[0],
  }
}

function calcCompletionPercent(dayKey: DayKey, dateISO: string): number {
  const daySchedule = schedule.find((d) => d.key === dayKey)
  if (!daySchedule) return 100

  const total = daySchedule.blocks.length
  if (total === 0) return 100

  const done = daySchedule.blocks.filter((b) =>
    getHabitValue(dayKey, b.id, dateISO)
  ).length

  return Math.round((done / total) * 100)
}

function getMissedTags(dayKey: DayKey, dateISO: string): Set<Tag | 'core'> {
  const missed = new Set<Tag | 'core'>()
  const daySchedule = schedule.find((d) => d.key === dayKey)

  if (daySchedule) {
    for (const block of daySchedule.blocks) {
      if (!getHabitValue(dayKey, block.id, dateISO)) {
        for (const tag of block.tags) {
          missed.add(tag)
        }
      }
    }
  }

  const anyCoreMissed = coreTasks.some(
    (t) => !getHabitValue(dayKey, t.id, dateISO)
  )

  if (anyCoreMissed) {
    missed.add('core')
  }

  return missed
}

export interface RecoveryInfo {
  isRecoveryDay: boolean
  missedDayLabel: string
  missedPercent: number
  tips: RecoveryTip[]
}

const DAY_LABELS: Record<DayKey, string> = {
  mon: 'Monday',
  tue: 'Tuesday',
  wed: 'Wednesday',
  thu: 'Thursday',
  fri: 'Friday',
  sat: 'Saturday',
  sun: 'Sunday',
}

export function useStreakProtection(): RecoveryInfo {
  const yesterday = getYesterdayKey()

  if (!yesterday) {
    return {
      isRecoveryDay: false,
      missedDayLabel: '',
      missedPercent: 0,
      tips: [],
    }
  }

  const { key: yesterdayKey, dateISO: yesterdayISO } = yesterday
  const missedPercent = calcCompletionPercent(yesterdayKey, yesterdayISO)

  if (missedPercent >= 50) {
    return {
      isRecoveryDay: false,
      missedDayLabel: '',
      missedPercent,
      tips: [],
    }
  }

  const missedTags = getMissedTags(yesterdayKey, yesterdayISO)

  const tips = recoveryTips.filter((tip) =>
    missedTags.has(tip.tag)
  )

  return {
    isRecoveryDay: true,
    missedDayLabel: DAY_LABELS[yesterdayKey],
    missedPercent,
    tips: tips.length > 0 ? tips : [recoveryTips[0]],
  }
}