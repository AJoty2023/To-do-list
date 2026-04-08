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

export type PrepType = 'ielts' | 'gre' | 'both'

export interface PrepTask {
  id: string
  text: string
}

export interface PrepSession {
  id: string
  icon: string
  type: PrepType
  title: string
  time: string
  tasks: PrepTask[]
  resource?: string
}

export interface DayPrep {
  key: DayKey
  note: string
  sessions: PrepSession[]
}

export interface CustomBlock {
  id: string
  dayKey: DayKey
  time: string
  title: string
  description: string
  tags: Tag[]
  createdAt: string
}