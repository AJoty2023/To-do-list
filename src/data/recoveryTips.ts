import type { Tag } from '../types'

export interface RecoveryTip {
  tag: Tag | 'core'
  shortMessage: string
  suggestion: string
}

export const recoveryTips: RecoveryTip[] = [
  {
    tag: 'core',
    shortMessage: 'Core tasks missed',
    suggestion: 'Start today with Hanuman Chalisa and your 5 core tasks before anything else.',
  },
  {
    tag: 'ielts',
    shortMessage: 'IELTS prep skipped',
    suggestion: 'Do a double session today — 10 min listening + write one Task 2 outline.',
  },
  {
    tag: 'gre',
    shortMessage: 'GRE vocab missed',
    suggestion: 'Review yesterday\'s words first, then add 10 new ones instead of 15.',
  },
  {
    tag: 'cpp',
    shortMessage: 'C++ practice skipped',
    suggestion: 'Solve 5 problems today instead of 10 — quality over quantity on recovery days.',
  },
  {
    tag: 'github',
    shortMessage: 'GitHub commit missed',
    suggestion: 'Make at least 2 commits today — one for yesterday\'s missed work, one for today.',
  },
  {
    tag: 'skill',
    shortMessage: 'Skill video missed',
    suggestion: 'Watch today\'s video at 1.5x speed to catch up without losing much time.',
  },
  {
    tag: 'youtube',
    shortMessage: 'YouTube work missed',
    suggestion: 'Check your upload schedule — if a deadline is today, prioritise video work first.',
  },
]