import type { DaySchedule } from '../types'

const tagColors: Record<string, string> = {
  ielts:   'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
  gre:     'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
  youtube: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
  cpp:     'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  github:  'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  skill:   'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300',
  prayer:  'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  walk:    'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300',
  meal:    'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
  morning: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
}

const ytBadgeStyle: Record<string, string> = {
  long:  'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
  short: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  off:   'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
}

const ytBadgeLabel: Record<string, string> = {
  long:  'Long video upload day',
  short: 'Shorts creation day',
  off:   'YouTube off day',
}

interface Props {
  readonly day: DaySchedule
}

export function DayView({ day }: Props) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        <span className={`text-xs font-medium px-3 py-1 rounded-full ${ytBadgeStyle[day.ytBadge]}`}>
          {ytBadgeLabel[day.ytBadge]}
        </span>
      </div>

      <p className="text-sm text-violet-700 dark:text-violet-300 bg-violet-50 dark:bg-violet-900/20 rounded-lg px-4 py-3 mb-5 leading-relaxed">
        {day.note}
      </p>

      <div className="flex flex-col gap-3">
        {day.blocks.map((block) => (
          <div
            key={block.id}
            className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl px-4 py-3"
          >
            <p className="text-xs text-gray-400 mb-1">{block.time}</p>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
              {block.title}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-2">
              {block.description}
            </p>
            <div className="flex flex-wrap gap-1">
              {block.tags.map((tag) => (
                <span
                  key={tag}
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${tagColors[tag] ?? 'bg-gray-100 text-gray-600'}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}