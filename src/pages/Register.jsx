// src/pages/Register.jsx
import React, { useState } from 'react';
import api from '../api/api';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';

const Register = () => {
  const [form, setForm] = useState({ email: '', password: '', role: 'user' });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLocalRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/register', form);
      Swal.fire('Success', 'Registered successfully', 'success');
      navigate('/login');
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Registration failed', 'error');
    }
  };

  const handleGoogleRegister = async (credentialResponse) => {
    try {
      const { data } = await api.post('/api/google-login', {
        token: credentialResponse.credential,
      });
      const payload = jwtDecode(data.token);
      login(payload, data.token);
      Swal.fire('Welcome', 'Registered & logged in with Google', 'success');
      navigate('/');
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Google registration failed', 'error');
    }
  };

  return (
    <div className="container mx-auto p-4 flex justify-center">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Register</h2>

        {/* Local Register Form */}
        <form onSubmit={handleLocalRegister}>
          <input
            className="input input-bordered w-full mb-3"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            className="input input-bordered w-full mb-3"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button className="btn btn-primary w-full">Register</button>
        </form>

        {/* OR Divider */}
        <div className="my-4 text-center text-gray-500">OR</div>

        {/* Google Register Button */}
        <GoogleLogin
          onSuccess={handleGoogleRegister}
          onError={() => Swal.fire('Error', 'Google registration failed', 'error')}
        />

        {/* Link to Login */}
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
