import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import { Router } from './router/Router';
import { UserProvider } from './context/UserContext';
import { SidebarMenu } from './components/sidebarMenu/SidebarMenu';

export const App = () => {
  return (
    <div className="App">
      <UserProvider>
        <SidebarMenu />
        <main>
          <Router />
        </main>
      </UserProvider>
    </div>
  );
};
