// components/ChecklistItem.js

import React from 'react';

const ChecklistItem = ({ item, onUpdateStatus, onDeleteItem }) => {
  const { id, title, description, status } = item;

  const handleStatusChange = (event) => {
    const newStatus = event.target.checked ? 'completed' : 'pending';
    onUpdateStatus(id, newStatus);
  };

  const handleDelete = () => {
    onDeleteItem(id);
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={status === 'completed'}
        onChange={handleStatusChange}
      />
      <div>
        <h3>{title}</h3>
        {description && <p>{description}</p>} {/* Show description if available */}
      </div>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default ChecklistItem;
