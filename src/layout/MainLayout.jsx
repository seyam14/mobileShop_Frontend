import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

const MainLayout = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <header className="shadow-md bg-white z-50 sticky top-0">
        <Navbar />
      </header>

      <main className="flex-1 px-4 sm:px-6 lg:px-12 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="in"
            exit="out"
            transition={pageTransition}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="bg-white mt-auto border-t border-gray-200 shadow-inner">
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
