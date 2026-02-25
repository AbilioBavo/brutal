'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from './api-client';
import type { GetMeSchema } from '@/src/gen/models/GetMeSchema';
import type { LoginMutationRequest } from '@/src/gen/models/Login';
import { toast } from 'sonner';

interface AuthContextType {
  user: GetMeSchema | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginMutationRequest) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<GetMeSchema | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const isAuthenticated = !!user && !!localStorage.getItem('auth_token');

  // Fetch current user on mount if token exists
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        try {
          const response = await apiClient.get<GetMeSchema>('/api/users/me');
          setUser(response.data);
        } catch {
          // Token is invalid, clear it
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user');
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (credentials: LoginMutationRequest) => {
    try {
      const response = await apiClient.post<{ accessToken?: string }>('/api/auth/login', credentials);
      
      if (response.data.accessToken) {
        localStorage.setItem('auth_token', response.data.accessToken);
        
        // Fetch user data
        const userResponse = await apiClient.get<GetMeSchema>('/api/users/me');
        setUser(userResponse.data);
        localStorage.setItem('user', JSON.stringify(userResponse.data));
        
        toast.success('Login realizado com sucesso!');
        router.push('/dashboard/clients');
      } else {
        throw new Error('Token não recebido');
      }
    } catch (error) {
      console.error('Login error:', error);
      
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { status?: number } };
        if (axiosError.response?.status === 401) {
          toast.error('Email ou senha inválidos');
        } else if (axiosError.response?.status === 400) {
          toast.error('Dados inválidos. Verifique os campos.');
        } else {
          toast.error('Erro ao fazer login. Tente novamente.');
        }
      } else {
        toast.error('Erro ao fazer login. Tente novamente.');
      }
      
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    setUser(null);
    toast.success('Logout realizado com sucesso');
    router.push('/zeus/login');
  };

  const refreshUser = async () => {
    try {
      const response = await apiClient.get<GetMeSchema>('/api/users/me');
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
    } catch (error) {
      console.error('Error refreshing user:', error);
      logout();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function useUser() {
  const { user } = useAuth();
  return user;
}
