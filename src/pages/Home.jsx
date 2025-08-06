import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Hero from './Hero';
import Products from './Products';

const API_BASE = 'http://localhost:5000/api';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Android', 'iPhone', 'Button Phone', 'Cable', 'Charger', 'Earphone'];

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_BASE}/products`);
      setProducts(res.data);
    } catch (err) {
      console.error('Failed to fetch products', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add new product (no token needed)
  const addProduct = async (newProduct) => {
    try {
      await axios.post(`${API_BASE}/products`, newProduct);
      fetchProducts();
    } catch (err) {
      console.error('Failed to add product', err);
      alert('Add product failed');
    }
  };

  // Delete product (no token needed)
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API_BASE}/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error('Failed to delete product', err);
      alert('Delete product failed');
    }
  };

  // Update product (no token needed)
  const updateProduct = async (id, updatedProduct) => {
    try {
      await axios.put(`${API_BASE}/products/${id}`, updatedProduct);
      fetchProducts();
    } catch (err) {
      console.error('Failed to update product', err);
      alert('Update product failed');
    }
  };

  const filtered = filter === 'All' ? products : products.filter(p => p.category === filter);

  return (
    <div className="p-4">
      <Hero />

      <div className="mb-4 flex gap-2 flex-wrap">
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`btn btn-sm ${filter === c ? 'btn-primary' : 'btn-outline'}`}
          >
            {c}
          </button>
        ))}
      </div>

      <Products
        products={filtered}
        onAdd={addProduct}
        onDelete={deleteProduct}
        onUpdate={updateProduct}
      />
    </div>
  );
};

export default Home;
