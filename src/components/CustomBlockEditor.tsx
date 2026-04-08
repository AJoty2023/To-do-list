import { useState } from 'react'
import type { Tag } from '../types'
import type { NewBlockInput } from '../hooks/useCustomBlocks'

const AVAILABLE_TAGS: { value: Tag; label: string }[] = [
  { value: 'ielts',   label: 'IELTS' },
  { value: 'gre',     label: 'GRE' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'cpp',     label: 'C++' },
  { value: 'github',  label: 'GitHub' },
  { value: 'skill',   label: 'Skill' },
  { value: 'prayer',  label: 'Prayer' },
  { value: 'walk',    label: 'Walk' },
  { value: 'meal',    label: 'Meal' },
  { value: 'morning', label: 'Morning' },
]

const EMPTY_INPUT: NewBlockInput = {
  time: '',
  title: '',
  description: '',
  tags: [],
}

function getInputClass(hasError: boolean): string {
  const base = 'w-full rounded-xl px-3 py-2.5 text-sm border bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-all outline-none'
  if (hasError) {
    return `${base} border-red-300 dark:border-red-700 focus:border-red-400`
  }
  return `${base} border-gray-200 dark:border-gray-700 focus:border-violet-400 dark:focus:border-violet-500`
}

interface Props {
  readonly onAdd: (input: NewBlockInput) => void
  readonly onCancel: () => void
}

export function CustomBlockEditor({ onAdd, onCancel }: Props) {
  const [input, setInput] = useState<NewBlockInput>(EMPTY_INPUT)
  const [errors, setErrors] = useState<Partial<Record<keyof NewBlockInput, string>>>({})

  function toggleTag(tag: Tag): void {
    setInput((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }))
  }

  function validate(): boolean {
    const newErrors: Partial<Record<keyof NewBlockInput, string>> = {}
    if (!input.title.trim()) newErrors.title = 'Title is required'
    if (!input.time.trim())  newErrors.time  = 'Time is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(): void {
    if (!validate()) return
    onAdd(input)
    setInput(EMPTY_INPUT)
    setErrors({})
  }

  return (
    <div className="bg-white dark:bg-gray-800 border border-violet-200 dark:border-violet-800 rounded-xl px-4 py-4 flex flex-col gap-3">
      <p className="text-sm font-semibold text-violet-700 dark:text-violet-300">
        Add custom block
      </p>

      {/* Title */}
      <div>
        <input
          type="text"
          placeholder="Block title *"
          value={input.title}
          onChange={(e) => setInput((p) => ({ ...p, title: e.target.value }))}
          className={getInputClass(!!errors.title)}
        />
        {errors.title && (
          <p className="text-xs text-red-500 mt-1">{errors.title}</p>
        )}
      </div>

      {/* Time */}
      <div>
        <input
          type="text"
          placeholder="Time — e.g. 3:00–4:00 PM *"
          value={input.time}
          onChange={(e) => setInput((p) => ({ ...p, time: e.target.value }))}
          className={getInputClass(!!errors.time)}
        />
        {errors.time && (
          <p className="text-xs text-red-500 mt-1">{errors.time}</p>
        )}
      </div>

      {/* Description */}
      <textarea
        placeholder="Description (optional)"
        value={input.description}
        rows={2}
        onChange={(e) => setInput((p) => ({ ...p, description: e.target.value }))}
        className={`${getInputClass(false)} resize-none`}
      />

      {/* Tags */}
      <div>
        <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">
          Tags (optional)
        </p>
        <div className="flex flex-wrap gap-2">
          {AVAILABLE_TAGS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => toggleTag(value)}
              className={`text-xs px-3 py-1 rounded-full border font-medium transition-all ${
                input.tags.includes(value)
                  ? 'bg-violet-600 text-white border-violet-600'
                  : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-violet-300'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-1">
        <button
          onClick={handleSubmit}
          className="flex-1 py-2 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 transition-all"
        >
          Add block
        </button>
        <button
          onClick={onCancel}
          className="flex-1 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}