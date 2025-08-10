import React, { useState } from 'react';
import api from '../api/api';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';
import * as jwtDecode from 'jwt-decode';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLocalRegister = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      return Swal.fire('Error', 'Name, email and password are required', 'error');
    }

    try {
      const res = await api.post('/api/register', form);
      Swal.fire('Success', 'Registered successfully', 'success');
      navigate('/login');
    } catch (err) {
      console.error('Register error:', err);
      Swal.fire('Error', err.response?.data?.message || 'Registration failed', 'error');
    }
  };

  return (
    <div className="container mx-auto p-4 flex justify-center">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Register</h2>

        <form onSubmit={handleLocalRegister}>
          <input
            className="input input-bordered w-full mb-3"
            placeholder="Name"
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            className="input input-bordered w-full mb-3"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            className="input input-bordered w-full mb-3"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button className="btn btn-primary w-full" type="submit">
            Register
          </button>
        </form>

        <div className="mt-4 text-center">
          <p>
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-blue-500 hover:underline"
              onClick={() => Swal.fire('Redirecting', 'Going to Login page', 'info')}
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
