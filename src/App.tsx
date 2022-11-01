import React, { useEffect, useState, useRef } from 'react';
import { ToDo } from './components/ToDo';
import './App.css';
import { LoginForm } from './components/LoginForm';
import { Notifications } from './components/Notification';
import taskServices from './services/task';

function App() {
  const [user, setUser] = useState<{ token: string, username: string } | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const timeOut: any = useRef();

  useEffect(() => {
    if (localStorage.getItem('todoCredentials') === null) {
      return;
    } else {
      const x: string = localStorage.getItem('todoCredentials') || '';
      const some = JSON.parse(x);
      taskServices.setToken(some.token);
      setUser(some);
      return;
    }
  }, []);

  const handleUserLogin = (user: { token: string, username: string }) => {
    setUser(user);
    taskServices.setToken(user.token);
    window.localStorage.setItem('todoCredentials', JSON.stringify(user));
  };

  const handleLogOut = () => {
    setUser(null);
    window.localStorage.removeItem('todoCredentials');
  };

  const handleSetMsg = (msg: string) => {
    if (timeOut) {
      window.clearTimeout(timeOut.current);
    }
    setMsg(msg);
    timeOut.current = window.setTimeout(() => {
      setMsg(null);
    }, 3000);
  };

  return (
    <div className="App">
      <div className='header-app'>
        <Notifications msg={msg} />
      </div>
      <div className='footer-app'>
      </div>
      {user ? <ToDo username={user.username} logout={handleLogOut} /> : <LoginForm handleUserLogin={handleUserLogin} notif={handleSetMsg} />}
    </div>
  );
}

export default App;