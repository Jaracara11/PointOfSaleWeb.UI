import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import { AppRouter } from './router/AppRouter';
import { UserContextProvider } from './context/UserContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <div className="App">
      <UserContextProvider>
        <QueryClientProvider client={queryClient}>
          <AppRouter />
          {/* <ReactQueryDevtools /> */}
        </QueryClientProvider>
      </UserContextProvider>
    </div>
  );
};
