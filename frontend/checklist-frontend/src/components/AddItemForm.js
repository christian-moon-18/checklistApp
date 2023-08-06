// components/AddItemForm.js

import React, { useState } from 'react';
import styles from './AddItemForm.module.css'; // Import the CSS file

const AddItemForm = ({ onAddItem }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(title, description);
    setTitle('');
    setDescription('');
  };

  return (
    <form className={styles['form-container']} onSubmit={handleSubmit}>
      <input
        className={styles['form-input']}
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className={styles['form-input']}
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button className={styles['form-submit-button']} type="submit">
        Add Item
      </button>
    </form>
  );
};

export default AddItemForm;
