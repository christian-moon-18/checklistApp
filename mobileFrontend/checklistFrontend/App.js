import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import CheckBox from '@react-native-community/checkbox';

const App = () => {
  const [checklistItems, setChecklistItems] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});

  const fetchChecklistItems = async () => {
    try {
      const response = await axios.get('https://a19b-2601-285-8181-4f00-d80f-a372-c4ec-33a.ngrok-free.app/api/checklist');
      setChecklistItems(response.data);
      const initialCheckedItems = response.data.reduce((acc, item) => {
        acc[item.id] = item.status === 'completed';
        return acc;
      }, {});
      setCheckedItems(initialCheckedItems);
    } catch (error) {
      console.error('Error fetching checklist items', error);
    }
  };

  useEffect(() => {
    fetchChecklistItems();
  }, []);

  const handleCheckItem = async (id) => {
    try {
      setCheckedItems((prevCheckedItems) => ({
        ...prevCheckedItems,
        [id]: !prevCheckedItems[id],
      }));
      await axios.put(
        `https://a19b-2601-285-8181-4f00-d80f-a372-c4ec-33a.ngrok-free.app/api/checklist/${id}`,
        { status: checkedItems[id] ? 'pending' : 'completed' }
      );
    } catch (error) {
      console.error('Error updating item status', error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`https://a19b-2601-285-8181-4f00-d80f-a372-c4ec-33a.ngrok-free.app/api/checklist/${id}`);
      fetchChecklistItems(); // Refresh the checklist items after deleting the item
    } catch (error) {
      console.error('Error deleting item', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Checklist App</Text>
      <ScrollView style={styles.scrollContainer}>
        {checklistItems.map((item) => (
          <View key={item.id} style={styles.checklistItem}>
            <TouchableOpacity onPress={() => handleCheckItem(item.id)}>
              <CheckBox value={checkedItems[item.id]} onValueChange={() => handleCheckItem(item.id)} />
              <Text style={[styles.title, checkedItems[item.id] && styles.checkedText]}>{item.title}</Text>
              <Text style={[styles.description, checkedItems[item.id] && styles.checkedText]}>{item.description}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteItem(item.id)}>
              <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'blue',
  },
  scrollContainer: {
    flex: 1,
  },
  checklistItem: {
    marginBottom: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: 'gray',
    flexDirection: 'row', // Added to align checkbox and text horizontally
    alignItems: 'center', // Added to center the checkbox vertically
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  description: {
    flex: 1,
    fontSize: 16,
    color: 'white',
  },
  checkedText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  deleteButton: {
    color: 'white',
    marginLeft: 16,
    backgroundColor: 'red',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});

export default App;
