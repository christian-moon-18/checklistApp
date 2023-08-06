// components/ChecklistItem.js

import React from 'react';
import styles from './ChecklistItem.module.css';

const ChecklistItem = ({ item, onUpdateStatus, onDeleteItem }) => {
  const { id, title, description, status } = item;

  const handleStatusChange = (event) => {
    const newStatus = event.target.checked ? 'completed' : 'pending';
    onUpdateStatus(id, newStatus);
  };

  const handleDelete = () => {
    onDeleteItem(id);
  };

  const isCompleted = status === 'completed';

  return (
    <div className={`${styles['inbox-item']} ${isCompleted ? styles['completed'] : ''}`}>
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={handleStatusChange}
      />
      <div className={styles['inbox-item-content']}>
        <div className={styles['inbox-item-title']}>
          <span className={isCompleted ? styles['completed-text'] : ''}>{title}</span>
        </div>
        {description && (
          <div className={styles['inbox-item-body']}>
            <span className={isCompleted ? styles['completed-text'] : ''}>{description}</span>
          </div>
        )}
      </div>
      <button className={styles['inbox-item-delete']} onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default ChecklistItem;
