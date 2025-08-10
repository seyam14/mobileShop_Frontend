import React, { useState } from 'react';
import api from '../api/api';
import Swal from 'sweetalert2';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import * as jwtDecode from 'jwt-decode'; // Import all as jwtDecode

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLocalLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/api/login', form);
      const token = res.data.token;

      // Use jwtDecode.default to decode the token
      const payload = jwtDecode.default(token);

      login(payload, token);

      Swal.fire('Welcome', 'Logged in successfully', 'success');
      navigate('/');
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Invalid credentials', 'error');
    }
  };

  return (
    <div className="container mx-auto p-4 flex justify-center">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Login</h2>

        <form onSubmit={handleLocalLogin}>
          <input
            className="input input-bordered w-full mb-3"
            placeholder="Email"
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
          <button className="btn btn-primary w-full">Login</button>
        </form>

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
