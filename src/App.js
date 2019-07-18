import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [from, setFrom] = useState('tja');

  return (
    <div className="App">
      <input type="text" value={from} onChange={e => setFrom(e.target.value)} />
      <div>{from || ''}</div>
    </div>
  );
}

export default App;
