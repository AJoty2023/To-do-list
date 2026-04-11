import { useMorningCoach } from '../hooks/useMorningCoach'

function SkeletonLine({ width }: { readonly width: string }) {
  return (
    <div
      className="h-3 bg-violet-100 dark:bg-violet-900/40 rounded-full animate-pulse"
      style={{ width }}
    />
  )
}

export function MorningCoach() {
  const { message, loading, error, refresh } = useMorningCoach()

  if (error) {
    return (
      <div className="rounded-xl border border-red-100 dark:border-red-900 bg-red-50 dark:bg-red-900/20 px-4 py-3 mb-4 flex items-center justify-between gap-3">
        <p className="text-xs text-red-500 dark:text-red-400 leading-relaxed">
          {error}
        </p>
        <button
          onClick={refresh}
          className="text-xs font-semibold text-red-600 dark:text-red-400 hover:underline shrink-0"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-violet-100 dark:border-violet-900 bg-violet-50 dark:bg-violet-900/20 px-4 py-4 mb-4">

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {/* Brain icon */}
          <div className="w-6 h-6 rounded-full bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center shrink-0">
            <svg
              width="14" height="14" viewBox="0 0 24 24"
              fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="text-violet-600 dark:text-violet-400"
            >
              <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.14Z"/>
              <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.14Z"/>
            </svg>
          </div>
          <p className="text-xs font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-wide">
            Daily coach
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 dark:text-gray-600">
            AI
          </span>
          {/* Refresh button — only when message is loaded */}
          {!loading && message && (
            <button
              onClick={refresh}
              aria-label="Refresh coach message"
              className="w-6 h-6 flex items-center justify-center rounded-lg text-gray-400 hover:text-violet-500 hover:bg-violet-100 dark:hover:bg-violet-900/40 transition-all"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 2v6h-6"/>
                <path d="M3 12a9 9 0 0 1 15-6.7L21 8"/>
                <path d="M3 22v-6h6"/>
                <path d="M21 12a9 9 0 0 1-15 6.7L3 16"/>
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex flex-col gap-2">
          <SkeletonLine width="100%" />
          <SkeletonLine width="85%" />
          <SkeletonLine width="70%" />
        </div>
      ) : (
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          {message}
        </p>
      )}

    </div>
  )
}