import { useState } from 'react';
import { Image, ImageSourcePropType, Pressable, StyleSheet, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

interface CosmeticButtonProps {
  image: ImageSourcePropType;
  disabled: boolean;
  size: number;
  cost: number;
}

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
  },
});

export default function CosmeticButton({ image, disabled, size, cost }: CosmeticButtonProps) {
  const [disabled_, setDisabled] = useState(disabled);

  return (
    <Pressable
      onPress={() => {
        if (disabled_) {
          // unlock the item. add coin functionality later
          console.log('This option is disabled!');
          setDisabled(false);
        } else {
          console.log('clicked');
        }
      }}
      className="relative left-0 top-0 w-fit">
      <Image style={styles.logo} source={image} className="relative left-0 top-0 rounded-md" />
      {disabled_ ? (
        <Image
          style={styles.logo}
          source={require('../assets/locked.png')}
          className="absolute left-0 top-0 rounded-md opacity-50"
        />
      ) : null}
      <Text className="text-center">{disabled_ ? '$' + cost : null}</Text>
    </Pressable>
  );
}
