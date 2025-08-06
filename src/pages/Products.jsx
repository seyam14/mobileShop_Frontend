import React, { useState } from 'react';
import ProductFormModal from '../components/ProductFormModal';

const Products = ({ products, onAdd, onDelete, onUpdate }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  // Open modal to add new product
  const openAddModal = () => {
    setEditProduct(null);
    setModalOpen(true);
  };

  // Open modal to edit existing product
  const openEditModal = (product) => {
    setEditProduct(product);
    setModalOpen(true);
  };

  // Handle modal form submit (add or update)
  const handleSubmit = (productData) => {
    if (editProduct) {
      onUpdate(editProduct._id, productData);
    } else {
      onAdd(productData);
    }
    setModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={openAddModal}
        className="btn btn-primary mb-6"
      >
        + Add New Product
      </button>

      <h2 className="text-3xl font-bold mb-4">Products</h2>

      {products.length === 0 ? (
        <p className="text-gray-600">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product._id} className="border p-4 rounded shadow relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover mb-4"
              />
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-gray-600">{product.category}</p>
              <p className="text-lg font-bold">৳{product.price}</p>

              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={() => openEditModal(product)}
                  className="btn btn-sm btn-outline"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(`Delete ${product.name}?`)) {
                      onDelete(product._id);
                    }
                  }}
                  className="btn btn-sm btn-error"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ProductFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editProduct}
      />
    </div>
  );
};

export default Products;
