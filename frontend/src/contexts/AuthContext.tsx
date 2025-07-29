import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '@/config/api';

interface User {
  id: string;
  name: string;
  email: string;
  location: string;
  userType: 'student' | 'college';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string, userType: 'student' | 'college') => Promise<void>;
  register: (data: any, userType: 'student' | 'college') => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Check for stored token and user data
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      // Token will be automatically added by the API interceptor
    }
  }, []);

  const login = async (email: string, password: string, userType: 'student' | 'college') => {
    try {
      const response = await api.post('/api/auth/login', {
        email,
        password,
        userType
      });

      const { token, user } = response.data;
      
      // Store token and user data
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Token will be automatically added by the API interceptor
      
      setToken(token);
      setUser(user);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (data: any, userType: 'student' | 'college') => {
    try {
      const response = await api.post(`/api/auth/register/${userType}`, data);

      const { token, user } = response.data;
      
      // Store token and user data
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Token will be automatically added by the API interceptor
      
      setToken(token);
      setUser(user);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = () => {
    // Clear stored data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Token removal is handled by the API interceptor
    
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};