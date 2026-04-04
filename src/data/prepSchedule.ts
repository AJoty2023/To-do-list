import type { DayPrep } from '../types'

export const prepSchedule: DayPrep[] = [
  {
    key: 'mon',
    note: 'Monday focus: IELTS Listening + GRE Vocabulary. Both fit in your 11am–12pm and 1:20pm–2pm free blocks. Keep Magoosh vocab app open during lunch.',
    sessions: [
      {
        id: 'mon-ielts',
        icon: 'I',
        type: 'ielts',
        title: 'Listening practice',
        time: '11:00–11:30 AM (Free Block A)',
        tasks: [
          { id: 'mon-ielts-1', text: "Open YouTube → search 'BBC 6 Minute English'" },
          { id: 'mon-ielts-2', text: 'Listen once without pause → write main idea' },
          { id: 'mon-ielts-3', text: 'Listen again → write 5 new words you hear' },
          { id: 'mon-ielts-4', text: 'Look up each word, write 1 sentence using it' },
        ],
        resource: 'BBC 6 Minute English (YouTube, free)',
      },
      {
        id: 'mon-gre',
        icon: 'G',
        type: 'gre',
        title: 'Vocabulary — 15 words',
        time: '1:20–1:45 PM (Free Block B)',
        tasks: [
          { id: 'mon-gre-1', text: 'Open Magoosh GRE Vocab app (free)' },
          { id: 'mon-gre-2', text: 'Study 15 new flashcard words' },
          { id: 'mon-gre-3', text: 'For each word: read definition + example sentence' },
          { id: 'mon-gre-4', text: 'Write 3 of the hardest words in your notebook with meaning' },
        ],
        resource: 'Magoosh GRE Vocab app (free on Android/iOS)',
      },
    ],
  },

  // 👉 Repeat SAME pattern for tue, wed, thu, fri, sat, sun

    {
    key: 'tue',
    note: 'Tuesday focus: IELTS Writing Task 2 (essay) + GRE Quantitative math. Writing is your biggest IELTS weak point to build — start early.',
    sessions: [
      {
        id: 'tue-ielts',
        icon: 'I',
        type: 'ielts',
        title: 'Writing Task 2 — essay practice',
        time: '11:00–11:35 AM (Free Block A)',
        tasks: [
          { id: 'tue-ielts-1', text: 'Go to ieltsliz.com → Writing → Task 2 lessons' },
          { id: 'tue-ielts-2', text: 'Read one model essay (Band 7–8 example)' },
          { id: 'tue-ielts-3', text: 'Study its structure: Intro → Body 1 → Body 2 → Conclusion' },
          { id: 'tue-ielts-4', text: 'Write your own 4-line outline on the same topic' },
          { id: 'tue-ielts-5', text: 'Next Tuesday: write a full 250-word essay on it' },
        ],
        resource: 'ieltsliz.com (free) — Writing Task 2 section',
      },
      {
        id: 'tue-gre',
        icon: 'G',
        type: 'gre',
        title: 'Quantitative math — 10 problems',
        time: '1:20–1:50 PM (Free Block B)',
        tasks: [
          { id: 'tue-gre-1', text: 'Go to Khan Academy → search topic (e.g. GRE algebra)' },
          { id: 'tue-gre-2', text: 'Watch 1 short concept video (5–8 min)' },
          { id: 'tue-gre-3', text: 'Solve 10 practice problems from that topic' },
          { id: 'tue-gre-4', text: 'Mark wrong answers — note WHY you got them wrong' },
        ],
        resource: 'Khan Academy (free) → ETS.org for topic list',
      },
    ],
  },
  {
    key: 'wed',
    note: 'Wednesday is upload day so prep is lighter. Vocabulary review only — under 30 min total.',
    sessions: [
      {
        id: 'wed-both',
        icon: 'B',
        type: 'both',
        title: 'Vocabulary — IELTS + GRE review',
        time: '11:00–11:30 AM (Free Block A)',
        tasks: [
          { id: 'wed-both-1', text: 'IELTS: read 1 short article on BBC/Guardian' },
          { id: 'wed-both-2', text: 'Pick 5 advanced words and write meanings' },
          { id: 'wed-both-3', text: "GRE: review Monday's 15 words" },
          { id: 'wed-both-4', text: 'Mark known vs unknown words' },
        ],
        resource: 'BBC/Guardian + Magoosh app',
      },
    ],
  },
  {
    key: 'thu',
    note: 'Thursday focus: IELTS Speaking + GRE Verbal reading.',
    sessions: [
      {
        id: 'thu-ielts',
        icon: 'I',
        type: 'ielts',
        title: 'Speaking practice',
        time: '11:00–11:30 AM (Free Block A)',
        tasks: [
          { id: 'thu-ielts-1', text: 'Pick 3 IELTS Part 1 questions' },
          { id: 'thu-ielts-2', text: 'Record answers (30–60 sec each)' },
          { id: 'thu-ielts-3', text: 'Listen and note mistakes' },
          { id: 'thu-ielts-4', text: 'Practice 1 Part 2 cue card (2 min)' },
        ],
        resource: 'ieltsliz.com Speaking',
      },
      {
        id: 'thu-gre',
        icon: 'G',
        type: 'gre',
        title: 'Reading comprehension',
        time: '1:20–1:45 PM (Free Block B)',
        tasks: [
          { id: 'thu-gre-1', text: 'Watch 1 GRE RC strategy video (GregMat)' },
          { id: 'thu-gre-2', text: 'Practice 1 passage' },
          { id: 'thu-gre-3', text: 'Note unknown words' },
        ],
        resource: 'GregMat + ETS.org',
      },
    ],
  },
  {
    key: 'fri',
    note: 'Friday focus: IELTS Reading + GRE Vocabulary.',
    sessions: [
      {
        id: 'fri-ielts',
        icon: 'I',
        type: 'ielts',
        title: 'Reading practice',
        time: '11:00–11:35 AM (Free Block A)',
        tasks: [
          { id: 'fri-ielts-1', text: 'Do 1 reading passage' },
          { id: 'fri-ielts-2', text: 'Read questions first' },
          { id: 'fri-ielts-3', text: 'Check answers' },
          { id: 'fri-ielts-4', text: 'Analyze mistakes' },
        ],
        resource: 'ieltsmaterial.com',
      },
      {
        id: 'fri-gre',
        icon: 'G',
        type: 'gre',
        title: 'Vocabulary — new words',
        time: '1:20–1:45 PM (Free Block B)',
        tasks: [
          { id: 'fri-gre-1', text: 'Learn 15 new words (Magoosh)' },
          { id: 'fri-gre-2', text: 'Write sentences for hard words' },
          { id: 'fri-gre-3', text: 'Quick review Monday words' },
        ],
        resource: 'Magoosh app',
      },
    ],
  },
  {
    key: 'sat',
    note: 'Saturday: IELTS Writing Task 1 + GRE Analytical Writing.',
    sessions: [
      {
        id: 'sat-ielts',
        icon: 'I',
        type: 'ielts',
        title: 'Writing Task 1',
        time: '11:00–11:35 AM',
        tasks: [
          { id: 'sat-ielts-1', text: 'Study Task 1 template' },
          { id: 'sat-ielts-2', text: 'Pick 1 graph' },
          { id: 'sat-ielts-3', text: 'Write 150 words' },
          { id: 'sat-ielts-4', text: 'Compare with model answer' },
        ],
        resource: 'ieltsliz.com',
      },
      {
        id: 'sat-gre',
        icon: 'G',
        type: 'gre',
        title: 'GRE writing',
        time: '1:20–1:50 PM',
        tasks: [
          { id: 'sat-gre-1', text: 'Pick 1 Issue topic' },
          { id: 'sat-gre-2', text: 'Write outline' },
          { id: 'sat-gre-3', text: 'Optional full essay' },
        ],
        resource: 'ETS.org + GregMat',
      },
    ],
  },
  {
    key: 'sun',
    note: 'Sunday: IELTS Speaking mock + GRE weekly review.',
    sessions: [
      {
        id: 'sun-ielts',
        icon: 'I',
        type: 'ielts',
        title: 'Full speaking mock',
        time: '11:00–11:35 AM',
        tasks: [
          { id: 'sun-ielts-1', text: 'Simulate full speaking test' },
          { id: 'sun-ielts-2', text: 'Record answers' },
          { id: 'sun-ielts-3', text: 'Evaluate performance' },
        ],
        resource: 'E2 IELTS YouTube',
      },
      {
        id: 'sun-gre',
        icon: 'G',
        type: 'gre',
        title: 'Weekly vocab review',
        time: '1:20–1:45 PM',
        tasks: [
          { id: 'sun-gre-1', text: 'Review all 30 words' },
          { id: 'sun-gre-2', text: 'Self quiz' },
          { id: 'sun-gre-3', text: 'Mark weak words' },
        ],
        resource: 'Notebook + Magoosh',
      },
    ],
  },

]