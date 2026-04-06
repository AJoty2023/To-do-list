import { coreTasks } from '../data/coreTasks'
import { useHabitTracker } from '../hooks/useHabitTracker'
import type { DayMode } from '../hooks/useDayMode'

const iconColors: Record<string, string> = {
  L: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  D: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  F: 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300',
  G: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  C: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
}

function getCardClass(dimmed: boolean, done: boolean): string {
  if (dimmed) {
    return 'opacity-40 cursor-not-allowed bg-gray-50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-800'
  }
  if (done) {
    return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 cursor-pointer'
  }
  return 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 cursor-pointer hover:border-gray-300 dark:hover:border-gray-600'
}

function getTitleClass(done: boolean): string {
  if (done) return 'line-through text-gray-400 dark:text-gray-500'
  return 'text-gray-900 dark:text-gray-100'
}

function getCheckboxClass(done: boolean): string {
  if (done) return 'bg-green-500 border-green-500'
  return 'border-gray-300 dark:border-gray-600'
}

interface CoreTaskCardProps {
  readonly id: string
  readonly title: string
  readonly description: string
  readonly icon: string
  readonly dayKey: string
  readonly dimmed: boolean
}

function CoreTaskCard({
  id,
  title,
  description,
  icon,
  dayKey,
  dimmed,
}: CoreTaskCardProps) {
  const { done, toggle } = useHabitTracker(dayKey, id)

  return (
   <button
  type="button"
  onClick={dimmed ? undefined : toggle}
  disabled={dimmed}
  className={`w-full text-left flex items-center gap-3 rounded-xl px-4 py-3 border transition-all duration-200 ${getCardClass(
    dimmed,
    done
  )}`}
>
      {/* Icon */}
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 ${
        iconColors[icon] ?? 'bg-gray-100 text-gray-600'
      }`}>
        {icon}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-semibold leading-snug ${getTitleClass(done)}`}>
          {title}
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Checkbox */}
      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${getCheckboxClass(done)}`}>
        {done && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2 6l3 3 5-5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
    </button>
  )
}

interface Props {
  readonly dayKey: string
  readonly mode: DayMode
}

function getTodayISO(): string {
  return new Date().toISOString().split('T')[0]
}

function isTaskDone(dayKey: string, taskId: string): boolean {
  try {
    return localStorage.getItem(`habits:${dayKey}:${taskId}:${getTodayISO()}`) === 'true'
  } catch {
    return false
  }
}

function getCounterClass(doneCount: number, total: number): string {
  if (doneCount === total) {
    return 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300'
  }
  return 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
}

export function CoreTasks({ dayKey, mode }: Props) {
  const dimmed = mode === 'off'
  const doneCount = coreTasks.filter((task) => isTaskDone(dayKey, task.id)).length

  return (
    <div className="mb-4">
      {/* Section header */}
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide">
          Core tasks — always
        </p>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${getCounterClass(doneCount, coreTasks.length)}`}>
          {doneCount}/{coreTasks.length}
        </span>
      </div>

      {/* Task cards */}
      <div className="flex flex-col gap-2">
        {coreTasks.map((task) => (
          <CoreTaskCard
            key={task.id}
            id={task.id}
            title={task.title}
            description={task.description}
            icon={task.icon}
            dayKey={dayKey}
            dimmed={dimmed}
          />
        ))}
      </div>
    </div>
  )
}