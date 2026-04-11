import { useState, useEffect } from 'react'
import { askGemini } from '../lib/gemini'
import { schedule } from '../data/schedule'
import { coreTasks } from '../data/coreTasks'
import type { DayKey } from '../types'

const DAY_LABELS: Record<DayKey, string> = {
  mon: 'Monday', tue: 'Tuesday', wed: 'Wednesday',
  thu: 'Thursday', fri: 'Friday', sat: 'Saturday', sun: 'Sunday',
}

const DAY_ORDER: DayKey[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

function getTodayKey(): DayKey {
  const map: DayKey[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
  return map[new Date().getDay()]
}

function getTodayISO(): string {
  return new Date().toISOString().split('T')[0]
}

function getCacheKey(): string {
  return `morning-coach:${getTodayISO()}`
}

function getHabitValue(dayKey: DayKey, blockId: string, dateISO: string): boolean {
  try {
    return localStorage.getItem(`habits:${dayKey}:${blockId}:${dateISO}`) === 'true'
  } catch {
    return false
  }
}

function getYesterdayInfo(): { key: DayKey; dateISO: string } {
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)

  const todayKey = getTodayKey()
  const todayIndex = DAY_ORDER.indexOf(todayKey)
  const yesterdayKey = todayIndex === 0 ? 'sun' : DAY_ORDER[todayIndex - 1]

  return {
    key: yesterdayKey,
    dateISO: yesterday.toISOString().split('T')[0],
  }
}

function calcRoutinePercent(dayKey: DayKey, dateISO: string): number {
  const daySchedule = schedule.find((d) => d.key === dayKey)
  if (!daySchedule || daySchedule.blocks.length === 0) return 0

  const done = daySchedule.blocks.filter((b) =>
    getHabitValue(dayKey, b.id, dateISO)
  ).length

  return Math.round((done / daySchedule.blocks.length) * 100)
}

function calcCorePercent(dayKey: DayKey, dateISO: string): number {
  const done = coreTasks.filter((t) =>
    getHabitValue(dayKey, t.id, dateISO)
  ).length
  return Math.round((done / coreTasks.length) * 100)
}

function getTimeOfDay(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'morning'
  if (hour < 17) return 'afternoon'
  return 'evening'
}

function buildPromptContext(): string {
  const todayKey     = getTodayKey()
  const todayISO     = getTodayISO()
  const yesterday    = getYesterdayInfo()
  const yesterdayPct = calcRoutinePercent(yesterday.key, yesterday.dateISO)
  const todayCorePct = calcCorePercent(todayKey, todayISO)
  const timeOfDay    = getTimeOfDay()
  const todayLabel   = DAY_LABELS[todayKey]

  const chalisaDone = coreTasks
    .filter((t) => t.id === 'core-chalisa')
    .every((t) => getHabitValue(todayKey, t.id, todayISO))

  return `Today is ${todayLabel} ${timeOfDay}.
Yesterday's routine completion: ${yesterdayPct}%.
Today's core tasks completion so far: ${todayCorePct}%.
Hanuman Chalisa done today: ${chalisaDone ? 'yes' : 'no'}.`
}

export interface MorningCoachState {
  message: string
  loading: boolean
  error: string | null
  refresh: () => void
}

export function useMorningCoach(): MorningCoachState {
  const [message, setMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError]     = useState<string | null>(null)

  async function fetchMessage(force = false): Promise<void> {
    // Check cache first — one call per day unless forced
    if (!force) {
      try {
        const cached = localStorage.getItem(getCacheKey())
        if (cached) {
          setMessage(cached)
          return
        }
      } catch {
        // continue to fetch
      }
    }

    setLoading(true)
    setError(null)
    setMessage('')

    const systemPrompt = `You are a warm, concise personal coach for someone building daily habits.
Write a short motivational message (3–4 sentences maximum) to start their day.
Be specific to their data — never generic.
If Hanuman Chalisa is not done, mention it should be the very first task.
If yesterday was below 50%, acknowledge it briefly and focus on today.
If yesterday was above 80%, give a genuine compliment.
Always end with exactly one clear action they should do first right now.
Tone: warm, direct, personal. Never cheesy or overly enthusiastic.`

    try {
      const context = buildPromptContext()
      const result  = await askGemini(
        systemPrompt,
        [{ role: 'user', content: context }],
        200,
      )

      setMessage(result)

      try {
        localStorage.setItem(getCacheKey(), result)
      } catch {
        // storage full — ignore
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error'
      setError(`Could not load coach message: ${msg}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void fetchMessage(false)
  }, [])

  function refresh(): void {
    void fetchMessage(true)
  }

  return { message, loading, error, refresh }
}