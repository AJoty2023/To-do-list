import type { Block } from '../types'
import { useHabitTracker } from '../hooks/useHabitTracker'

const tagMeta: Record<string, { label: string; className: string }> = {
  ielts:   { label: 'IELTS',   className: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300' },
  gre:     { label: 'GRE',     className: 'bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300' },
  youtube: { label: 'YouTube', className: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300' },
  cpp:     { label: 'C++',     className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300' },
  github:  { label: 'GitHub',  className: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300' },
  skill:   { label: 'Skill',   className: 'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300' },
  prayer:  { label: 'Prayer',  className: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300' },
  walk:    { label: 'Walk',    className: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300' },
  meal:    { label: 'Meal',    className: 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300' },
  morning: { label: 'Morning', className: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300' },
}

interface Props {
  readonly block: Block
  readonly dayKey: string
}

export function BlockCard({ block, dayKey }: Props) {
  const { done, toggle } = useHabitTracker(dayKey, block.id)

return (
  <button
    onClick={toggle}
    type="button"
    className={`rounded-xl px-4 py-3 flex flex-col gap-2 cursor-pointer border transition-all duration-200 text-left ${
      done
        ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
        : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-500'
    }`}
  >
      <div className="flex items-start justify-between gap-2">
        <span className="text-xs font-medium text-gray-400 dark:text-gray-500 whitespace-nowrap pt-0.5">
          {block.time}
        </span>
        <div className="flex items-center gap-2">
          <div className="flex flex-wrap gap-1 justify-end">
            {block.tags.map((tag) => {
              const meta = tagMeta[tag]
              return (
                <span
                  key={tag}
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${meta?.className ?? 'bg-gray-100 text-gray-600'}`}
                >
                  {meta?.label ?? tag}
                </span>
              )
            })}
          </div>
          {/* Checkbox */}
          <div
            className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${
              done
                ? 'bg-green-500 border-green-500'
                : 'border-gray-300 dark:border-gray-600'
            }`}
          >
            {done && (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
        </div>
      </div>

      <p className={`text-sm font-semibold leading-snug transition-all duration-200 ${
        done ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-900 dark:text-gray-100'
      }`}>
        {block.title}
      </p>

      <p className={`text-xs leading-relaxed transition-all duration-200 ${
        done ? 'text-gray-300 dark:text-gray-600' : 'text-gray-500 dark:text-gray-400'
      }`}>
        {block.description}
      </p>
      </button>
)
}