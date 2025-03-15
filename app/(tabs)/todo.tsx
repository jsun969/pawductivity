import { Stack } from 'expo-router';
import { View } from 'react-native';

import { ScreenContent } from '../../components/ScreenContent';

export default function Home() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Todo List',
        }}
      />
      <View className="flex-1 p-6">
        <ScreenContent path="app/(tabs)/todo.tsx" title="Todo List" />
      </View>
    </>
  );
}
