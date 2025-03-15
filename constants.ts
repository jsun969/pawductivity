export const TODO_DIFFICULTY = ['easy', 'medium', 'hard'] as const;
export type TodoDifficulty = (typeof TODO_DIFFICULTY)[number];
export const TODO_DIFFICULTY_TO_COINS: Record<TodoDifficulty, number> = {
  easy: 10,
  medium: 20,
  hard: 30,
};
