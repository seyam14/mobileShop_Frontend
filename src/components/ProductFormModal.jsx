// src/components/ProductFormModal.js
import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Swal from 'sweetalert2';
import api from '../api/api';

const categoryOptions = ['Android','iPhone','Button Phone','Cable','Charger','Earphone'];

const ProductFormModal = ({ isOpen, onClose, initialData, onSaved }) => {
  const [form, setForm] = useState({
    name: '', model: '', category: '', price: '', ram: '', rom: '', image: ''
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (initialData) setForm({ ...initialData, price: String(initialData.price) });
    else setForm({ name:'', model:'', category:'', price:'', ram:'', rom:'', image:'' });
  }, [initialData, isOpen]);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const data = new FormData();
    data.append('image', file);
    try {
      const res = await api.post('/api/upload', data, { headers: { 'Content-Type': 'multipart/form-data' }});
      setForm(prev => ({ ...prev, image: res.data.url }));
      Swal.fire('Uploaded','Image uploaded successfully','success');
    } catch (err) {
      console.error(err);
      Swal.fire('Error','Image upload failed','error');
    } finally { setUploading(false); }
  };

  const submit = async (e) => {
    e.preventDefault();
    const { name, model, category, price, image, ram, rom } = form;
    if (!name || !model || !category || !price || !image) {
      Swal.fire('Missing','Please fill required fields','warning'); return;
    }
    const payload = { ...form, price: parseFloat(price) };
    try {
      if (initialData && initialData._id) {
        await api.put(`/api/products/${initialData._id}`, payload);
        Swal.fire('Updated','Product updated','success');
      } else {
        await api.post('/api/products', payload);
        Swal.fire('Added','Product added','success');
      }
      onSaved && onSaved();
      onClose();
    } catch (err) {
      console.error(err);
      Swal.fire('Error','Failed to save product','error');
    }
  };

  const isSmartphone = form.category === 'Android' || form.category === 'iPhone';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div className="fixed inset-0 bg-black/50 z-40" onClick={onClose}
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} />
          <motion.div
            className="fixed left-1/2 top-1/2 z-50 w-11/12 md:w-2/3 lg:w-1/2 max-w-2xl bg-white rounded-lg shadow-lg p-5"
            style={{ transform: 'translate(-50%, -50%)' }}
            initial={{ scale:0.9, opacity:0 }} animate={{ scale:1, opacity:1 }} exit={{ scale:0.9, opacity:0 }}
            onClick={(e)=>e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-3 text-center">{initialData ? 'Edit Product' : 'Add Product'}</h3>
            <form onSubmit={submit} className="space-y-3">
              <input name="name" value={form.name} onChange={handleChange} className="input input-bordered w-full" placeholder="Product name" />
              <input name="model" value={form.model} onChange={handleChange} className="input input-bordered w-full" placeholder="Model" />
              <select name="category" value={form.category} onChange={handleChange} className="select select-bordered w-full">
                <option value="">Select Category</option>
                {categoryOptions.map(c => <option key={c} value={c}>{c}</option>)}
              </select>

              {isSmartphone && (
                <div className="grid grid-cols-2 gap-2">
                  <input name="ram" value={form.ram} onChange={handleChange} className="input input-bordered" placeholder="RAM (e.g. 4GB)" />
                  <input name="rom" value={form.rom} onChange={handleChange} className="input input-bordered" placeholder="ROM (e.g. 64GB)" />
                </div>
              )}

              <input name="price" value={form.price} onChange={handleChange} type="number" step="0.01" min="0" className="input input-bordered w-full" placeholder="Price (৳)" />
              <div>
                <label className="block text-sm mb-1">Image</label>
                <div className="flex gap-2">
                  <input type="file" accept="image/*" onChange={handleFile} />
                  {uploading && <span className="text-sm">Uploading...</span>}
                </div>
                {form.image && <img src={form.image} alt="preview" className="w-full max-h-48 object-contain mt-2 rounded" />}
              </div>

              <div className="flex justify-end gap-2">
                <button type="button" onClick={onClose} className="btn btn-outline">Cancel</button>
                <button type="submit" className="btn btn-primary">{initialData ? 'Update' : 'Add'}</button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProductFormModal;
