import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Router } from './router/Router';
import { UserProvider } from './context/UserContext';
import { Navbar } from './components/sidenav/Navbar';

export const App = () => {
  return (
    <div className="App">
      <UserProvider>
        <Navbar />
        <main>
          <Router />
        </main>
      </UserProvider>
    </div>
  );
};
