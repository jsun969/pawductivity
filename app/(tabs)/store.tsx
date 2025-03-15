import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const STORE = [
  {
    category: 'Hats',
    items: [
      {
        id: '1',
        name: 'Straw Hat',
        filepath: require('../../assets/icon.png'),
        cost: 100,
        bought: true,
        equipped: false,
      },
      {
        id: '2',
        name: 'Bandana',
        filepath: require('../../assets/icon.png'),
        cost: 200,
        bought: true,
        equipped: true,
      },
      {
        id: '3',
        name: 'Cap',
        filepath: require('../../assets/icon.png'),
        cost: 150,
        bought: true,
        equipped: false,
      },
      {
        id: '4',
        name: 'Bucket Hat',
        filepath: require('../../assets/icon.png'),
        cost: 1000,
        bought: false,
        equipped: false,
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
        bought: false,
        equipped: false,
      },
      {
        id: '6',
        name: 'Beach',
        filepath: require('../../assets/icon.png'),
        cost: 500,
        bought: false,
        equipped: false,
      },
      {
        id: '7',
        name: 'City',
        filepath: require('../../assets/icon.png'),
        cost: 700,
        bought: false,
        equipped: false,
      },
    ],
  },
  {
    category: 'Breed',
    items: [
      {
        id: '8',
        name: 'Golden Retriever',
        filepath: require('../../assets/icon.png'),
        cost: 1000,
        bought: false,
        equipped: false,
      },
      {
        id: '9',
        name: 'Bulldog',
        filepath: require('../../assets/icon.png'),
        cost: 1200,
        bought: false,
        equipped: false,
      },
      {
        id: '10',
        name: 'Poodle',
        filepath: require('../../assets/icon.png'),
        cost: 1500,
        bought: false,
        equipped: false,
      },
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
    <ScrollView style={styles.container}>
      {STORE.map(({ category, items }, index) => {
        const isCategoryOpen = openedCategories.has(category);
        return (
          <>
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
              <View style={styles.header}>
                <Text style={styles.heading}>{category}</Text>
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
                  <View style={styles.itemContainer}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Image source={item.filepath} style={styles.itemImage} />
                    {item.bought ? (
                      item.equipped ? (
                        <Text style={styles.itemStatus}>Equipped</Text>
                      ) : (
                        <TouchableOpacity onPress={() => handleEquipItem(item.id, setHatList)}>
                          <Text style={styles.equipButton}>Equip</Text>
                        </TouchableOpacity>
                      )
                    ) : (
                      <Text style={styles.itemCost}>${item.cost}</Text>
                    )}
                    {!item.bought && (
                      <TouchableOpacity onPress={() => handleBuyItem(item.id, setHatList)}>
                        <Text style={styles.buyButton}>Buy</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                )}
                numColumns={2}
                scrollEnabled={false} // Disable scrolling for FlatList
              />
            )}
          </>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemContainer: {
    flex: 1,
    margin: 8,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  itemCost: {
    fontSize: 14,
    color: '#666',
  },
  itemStatus: {
    fontSize: 14,
    color: 'green',
  },
  buyButton: {
    color: 'blue',
    fontWeight: 'bold',
  },
  equipButton: {
    color: 'orange',
    fontWeight: 'bold',
  },
});
