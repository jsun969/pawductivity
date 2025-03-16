import { Canvas, Image as SkiaImage, useImage } from '@shopify/react-native-skia';
import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, ScrollView, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Button } from '~/components/Button';
import { useCoinsStore } from '~/store/coin';
import { useEquippedStore } from '~/store/equipped';

const STORE = [
  {
    category: 'Furniture',
    items: [
      {
        id: '0',
        name: 'None',
        filepath: require('../../assets/images/Furniture/Empty.png'),
        cost: 0,
      },
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
        name: 'Morning',
        filepath: require('../../assets/images/Backgrounds/Morning.png'),
        cost: 300,
      },
      {
        id: '6',
        name: 'Late Morning',
        filepath: require('../../assets/images/Backgrounds/Late_morning.png'),
        cost: 0,
      },
      {
        id: '7',
        name: 'Afternoon',
        filepath: require('../../assets/images/Backgrounds/Afternoon.png'),
        cost: 700,
      },
      {
        id: '8',
        name: 'Late Afternoon',
        filepath: require('../../assets/images/Backgrounds/Late_afternoon.png'),
        cost: 700,
      },
      {
        id: '9',
        name: 'Evening',
        filepath: require('../../assets/images/Backgrounds/Evening.png'),
        cost: 700,
      },
      {
        id: '10',
        name: 'Late Evening',
        filepath: require('../../assets/images/Backgrounds/Late_evening.png'),
        cost: 700,
      },
      {
        id: '11',
        name: 'Night',
        filepath: require('../../assets/images/Backgrounds/Night.png'),
        cost: 700,
      },
    ],
  },
  {
    category: 'Breed',
    items: [
      {
        id: '12',
        name: 'Orange Cat',
        filepath: require('../../assets/images/Cat-1/Cat-1-Sitting.png'),
        cost: 0,
      },
      {
        id: '13',
        name: 'Black Cat',
        filepath: require('../../assets/images/Cat-2/Cat-2-Sitting.png'),
        cost: 1200,
      },
      {
        id: '14',
        name: 'Grey Cat',
        filepath: require('../../assets/images/Cat-3/Cat-3-Sitting.png'),
        cost: 1500,
      },
      {
        id: '15',
        name: 'Tan Cat',
        filepath: require('../../assets/images/Cat-4/Cat-4-Sitting.png'),
        cost: 1000,
      },
      {
        id: '16',
        name: 'White Cat',
        filepath: require('../../assets/images/Cat-5/Cat-5-Sitting.png'),
        cost: 1200,
      },
    ],
  },
] as const;

export default function ExpandableList() {
  const [openedCategories, setOpenedCategories] = useState(new Set());
  const { purchasedItems, addPurchased } = useEquippedStore();
  const { equippedItems, changeEquipped } = useEquippedStore();
  const { coins, setCoins } = useCoinsStore();

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
    if (coins >= cost) {
      setCoins((prev) => prev - cost);
      addPurchased(id);
    } else {
      // tell them not enough coins
    }
  };

  // Handle item equip
  const handleEquipItem = (id: string, category: string) => {
    changeEquipped(category, id);
  };

  return (
    <ScrollView className="flex-1 p-4">
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
                    {purchasedItems.has(item.id) ? (
                      equippedItems.get(category) === item.id ? (
                        <Text className="text-sm text-green-600">Equipped</Text>
                      ) : (
                        <TouchableOpacity onPress={() => handleEquipItem(item.id, category)}>
                          <Text className="font-bold text-orange-600">Equip</Text>
                        </TouchableOpacity>
                      )
                    ) : (
                      <Text className="text-sm text-gray-600">${item.cost}</Text>
                    )}
                    {!purchasedItems.has(item.id) && (
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