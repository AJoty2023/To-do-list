export type Tag =
  | 'ielts'
  | 'gre'
  | 'cpp'
  | 'github'
  | 'youtube'
  | 'prayer'
  | 'walk'
  | 'meal'
  | 'morning'
  | 'skill'

export type DayKey = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'

export type YtBadge = 'long' | 'short' | 'off'

export interface Block {
  id: string
  time: string
  title: string
  description: string
  tags: Tag[]
  startHour: number
  endHour: number
}

export interface DaySchedule {
  key: DayKey
  label: string
  note: string
  ytBadge: YtBadge
  blocks: Block[]
}