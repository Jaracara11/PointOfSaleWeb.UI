import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Router } from './router/Router';
import { useState } from 'react';

export const App = () => {
  const [user, setUser] = useState('hello from context!');

  return (
    <div className="App">
      <main>
        <Router />
      </main>
    </div>
  );
};
