import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// Define items
const items = [
  { id: '1', name: 'Straw Hat', filepath: require('../../assets/icon.png'), cost: 100, bought: true, equipped: false },
  { id: '2', name: 'Bandana', filepath: require('../../assets/icon.png'), cost: 200, bought: true, equipped: true },
  { id: '3', name: 'Cap', filepath: require('../../assets/icon.png'), cost: 150, bought: true, equipped: false },
  { id: '4', name: 'Bucket Hat', filepath: require('../../assets/icon.png'), cost: 1000, bought: false, equipped: false },
];

export default function ExpandableList() {
  const [expanded, setExpanded] = useState(false);
  const [itemList, setItemList] = useState(items);

  // Handle item purchase
  const handleBuyItem = (id) => {
    setItemList((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, bought: true } : item
      )
    );
  };

  // Handle item equip
  const handleEquipItem = (id) => {
    setItemList((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, equipped: !item.equipped } : { ...item, equipped: false }
      )
    );
  };

  // Reorder items: equipped item first, then bought items, then unbought items
  const reorderItems = () => {
    setItemList((prevItems) =>
      prevItems.sort((a, b) => {
        if (a.equipped && !b.equipped) return -1;
        if (!a.equipped && b.equipped) return 1;
        if (a.bought && !b.bought) return -1;
        if (!a.bought && b.bought) return 1;
        return 0;
      })
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setExpanded(!expanded)}>
        <View style={styles.header}>
          <Text style={styles.heading}>Hats</Text>
          <Icon
            name={expanded ? 'chevron-up' : 'chevron-down'}
            size={24}
            color="#000"
          />
        </View>
      </TouchableOpacity>
      {expanded && (
        <FlatList
          data={itemList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Image source={item.filepath} style={styles.itemImage} />
              {item.bought ? (
                item.equipped ? (
                  <Text style={styles.itemStatus}>Equipped</Text>
                ) : (
                  <TouchableOpacity onPress={() => handleEquipItem(item.id)}>
                    <Text style={styles.equipButton}>Equip</Text>
                  </TouchableOpacity>
                )
              ) : (
                <Text style={styles.itemCost}>${item.cost}</Text>
              )}
              {!item.bought && (
                <TouchableOpacity onPress={() => handleBuyItem(item.id)}>
                  <Text style={styles.buyButton}>Buy</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
          numColumns={2} // Display items side by side
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListFooterComponent={reorderItems}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 8,
  },
});