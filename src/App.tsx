import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Router } from './router/Router';

export const App = () => {
  return (
    <div className="App">
      <main>
        <Router />
      </main>
    </div>
  );
};
