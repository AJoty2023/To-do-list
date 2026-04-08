import { useState, useCallback } from 'react'
import type { CustomBlock, DayKey, Tag } from '../types'
import {
  getCustomBlocksForDay,
  addCustomBlock,
  removeCustomBlock,
  updateCustomBlock,
} from '../data/customBlocks'

function generateId(): string {
  return `custom-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

export interface NewBlockInput {
  time: string
  title: string
  description: string
  tags: Tag[]
}

export function useCustomBlocks(dayKey: DayKey) {
  const [blocks, setBlocks] = useState<CustomBlock[]>(() =>
    getCustomBlocksForDay(dayKey)
  )

  const refresh = useCallback(() => {
    setBlocks(getCustomBlocksForDay(dayKey))
  }, [dayKey])

  const add = useCallback(
    (input: NewBlockInput) => {
      const block: CustomBlock = {
        id: generateId(),
        dayKey,
        time: input.time,
        title: input.title,
        description: input.description,
        tags: input.tags,
        createdAt: new Date().toISOString(),
      }
      addCustomBlock(block)
      refresh()
    },
    [dayKey, refresh],
  )

  const remove = useCallback(
    (id: string) => {
      removeCustomBlock(id)
      refresh()
    },
    [refresh],
  )

  const update = useCallback(
    (updated: CustomBlock) => {
      updateCustomBlock(updated)
      refresh()
    },
    [refresh],
  )

  return { blocks, add, remove, update }
}