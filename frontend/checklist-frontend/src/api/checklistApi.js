// api/checklistApi.js

const BASE_URL = 'http://localhost:3001/api/checklist';

const checklistApi = {
  async getChecklistItems() {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error('Error fetching checklist items');
    }
    return response.json();
  },

  async addChecklistItem(title, description) {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description }),
    });
    if (!response.ok) {
      throw new Error('Error adding checklist item');
    }
    return response.json();
  },

  async updateChecklistItem(id, status) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) {
      throw new Error('Error updating checklist item status');
    }
    return response.json();
  },

  async deleteChecklistItem(id) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Error deleting checklist item');
    }
    return response.json();
  },
};

export default checklistApi;
