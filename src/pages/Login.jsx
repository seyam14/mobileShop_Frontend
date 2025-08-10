// src/pages/Login.jsx
import React, { useState } from 'react';
import api from '../api/api';
import Swal from 'sweetalert2';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLocalLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/api/login', form);
      const token = res.data.token;
      const payload = jwtDecode(token);
      login(payload, token);
      Swal.fire('Welcome', 'Logged in successfully', 'success');
      navigate('/');
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Invalid credentials', 'error');
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const { data } = await api.post('/api/google-login', {
        token: credentialResponse.credential,
      });
      const payload = jwtDecode(data.token);
      login(payload, data.token);
      Swal.fire('Welcome', 'Logged in with Google', 'success');
      navigate('/');
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Google login failed', 'error');
    }
  };

  return (
    <div className="container mx-auto p-4 flex justify-center">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Login</h2>

        {/* Local Login Form */}
        <form onSubmit={handleLocalLogin}>
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
          <button className="btn btn-primary w-full">Login</button>
        </form>

        {/* OR Divider */}
        <div className="my-4 text-center text-gray-500">OR</div>

        {/* Google Login Button */}
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => Swal.fire('Error', 'Google login failed', 'error')}
        />

        {/* Link to Register */}
        <div className="mt-4 text-center">
          <p>
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-blue-500 hover:underline"
              onClick={() => Swal.fire('Redirecting', 'Going to Register page', 'info')}
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
