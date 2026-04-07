export interface CoreTask {
  id: string
  title: string
  description: string
  icon: string
  neverSkip: boolean
}

export const coreTasks: CoreTask[] = [
  {
    id: 'core-chalisa',
    title: 'Hanuman Chalisa × 7',
    description: 'Recite Hanuman Chalisa 7 times — non-negotiable, every single day',
    icon: 'H',
    neverSkip: true,
  },
  {
    id: 'core-faceyoga',
    title: 'Face yoga',
    description: '15 minutes of face yoga — no skipping',
    icon: 'F',
    neverSkip: false,
  },
  {
    id: 'core-lumosity',
    title: 'Lumosity',
    description: 'Complete at least one Lumosity brain training session',
    icon: 'L',
    neverSkip: false,
  },
  {
    id: 'core-duolingo',
    title: 'Duolingo streak',
    description: 'Complete at least one unit — keep the streak alive',
    icon: 'D',
    neverSkip: false,
  },
  {
    id: 'core-github',
    title: 'GitHub commit',
    description: 'At least one meaningful commit pushed today',
    icon: 'G',
    neverSkip: false,
  },
  {
    id: 'core-coding',
    title: 'Coding problem',
    description: 'Solve at least one problem on CodeChef',
    icon: 'C',
    neverSkip: false,
  },
]