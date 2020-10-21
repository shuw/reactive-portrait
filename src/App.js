import React from 'react';
import ReactivePortrait from './components/ReactivePortrait'
import './App.css';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ReactivePortrait width={400} height={400} />
      </header>
    </div>
  );
} 