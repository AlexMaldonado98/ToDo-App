import React, { useState } from 'react';
import { ToDo } from './components/ToDo';
import './App.css';
import { LoginForm } from './components/LoginForm';

function App() {
  const [user,setUser] = useState<{token:string,username:string}>();

  const handleUserLogin = (user: { token: string, username: string }) => {
    setUser(user);
    window.localStorage.setItem('todoCredentials', JSON.stringify(user));
  };

  return (
    <div className="App">
      <div className='header-app'>
      </div>
      <div className='footer-app'>
      </div>
      {user ? <ToDo /> : <LoginForm handleUserLogin={handleUserLogin} />}
    </div>
  );
}

export default App;