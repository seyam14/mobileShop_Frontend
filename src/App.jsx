import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import PaymentForm from './pages/PaymentForm';
import AdminDashboard from './pages/AdminDashboard';
import Cart from './pages/Cart';
import OrderHistory from './pages/OrderHistory';
import Login from './pages/Login';
import Register from './pages/Register';
import MainLayout from './layout/MainLayout';

function App() {
  return (
    <Routes>
      {/* Main layout wraps all public routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="payment" element={<PaymentForm />} />
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="cart" element={<Cart />} />
        <Route path="orders" element={<OrderHistory />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
