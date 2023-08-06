// app.js
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();

app.use(express.json());
app.use(cors());

// Your app configuration and routes will go here
app.get('/', (req, res) => {
    res.send('Hello, Express!');
});



const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'checklist_db',
    password: 'Megustachocolate123!',
    port: 5432, // Default PostgreSQL port is 5432
});

// Example route for fetching all checklist items
app.get('/api/checklist', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM checklist_items');
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error fetching checklist items', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});
  
// Example route for adding a new checklist item
app.post('/api/checklist', async (req, res) => {
    const { title, description } = req.body;
  
    try {
      const result = await pool.query('INSERT INTO checklist_items (title, description) VALUES ($1, $2) RETURNING *', [title, description]);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error adding checklist item', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});
  
// Example route for updating a checklist item's status
app.put('/api/checklist/:id', async (req, res) => {
  const itemId = req.params.id;
  const { status } = req.body;

  try {
    // Convert the status to a boolean value (true or false)
    const booleanStatus = status === 'completed';

    // Update the checklist item status using the boolean value
    const result = await pool.query('UPDATE checklist_items SET status = $1 WHERE id = $2 RETURNING *', [booleanStatus, itemId]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error updating checklist item status', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
  
// Example route for deleting a checklist item
app.delete('/api/checklist/:id', async (req, res) => {
    const itemId = req.params.id;
  
    try {
      const result = await pool.query('DELETE FROM checklist_items WHERE id = $1 RETURNING *', [itemId]);
      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error('Error deleting checklist item', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
