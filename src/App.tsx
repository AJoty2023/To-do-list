import { useState, useEffect } from 'react'
import { DayTabs } from './components/DayTabs'
import { DayView } from './components/DayView'
import { PrepSection } from './components/PrepSection'
import { Dashboard } from './components/Dashboard'
import { schedule } from './data/schedule'
import { useLiveClock } from './hooks/useCurrentBlock'
import type { DayKey } from './types'

type Section = 'routine' | 'prep' | 'dashboard'

function getTodayKey(): DayKey {
  const map: DayKey[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
  return map[new Date().getDay()]
}

const SECTIONS: { key: Section; label: string }[] = [
  { key: 'routine',   label: 'Routine' },
  { key: 'prep',      label: 'IELTS / GRE' },
  { key: 'dashboard', label: 'Progress' },
]

function requestNotificationPermission() {
  if ('Notification' in globalThis && Notification.permission === 'default') {
    void Notification.requestPermission()
  }
}

export default function App() {
  const [selectedDay, setSelectedDay] = useState<DayKey>(getTodayKey())
  const [section, setSection]         = useState<Section>('routine')
  const clock   = useLiveClock()
  const dayData = schedule.find((d) => d.key === selectedDay)!

  // Request notification permission once on mount
  useEffect(() => {
    requestNotificationPermission()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-2xl mx-auto px-4 py-8">

        {/* Header with live clock */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-medium mb-1">Daily Routine</h1>
            <p className="text-sm text-gray-400">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long', month: 'long', day: 'numeric',
              })}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xl font-semibold text-violet-600 dark:text-violet-400 font-mono">
              {clock}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">live</p>
          </div>
        </div>

        {/* Section toggle */}
        <div className="flex gap-1 mb-5 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl w-fit">
          {SECTIONS.map((s) => (
            <button
              key={s.key}
              onClick={() => setSection(s.key)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                section === s.key
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Day tabs */}
        {section !== 'dashboard' && (
          <DayTabs selected={selectedDay} onChange={setSelectedDay} />
        )}

        {/* Content */}
        {section === 'routine'   && <DayView day={dayData} />}
        {section === 'prep'      && <PrepSection dayKey={selectedDay} />}
        {section === 'dashboard' && <Dashboard />}

      </div>
    </div>
  )
}