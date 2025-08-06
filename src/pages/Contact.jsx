import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, duration: 0.8 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0, transition: { ease: 'easeOut' }
  }
};

const Contact = () => (
  <motion.div
    className="p-6 sm:p-8 md:p-12 max-w-3xl mx-auto bg-white rounded-lg shadow-lg"
    initial="hidden"
    animate="visible"
    variants={containerVariants}
  >
    <motion.h2
      className="text-4xl font-extrabold mb-6 text-center text-indigo-700"
      variants={itemVariants}
    >
      Contact Us
    </motion.h2>

    <motion.form
      className="grid gap-5"
      variants={itemVariants}
      onSubmit={(e) => {
        e.preventDefault();
        alert('Message sent!');
      }}
    >
      <motion.input
        type="text"
        placeholder="Your Name"
        className="input input-bordered w-full"
        required
        variants={itemVariants}
      />
      <motion.input
        type="email"
        placeholder="Email Address"
        className="input input-bordered w-full"
        required
        variants={itemVariants}
      />
      <motion.textarea
        placeholder="Your Message..."
        className="textarea textarea-bordered w-full min-h-[120px]"
        required
        variants={itemVariants}
      />
      <motion.button
        type="submit"
        className="btn btn-primary w-full"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        variants={itemVariants}
      >
        Send Message
      </motion.button>
    </motion.form>
  </motion.div>
);

export default Contact;
