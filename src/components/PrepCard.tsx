import type { PrepSession } from '../types'
import { useHabitTracker } from '../hooks/useHabitTracker'

const typeStyle: Record<string, { iconBg: string; badge: string; card: string }> = {
  ielts: {
    iconBg: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
    badge:  'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
    card:   'border-green-100 dark:border-green-900',
  },
  gre: {
    iconBg: 'bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300',
    badge:  'bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300',
    card:   'border-violet-100 dark:border-violet-900',
  },
  both: {
    iconBg: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
    badge:  'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
    card:   'border-amber-100 dark:border-amber-900',
  },
}

const badgeLabel: Record<string, string> = {
  ielts: 'IELTS',
  gre:   'GRE',
  both:  'Both',
}

interface Props {
  readonly session: PrepSession
  readonly dayKey: string
}

export function PrepCard({ session, dayKey }: Props) {
  const { done, toggle } = useHabitTracker(dayKey, session.id)
  const style = typeStyle[session.type]

  return (
    <button
  type="button"
  onClick={toggle}
  className={`w-full text-left rounded-xl border px-4 py-3 flex flex-col gap-3 cursor-pointer transition-all duration-200 ${
    done
      ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
      : `bg-white dark:bg-gray-800 ${style.card} hover:border-gray-300`
  }`}
>
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 ${style.iconBg}`}>
          {session.icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-semibold leading-snug ${
            done ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-900 dark:text-gray-100'
          }`}>
            {session.title}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{session.time}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${style.badge}`}>
            {badgeLabel[session.type]}
          </span>
          <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
            done ? 'bg-green-500 border-green-500' : 'border-gray-300 dark:border-gray-600'
          }`}>
            {done && (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
        </div>
      </div>

      {/* Tasks — hidden when done */}
      {!done && (
        <ul className="flex flex-col gap-1.5 pl-1">
          {session.tasks.map((task) => (
            <li key={task.id} className="flex items-baseline gap-2 text-xs text-gray-500 dark:text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 shrink-0 mt-1" />
              {task.text}
            </li>
          ))}
        </ul>
      )}

      {/* Resource — hidden when done */}
      {!done && session.resource && (
        <p className="text-xs font-medium text-violet-600 dark:text-violet-400">
          Resource: {session.resource}
        </p>
      )}
    </button>
  )
}