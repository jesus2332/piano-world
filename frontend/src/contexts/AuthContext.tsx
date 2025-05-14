/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState, useEffect, ReactNode } from 'react';
import apiClient from '../services/api'; 
import type { User as AuthUserType } from '../types'; 

export interface AuthContextType {
    user: AuthUserType | null;
    token: string | null;
    login: (credentials: any) => Promise<void>;
    register: (data: any) => Promise<void>;
    logout: () => Promise<void>;
    isLoading: boolean;
    error: string | null; 
    clearError: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<AuthUserType | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('auth_token'));
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const clearError = () => setError(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('auth_token');
        if (storedToken) {
            setToken(storedToken);
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
            apiClient.get('/user')
                .then(response => setUser(response.data))
                .catch(() => {
                    localStorage.removeItem('auth_token');
                    delete apiClient.defaults.headers.common['Authorization'];
                    setToken(null);
                    setUser(null);
                    setError("Tu sesión ha expirado. Por favor, inicia sesión de nuevo.");
                })
                .finally(() => setIsLoading(false));
        } else {
            setIsLoading(false);
        }
    }, []);

    const login = async (credentials: any) => {
        clearError();
        setIsLoading(true);
        try {
            const response = await apiClient.post('/login', credentials);
            localStorage.setItem('auth_token', response.data.access_token);
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
            setToken(response.data.access_token);
            setUser(response.data.user);
        } catch (err: any) {
            localStorage.removeItem('auth_token');
            delete apiClient.defaults.headers.common['Authorization'];
            setToken(null);
            setUser(null);
            setError(err.response?.data?.message || "Error al iniciar sesión. Verifica tus credenciales.");
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (data: any) => {
        clearError();
        setIsLoading(true);
        try {
            const response = await apiClient.post('/register', data);
            localStorage.setItem('auth_token', response.data.access_token);
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
            setToken(response.data.access_token);
            setUser(response.data.user);
        } catch (err: any) {
            localStorage.removeItem('auth_token');
            delete apiClient.defaults.headers.common['Authorization'];
            setToken(null);
            setUser(null);
            setError(err.response?.data?.message || "Error al registrar. Inténtalo de nuevo.");
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        clearError();
        setIsLoading(true);
        if (token) {
            try {
                await apiClient.post('/logout');
            } catch (err) {
                console.error("Logout API call failed:", err);
            } finally {
                localStorage.removeItem('auth_token');
                delete apiClient.defaults.headers.common['Authorization'];
                setToken(null);
                setUser(null);
                setIsLoading(false);
            }
        } else {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout, isLoading, error, clearError }}>
            {children}
        </AuthContext.Provider>
    );
};