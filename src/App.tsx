import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { AppRouter } from './router/AppRouter';
import { UserContextProvider } from './context/UserContext';
import { QueryClient, QueryCache, QueryClientProvider } from '@tanstack/react-query';
import { handleErrorResponse } from './services/error.Service';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: Error, query: any) => {
      query.state.error && handleErrorResponse(error, query.state.error.message);
    }
  })
});

export const App = () => {
  return (
    <div className="App">
      <UserContextProvider>
        <QueryClientProvider client={queryClient}>
          <AppRouter />
        </QueryClientProvider>
      </UserContextProvider>
    </div>
  );
};
