import type { Block } from '../types'

const tagMeta: Record<string, { label: string; className: string }> = {
  ielts:   { label: 'IELTS',    className: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300' },
  gre:     { label: 'GRE',      className: 'bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300' },
  youtube: { label: 'YouTube',  className: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300' },
  cpp:     { label: 'C++',      className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300' },
  github:  { label: 'GitHub',   className: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300' },
  skill:   { label: 'Skill',    className: 'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300' },
  prayer:  { label: 'Prayer',   className: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300' },
  walk:    { label: 'Walk',     className: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300' },
  meal:    { label: 'Meal',     className: 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300' },
  morning: { label: 'Morning',  className: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300' },
}

interface Props {
  readonly block: Block
}

export function BlockCard({ block }: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl px-4 py-3 flex flex-col gap-2">

      <div className="flex items-start justify-between gap-2">
        <span className="text-xs font-medium text-gray-400 dark:text-gray-500 whitespace-nowrap pt-0.5">
          {block.time}
        </span>
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
      </div>

      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-snug">
        {block.title}
      </p>

      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
        {block.description}
      </p>

    </div>
  )
}