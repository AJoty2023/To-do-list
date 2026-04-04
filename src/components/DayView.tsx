import type { DaySchedule } from '../types'
import { BlockCard } from './BlockCard'

const ytBadgeStyle: Record<string, string> = {
  long:  'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
  short: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  off:   'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
}

const ytBadgeLabel: Record<string, string> = {
  long:  'Long video upload day — 9 PM',
  short: 'Shorts creation day',
  off:   'YouTube off day',
}

interface Props {
  readonly day: DaySchedule
}

export function DayView({ day }: Props) {
  return (
    <div className="flex flex-col gap-4">

      {/* Day badge + note banner */}
      <div className="flex flex-col gap-2">
        <span className={`self-start text-xs font-semibold px-3 py-1 rounded-full ${ytBadgeStyle[day.ytBadge]}`}>
          {ytBadgeLabel[day.ytBadge]}
        </span>
        <div className="bg-violet-50 dark:bg-violet-900/20 border border-violet-100 dark:border-violet-800 rounded-xl px-4 py-3">
          <p className="text-xs font-semibold text-violet-700 dark:text-violet-300 mb-1 uppercase tracking-wide">
            Day note
          </p>
          <p className="text-sm text-violet-800 dark:text-violet-200 leading-relaxed">
            {day.note}
          </p>
        </div>
      </div>

      {/* Block list */}
      <div className="flex flex-col gap-3">
        {day.blocks.map((block) => (
          <BlockCard key={block.id} block={block} dayKey={day.key} />
        ))}
      </div>

    </div>
  )
}