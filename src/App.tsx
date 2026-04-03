import { useState } from 'react'
import { DayTabs } from './components/DayTabs'
import { DayView } from './components/DayView'
import { schedule } from './data/schedule'
import type { DayKey } from './types'

function getTodayKey(): DayKey {
  const idx = new Date().getDay()
  const map: DayKey[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
  return map[idx]
}

export default function App() {
  const [selectedDay, setSelectedDay] = useState<DayKey>(getTodayKey())
  const dayData = schedule.find((d) => d.key === selectedDay)!

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-medium mb-1">Daily Routine</h1>
          <p className="text-sm text-gray-400">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>

        <DayTabs selected={selectedDay} onChange={setSelectedDay} />
        <DayView day={dayData} />
      </div>
    </div>
  )
}