import { Stack } from 'expo-router';
import { Text, View } from 'react-native';

import { useTodoStore } from '~/store/todo';

export default function TodoPage() {
  const { todos } = useTodoStore();

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Todo List',
        }}
      />
      <View className="flex-1 space-y-2 p-6">
        {Array.from(todos).map(([id, todo]) => (
          <Text key={id} className="text-2xl">
            {todo.name}
          </Text>
        ))}
      </View>
    </>
  );
}
