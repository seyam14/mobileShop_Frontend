import React from 'react';
const Contact = () => (
  <div className="p-6 max-w-2xl mx-auto">
    <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
    <form className="grid gap-4">
      <input className="input input-bordered" placeholder="Name" required />
      <input className="input input-bordered" placeholder="Email" type="email" required />
      <textarea className="textarea textarea-bordered" placeholder="Your message..." required />
      <button className="btn btn-primary w-full">Send</button>
    </form>
  </div>
);

export default Contact;
