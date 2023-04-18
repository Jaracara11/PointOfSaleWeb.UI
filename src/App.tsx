import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Router } from './router/Router';
import { UserProvider } from './context/UserContext';

export const App = () => {
  return (
    <div className="App">
      <UserProvider>
        <main>
          <Router />
        </main>
      </UserProvider>
    </div>
  );
};
