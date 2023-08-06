// src/App.js

import React from 'react';
import './App.css';
import Checklist from './components/Checklist';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Christian's To-Do List</h1>
      </header>
      <main>
        <Checklist />
      </main>
    </div>
  );
}

export default App;
