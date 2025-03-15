import { Stack } from 'expo-router';
import { View, Text, Image } from 'react-native';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Pet' }} />
      <View className="flex-1 p-6">
        <View className="mb-4 flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Image
              source={require('../../assets/images/coin.png')}
              style={{ marginRight: 8, height: 24, width: 24 }}
            />
            <Text className="text-lg font-bold">100</Text>
          </View>
        </View>
      </View>
    </>
  );
}
