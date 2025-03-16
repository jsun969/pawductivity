import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { Text, TouchableOpacity, View, ImageBackground, StyleSheet } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';

import { TodoDifficulty } from '~/constants';
import { useTodoStore } from '~/store/todo';
import { useEquippedStore } from '~/store/equipped';
import { isAfterToday } from '~/utils/is-after-today';

const DIFFICULTY_COLORS: Record<TodoDifficulty, string> = {
  easy: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  hard: 'bg-red-100 text-red-800',
};

const STORE = [
  {
    category: 'Backgrounds',
    items: [
      {
        id: '5',
        name: 'Morning',
        filepath: require('../../assets/images/Backgrounds/Morning.png'),
      },
      {
        id: '6',
        name: 'Late Morning',
        filepath: require('../../assets/images/Backgrounds/Late_morning.png'),
      },
      {
        id: '7',
        name: 'Afternoon',
        filepath: require('../../assets/images/Backgrounds/Afternoon.png'),
      },
      {
        id: '8',
        name: 'Late Afternoon',
        filepath: require('../../assets/images/Backgrounds/Late_afternoon.png'),
      },
      {
        id: '9',
        name: 'Evening',
        filepath: require('../../assets/images/Backgrounds/Evening.png'),
      },
      {
        id: '10',
        name: 'Late Evening',
        filepath: require('../../assets/images/Backgrounds/Late_evening.png'),
      },
      {
        id: '11',
        name: 'Night',
        filepath: require('../../assets/images/Backgrounds/Night.png'),
      },
    ],
  },
];

export default function TodoPage() {
  const { todos, toggleTodoComplete } = useTodoStore();
  const { equippedItems } = useEquippedStore();

  // Get the equipped background
  const equippedBackgroundId = equippedItems.get('Backgrounds');
  const equippedBackground = STORE.find((category) => category.category === 'Backgrounds')?.items.find(
    (item) => item.id === equippedBackgroundId
  );

  // Convert Map to array for FlatList and sort
  const todoItems = Array.from(todos).map(([id, todo]) => ({ id, todo }));

  // Sort todos: incomplete first (sorted by date), then completed (sorted by date)
  todoItems.sort((a, b) => {
    // First sort by completion status
    if (a.todo.completed !== b.todo.completed) {
      return a.todo.completed ? 1 : -1;
    }
    // Then sort by date
    return a.todo.date.getTime() - b.todo.date.getTime();
  });

  return (
    <ImageBackground
      source={equippedBackground ? equippedBackground.filepath : null}
      style={styles.background}
      resizeMode="cover"
    >
      <Stack.Screen
        options={{
          title: 'Todo List',
        }}
      />
      <Animated.FlatList
        itemLayoutAnimation={LinearTransition}
        data={todoItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 16, padding: 16 }}
        renderItem={({ item }) => (
          <View className="flex-row items-center justify-between rounded-lg bg-white p-4 shadow">
            <View className="flex-1 pr-4">
              <Text className="text-xl font-medium">{item.todo.name}</Text>

              <View className="mt-2 flex-row gap-2">
                <View
                  className={`flex-row items-center rounded-full px-2 py-1 ${
                    isAfterToday(item.todo.date) && !item.todo.completed
                      ? 'bg-red-100'
                      : 'bg-gray-100'
                  }`}
                >
                  <Ionicons
                    name="calendar"
                    size={12}
                    color={
                      isAfterToday(item.todo.date) && !item.todo.completed ? '#B91C1C' : '#4B5563'
                    }
                  />
                  <Text
                    className={`ml-1 text-xs ${
                      isAfterToday(item.todo.date) && !item.todo.completed
                        ? 'text-red-700'
                        : 'text-slate-600'
                    }`}
                  >
                    {item.todo.date.toLocaleDateString()}
                  </Text>
                </View>

                {item.todo.difficulty && (
                  <View
                    className={`flex-row items-center rounded-full px-2 py-1 ${
                      DIFFICULTY_COLORS[item.todo.difficulty]
                    }`}
                  >
                    <Ionicons
                      name="stats-chart"
                      size={12}
                      color={
                        {
                          easy: '#047857',
                          medium: '#92400E',
                          hard: '#B91C1C',
                        }[item.todo.difficulty]
                      }
                    />
                    <Text
                      className={`ml-1 text-xs ${DIFFICULTY_COLORS[item.todo.difficulty]} capitalize`}
                    >
                      {item.todo.difficulty}
                    </Text>
                  </View>
                )}
              </View>

              {item.todo.note && (
                <Text className="mt-2 text-sm italic text-slate-500">{item.todo.note}</Text>
              )}
            </View>

            <TouchableOpacity
              onPress={() => toggleTodoComplete(item.id)}
              className={`${
                item.todo.completed ? 'border-blue-500 bg-blue-500' : 'border-gray-400'
              } h-6 w-6 items-center justify-center rounded border-2`}
            >
              {item.todo.completed && <Text className="text-white">✓</Text>}
            </TouchableOpacity>
          </View>
        )}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});
