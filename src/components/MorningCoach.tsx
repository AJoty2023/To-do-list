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

  return (
    <div className="rounded-xl border border-violet-100 dark:border-violet-900 bg-violet-50 dark:bg-violet-900/20 px-4 py-4">

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {/* Icon */}
          <div className="w-6 h-6 rounded-full bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center shrink-0">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-violet-600 dark:text-violet-400"
            >
              <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.14Z" />
              <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.14Z" />
            </svg>
          </div>

          <p className="text-xs font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-wide">
            Daily coach
          </p>
        </div>

        <button
          onClick={refresh}
          className="text-xs font-semibold text-violet-600 dark:text-violet-400 hover:underline"
        >
          Refresh
        </button>
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

      {/* Error */}
      {error && (
        <p className="text-xs text-red-500 dark:text-red-400 mt-2">
          {error}
        </p>
      )}
    </div>
  )
}