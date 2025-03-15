import { Stack } from 'expo-router';
import { View } from 'react-native';

import { ScreenContent } from '~/components/ScreenContent';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Store' }} />
      <View className="flex-1 p-6">
        <ScreenContent
          path="app/(tabs)/store
        .tsx"
          title="Store"
        />
      </View>
    </>
  );
}
