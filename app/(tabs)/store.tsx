import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Canvas, Image as SkiaImage, useImage } from '@shopify/react-native-skia';

const STORE = [
  {
    category: 'Furniture',
    items: [
      {
        id: '1',
        name: 'Red Couch',
        filepath: require('../../assets/images/Furniture/Couch_large_2_red.png'),
        cost: 100,
      },
      {
        id: '2',
        name: 'Blue Couch',
        filepath: require('../../assets/images/Furniture/Couch_large_blue.png'),
        cost: 200,
      },
      {
        id: '3',
        name: 'Table',
        filepath: require('../../assets/images/Furniture/Table_medium.png'),
        cost: 150,
      },
      {
        id: '4',
        name: 'Countertop',
        filepath: require('../../assets/images/Furniture/Countertop.png'),
        cost: 1000,
      },
    ],
  },
  {
    category: 'Backgrounds',
    items: [
      {
        id: '5',
        name: 'Forest',
        filepath: require('../../assets/icon.png'),
        cost: 300,
      },
      {
        id: '6',
        name: 'Beach',
        filepath: require('../../assets/icon.png'),
        cost: 500,
      },
      {
        id: '7',
        name: 'City',
        filepath: require('../../assets/icon.png'),
        cost: 700,
      },
    ],
  },
  {
    category: 'Breed',
    items: [
      {
        id: '8',
        name: 'Orange Cat',
        filepath: require('../../assets/images/Cat-1/Cat-1-Sitting.png'),
        cost: 1000,
      },
      {
        id: '9',
        name: 'Black Cat',
        filepath: require('../../assets/images/Cat-2/Cat-2-Sitting.png'),
        cost: 1200,
      },
      {
        id: '10',
        name: 'Grey Cat',
        filepath: require('../../assets/images/Cat-3/Cat-3-Sitting.png'),
        cost: 1500,
      },
      {
        id: '11',
        name: 'Tan Cat',
        filepath: require('../../assets/images/Cat-4/Cat-4-Sitting.png'),
        cost: 1000,
      },
      {
        id: '12',
        name: 'White Cat',
        filepath: require('../../assets/images/Cat-5/Cat-5-Sitting.png'),
        cost: 1200,
      },
    ],
  },
];

export default function ExpandableList() {
  const [openedCategories, setOpenedCategories] = useState(new Set());
  const [boughtItems, setBoughtItems] = useState(new Set());
  const [equippedItems, setEquippedItems] = useState(new Set());
  const [equippedFurniture, setEquippedFurniture] = useState('');
  const [equippedBackground, setEquippedBackground] = useState('');
  const [equippedBreed, setEquippedBreed] = useState('');
  const [coins, setCoins] = useState(0);

  // Load images at the top level
  const images: { [key: string]: ReturnType<typeof useImage> } = {};
  STORE.forEach(({ items }) => {
    items.forEach((item) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      images[item.id] = useImage(item.filepath);
    });
  });

  // Handle item purchase
  const handleBuyItem = (id: string, cost: number) => {
    setBoughtItems((s) => {
      const newSet = new Set(s);
      newSet.add(id);
      return newSet;
    });
    // do this when there is storage, but for now just allow them to buy anything
    /*
    if (coins >= cost) {
      setCoins(coins - cost);
      setBoughtItems((s) => {
        const newSet = new Set(s);
        newSet.add(id);
        return newSet;
      });
    } else {
      // tell them not enough coins
    }
      */
  };

  // Handle item equip
  const handleEquipItem = (id: string, type: string) => {
    setEquippedItems((s) => {
      const newSet = new Set(s);
      if (type === 'Furniture') {
        newSet.delete(equippedFurniture);
        setEquippedFurniture(id);
      }
      if (type === 'Backgrounds') {
        newSet.delete(equippedBackground);
        setEquippedBackground(id);
      }
      if (type === 'Breed') {
        newSet.delete(equippedBreed);
        setEquippedBreed(id);
      }
      newSet.add(id);
      return newSet;
    });
  };

  return (
    <ScrollView className="flex-1 p-4">
      <View className="flex-row items-center">
        <Canvas style={{ width: 35, height: 35 }}>
          <SkiaImage
            image={useImage(require('../../assets/images/coin.png'))}
            x={0}
            y={0}
            width={35}
            height={35}
          />
        </Canvas>
        <Text className="text-4xl font-bold">{coins}</Text>
      </View>
      {STORE.map(({ category, items }, index) => {
        const isCategoryOpen = openedCategories.has(category);
        return (
          <View key={index}>
            <TouchableOpacity
              onPress={() => {
                if (isCategoryOpen) {
                  setOpenedCategories((s) => {
                    const newSet = new Set(s);
                    newSet.delete(category);
                    return newSet;
                  });
                } else {
                  setOpenedCategories((s) => {
                    const newSet = new Set(s);
                    newSet.add(category);
                    return newSet;
                  });
                }
              }}>
              <View className="flex-row items-center justify-between py-2">
                <Text className="text-lg font-bold">{category}</Text>
                <Icon
                  name={isCategoryOpen ? 'chevron-up' : 'chevron-down'}
                  size={24}
                  color="#000"
                />
              </View>
            </TouchableOpacity>
            {isCategoryOpen && (
              <FlatList
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View className="m-2 flex-1 rounded-lg bg-gray-100 p-4">
                    <Text className="mb-2 text-base font-bold">{item.name}</Text>
                    <Canvas style={styles.largeImage}>
                      <SkiaImage
                        image={images[item.id]}
                        x={category === 'Breed' ? -40 : 0}
                        y={category === 'Breed' ? -40 : 0}
                        width={category === 'Breed' ? 200 : 120}
                        height={category === 'Breed' ? 200 : 120}
                      />
                    </Canvas>
                    {boughtItems.has(item.id) ? (
                      equippedItems.has(item.id) ? (
                        <Text className="text-sm text-green-600">Equipped</Text>
                      ) : (
                        <TouchableOpacity onPress={() => handleEquipItem(item.id, category)}>
                          <Text className="font-bold text-orange-600">Equip</Text>
                        </TouchableOpacity>
                      )
                    ) : (
                      <Text className="text-sm text-gray-600">${item.cost}</Text>
                    )}
                    {!boughtItems.has(item.id) && (
                      <TouchableOpacity onPress={() => handleBuyItem(item.id, item.cost)}>
                        <Text className="font-bold text-blue-600">Buy</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                )}
                numColumns={2}
                scrollEnabled={false} // Disable scrolling for FlatList
              />
            )}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  largeImage: {
    width: 120,
    height: 120,
    marginBottom: 8,
  },
});
