import { View } from 'react-native';

import CosmeticButton from '~/components/CosmeticButton';

const typeOfHats = [
  { name: 'Straw Hat', filepath: require('../../assets/icon.png'), cost: 100 },
  { name: 'Bandana', filepath: require('../../assets/icon.png'), cost: 200 },
  { name: 'Cap', filepath: require('../../assets/icon.png'), cost: 150 },
  { name: 'Bucket Hat', filepath: require('../../assets/icon.png'), cost: 1000 },
];

export default function test() {
  return (
    <View className="flex flex-row justify-between">
      {typeOfHats.map((item, index) => (
        <CosmeticButton
          key={item.name}
          image={item.filepath}
          disabled={index % 2 === 1}
          size={50}
          cost={item.cost}
        />
      ))}
    </View>
  );
}
