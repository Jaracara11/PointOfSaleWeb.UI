import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { AppRouter } from './router/AppRouter';
import { QueryClient, QueryCache, QueryClientProvider } from '@tanstack/react-query';
import { handleErrorResponse } from './services/error.service';

const queryClient = new QueryClient({
  defaultOptions: { queries: { gcTime: 43200000, staleTime: 21600000 } },
  queryCache: new QueryCache({
    onError: (error: Error, query: any) => {
      query.state.error && handleErrorResponse(error, query.state.error.message);
    }
  })
});

export const App = () => {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <AppRouter />
      </QueryClientProvider>
    </div>
  );
};
