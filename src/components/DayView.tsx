import { useEffect, useRef, useState } from 'react'
import type { DaySchedule } from '../types'
import { BlockCard } from './BlockCard'
import { CoreTasks } from './CoreTasks'
import { DayModeToggle } from './DayModeToggle'
import { CustomBlockCard } from './CustomBlockCard'
import { CustomBlockEditor } from './CustomBlockEditor'
import { RecoveryBanner } from './RecoveryBanner'
import { useCurrentBlock } from '../hooks/useCurrentBlock'
import { useDayMode } from '../hooks/useDayMode'
import { useCustomBlocks } from '../hooks/useCustomBlocks'
import { useStreakProtection } from '../hooks/useStreakProtection'
import { MorningCoach } from './MorningCoach'

const ytBadgeStyle: Record<string, string> = {
  long:  'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
  short: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  off:   'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
}

const ytBadgeLabel: Record<string, string> = {
  long:  'Long video upload day — 9 PM',
  short: 'Shorts creation day',
  off:   'YouTube off day',
}

function getTodayKey(): string {
  const map = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
  return map[new Date().getDay()]
}

interface Props {
  readonly day: DaySchedule
}

export function DayView({ day }: Props) {
  const activeId                      = useCurrentBlock(day.blocks)
  const activeRef                     = useRef<HTMLDivElement>(null)
  const { mode, setMode }             = useDayMode()
  const { blocks: customBlocks, add, remove } = useCustomBlocks(day.key)
  const [showEditor, setShowEditor]   = useState(false)
  const recovery                      = useStreakProtection()
  const isToday                       = day.key === getTodayKey()

  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [activeId, day.key])

  const visibleBlocks = mode === 'normal'
    ? day.blocks
    : day.blocks.filter((b) =>
        b.tags.some((t) => ['meal', 'prayer', 'morning'].includes(t))
      )

  return (
    <div className="flex flex-col gap-4">

      {/* Recovery banner — only on today's view */}
      {isToday && recovery.isRecoveryDay && (
        <RecoveryBanner recovery={recovery} />
      )}

      {/* Badge + day note */}
      <div className="flex flex-col gap-2">
        <span className={`self-start text-xs font-semibold px-3 py-1 rounded-full ${ytBadgeStyle[day.ytBadge]}`}>
          {ytBadgeLabel[day.ytBadge]}
        </span>
        <div className="bg-violet-50 dark:bg-violet-900/20 border border-violet-100 dark:border-violet-800 rounded-xl px-4 py-3">
          <p className="text-xs font-semibold text-violet-700 dark:text-violet-300 mb-1 uppercase tracking-wide">
            Day note
          </p>
          <p className="text-sm text-violet-800 dark:text-violet-200 leading-relaxed">
            {day.note}
          </p>
        </div>
      </div>

      {/* Day mode toggle */}
      <DayModeToggle mode={mode} onModeChange={setMode} />

      {/* Core tasks */}
      <CoreTasks dayKey={day.key} mode={mode} />

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-100 dark:bg-gray-800" />
        <span className="text-xs text-gray-400 dark:text-gray-600 font-medium">
          {mode === 'normal' ? 'Full routine' : 'Essentials only'}
        </span>
        <div className="flex-1 h-px bg-gray-100 dark:bg-gray-800" />
      </div>

      {/* Routine blocks */}
      {mode === 'off' ? (
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl px-4 py-6 text-center border border-gray-100 dark:border-gray-800">
          <p className="text-sm font-medium text-gray-400 dark:text-gray-500">
            Day off — routine hidden
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">
            Rest well. Core tasks above are still available.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {visibleBlocks.map((block) => {
            const isActive = block.id === activeId
            return (
              <div key={block.id} ref={isActive ? activeRef : null}>
                <BlockCard
                  block={block}
                  dayKey={day.key}
                  isActive={isActive}
                />
              </div>
            )
          })}

          {mode === 'flexible' && visibleBlocks.length === 0 && (
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl px-4 py-4 text-center border border-amber-100 dark:border-amber-800">
              <p className="text-sm text-amber-700 dark:text-amber-300">
                No essential blocks for this day
              </p>
            </div>
          )}
        </div>
      )}

      {/* Recovery banner — only on today's view */}
{isToday && recovery.isRecoveryDay && (
  <RecoveryBanner recovery={recovery} />
)}

{/* AI morning coach — today only */}
{isToday && <MorningCoach />}

{/* Badge + day note */}
<div className="flex flex-col gap-2"></div>

      {/* Custom blocks */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-100 dark:bg-gray-800" />
          <span className="text-xs text-gray-400 dark:text-gray-600 font-medium">
            your additions
          </span>
          <div className="flex-1 h-px bg-gray-100 dark:bg-gray-800" />
        </div>

        {customBlocks.length > 0 && (
          <div className="flex flex-col gap-3">
            {customBlocks.map((block) => (
              <CustomBlockCard
                key={block.id}
                block={block}
                onDelete={remove}
              />
            ))}
          </div>
        )}

        {showEditor ? (
          <CustomBlockEditor
            onAdd={(input) => {
              add(input)
              setShowEditor(false)
            }}
            onCancel={() => setShowEditor(false)}
          />
        ) : (
          <button
            onClick={() => setShowEditor(true)}
            className="w-full py-2.5 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 text-sm text-gray-400 dark:text-gray-500 hover:border-violet-300 dark:hover:border-violet-700 hover:text-violet-500 dark:hover:text-violet-400 transition-all"
          >
            + add a block to this day
          </button>
        )}
      </div>

    </div>
  )
}