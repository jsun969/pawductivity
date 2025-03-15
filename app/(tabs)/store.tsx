import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// Define hat items
const FurnitureItems = [
  { id: '1', name: 'Furniture', filepath: require('../../assets/icon.png'), cost: 100, bought: true, equipped: false },
  { id: '2', name: 'Furniture', filepath: require('../../assets/icon.png'), cost: 200, bought: true, equipped: true },
  { id: '3', name: 'Furniture', filepath: require('../../assets/icon.png'), cost: 150, bought: true, equipped: false },
  { id: '4', name: 'Furniture', filepath: require('../../assets/icon.png'), cost: 1000, bought: false, equipped: false },
];

// Define background items
const backgroundItems = [
  { id: '5', name: 'Forest', filepath: require('../../assets/icon.png'), cost: 300, bought: false, equipped: false },
  { id: '6', name: 'Beach', filepath: require('../../assets/icon.png'), cost: 500, bought: false, equipped: false },
  { id: '7', name: 'City', filepath: require('../../assets/icon.png'), cost: 700, bought: false, equipped: false },
];

// Define breed items
const breedItems = [
  { id: '8', name: 'Orange Cat', filepath: require('../../assets/images/Cat-1/Cat-1-Sitting.png'), cost: 1000, bought: false, equipped: false },
  { id: '9', name: 'Black Cat', filepath: require('../../assets/images/Cat-2/Cat-2-Sitting.png'), cost: 1200, bought: false, equipped: false },
  { id: '10', name: 'Grey Cat', filepath: require('../../assets/images/Cat-3/Cat-3-Sitting.png'), cost: 1500, bought: false, equipped: false },
  { id: '11', name: 'Tan Cat', filepath: require('../../assets/images/Cat-4/Cat-4-Sitting.png'), cost: 1000, bought: false, equipped: false },
  { id: '12', name: 'White Cat', filepath: require('../../assets/images/Cat-5/Cat-5-Sitting.png'), cost: 1200, bought: false, equipped: false },
  { id: '13', name: 'White-2 Cat', filepath: require('../../assets/images/Cat-6/Cat-6-Sitting.png'), cost: 1500, bought: false, equipped: false },
];

export default function ExpandableList() {
  const [hatExpanded, setHatExpanded] = useState(false);
  const [backgroundExpanded, setBackgroundExpanded] = useState(false);
  const [breedExpanded, setBreedExpanded] = useState(false);
  const [hatList, setHatList] = useState(FurnitureItems);
  const [backgroundList, setBackgroundList] = useState(backgroundItems);
  const [breedList, setBreedList] = useState(breedItems);

  // Handle item purchase
  const handleBuyItem = (id, setItemList) => {
    setItemList((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, bought: true } : item
      )
    );
  };

  // Handle item equip
  const handleEquipItem = (id, setItemList) => {
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
      {/* Hats Section */}
      <TouchableOpacity onPress={() => setHatExpanded(!hatExpanded)}>
        <View style={styles.header}>
          <Text style={styles.heading}>Furniture</Text>
          <Icon
            name={hatExpanded ? 'chevron-up' : 'chevron-down'}
            size={24}
            color="#000"
          />
        </View>
      </TouchableOpacity>
      {hatExpanded && (
        <FlatList
          data={reorderItems(hatList)}
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

      {/* Backgrounds Section */}
      <TouchableOpacity onPress={() => setBackgroundExpanded(!backgroundExpanded)}>
        <View style={styles.header}>
          <Text style={styles.heading}>Backgrounds</Text>
          <Icon
            name={backgroundExpanded ? 'chevron-up' : 'chevron-down'}
            size={24}
            color="#000"
          />
        </View>
      </TouchableOpacity>
      {backgroundExpanded && (
        <FlatList
          data={reorderItems(backgroundList)}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Image source={item.filepath} style={styles.itemImage} />
              {item.bought ? (
                item.equipped ? (
                  <Text style={styles.itemStatus}>Equipped</Text>
                ) : (
                  <TouchableOpacity onPress={() => handleEquipItem(item.id, setBackgroundList)}>
                    <Text style={styles.equipButton}>Equip</Text>
                  </TouchableOpacity>
                )
              ) : (
                <Text style={styles.itemCost}>${item.cost}</Text>
              )}
              {!item.bought && (
                <TouchableOpacity onPress={() => handleBuyItem(item.id, setBackgroundList)}>
                  <Text style={styles.buyButton}>Buy</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
          numColumns={2}
          scrollEnabled={false} // Disable scrolling for FlatList
        />
      )}

      {/* Breeds Section */}
      <TouchableOpacity onPress={() => setBreedExpanded(!breedExpanded)}>
        <View style={styles.header}>
          <Text style={styles.heading}>Breeds</Text>
          <Icon
            name={breedExpanded ? 'chevron-up' : 'chevron-down'}
            size={24}
            color="#000"
          />
        </View>
      </TouchableOpacity>
      {breedExpanded && (
        <FlatList
          data={reorderItems(breedList)}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Image source={item.filepath} style={styles.itemImage} />
              {item.bought ? (
                item.equipped ? (
                  <Text style={styles.itemStatus}>Equipped</Text>
                ) : (
                  <TouchableOpacity onPress={() => handleEquipItem(item.id, setBreedList)}>
                    <Text style={styles.equipButton}>Equip</Text>
                  </TouchableOpacity>
                )
              ) : (
                <Text style={styles.itemCost}>${item.cost}</Text>
              )}
              {!item.bought && (
                <TouchableOpacity onPress={() => handleBuyItem(item.id, setBreedList)}>
                  <Text style={styles.buyButton}>Buy</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
          numColumns={2}
          scrollEnabled={false} // Disable scrolling for FlatList
        />
      )}
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