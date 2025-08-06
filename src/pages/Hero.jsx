import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    className="hero bg-orange-100 py-16 px-6 text-center"
  >
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl md:text-6xl font-bold">Buy Second-Hand Phones & Accessories</h1>
      <p className="text-lg mt-4">Explore premium quality used devices at unbeatable prices.</p>
      <button className="btn btn-primary mt-6">Shop Now</button>
    </div>
  </motion.div>
);

export default Hero;
