import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProductPage from './pages/ProductPage';
import OrderDetailsPage from './pages/OrderDetailsPage';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/orders/:id" element={<OrderDetailsPage />} />
        </Routes>
    );
};

export default App;
