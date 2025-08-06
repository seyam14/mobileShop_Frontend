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
    model: '',
    category: '',
    price: '',
    ram: '',
    rom: '',
    image: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        model: initialData.model || '',
        category: initialData.category || '',
        price: initialData.price || '',
        ram: initialData.ram || '',
        rom: initialData.rom || '',
        image: initialData.image || '',
      });
    } else {
      setFormData({
        name: '',
        model: '',
        category: '',
        price: '',
        ram: '',
        rom: '',
        image: '',
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, model, category, price, image, ram, rom } = formData;

    if (!name || !model || !category || !price || !image) {
      Swal.fire('Missing Fields', 'Please fill all required fields.', 'warning');
      return;
    }

    if ((category === 'Android' || category === 'iPhone') && (!ram || !rom)) {
      Swal.fire('Missing Fields', 'Please fill RAM and ROM for Android/iPhone.', 'warning');
      return;
    }

    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum < 0) {
      Swal.fire('Invalid Price', 'Please enter a valid price.', 'error');
      return;
    }

    onSubmit({
      ...formData,
      price: priceNum,
    });

    Swal.fire({
      icon: 'success',
      title: initialData ? 'Product Updated!' : 'Product Added!',
      showConfirmButton: false,
      timer: 1500,
    });

    onClose(); // close modal after success
  };

  const isSmartphone = formData.category === 'Android' || formData.category === 'iPhone';

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
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold mb-4 text-center">
              {initialData ? 'Edit Product' : 'Add New Product'}
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Product Name */}
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={formData.name}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />

              {/* Model */}
              <input
                type="text"
                name="model"
                placeholder="Model"
                value={formData.model}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />

              {/* Category */}
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

              {/* RAM and ROM (conditional) */}
              {isSmartphone && (
                <>
                  <input
                    type="text"
                    name="ram"
                    placeholder="RAM (e.g. 4GB)"
                    value={formData.ram}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                  />
                  <input
                    type="text"
                    name="rom"
                    placeholder="ROM (e.g. 64GB)"
                    value={formData.rom}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                  />
                </>
              )}

              {/* Price */}
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

              {/* Image URL */}
              <input
                type="url"
                name="image"
                placeholder="Image URL"
                value={formData.image}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />

              {/* Full Image Preview with Info */}
              {formData.image && (
                <div className="w-full border rounded p-2 bg-gray-50">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full max-h-60 object-contain rounded mb-2"
                    onError={(e) => e.target.style.display = 'none'}
                  />
                  <div className="text-sm space-y-1 px-1">
                    {formData.model && <p><strong>Model:</strong> {formData.model}</p>}
                    {isSmartphone && (
                      <>
                        {formData.ram && <p><strong>RAM:</strong> {formData.ram}</p>}
                        {formData.rom && <p><strong>ROM:</strong> {formData.rom}</p>}
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Buttons */}
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
