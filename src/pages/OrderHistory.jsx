import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
// import { AuthContext } from '../contexts/AuthProvider'; // If using context

const OrderHistory = ({ user }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  // const { user } = useContext(AuthContext); // If using context

  useEffect(() => {
    if (user?.email) {
      axios.get(`http://localhost:5000/orders/${user.email}`)
        .then(res => {
          setOrders(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching orders:', err);
          setLoading(false);
        });
    }
  }, [user?.email]);

  if (loading) return <div className="text-center py-10">Loading your orders...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Order History</h1>

      {orders.length === 0 ? (
        <p className="text-gray-600">You have not placed any orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order, index) => (
            <div key={order._id || index} className="border p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold">Order #{order._id}</h2>
              <p className="text-sm text-gray-500">Date: {new Date(order.date).toLocaleString()}</p>

              <ul className="mt-2 list-disc pl-5 text-sm">
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} × {item.quantity} - ${item.price * item.quantity}
                  </li>
                ))}
              </ul>

              <p className="mt-2 font-medium">Total: ${order.total}</p>
              <p className="text-sm text-gray-600">Status: <span className="font-semibold">{order.status}</span></p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
