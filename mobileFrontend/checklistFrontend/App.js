import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/MaterialIcons';

const NGROKURL = 'https://3a9b-76-155-29-22.ngrok-free.app';

const App = () => {
  const [checklistItems, setChecklistItems] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemDescription, setNewItemDescription] = useState('');

  const fetchChecklistItems = async () => {
    try {
      const response = await axios.get(`${NGROKURL}/api/checklist`);
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
        `${NGROKURL}/api/checklist/${id}`,
        { status: checkedItems[id] ? 'pending' : 'completed' }
      );
    } catch (error) {
      console.error('Error updating item status', error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`${NGROKURL}/api/checklist/${id}`);
      fetchChecklistItems(); // Refresh the checklist items after deleting the item
    } catch (error) {
      console.error('Error deleting item', error);
    }
  };

  const handleAddItem = async () => {
    try {
      if (!newItemTitle || !newItemDescription) {
        // Make sure both title and description are provided before adding
        alert('Please enter both title and description');
        return;
      }

      const newItem = { title: newItemTitle, description: newItemDescription };
      const response = await axios.post(
        `${NGROKURL}/api/checklist`,
        newItem
      );

      setNewItemTitle('');
      setNewItemDescription('');

      fetchChecklistItems(); // Refresh the checklist items after adding the new item
    } catch (error) {
      console.error('Error adding item', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Checklist App</Text>
      <ScrollView style={styles.scrollContainer}>
      {checklistItems.map((item) => (
  <View key={item.id} style={styles.checklistItem}>
    <View style={styles.itemLeft}>
      <CheckBox
        value={checkedItems[item.id]}
        onValueChange={() => handleCheckItem(item.id)}
      />
      <Text
        style={[
          styles.title,
          checkedItems[item.id] && styles.checkedText,
        ]}
      >
        {item.title}
      </Text>
      <Text
        style={[
          styles.description,
          checkedItems[item.id] && styles.checkedText,
        ]}
      >
        {item.description}
      </Text>
    </View>
    <TouchableOpacity
      onPress={() => handleDeleteItem(item.id)}
      style={styles.deleteButton}
    >
      <Icon name="delete" size={20} color="white" />
    </TouchableOpacity>
  </View>
))}

      </ScrollView>
      <View style={styles.addItemForm}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={newItemTitle}
          onChangeText={setNewItemTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={newItemDescription}
          onChangeText={setNewItemDescription}
        />
        <TouchableOpacity onPress={handleAddItem}>
          <Text style={styles.addButton}>Add Item</Text>
        </TouchableOpacity>
      </View>
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
    color: 'white',
  },
  deleteButton: {
    color: 'white',
    marginLeft: 16,
    backgroundColor: 'red',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  addItemForm: {
    marginTop: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: 'gray',
  },
  input: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: 'blue',
    color: 'white',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    textAlign: 'center',
  },
});

export default App;
