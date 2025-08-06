import { useState } from 'react';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

const PaymentForm = () => {
  const [method, setMethod] = useState('bkash');
  const [formData, setFormData] = useState({ name: '', number: '', address: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your order submission logic here (e.g. axios.post to backend)

    Swal.fire({
      title: 'Success!',
      text: `Your order has been placed with ${method.toUpperCase()}`,
      icon: 'success',
      confirmButtonText: 'OK',
    });

    setFormData({ name: '', number: '', address: '' });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8"
    >
      <h2 className="text-2xl font-bold mb-4">Payment Information</h2>

      <div className="flex gap-4 mb-4">
        {['bkash', 'card', 'cod'].map(opt => (
          <button 
            key={opt}
            className={`btn ${method === opt ? 'btn-primary' : 'btn-outline'} btn-sm`}
            onClick={() => setMethod(opt)}
          >
            {opt === 'bkash' ? 'bKash' : opt === 'card' ? 'Card' : 'Cash on Delivery'}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          required
          type="text"
          placeholder="Your Name"
          className="input input-bordered w-full"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
        />

        <input
          required
          type="text"
          placeholder={method === 'card' ? 'Card Number' : method === 'bkash' ? 'bKash Number' : 'Phone Number'}
          className="input input-bordered w-full"
          value={formData.number}
          onChange={e => setFormData({ ...formData, number: e.target.value })}
        />

        <textarea
          required
          placeholder="Delivery Address"
          className="textarea textarea-bordered w-full"
          value={formData.address}
          onChange={e => setFormData({ ...formData, address: e.target.value })}
        />

        <button type="submit" className="btn btn-success w-full">Submit Payment</button>
      </form>
    </motion.div>
  );
};

export default PaymentForm;
