import ReactDOM from 'react-dom/client';
import { App } from './App';
import React from 'react';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { handleErrorResponse } from './services/error.service';

const queryClient = new QueryClient({
  defaultOptions: { queries: { gcTime: 600000, staleTime: 300000, retry: 3 } },
  queryCache: new QueryCache({
    onError: (error: Error, query: any) => {
      query.state.error && handleErrorResponse(error, query.state.error.message);
    }
  })
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
