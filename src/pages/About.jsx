import React from 'react';
import { motion } from 'framer-motion';

const About = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="p-6 max-w-3xl mx-auto"
  >
    <h2 className="text-3xl font-bold mb-4">About Us</h2>
    <p className="text-gray-600 leading-loose">
      We specialize in buying and selling high-quality second-hand phones and accessories.
      Our mission is to make tech affordable and accessible for everyone.
    </p>
  </motion.div>
);

export default About;
