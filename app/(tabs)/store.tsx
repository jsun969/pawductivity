import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const STORE = [
  {
    category: 'Furniture',
    items: [
      { id: '1', name: 'Furniture', filepath: require('../../assets/icon.png'), cost: 100, bought: true, equipped: false },
      { id: '2', name: 'Furniture', filepath: require('../../assets/icon.png'), cost: 200, bought: true, equipped: true },
      { id: '3', name: 'Furniture', filepath: require('../../assets/icon.png'), cost: 150, bought: true, equipped: false },
      { id: '4', name: 'Furniture', filepath: require('../../assets/icon.png'), cost: 1000, bought: false, equipped: false },
    ],
  },
  {
    category: 'Backgrounds',
    items: [
      { id: '5', name: 'Forest', filepath: require('../../assets/icon.png'), cost: 300, bought: false, equipped: false },
      { id: '6', name: 'Beach', filepath: require('../../assets/icon.png'), cost: 500, bought: false, equipped: false },
      { id: '7', name: 'City', filepath: require('../../assets/icon.png'), cost: 700, bought: false, equipped: false },
    ],
  },
  {
    category: 'Breed',
    items: [
      { id: '8', name: 'Orange Cat', filepath: require('../../assets/images/Cat-1/Cat-1-Sitting.png'), cost: 1000, bought: false, equipped: false },
      { id: '9', name: 'Black Cat', filepath: require('../../assets/images/Cat-2/Cat-2-Sitting.png'), cost: 1200, bought: false, equipped: false },
      { id: '10', name: 'Grey Cat', filepath: require('../../assets/images/Cat-3/Cat-3-Sitting.png'), cost: 1500, bought: false, equipped: false },
      { id: '11', name: 'Tan Cat', filepath: require('../../assets/images/Cat-4/Cat-4-Sitting.png'), cost: 1000, bought: false, equipped: false },
      { id: '12', name: 'White Cat', filepath: require('../../assets/images/Cat-5/Cat-5-Sitting.png'), cost: 1200, bought: false, equipped: false },
    ],
  },
];

export default function ExpandableList() {
  const [openedCategories, setOpenedCategories] = useState(new Set());

  // Handle item purchase
  const handleBuyItem = (id: string, setItemList) => {
    setItemList((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, bought: true } : item))
    );
  };

  // Handle item equip
  const handleEquipItem = (id: string, setItemList) => {
    setItemList((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, equipped: !item.equipped } : { ...item, equipped: false }
      )
    );
  };

  // Reorder items: equipped item first, then bought items, then unbought items
  const reorderItems = (itemList) => {
    return itemList.sort((a, b) => {
      if (a.equipped && !b.equipped) return -1;
      if (!a.equipped && b.equipped) return 1;
      if (a.bought && !b.bought) return -1;
      if (!a.bought && b.bought) return 1;
      return 0;
    });
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
              }}
            >
              <View className="flex-row justify-between items-center py-2">
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
                data={reorderItems(items)}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View className="flex-1 m-2 p-4 bg-gray-100 rounded-lg">
                    <Text className="text-base font-bold mb-2">{item.name}</Text>
                    <Image
                      source={item.filepath}
                      style={styles.itemImage} // Unified style
                      resizeMode="contain"
                    />
                    {item.bought ? (
                      item.equipped ? (
                        <Text className="text-sm text-green-600">Equipped</Text>
                      ) : (
                        <TouchableOpacity onPress={() => handleEquipItem(item.id, setItemList)}>
                          <Text className="text-orange-600 font-bold">Equip</Text>
                        </TouchableOpacity>
                      )
                    ) : (
                      <Text className="text-sm text-gray-600">${item.cost}</Text>
                    )}
                    {!item.bought && (
                      <TouchableOpacity onPress={() => handleBuyItem(item.id, setItemList)}>
                        <Text className="text-blue-600 font-bold">Buy</Text>
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
  itemImage: {
    width: 120, // Unified size for all items
    height: 120,
    marginBottom: 8,
  },
  largeImage: {
    width: 120, // Removed separate style for breed items
    height: 120,
    marginBottom: 8,
  },
});