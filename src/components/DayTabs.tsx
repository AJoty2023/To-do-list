import type { DayKey } from '../types'

const days: { key: DayKey; short: string }[] = [
  { key: 'mon', short: 'Mon' },
  { key: 'tue', short: 'Tue' },
  { key: 'wed', short: 'Wed' },
  { key: 'thu', short: 'Thu' },
  { key: 'fri', short: 'Fri' },
  { key: 'sat', short: 'Sat' },
  { key: 'sun', short: 'Sun' },
]

type Props = Readonly<{
  selected: DayKey
  onChange: (day: DayKey) => void
}>

export function DayTabs({ selected, onChange }: Props) {
  return (
    <div className="flex gap-2 flex-wrap mb-6">
      {days.map((d) => (
        <button
          key={d.key}
          onClick={() => onChange(d.key)}
          className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
            selected === d.key
              ? 'bg-violet-600 text-white border-violet-600'
              : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
        >
          {d.short}
        </button>
      ))}
    </div>
  )
}