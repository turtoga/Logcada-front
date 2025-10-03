import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  token: string | null;
  role: string | null;
  sub?: string | null;
  login: (token: string) => void;
  logout: () => void;
}

export interface DecodedToken {
  role: string;
  exp: number;
  sub: string;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [role, setRole] = useState<string | null>(null);
  const [sub, setSub] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const decoded: DecodedToken = jwtDecode(token);
      setRole(decoded.role);
      setSub(decoded.sub);
    }
  }, [token]);

  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout, sub }}>
      {children}
    </AuthContext.Provider>
  );
};
