import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { api } from '../api/axios';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<User>;
  logout: () => Promise<void>;
  refetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = async () => {
    const hasTokenCookie = document.cookie.split('; ').some((cookie) => cookie.startsWith('token='));

    if (!hasTokenCookie) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await api.get('/auth/me');
      if (res.data?.success) {
        setUser(res.data.data);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    const res = await api.post('/auth/login', { email, password });
    if (res.data?.success && res.data.data?.user) {
      setUser(res.data.data.user);
      return res.data.data.user;
    }
    throw new Error(res.data?.message || 'Login failed');
  };

  const logout = async (): Promise<void> => {
    try {
      await api.post('/auth/logout');
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        refetchUser: fetchMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
