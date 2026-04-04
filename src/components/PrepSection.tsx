import { prepSchedule } from '../data/prepSchedule'
import type { DayKey } from '../types'
import { PrepCard } from './PrepCard'

const stats = [
  { label: 'Daily IELTS time', value: '25–35 min' },
  { label: 'Daily GRE time',   value: '20–30 min' },
  { label: 'Total daily prep', value: '~55 min' },
  { label: 'Ready in',         value: '2–3 months' },
]

interface Props {
  readonly dayKey: DayKey
}

export function PrepSection({ dayKey }: Props) {
  const dayPrep = prepSchedule.find((d) => d.key === dayKey)

  return (
    <div className="flex flex-col gap-4">
      {/* Stats row */}
      <div className="grid grid-cols-2 gap-2">
        {stats.map((s) => (
          <div key={s.label} className="bg-gray-50 dark:bg-gray-800 rounded-xl px-3 py-2.5">
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">{s.label}</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex gap-4 flex-wrap">
        {[
          { color: 'bg-green-400', label: 'IELTS' },
          { color: 'bg-violet-400', label: 'GRE' },
          { color: 'bg-amber-400', label: 'Both / Shared' },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-1.5">
            <div className={`w-2.5 h-2.5 rounded-full ${l.color}`} />
            <span className="text-xs text-gray-500 dark:text-gray-400">{l.label}</span>
          </div>
        ))}
      </div>

      {/* Day note */}
      {dayPrep && (
        <div className="bg-violet-50 dark:bg-violet-900/20 border border-violet-100 dark:border-violet-800 rounded-xl px-4 py-3">
          <p className="text-xs font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-wide mb-1">
            Today's focus
          </p>
          <p className="text-sm text-violet-800 dark:text-violet-200 leading-relaxed">
            {dayPrep.note}
          </p>
        </div>
      )}

      {/* Session cards */}
      {dayPrep ? (
        <div className="flex flex-col gap-3">
          {dayPrep.sessions.map((session) => (
            <PrepCard key={session.id} session={session} dayKey={dayKey} />
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-6 text-center">
          <p className="text-sm text-gray-400">No prep sessions for this day</p>
        </div>
      )}
    </div>
  )
}