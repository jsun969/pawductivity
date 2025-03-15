import { Stack } from 'expo-router';
import { View, Text, Image } from 'react-native';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Pet' }} />
      <View className="flex-1 p-6">
        <View className="mb-4 flex-row items-center justify-between">
          <View className="mr-4 flex-1">
            <View className="h-4 rounded-full bg-gray-200">
              <View className="h-4 w-[70%] rounded-full bg-blue-500" />
            </View>
            <Text className="mt-1 text-xs text-gray-700">XP: 70/100</Text>
          </View>
          <View className="flex-row items-center">
            <Image source={require('../../assets/images/coin.png')} className="mr-2 h-6 w-6" />
            <Text className="text-lg font-bold">100</Text>
          </View>
        </View>
      </View>
    </>
  );
}
