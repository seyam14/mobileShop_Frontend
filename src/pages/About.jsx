import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.3, duration: 1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { ease: "easeOut" } },
};

const About = () => (
  <motion.div
    className="p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-lg"
    variants={containerVariants}
    initial="hidden"
    animate="visible"
  >
    <motion.h2
      className="text-4xl font-extrabold mb-6 text-center text-indigo-700"
      variants={itemVariants}
    >
      About Us
    </motion.h2>

    <motion.p
      className="text-lg text-gray-700 leading-relaxed mb-4"
      variants={itemVariants}
    >
      At <span className="font-semibold text-indigo-600">Your Trusted Second-Hand Store</span>, we specialize in buying and selling high-quality, certified pre-owned <strong>mobile phones</strong>, <strong>headphones</strong>, <strong>earphones</strong>, <strong>chargers</strong>, <strong>cables</strong>, and other essential accessories.
    </motion.p>

    <motion.p
      className="text-lg text-gray-700 leading-relaxed mb-4"
      variants={itemVariants}
    >
      Our mission is to make technology affordable and accessible to everyone while promoting sustainable consumption. We carefully inspect each item to ensure it meets our quality standards so you can shop with confidence.
    </motion.p>

    <motion.p
      className="text-lg text-gray-700 leading-relaxed"
      variants={itemVariants}
    >
      Visit us in <span className="font-semibold">Madhabdi, Narsingdi, Dhaka</span>, where our friendly team is ready to assist you with expert advice and unbeatable deals. Join our community of smart shoppers who value quality and great prices.
    </motion.p>
  </motion.div>
);

export default About;
