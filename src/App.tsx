import { useState } from 'react'
import { DayTabs } from './components/DayTabs'
import { DayView } from './components/DayView'
import { PrepSection } from './components/PrepSection'
import { Dashboard } from './components/Dashboard'
import { ThemeToggle } from './components/ThemeToggle'
import { WeeklySummary } from './components/WeeklySummary'
import { useDarkMode } from './hooks/useDarkMode'
import { useLiveClock } from './hooks/useCurrentBlock'
import { useWeeklySummary } from './hooks/useWeeklySummary'
import { schedule } from './data/schedule'
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

export default function App() {
  const [selectedDay, setSelectedDay] = useState<DayKey>(getTodayKey())
  const [section, setSection]         = useState<Section>('routine')
  const { isDark, toggle }            = useDarkMode()
  const clock                         = useLiveClock()
  const weeklySummary                 = useWeeklySummary()
  const dayData = schedule.find((d) => d.key === selectedDay)!

  const showWeeklySummary =
    weeklySummary.isSunday &&
    section === 'routine' &&
    selectedDay === 'sun'

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <div className="max-w-2xl mx-auto px-4 py-6 sm:py-8">

        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-medium mb-1 truncate">
              Daily Routine
            </h1>
            <p className="text-xs sm:text-sm text-gray-400">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long', month: 'long', day: 'numeric',
              })}
            </p>
          </div>

          <div className="flex items-center gap-2 ml-3 shrink-0">
            <div className="text-right hidden sm:block">
              <p className="text-lg font-semibold text-violet-600 dark:text-violet-400 font-mono">
                {clock}
              </p>
              <p className="text-xs text-gray-400">live</p>
            </div>
            <ThemeToggle isDark={isDark} onToggle={toggle} />
          </div>
        </div>

        {/* Live clock — mobile */}
        <div className="sm:hidden text-center mb-4">
          <p className="text-lg font-semibold text-violet-600 dark:text-violet-400 font-mono">
            {clock}
          </p>
        </div>

        {/* Section toggle */}
        <div className="flex gap-1 mb-5 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
          {SECTIONS.map((s) => (
            <button
              key={s.key}
              onClick={() => setSection(s.key)}
              className={`flex-1 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all text-center ${
                section === s.key
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
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

        {/* Weekly summary — Sunday only, routine tab, sun day selected */}
        {showWeeklySummary && <WeeklySummary data={weeklySummary} />}

        {/* Content */}
        {section === 'routine'   && <DayView day={dayData} />}
        {section === 'prep'      && <PrepSection dayKey={selectedDay} />}
        {section === 'dashboard' && <Dashboard />}

      </div>
    </div>
  )
}