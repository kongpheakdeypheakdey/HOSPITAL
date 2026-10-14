import React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { ToastProvider } from './components/Toast';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AppRoutes } from './routes/AppRoutes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const LayoutWrapper: React.FC = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#edf7ff] via-[#f6fbff] to-white font-sans antialiased text-[#0B1D2E]">
      {!isAdminPage && <Header />}
      <main className="flex-1">
        <AppRoutes />
      </main>
      {!isAdminPage && <Footer />}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LanguageProvider>
          <ToastProvider>
            <Router>
              <LayoutWrapper />
            </Router>
          </ToastProvider>
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
