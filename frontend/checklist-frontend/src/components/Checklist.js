// components/Checklist.js

import React, { useState, useEffect } from 'react';
import ChecklistItem from './ChecklistItem';
import AddItemForm from './AddItemForm';
import checklistApi from '../api/checklistApi';

const Checklist = () => {
  const [checklistItems, setChecklistItems] = useState([]);

  useEffect(() => {
    fetchChecklistItems();
  }, []);

  const fetchChecklistItems = async () => {
    try {
      const items = await checklistApi.getChecklistItems();
      setChecklistItems(items);
    } catch (error) {
      console.error('Error fetching checklist items', error);
    }
  };

  const handleAddItem = async (title, description) => {
    try {
      const newItem = await checklistApi.addChecklistItem(title, description);
      setChecklistItems([...checklistItems, newItem]);
    } catch (error) {
      console.error('Error adding checklist item', error);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await checklistApi.updateChecklistItem(id, status);
      const updatedItems = checklistItems.map((item) =>
        item.id === id ? { ...item, status } : item
      );
      setChecklistItems(updatedItems);
    } catch (error) {
      console.error('Error updating checklist item status', error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await checklistApi.deleteChecklistItem(id);
      const updatedItems = checklistItems.filter((item) => item.id !== id);
      setChecklistItems(updatedItems);
    } catch (error) {
      console.error('Error deleting checklist item', error);
    }
  };

  return (
    <div>
      <h1>Checklist App</h1>
      <AddItemForm onAddItem={handleAddItem} />
      <ul>
        {checklistItems.map((item) => (
          <ChecklistItem
            key={item.id}
            item={item}
            onUpdateStatus={handleUpdateStatus}
            onDeleteItem={handleDeleteItem}
          />
        ))}
      </ul>
    </div>
  );
};

export default Checklist;
