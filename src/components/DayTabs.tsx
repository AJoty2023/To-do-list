import type { DayKey } from '../types'

const days: { key: DayKey; short: string; full: string }[] = [
  { key: 'mon', short: 'Mon', full: 'Monday' },
  { key: 'tue', short: 'Tue', full: 'Tuesday' },
  { key: 'wed', short: 'Wed', full: 'Wednesday' },
  { key: 'thu', short: 'Thu', full: 'Thursday' },
  { key: 'fri', short: 'Fri', full: 'Friday' },
  { key: 'sat', short: 'Sat', full: 'Saturday' },
  { key: 'sun', short: 'Sun', full: 'Sunday' },
]

interface Props {
  readonly selected: DayKey
  readonly onChange: (day: DayKey) => void
}

export function DayTabs({ selected, onChange }: Props) {
  return (
    <div className="overflow-x-auto pb-1 mb-4 -mx-4 px-4 scrollbar-none">
      <div className="flex gap-2 w-max min-w-full">
        {days.map((d) => (
          <button
            key={d.key}
            onClick={() => onChange(d.key)}
            aria-label={d.full}
            className={`px-4 py-2 rounded-lg text-sm font-medium border whitespace-nowrap transition-all shrink-0 ${
              selected === d.key
                ? 'bg-violet-600 text-white border-violet-600'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            {d.short}
          </button>
        ))}
      </div>
    </div>
  )
}