import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
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

  const renderRightActions = (id: string) => (
    <TouchableOpacity
      onPress={() => removeTodo(id)}
      className="h-full items-center justify-center rounded-lg bg-red-500 px-4">
      <Text className="text-white">Delete</Text>
    </TouchableOpacity>
  );

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
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Animated.FlatList
          itemLayoutAnimation={LinearTransition}
          data={todoItems}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ gap: 16, padding: 16 }}
          renderItem={({ item }) => (
            <Swipeable renderRightActions={() => renderRightActions(item.id)}>
              <View className="flex-row items-center justify-between rounded-lg bg-white p-4">
                <View className="flex-1 pr-4">
                  <Text className="text-xl font-medium">{item.todo.name}</Text>
                  </View>

                  {item.todo.note && (
                    <Text className="mt-2 text-sm italic text-slate-500">{item.todo.note}</Text>
                  )}
                </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});
