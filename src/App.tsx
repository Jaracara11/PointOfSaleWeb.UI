import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import { AppRouter } from './router/AppRouter';
import { UserContextProvider } from './context/UserContext';

export const App = () => {
  return (
    <div className="App">
      <UserContextProvider>
        <AppRouter />
      </UserContextProvider>
    </div>
  );
};
