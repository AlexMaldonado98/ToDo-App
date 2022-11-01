import React from 'react';
import { ToDo } from './components/ToDo';
import './App.css';

function App() {
  return(
    <div className="App">
      <div className='header-app'>
      </div>
      <div className='footer-app'>
      </div>
      <ToDo />
    </div>
  );
}

export default App;