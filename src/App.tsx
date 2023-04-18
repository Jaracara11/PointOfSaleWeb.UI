import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { UserContext } from './context/userContext';
import { Router } from './router/Router';
import { useState } from 'react';

export const App = () => {
  const [user, setUser] = useState('hello from context!');

  return (
    <div className="App">
      <UserContext.Provider>
        <main>
          <Router />
        </main>
      </UserContext.Provider>
    </div>
  );
};
