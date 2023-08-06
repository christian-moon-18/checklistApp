// src/App.js

import React from 'react';
import './App.css'; // You can create an App.css file for styling if needed
import Checklist from './components/Checklist';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Checklist App</h1>
      </header>
      <main>
        <Checklist />
      </main>
    </div>
  );
}

export default App;
