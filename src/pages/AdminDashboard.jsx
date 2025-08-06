import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    orders: 0,
    products: 0
  });

  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    // Fetch dashboard stats
    axios.get('http://localhost:5000/admin/stats')
      .then(res => setStats(res.data))
      .catch(err => console.error('Stats error:', err));

    // Fetch recent orders
    axios.get('http://localhost:5000/admin/recent-orders')
      .then(res => setRecentOrders(res.data))
      .catch(err => console.error('Orders error:', err));
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card title="Total Users" value={stats.users} />
        <Card title="Total Orders" value={stats.orders} />
        <Card title="Total Products" value={stats.products} />
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Order ID</th>
                <th className="p-2">User</th>
                <th className="p-2">Total</th>
                <th className="p-2">Status</th>
                <th className="p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length > 0 ? recentOrders.map(order => (
                <tr key={order._id} className="border-b">
                  <td className="p-2">{order._id.slice(-6)}</td>
                  <td className="p-2">{order.email}</td>
                  <td className="p-2">${order.total}</td>
                  <td className="p-2">{order.status}</td>
                  <td className="p-2">{new Date(order.date).toLocaleDateString()}</td>
                </tr>
              )) : (
                <tr><td className="p-2" colSpan="5">No recent orders</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Reusable Card component
const Card = ({ title, value }) => (
  <div className="bg-white rounded-lg p-4 shadow flex flex-col items-center text-center">
    <h3 className="text-lg font-medium text-gray-600">{title}</h3>
    <p className="text-3xl font-bold text-blue-600 mt-2">{value}</p>
  </div>
);

export default AdminDashboard;
