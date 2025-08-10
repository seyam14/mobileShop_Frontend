// src/pages/CartPage.js
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import Swal from 'sweetalert2';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const { cartItems, updateQty, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const [form, setForm] = useState({ name:'', address:'', phone:'' });
  const [placing, setPlacing] = useState(false);

  const subtotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  const discount = subtotal > 5000 ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  const handlePlace = async (e) => {
    e.preventDefault();
    if (!user) { Swal.fire('Login required','Please login to place order','warning'); return; }
    if (!form.name || !form.address || !form.phone) { Swal.fire('Missing','Fill checkout fields','warning'); return; }
    setPlacing(true);
    try {
      const order = {
        items: cartItems.map(i => ({ _id:i._id, name:i.name, price:i.price, qty:i.qty })),
        subtotal, discount, total,
        shipping: { ...form }
      };
      await api.post('/api/orders', order);
      Swal.fire('Success','Order placed','success');
      clearCart();
      setForm({ name:'', address:'', phone:'' });
    } catch (err) {
      console.error(err);
      Swal.fire('Error','Failed to place order','error');
    } finally { setPlacing(false); }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Cart</h2>
      {cartItems.length === 0 ? <p>Your cart is empty</p> : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            {cartItems.map(item => (
              <div key={item._id} className="flex gap-4 items-center p-3 border rounded mb-3">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm">৳{item.price}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <input type="number" min="1" value={item.qty} onChange={(e)=>updateQty(item._id, Number(e.target.value))} className="input input-bordered w-24" />
                    <button onClick={() => removeFromCart(item._id)} className="btn btn-sm btn-error">Remove</button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">৳{(item.price * item.qty).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="p-4 border rounded mb-4">
              <p>Subtotal: ৳{subtotal.toFixed(2)}</p>
              <p>Discount: ৳{discount.toFixed(2)}</p>
              <p className="font-bold text-lg">Total: ৳{total.toFixed(2)}</p>
            </div>

            <form onSubmit={handlePlace} className="space-y-3">
              <input className="input input-bordered w-full" placeholder="Full name" value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} />
              <input className="input input-bordered w-full" placeholder="Address" value={form.address} onChange={(e)=>setForm({...form, address:e.target.value})} />
              <input className="input input-bordered w-full" placeholder="Phone" value={form.phone} onChange={(e)=>setForm({...form, phone:e.target.value})} />
              <button type="submit" disabled={placing} className="btn btn-primary w-full">
                {placing ? 'Placing...' : `Pay ৳${total.toFixed(2)}`}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
