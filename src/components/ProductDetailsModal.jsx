// src/components/ProductDetailsModal.js
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const ProductDetailsModal = ({ isOpen, product, onClose }) => {
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  if (!product) return null;

  const handleBuy = () => {
    addToCart(product, qty);
    onClose();
    navigate('/cart');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div className="fixed inset-0 bg-black/50 z-40" onClick={onClose}
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} />
          <motion.div
            className="fixed left-1/2 top-1/2 z-50 w-11/12 max-w-xl bg-white rounded-lg shadow-lg p-5 overflow-auto"
            style={{ transform: 'translate(-50%, -50%)' }}
            initial={{ y:20, opacity:0 }} animate={{ y:0, opacity:1 }} exit={{ y:20, opacity:0 }}
            onClick={(e)=> e.stopPropagation()}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <img src={product.image} alt={product.name} className="w-full h-56 object-cover rounded" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{product.name}</h2>
                <p className="text-sm text-gray-500">Model: {product.model}</p>
                <p className="text-sm text-gray-500">Category: {product.category}</p>
                {product.ram && <p className="text-sm">RAM: {product.ram}</p>}
                {product.rom && <p className="text-sm">ROM: {product.rom}</p>}
                <p className="text-xl font-bold mt-3">৳{product.price}</p>

                <div className="mt-4">
                  <label className="block">Quantity</label>
                  <input type="number" min="1" value={qty} onChange={(e)=>setQty(Math.max(1, Number(e.target.value)))} className="input input-bordered w-24 mt-1" />
                </div>

                <div className="mt-4 text-sm text-gray-600">
                  <h4 className="font-semibold">Terms & Conditions</h4>
                  <p className="mt-1">Check product condition on delivery. Warranty depends on seller. Returns within 3 days if not as described.</p>
                </div>

                <div className="flex gap-2 mt-4">
                  <button onClick={onClose} className="btn btn-outline">Close</button>
                  <button onClick={handleBuy} className="btn btn-primary">Buy & Go to Cart</button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProductDetailsModal;
