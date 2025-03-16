import { Canvas, Image, useImage } from '@shopify/react-native-skia';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, ImageBackground, Dimensions } from 'react-native';

import { useEquippedStore } from '~/store/equipped';
import { useTodoStore } from '~/store/todo';

type CatImages = {
  [key: string]: {
    laying: any;
    idle: any;
    walk: any;
  };
};

const catImages: CatImages = {
  '12': {
    laying: require('../../assets/images/Cat-1/Cat-1-Laying.png'),
    idle: require('../../assets/images/Cat-1/Cat-1-Idle.png'),
    walk: require('../../assets/images/Cat-1/Cat-1-Walk.png'),
  },
  '13': {
    laying: require('../../assets/images/Cat-2/Cat-2-Laying.png'),
    idle: require('../../assets/images/Cat-2/Cat-2-Idle.png'),
    walk: require('../../assets/images/Cat-2/Cat-2-Walk.png'),
  },
  '14': {
    laying: require('../../assets/images/Cat-3/Cat-3-Laying.png'),
    idle: require('../../assets/images/Cat-3/Cat-3-Idle.png'),
    walk: require('../../assets/images/Cat-3/Cat-3-Walk.png'),
  },
  '15': {
    laying: require('../../assets/images/Cat-4/Cat-4-Laying.png'),
    idle: require('../../assets/images/Cat-4/Cat-4-Idle.png'),
    walk: require('../../assets/images/Cat-4/Cat-4-Walk.png'),
  },
  '16': {
    laying: require('../../assets/images/Cat-5/Cat-5-Laying.png'),
    idle: require('../../assets/images/Cat-5/Cat-5-Idle.png'),
    walk: require('../../assets/images/Cat-5/Cat-5-Walk.png'),
  },
  '17': {
    laying: require('../../assets/images/Cat-6/Cat-6-Laying.png'),
    idle: require('../../assets/images/Cat-6/Cat-6-Idle.png'),
    walk: require('../../assets/images/Cat-6/Cat-6-Walk.png'),
  },
};

export default function Home() {
  const { todos } = useTodoStore();
  const { equippedItems } = useEquippedStore();
  const totalTodos = todos.size;
  const completedTodos = Array.from(todos.values()).filter((todo) => todo.completed).length;

  const equippedCatId = equippedItems.get('Breed') || '12';
  let imagePath;
  let cols;
  if (completedTodos === 0) {
    imagePath = catImages[equippedCatId].laying;
    cols = 8;
  } else if (completedTodos < totalTodos) {
    imagePath = catImages[equippedCatId].idle;
    cols = 10;
  } else {
    imagePath = catImages[equippedCatId].walk;
    cols = 8;
  }

  const skiaImage = useImage(imagePath);

  const [frame, setFrame] = useState(0);
  const [isAnimating, setIsAnimating] = useState(cols !== 1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [flip, setFlip] = useState(false);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  const [reverse, setReverse] = useState(false); // For reversing the laying animation
  const frameWidth = 50;
  const frameHeight = 50;
  const totalFrames = cols === 8 ? 8 : 10;
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    if (!isAnimating) {
      return;
    }

    let interval: NodeJS.Timeout;
    let timeout: NodeJS.Timeout;

    const animate = () => {
      interval = setInterval(() => {
        setFrame((prevFrame) => {
          let nextFrame;
          if (cols === 8 && completedTodos === 0) {
            // Laying animation
            if (reverse) {
              nextFrame = (prevFrame - 1 + totalFrames) % totalFrames;
              if (nextFrame === 0) {
                clearInterval(interval);
                timeout = setTimeout(() => {
                  setReverse(false);
                  animate();
                }, 3000);
              }
            } else {
              nextFrame = (prevFrame + 1) % totalFrames;
              if (nextFrame === totalFrames - 1) {
                clearInterval(interval);
                timeout = setTimeout(() => {
                  setReverse(true);
                  animate();
                }, 3000);
              }
            }
          } else {
            // Other animations
            nextFrame = (prevFrame + 1) % totalFrames;
          }
          return nextFrame;
        });

        if (cols === 8 && completedTodos !== 0) {
          setPosition((prevPosition) => {
            let newX = prevPosition.x + direction * 5;

            if (newX <= -frameWidth * 2 || newX >= screenWidth - frameWidth * 5) {
              setDirection((prevDirection) => -prevDirection);
              setFlip((prevFlip) => !prevFlip);
              newX = Math.max(Math.min(newX, screenWidth - frameWidth * 5), -frameWidth * 2);
            }

            return {
              x: newX,
              y: prevPosition.y,
            };
          });
        }
      }, 150);
    };

    animate();

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isAnimating, cols, direction, completedTodos, reverse]);

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Pet',
        }}
      />
      <View className="flex-1">
        <ImageBackground
          source={require('../../assets/images/Backgrounds/Late_morning.png')}
          className="flex-1 items-center justify-center">
          <View className="mt-[30rem] self-center">
            <Canvas
              style={{
                width: frameWidth * 5,
                height: frameHeight * 5,
                transform: [
                  { translateX: position.x },
                  { translateY: position.y },
                  { scaleX: flip ? -1 : 1 },
                ],
              }}>
              {skiaImage &&
                (cols === 1 ? (
                  <Image
                    image={skiaImage}
                    x={0}
                    y={0}
                    width={frameWidth * 5}
                    height={frameHeight * 5}
                  />
                ) : (
                  <Image
                    image={skiaImage}
                    x={-frame * frameWidth * 5}
                    y={0}
                    width={frameWidth * cols * 5}
                    height={frameHeight * 5}
                  />
                ))}
            </Canvas>
          </View>
        </ImageBackground>
      </View>
    </>
  );
}
