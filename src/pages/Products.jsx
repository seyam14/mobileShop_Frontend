// src/pages/Products.js
import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { motion } from 'framer-motion';
import ProductDetailsModal from '../components/ProductDetailsModal';
import ProductFormModal from '../components/ProductFormModal';
import Swal from 'sweetalert2';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const { addToCart } = useCart();
  const { user } = useAuth();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      Swal.fire('Error','Failed to load products','error');
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchProducts(); }, []);

  const openDetails = (p) => { setSelected(p); setDetailsOpen(true); };
  const openForm = (p=null) => { setEditing(p); setFormOpen(true); };

  const handleDelete = async (id) => {
    const ok = await Swal.fire({ title: 'Delete?', showCancelButton:true, confirmButtonText:'Delete' });
    if (!ok.isConfirmed) return;
    try {
      await api.delete(`/api/products/${id}`);
      setProducts(prev => prev.filter(p => p._id !== id));
      Swal.fire('Deleted','Product removed','success');
    } catch (err) {
      console.error(err);
      Swal.fire('Error','Delete failed','error');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <div className="flex gap-2">
          {user && user.role === 'admin' && (
            <button className="btn btn-primary" onClick={()=>openForm(null)}>+ Add Product</button>
          )}
        </div>
      </div>

      {loading ? <p>Loading...</p> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(p => (
            <motion.div key={p._id} className="bg-white rounded shadow p-4 flex flex-col"
              whileHover={{ scale: 1.02 }}
            >
              <img src={p.image} alt={p.name} className="w-full h-44 object-cover rounded mb-3" />
              <h3 className="font-semibold">{p.name}</h3>
              <p className="text-sm text-gray-500">{p.category} • {p.model}</p>
              <div className="mt-2 flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold">৳{p.price}</p>
                </div>
                <div className="flex gap-2">
                  <button className="btn btn-sm btn-primary" onClick={()=>addToCart(p,1)}>Buy</button>
                  <button className="btn btn-sm btn-outline" onClick={()=>openDetails(p)}>View</button>
                </div>
              </div>

              <div className="mt-3 flex justify-between items-center">
                {user && user.role === 'admin' ? (
                  <>
                    <button className="btn btn-sm btn-ghost" onClick={()=>openForm(p)}>Edit</button>
                    <button className="btn btn-sm btn-error" onClick={()=>handleDelete(p._id)}>Delete</button>
                  </>
                ) : (
                  <span className="text-xs text-gray-400">—</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <ProductDetailsModal isOpen={detailsOpen} product={selected} onClose={()=>setDetailsOpen(false)} />
      <ProductFormModal
        isOpen={formOpen}
        onClose={()=>{ setFormOpen(false); setEditing(null); fetchProducts(); }}
        initialData={editing}
        onSaved={fetchProducts}
      />
    </div>
  );
};

export default Products;
