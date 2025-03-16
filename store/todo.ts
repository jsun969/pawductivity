import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { useCoinsStore } from './coin';

import { TODO_DIFFICULTY_TO_COINS, TodoDifficulty } from '~/constants';
import { storage } from '~/lib/zustand-storage';
import { isAfterToday } from '~/utils/is-after-today';

export type Todo = {
  name: string;
  date: Date;
  note?: string;
  completed: boolean;
  difficulty: TodoDifficulty;
};

export interface TodoState {
  todos: Map<string, Todo>;
  addTodo: (todo: Todo) => void;
  removeTodo: (id: string) => void;
  toggleTodoComplete: (id: string) => void;
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      todos: new Map(),
      addTodo: (todo) => {
        const id = uuid();
        set((state) => {
          const newTodos = new Map(state.todos);
          newTodos.set(id, todo);
          return { todos: newTodos };
        });
      },
      removeTodo: (id) =>
        set((state) => {
          state.todos.delete(id);
          return { todos: new Map(state.todos) };
        }),
      toggleTodoComplete: (id) =>
        set((state) => {
          const todo = state.todos.get(id);
          if (!todo) return state;
          const { setCoins } = useCoinsStore.getState();
          const isOverdue = isAfterToday(todo.date);
          if (!isOverdue) {
            if (!todo.completed) {
              setCoins((coins) => coins + TODO_DIFFICULTY_TO_COINS[todo.difficulty]);
            } else {
              setCoins((coins) => coins - TODO_DIFFICULTY_TO_COINS[todo.difficulty]);
            }
          }
          todo.completed = !todo.completed;
          return { todos: new Map(state.todos) };
        }),
    }),
    {
      name: 'todos',
      storage,
    }
  )
);
