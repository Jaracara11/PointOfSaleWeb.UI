import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { AppRouter } from './router/AppRouter';

export const App = () => {
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
};
