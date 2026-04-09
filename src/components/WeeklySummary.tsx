import type { WeeklySummaryData } from '../hooks/useWeeklySummary'

function getWeekEmoji(percent: number): string {
  if (percent >= 80) return 'Excellent week'
  if (percent >= 60) return 'Solid week'
  if (percent >= 40) return 'Decent week'
  return 'Tough week'
}

function getWeekColor(percent: number): {
  container: string
  bar: string
  percent: string
} {
  if (percent >= 80) {
    return {
      container: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
      bar: '#10B981',
      percent: 'text-green-600 dark:text-green-400',
    }
  }
  if (percent >= 50) {
    return {
      container: 'bg-violet-50 dark:bg-violet-900/20 border-violet-200 dark:border-violet-800',
      bar: '#7C3AED',
      percent: 'text-violet-600 dark:text-violet-400',
    }
  }
  return {
    container: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800',
    bar: '#F59E0B',
    percent: 'text-amber-600 dark:text-amber-400',
  }
}

function getDayBarColor(percent: number): string {
  if (percent >= 80) return '#10B981'
  if (percent >= 50) return '#7C3AED'
  if (percent > 0)   return '#F59E0B'
  return '#E5E7EB'
}

interface MiniBarProps {
  readonly percent: number
  readonly label: string
}

function MiniBar({ percent, label }: MiniBarProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="h-16 w-6 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden flex flex-col-reverse">
        <div
          className="w-full rounded-full transition-all duration-500"
          style={{
            height: `${percent}%`,
            backgroundColor: getDayBarColor(percent),
          }}
        />
      </div>
      <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">
        {label}
      </span>
      <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">
        {percent}%
      </span>
    </div>
  )
}

interface Props {
  readonly data: WeeklySummaryData
}

export function WeeklySummary({ data }: Props) {
  const colors = getWeekColor(data.weekPercent)

  return (
    <div className={`rounded-xl border px-4 py-4 flex flex-col gap-4 mb-4 ${colors.container}`}>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">
            This week
          </p>
          <p className={`text-2xl font-bold ${colors.percent}`}>
            {data.weekPercent}%
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            {getWeekEmoji(data.weekPercent)}
          </p>
        </div>

        {/* Quick stats */}
        <div className="flex flex-col gap-1.5 text-right">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            <span className="font-semibold text-gray-700 dark:text-gray-200">
              {data.fullDays}
            </span> perfect days
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Core tasks:{' '}
            <span className="font-semibold text-gray-700 dark:text-gray-200">
              {data.coreWeekPercent}%
            </span>
          </div>
          {data.bestDay && (
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Best:{' '}
              <span className="font-semibold text-gray-700 dark:text-gray-200">
                {data.bestDay.label}
              </span>
            </div>
          )}
          {data.worstDay && data.worstDay.routinePercent < 80 && (
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Missed most:{' '}
              <span className="font-semibold text-gray-700 dark:text-gray-200">
                {data.worstDay.label}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Day bars */}
      <div className="flex justify-between items-end px-2">
        {data.daySummaries.map((day) => (
          <MiniBar
            key={day.key}
            percent={day.routinePercent}
            label={day.label.slice(0, 3)}
          />
        ))}
      </div>

      {/* Core task week bar */}
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
            Core tasks this week
          </p>
          <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">
            {data.coreWeekPercent}%
          </span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${data.coreWeekPercent}%`,
              backgroundColor: getDayBarColor(data.coreWeekPercent),
            }}
          />
        </div>
      </div>

      {/* Sunday message */}
      <p className="text-xs text-gray-400 dark:text-gray-500 italic text-center border-t border-gray-200 dark:border-gray-700 pt-3">
        A notification summary will fire at 8 PM tonight.
        New week starts tomorrow — fresh slate.
      </p>

    </div>
  )
}