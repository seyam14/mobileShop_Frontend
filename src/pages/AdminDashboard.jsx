import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAdmins: 0,
    totalProducts: 0,
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    company: '',
    price: '',
    description: '',
  });
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState(null);
  const [addSuccess, setAddSuccess] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const [statsRes, usersRes] = await Promise.all([
          axios.get('/api/admin/overview', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('/api/admin/users', { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        setStats(statsRes.data);

        if (Array.isArray(usersRes.data)) {
          setUsers(usersRes.data);
        } else if (usersRes.data.users && Array.isArray(usersRes.data.users)) {
          setUsers(usersRes.data.users);
        } else {
          setUsers([]);
          console.error('Users data is not an array:', usersRes.data);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle form inputs for new product modal
  const handleInputChange = e => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  // Submit new product
  const handleAddProduct = async e => {
    e.preventDefault();
    setAddLoading(true);
    setAddError(null);
    setAddSuccess(null);

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('/api/products', newProduct, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAddSuccess('Product added successfully!');
      setNewProduct({ name: '', category: '', company: '', price: '', description: '' });
      // Optionally refresh products or stats here
    } catch (err) {
      setAddError(err.response?.data?.message || 'Failed to add product');
    } finally {
      setAddLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">
      <motion.h1
        className="text-3xl font-bold mb-8 text-indigo-700"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Admin Dashboard
      </motion.h1>

      {/* Stats Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.15 } },
        }}
      >
        {[
          { label: 'Total Users', value: stats.totalUsers },
          { label: 'Total Admins', value: stats.totalAdmins },
          { label: 'Total Products', value: stats.totalProducts },
        ].map(({ label, value }) => (
          <motion.div
            key={label}
            className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.05 }}
          >
            <p className="text-gray-500 font-semibold">{label}</p>
            <p className="text-4xl font-extrabold text-indigo-600">{value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Users Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Role</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={3} className="text-center py-6 text-gray-500">
                  Loading users...
                </td>
              </tr>
            ) : Array.isArray(users) && users.length > 0 ? (
              users.map(user => (
                <tr
                  key={user._id}
                  className="hover:bg-indigo-50 transition-colors cursor-default"
                >
                  <td className="px-6 py-4 whitespace-nowrap">{user.name || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap capitalize">{user.role}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center py-6 text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Product Button */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-md shadow-md transition-colors"
        >
          + Add Product
        </button>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
            />

            <motion.div
              className="fixed top-1/2 left-1/2 w-full max-w-lg p-6 bg-white rounded-lg shadow-lg z-50 -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold mb-4 text-indigo-700">Add New Product</h2>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <input
                  name="name"
                  type="text"
                  placeholder="Product Name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <input
                  name="category"
                  type="text"
                  placeholder="Category"
                  value={newProduct.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <input
                  name="company"
                  type="text"
                  placeholder="Company"
                  value={newProduct.company}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <input
                  name="price"
                  type="number"
                  placeholder="Price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  required
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={newProduct.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />

                {addError && (
                  <p className="text-red-600 text-sm font-medium">{addError}</p>
                )}
                {addSuccess && (
                  <p className="text-green-600 text-sm font-medium">{addSuccess}</p>
                )}

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-400 rounded-md hover:bg-gray-100"
                    disabled={addLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md"
                    disabled={addLoading}
                  >
                    {addLoading ? 'Adding...' : 'Add Product'}
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
