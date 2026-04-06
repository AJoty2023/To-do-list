export interface CoreTask {
  id: string
  title: string
  description: string
  icon: string
}

export const coreTasks: CoreTask[] = [
  {
    id: 'core-lumosity',
    title: 'Lumosity',
    description: 'Complete at least one Lumosity brain training session',
    icon: 'L',
  },
  {
    id: 'core-duolingo',
    title: 'Duolingo streak',
    description: 'Complete at least one unit — keep the streak alive',
    icon: 'D',
  },
  {
    id: 'core-faceyoga',
    title: 'Face yoga',
    description: '15 minutes of face yoga — no skipping',
    icon: 'F',
  },
  {
    id: 'core-github',
    title: 'GitHub commit',
    description: 'At least one meaningful commit pushed today',
    icon: 'G',
  },
  {
    id: 'core-coding',
    title: 'Coding problem',
    description: 'Solve at least one problem on CodeChef',
    icon: 'C',
  },
]