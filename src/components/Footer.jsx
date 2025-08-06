import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaPhone,
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaSun,
  FaMoon
} from 'react-icons/fa';

const footerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const Footer = () => {
  const [darkMode, setDarkMode] = useState(() =>
    localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <motion.footer
      className="bg-base-200 text-base-content px-6 sm:px-12 py-10 border-t border-gray-300 mt-auto"
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-4 sm:grid-cols-2 grid-cols-1">

        {/* Brand + Social */}
        <div>
          <h2 className="text-xl font-bold mb-2">SecondHand Store</h2>
          <p>Affordable Mobile Solutions Since 2024</p>
          <div className="mt-4 space-x-4 flex items-center">
            <a href="#" className="text-xl hover:text-primary transition-colors"><FaFacebookF /></a>
            <a href="#" className="text-xl hover:text-primary transition-colors"><FaTwitter /></a>
            <a href="#" className="text-xl hover:text-primary transition-colors"><FaInstagram /></a>
          </div>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="footer-title text-lg mb-2">Company</h3>
          <ul className="space-y-2">
            <li><a className="link link-hover">About us</a></li>
            <li><a className="link link-hover">Contact</a></li>
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h3 className="footer-title text-lg mb-2">Legal</h3>
          <ul className="space-y-2">
            <li><a className="link link-hover">Terms of use</a></li>
            <li><a className="link link-hover">Privacy policy</a></li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h3 className="footer-title text-lg mb-2">Newsletter</h3>
          <p>Stay updated with our latest offers</p>
          <form className="form-control mt-4">
            <div className="relative">
              <input
                type="email"
                placeholder="Your email"
                className="input input-bordered w-full pr-16"
              />
              <button className="btn btn-primary absolute top-0 right-0 rounded-l-none">
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Bottom */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-10 pt-6 border-t border-gray-300 text-sm text-gray-500 dark:text-gray-400">
        <p>© {new Date().getFullYear()} SecondHand Store. All rights reserved.</p>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="btn btn-sm btn-outline"
        >
          {darkMode ? (
            <><FaSun className="mr-2" /> Light Mode</>
          ) : (
            <><FaMoon className="mr-2" /> Dark Mode</>
          )}
        </button>
      </div>
    </motion.footer>
  );
};

export default Footer;
