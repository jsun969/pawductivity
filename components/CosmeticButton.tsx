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
  return (
    <Pressable
      onPress={() => {
        if (disabled) {
          // unlock the item. add coin functionality later
          // this doesn't work. the lock symbol/text don't go away after you change disabled to false.
          console.log('This option is disabled!');
          disabled = false;
        } else {
          console.log('clicked');
        }
      }}
      className="relative left-0 top-0 w-fit">
      <Image style={styles.logo} source={image} className="relative left-0 top-0 rounded-md" />
      {disabled ? (
        <Image
          style={styles.logo}
          source={require('../assets/locked.png')}
          className="absolute left-0 top-0 rounded-md opacity-50"
        />
      ) : null}
      <SafeAreaProvider>
        <SafeAreaView>
          <Text>{disabled ? '$' + cost : null}</Text>
        </SafeAreaView>
      </SafeAreaProvider>
    </Pressable>
  );
}
