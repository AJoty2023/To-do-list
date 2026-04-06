import type { DayMode } from '../hooks/useDayMode'

interface ModeOption {
  key: DayMode
  label: string
  description: string
  activeClass: string
}

const OPTIONS: ModeOption[] = [
  {
    key: 'normal',
    label: 'Normal',
    description: 'Full routine',
    activeClass: 'bg-violet-600 text-white border-violet-600',
  },
  {
    key: 'flexible',
    label: 'Flexible',
    description: 'Core tasks only',
    activeClass: 'bg-amber-500 text-white border-amber-500',
  },
  {
    key: 'off',
    label: 'Day off',
    description: 'Rest day',
    activeClass: 'bg-gray-500 text-white border-gray-500',
  },
]

interface Props {
  readonly mode: DayMode
  readonly onModeChange: (mode: DayMode) => void
}

export function DayModeToggle({ mode, onModeChange }: Props) {
  return (
    <div className="flex flex-col gap-2 mb-4">

      {/* Mode banner */}
      {mode !== 'normal' && (
        <div className={`rounded-xl px-4 py-2.5 border text-sm font-medium ${
          mode === 'flexible'
            ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300'
            : 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400'
        }`}>
          {mode === 'flexible'
            ? 'Flexible mode — only core tasks shown. Rest when needed.'
            : 'Day off — full rest. Core tasks are still here if you want them.'}
        </div>
      )}

      {/* Toggle buttons */}
      <div className="flex gap-2">
        {OPTIONS.map((option) => (
          <button
            key={option.key}
            onClick={() => onModeChange(option.key)}
            className={`flex-1 py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
              mode === option.key
                ? option.activeClass
                : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <span className="block">{option.label}</span>
            <span className={`block font-normal mt-0.5 ${
              mode === option.key ? 'opacity-80' : 'text-gray-400 dark:text-gray-500'
            }`}>
              {option.description}
            </span>
          </button>
        ))}
      </div>

    </div>
  )
}