import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import { Router } from './router/Router';
import { SidebarMenu } from './components/sidebarMenu/SidebarMenu';
import { UserContextProvider } from './context/UserContext';

export const App = () => {
  return (
    <div className="App">
      <UserContextProvider>
        <SidebarMenu />
        <main>
          <Router />
        </main>
      </UserContextProvider>
    </div>
  );
};
