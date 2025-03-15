import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { TodoDifficulty } from '~/constants';
import { useTodoStore } from '~/store/todo';
import { isAfterToday } from '~/utils/is-after-today';

const DIFFICULTY_COLORS: Record<TodoDifficulty, string> = {
  easy: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  hard: 'bg-red-100 text-red-800',
};

export default function TodoPage() {
  const { todos, toggleTodoComplete } = useTodoStore();

  // Sort todos: incomplete first (sorted by date), then completed (sorted by date)
  const sortedTodos = Array.from(todos).sort(([_, todoA], [__, todoB]) => {
    // First sort by completion status
    if (todoA.completed !== todoB.completed) {
      return todoA.completed ? 1 : -1;
    }
    // Then sort by date
    return todoA.date.getTime() - todoB.date.getTime();
  });

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Todo List',
        }}
      />
      <ScrollView>
        <View className="flex flex-1 flex-col gap-4 p-6">
          {sortedTodos.map(([id, todo]) => (
            <View
              key={id}
              className="flex-row items-center justify-between rounded-lg bg-white p-4 shadow">
              <View className="flex-1 pr-4">
                <Text className="text-xl font-medium">{todo.name}</Text>

                <View className="mt-2 flex-row gap-2">
                  <View
                    className={`flex-row items-center rounded-full px-2 py-1 ${isAfterToday(todo.date) && !todo.completed ? 'bg-red-100' : 'bg-gray-100'}`}>
                    <Ionicons
                      name="calendar"
                      size={12}
                      color={isAfterToday(todo.date) && !todo.completed ? '#B91C1C' : '#4B5563'}
                    />
                    <Text
                      className={`ml-1 text-xs ${isAfterToday(todo.date) && !todo.completed ? 'text-red-700' : 'text-slate-600'}`}>
                      {todo.date.toLocaleDateString()}
                    </Text>
                  </View>

                  {todo.difficulty && (
                    <View
                      className={`flex-row items-center rounded-full px-2 py-1 ${DIFFICULTY_COLORS[todo.difficulty]}`}>
                      <Ionicons
                        name="stats-chart"
                        size={12}
                        color={
                          {
                            easy: '#047857',
                            medium: '#92400E',
                            hard: '#B91C1C',
                          }[todo.difficulty]
                        }
                      />
                      <Text
                        className={`ml-1 text-xs ${DIFFICULTY_COLORS[todo.difficulty]} capitalize`}>
                        {todo.difficulty}
                      </Text>
                    </View>
                  )}
                </View>

                {todo.note && (
                  <Text className="mt-2 text-sm italic text-slate-500">{todo.note}</Text>
                )}
              </View>

              <TouchableOpacity
                onPress={() => toggleTodoComplete(id)}
                className={`${todo.completed ? 'border-blue-500 bg-blue-500' : 'border-gray-400'} h-6 w-6 items-center justify-center rounded border-2`}>
                {todo.completed && <Text className="text-white">✓</Text>}
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
}
