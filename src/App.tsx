import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Router } from './routes/router';

export const App = () => {
  return (
    <div className="App">
      <main>
        <Router />
      </main>
    </div>
  );
};
