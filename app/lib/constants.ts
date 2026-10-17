export const HOLD_DURATION = 1200;

export const LETTERS = [
  {
    letter: "К",
    step: "Step 01",
    back: "from-pink-500 to-purple-600 border-pink-300/60 shadow-pink-500/30",
    label: "text-pink-100/80",
  },
  {
    letter: "А",
    step: "Step 02",
    back: "from-purple-500 to-indigo-600 border-purple-300/60 shadow-purple-500/30",
    label: "text-purple-100/80",
  },
  {
    letter: "Т",
    step: "Step 03",
    back: "from-indigo-500 to-blue-600 border-indigo-300/60 shadow-indigo-500/30",
    label: "text-indigo-100/80",
  },
  {
    letter: "Я",
    step: "Step 04",
    back: "from-fuchsia-500 to-rose-500 border-fuchsia-300/60 shadow-fuchsia-500/30",
    label: "text-rose-100/90",
  },
] as const;

export type LetterCard = (typeof LETTERS)[number];
