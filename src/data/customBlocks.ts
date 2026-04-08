import type { CustomBlock, DayKey } from '../types'

const STORAGE_KEY = 'custom-blocks'

function readAll(): CustomBlock[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as CustomBlock[]
  } catch {
    return []
  }
}

function writeAll(blocks: CustomBlock[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(blocks))
  } catch {
    // localStorage unavailable
  }
}

export function getCustomBlocksForDay(dayKey: DayKey): CustomBlock[] {
  return readAll().filter((b) => b.dayKey === dayKey)
}

export function addCustomBlock(block: CustomBlock): void {
  const all = readAll()
  writeAll([...all, block])
}

export function removeCustomBlock(id: string): void {
  const all = readAll()
  writeAll(all.filter((b) => b.id !== id))
}

export function updateCustomBlock(updated: CustomBlock): void {
  const all = readAll()
  writeAll(all.map((b) => (b.id === updated.id ? updated : b)))
}