import { useStats } from '../hooks/useStats'

type ProgressBarProps = {
  readonly percent: number
  readonly color?: string
}

function ProgressBar({ percent, color }: ProgressBarProps) {
  return (
    <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{
          width: `${percent}%`,
          backgroundColor: color ?? '#7C3AED',
        }}
      />
    </div>
  )
}

// Helper: decide progress color
function getProgressColor(percent: number): string {
  if (percent >= 80) return '#10B981'
  if (percent >= 50) return '#7C3AED'
  return '#F59E0B'
}

// Helper: streak styles
function getStreakStyles(streak: number) {
  if (streak >= 3) {
    return {
      container:
        'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
      text: 'text-green-700 dark:text-green-300',
      message: `${streak}-day streak — great consistency!`,
    }
  }

  if (streak >= 1) {
    return {
      container:
        'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800',
      text: 'text-amber-700 dark:text-amber-300',
      message: `${streak}-day streak — keep going!`,
    }
  }

  return {
    container:
      'bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700',
    text: 'text-gray-500',
    message: 'No streak yet — complete 80%+ today to start one',
  }
}

export function Dashboard() {
  const { dayStats, categoryStats, streak, todayPercent, weekPercent } =
    useStats()

  const streakStyles = getStreakStyles(streak)

  return (
    <div className="flex flex-col gap-6">

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl px-3 py-3 text-center">
          <p className="text-xs text-gray-400 mb-1">Today</p>
          <p className="text-2xl font-semibold text-violet-600 dark:text-violet-400">
            {todayPercent}%
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl px-3 py-3 text-center">
          <p className="text-xs text-gray-400 mb-1">This week</p>
          <p className="text-2xl font-semibold text-green-600 dark:text-green-400">
            {weekPercent}%
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl px-3 py-3 text-center">
          <p className="text-xs text-gray-400 mb-1">Streak</p>
          <p className="text-2xl font-semibold text-amber-500">
            {streak}
            <span className="text-sm font-normal text-gray-400 ml-0.5">d</span>
          </p>
        </div>
      </div>

      {/* Daily progress bars */}
      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl px-4 py-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">
          Daily completion this week
        </p>

        <div className="flex flex-col gap-3">
          {dayStats.map((day) => {
            const progressColor = getProgressColor(day.percent)

            return (
              <div key={day.key}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {day.label}
                  </span>

                  <span className="text-xs text-gray-400">
                    {day.done}/{day.total}
                    <span
                      className="ml-1.5 font-medium"
                      style={{ color: progressColor }}
                    >
                      {day.percent}%
                    </span>
                  </span>
                </div>

                <ProgressBar percent={day.percent} color={progressColor} />
              </div>
            )
          })}
        </div>
      </div>

      {/* Category breakdown */}
      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl px-4 py-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">
          Category breakdown — this week
        </p>

        <div className="flex flex-col gap-4">
          {categoryStats.map((cat) => (
            <div key={cat.label}>
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {cat.label}
                  </span>
                </div>

                <span className="text-xs text-gray-400">
                  {cat.done}/{cat.total}
                  <span
                    className="ml-1.5 font-medium"
                    style={{ color: cat.color }}
                  >
                    {cat.percent}%
                  </span>
                </span>
              </div>

              <ProgressBar percent={cat.percent} color={cat.color} />
            </div>
          ))}
        </div>
      </div>

      {/* Streak info */}
      <div
        className={`rounded-xl px-4 py-3 border ${streakStyles.container}`}
      >
        <p className={`text-sm font-semibold mb-0.5 ${streakStyles.text}`}>
          {streakStyles.message}
        </p>

        <p className="text-xs text-gray-400">
          A streak counts when you complete 80% or more of the day's routine
          blocks
        </p>
      </div>

    </div>
  )
}