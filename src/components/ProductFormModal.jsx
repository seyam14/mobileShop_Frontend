import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8, y: "-50%", x: "-50%" },
  visible: { opacity: 1, scale: 1, y: "-50%", x: "-50%" },
};

const categoryOptions = [
  'Android',
  'iPhone',
  'Button Phone',
  'Cable',
  'Charger',
  'Earphone',
];

const ProductFormModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    image: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        category: initialData.category || '',
        price: initialData.price || '',
        image: initialData.image || '',
      });
    } else {
      setFormData({ name: '', category: '', price: '', image: '' });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.category || !formData.price || !formData.image) {
      Swal.fire('Missing Fields', 'Please fill all fields.', 'warning');
      return;
    }

    const priceNum = parseFloat(formData.price);
    if (isNaN(priceNum) || priceNum < 0) {
      Swal.fire('Invalid Price', 'Please enter a valid price.', 'error');
      return;
    }

    onSubmit({ ...formData, price: priceNum });

    Swal.fire({
      icon: 'success',
      title: initialData ? 'Product Updated!' : 'Product Added!',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed top-1/2 left-1/2 z-50 w-11/12 max-w-md bg-white rounded-lg shadow-lg p-6"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            style={{ transformOrigin: "center" }}
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold mb-4 text-center">
              {initialData ? 'Edit Product' : 'Add New Product'}
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={formData.name}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="select select-bordered w-full"
                required
              >
                <option value="" disabled>Select Category</option>
                {categoryOptions.map((cat, i) => (
                  <option key={i} value={cat}>{cat}</option>
                ))}
              </select>

              <input
                type="number"
                name="price"
                placeholder="Price (৳)"
                value={formData.price}
                onChange={handleChange}
                className="input input-bordered w-full"
                min="0"
                step="0.01"
                required
              />

              <input
                type="url"
                name="image"
                placeholder="Image URL"
                value={formData.image}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />

              {/* Live Preview */}
              {formData.image && (
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full h-40 object-contain rounded border"
                  onError={(e) => e.target.style.display = 'none'}
                />
              )}

              <div className="flex justify-end gap-3 mt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  {initialData ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProductFormModal;
