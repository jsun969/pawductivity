import { Stack } from 'expo-router';
import { useRef, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { Sprites, type SpritesMethods } from 'react-native-sprites';

export default function Home() {
  const spriteRef = useRef<SpritesMethods>(null);

  useEffect(() => {
    spriteRef.current?.play({
      type: 'idle',
      fps: 5,
      loop: true,
      resetAfterFinish: true,
    });
  }, []);

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
        <View className="scale-[10] self-center">
          <Sprites
            ref={spriteRef}
            source={require('../../assets/spritesheets/Cat-1-Idle.png')}
            columns={10}
            rows={1}
            animations={{
              idle: { row: 0, startFrame: 0, endFrame: 9 },
            }}
          />
        </View>
      </View>
    </>
  );
}
