import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProductPage from './pages/ProductPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import { AuthContext } from './context/AuthContext';

const App = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <div>Loading...</div>;

    return (
        <Routes>
            <Route path="/" element={user ? <ProductPage /> : <LoginPage />} />
            <Route path="/products" element={user ? <ProductPage /> : <Navigate to="/" />} />
            <Route path="/orders/:id" element={user ? <OrderDetailsPage /> : <Navigate to="/" />} />
        </Routes>
    );
};

export default App;
