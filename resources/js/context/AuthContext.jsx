import React, { createContext, useState, useEffect } from 'react';
import axios from '../api/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('/user')
                .then(res => setUser(res.data))
                .catch(() => setUser(null))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    }
    return (
        <AuthContext.Provider value={{ user, setUser, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
