export const gradientColors = {
  amber:   "from-amber-500 to-yellow-600",
  orange:  "from-orange-500 to-red-600",
  emerald: "from-emerald-500 to-teal-600",
  purple:  "from-purple-500 to-pink-600",
  blue:    "from-blue-500 to-indigo-600",
} as const;

export type GradientColor = keyof typeof gradientColors;
