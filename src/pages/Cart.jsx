import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const { cart, updateQty, removeItem } = useContext(CartContext);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Your Cart</h2>
      {cart.length === 0 ? <p>No items in cart.</p> : (
        <div className="space-y-4">
          {cart.map(item => (
            <div key={item._id} className="flex items-center justify-between border p-4 rounded">
              <div>
                <h4 className="font-semibold">{item.name}</h4>
                <p className="text-sm">{item.category}</p>
                <p>৳{item.price} x {item.quantity}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => updateQty(item._id, item.quantity - 1)} className="btn btn-sm">-</button>
                <button onClick={() => updateQty(item._id, item.quantity + 1)} className="btn btn-sm">+</button>
                <button onClick={() => removeItem(item._id)} className="btn btn-error btn-sm">Remove</button>
              </div>
            </div>
          ))}
          <div className="text-right text-xl font-bold">Total: ৳{total}</div>
        </div>
      )}
    </div>
  );
};

export default Cart;
