import { useState } from 'react'
import type { RecoveryInfo } from '../hooks/useStreakProtection'

interface Props {
  readonly recovery: RecoveryInfo
}

function ProgressRing({ percent }: { readonly percent: number }) {
  const radius = 16
  const circumference = 2 * Math.PI * radius
  const filled = ((100 - percent) / 100) * circumference

  return (
    <svg width="44" height="44" viewBox="0 0 44 44" className="shrink-0">
      {/* Background ring */}
      <circle
        cx="22" cy="22" r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        className="text-red-100 dark:text-red-900/40"
      />
      {/* Progress ring */}
      <circle
        cx="22" cy="22" r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeDasharray={circumference}
        strokeDashoffset={filled}
        strokeLinecap="round"
        transform="rotate(-90 22 22)"
        className="text-red-400 dark:text-red-500"
      />
      {/* Percent text */}
      <text
        x="22" y="26"
        textAnchor="middle"
        fontSize="9"
        fontWeight="600"
        className="fill-red-600 dark:fill-red-400"
        fill="currentColor"
      >
        {percent}%
      </text>
    </svg>
  )
}

export function RecoveryBanner({ recovery }: Props) {
  const [expanded, setExpanded] = useState(true)
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div className="rounded-xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/20 overflow-hidden mb-4">

      {/* Header row */}
      <div className="flex items-center gap-3 px-4 py-3">
        <ProgressRing percent={recovery.missedPercent} />

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-red-700 dark:text-red-300">
            Recovery mode
          </p>
          <p className="text-xs text-red-500 dark:text-red-400 mt-0.5">
            {recovery.missedDayLabel} was {recovery.missedPercent}% complete
          </p>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {/* Expand/collapse */}
          <button
            onClick={() => setExpanded((p) => !p)}
            aria-label={expanded ? 'Collapse' : 'Expand'}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 transition-all"
          >
            <svg
              width="14" height="14" viewBox="0 0 14 14" fill="none"
              className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
            >
              <path d="M2 5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Dismiss */}
          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss recovery banner"
            className="w-7 h-7 flex items-center justify-center rounded-lg text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 transition-all"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 2l8 8M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Tips — collapsible */}
      {expanded && (
        <div className="border-t border-red-100 dark:border-red-900/60 px-4 py-3 flex flex-col gap-2.5">
          <p className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wide">
            Catch-up suggestions
          </p>

          {recovery.tips.map((tip) => (
            <div
              key={tip.tag}
              className="flex items-start gap-2.5"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-red-400 dark:bg-red-500 shrink-0 mt-1.5" />
              <div>
                <p className="text-xs font-semibold text-red-700 dark:text-red-300">
                  {tip.shortMessage}
                </p>
                <p className="text-xs text-red-500 dark:text-red-400 leading-relaxed mt-0.5">
                  {tip.suggestion}
                </p>
              </div>
            </div>
          ))}

          {/* Motivational footer */}
          <p className="text-xs text-red-400 dark:text-red-500 mt-1 italic">
            One missed day doesn't break the habit. Today is what matters.
          </p>
        </div>
      )}

    </div>
  )
}