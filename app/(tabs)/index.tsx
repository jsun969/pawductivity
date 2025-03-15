import { Canvas, Image, useImage } from '@shopify/react-native-skia';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, Image as RNImage } from 'react-native';

export default function Home() {
  const skiaImage = useImage(require('../../assets/spritesheets/Cat-1-Idle.png'));

  const [frame, setFrame] = useState(0);
  const cols = 10;
  const frameWidth = 50;
  const frameHeight = 50;
  const totalFrames = 10;

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prevFrame) => (prevFrame + 1) % totalFrames);
    }, 120);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Stack.Screen options={{ title: 'Pet' }} />
      <View className="flex-1 p-6">
        <View className="mb-4 flex-row items-center justify-between">
          <View className="flex-row items-center">
            <RNImage
              source={require('../../assets/images/coin.png')}
              style={{ marginRight: 8, height: 24, width: 24 }}
            />
            <Text className="text-lg font-bold">100</Text>
          </View>
        </View>
        <View className="mt-48 self-center">
          <Canvas style={{ width: frameWidth * 10, height: frameHeight * 10 }}>
            {skiaImage && (
              <Image
                image={skiaImage}
                x={-frame * frameWidth * 10}
                y={0}
                width={frameWidth * cols * 10}
                height={frameHeight * 10}
              />
            )}
          </Canvas>
        </View>
      </View>
    </>
  );
}
