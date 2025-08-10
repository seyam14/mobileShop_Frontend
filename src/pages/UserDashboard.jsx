import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function UserDashboard({ user }) {
  const [overview, setOverview] = useState(null);
  const [profile, setProfile] = useState({ name: '', email: '' });
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchOverview();
  }, []);

  async function fetchOverview() {
    try {
      const res = await axios.get('/api/user/overview');
      setOverview(res.data);
      setProfile({
        name: res.data.profile?.name || '',
        email: res.data.profile?.email || '',
      });
    } catch (err) {
      console.error(err);
    }
  }

  async function updateProfile(e) {
    e.preventDefault();
    setUpdating(true);
    try {
      // Assuming you have an endpoint to update user profile, e.g., PATCH /api/users/me
      await axios.patch('/api/users/me', { name: profile.name });
      setMessage('Profile updated!');
      fetchOverview();
    } catch (err) {
      setMessage('Failed to update profile');
    } finally {
      setUpdating(false);
      setTimeout(() => setMessage(null), 3000);
    }
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50 max-w-5xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-semibold mb-6"
      >
        Welcome, {profile.name || user.email}
      </motion.h1>

      <motion.div
        className="grid md:grid-cols-3 gap-6 mb-8"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
        }}
      >
        {/* Cards */}
        <StatCard title="Products in Cart" value={overview?.totalCartProducts || 0} color="blue" />
        <StatCard title="Products Purchased" value={overview?.totalPurchasedProducts || 0} color="green" />
        <StatCard title="Latest Order Status" value={overview?.latestOrderStatus || 'N/A'} color="purple" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white p-6 rounded shadow max-w-md"
      >
        <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
        {message && (
          <div className="mb-4 text-center text-green-600 font-medium">{message}</div>
        )}
        <form onSubmit={updateProfile} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              value={profile.email}
              disabled
              className="w-full px-4 py-2 border rounded bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={e => setProfile({ ...profile, name: e.target.value })}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            disabled={updating}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
            {updating ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

function StatCard({ title, value, color }) {
  const colors = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
  };
  return (
    <motion.div
      className={`p-6 rounded shadow text-white ${colors[color]} flex flex-col justify-center items-center`}
      whileHover={{ scale: 1.05 }}
    >
      <div className="text-xl font-semibold">{title}</div>
      <div className="text-4xl font-bold mt-2">{value}</div>
    </motion.div>
  );
}
