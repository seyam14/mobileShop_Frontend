import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function AdminDashboard({ user }) {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [product, setProduct] = useState({
    name: '',
    category: '',
    company: '',
    price: '',
    image: '',
    description: '',
  });
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [productMsg, setProductMsg] = useState(null);
  const [userMsg, setUserMsg] = useState(null);

  useEffect(() => {
    fetchStats();
    fetchUsers();
  }, []);

  async function fetchStats() {
    try {
      const res = await axios.get('/api/admin/overview');
      setStats(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function fetchUsers() {
    try {
      const res = await axios.get('/api/admin/users');
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function promoteUser(id) {
    setUserMsg(null);
    try {
      await axios.patch(`/api/users/${id}/promote`);
      setUserMsg('User promoted to admin!');
      fetchUsers();
    } catch (err) {
      setUserMsg(err.response?.data?.message || 'Failed to promote user');
    } finally {
      setTimeout(() => setUserMsg(null), 3000);
    }
  }

  async function createProduct(e) {
    e.preventDefault();
    setLoadingProduct(true);
    setProductMsg(null);
    try {
      const payload = {
        name: product.name,
        category: product.category,
        company: product.company,
        price: Number(product.price),
        image: product.image,
        description: product.description,
      };
      await axios.post('/api/products', payload);
      setProductMsg('Product created successfully!');
      setProduct({
        name: '',
        category: '',
        company: '',
        price: '',
        image: '',
        description: '',
      });
    } catch (err) {
      setProductMsg(err.response?.data?.message || 'Failed to create product');
    } finally {
      setLoadingProduct(false);
      setTimeout(() => setProductMsg(null), 3000);
    }
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50 max-w-6xl mx-auto space-y-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-semibold"
      >
        Admin Dashboard
      </motion.h1>

      {/* Stats */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-4 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
        }}
      >
        <AdminStatCard title="Total Users" value={stats?.totalUsers || 0} color="indigo" />
        <AdminStatCard title="Total Admins" value={stats?.totalAdmins || 0} color="purple" />
        <AdminStatCard title="Total Products" value={stats?.totalProducts || 0} color="teal" />
        <AdminStatCard title="Total Sold Products" value={stats?.totalSoldProducts || 0} color="green" />
      </motion.div>

      {/* Users List */}
      <section className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Users</h2>
        {userMsg && <div className="mb-4 text-center text-green-600">{userMsg}</div>}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Role</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{u.name || '-'}</td>
                  <td className="border border-gray-300 px-4 py-2">{u.email}</td>
                  <td className="border border-gray-300 px-4 py-2 capitalize">{u.role}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {u.role !== 'admin' && (
                      <button
                        onClick={() => promoteUser(u._id)}
                        className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition"
                      >
                        Promote
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Product Create Form */}
      <section className="bg-white p-6 rounded shadow max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
        {productMsg && <div className="mb-4 text-center text-green-600">{productMsg}</div>}
        <form onSubmit={createProduct} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            required
            value={product.name}
            onChange={e => setProduct({ ...product, name: e.target.value })}
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="text"
            placeholder="Category"
            required
            value={product.category}
            onChange={e => setProduct({ ...product, category: e.target.value })}
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="text"
            placeholder="Company"
            required
            value={product.company}
            onChange={e => setProduct({ ...product, company: e.target.value })}
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="number"
            placeholder="Price"
            required
            min="0"
            value={product.price}
            onChange={e => setProduct({ ...product, price: e.target.value })}
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="text"
            placeholder="Image URL"
            required
            value={product.image}
            onChange={e => setProduct({ ...product, image: e.target.value })}
            className="w-full px-4 py-2 border rounded"
          />
          <textarea
            placeholder="Description"
            value={product.description}
            onChange={e => setProduct({ ...product, description: e.target.value })}
            className="w-full px-4 py-2 border rounded"
            rows={3}
          />
          <button
            type="submit"
            disabled={loadingProduct}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            {loadingProduct ? 'Adding...' : 'Add Product'}
          </button>
        </form>
      </section>
    </div>
  );
}

function AdminStatCard({ title, value, color }) {
  const colors = {
    indigo: 'bg-indigo-600',
    purple: 'bg-purple-600',
    teal: 'bg-teal-600',
    green: 'bg-green-600',
  };
  return (
    <motion.div
      className={`p-6 rounded shadow text-white flex flex-col justify-center items-center ${colors[color]}`}
      whileHover={{ scale: 1.05 }}
    >
      <div className="text-lg font-semibold">{title}</div>
      <div className="text-3xl font-bold mt-1">{value}</div>
    </motion.div>
  );
}
