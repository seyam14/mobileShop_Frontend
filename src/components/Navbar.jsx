import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Sun, Moon, ShoppingCart, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0); // Replace with actual cart count

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <motion.nav
      className="bg-base-100 shadow-md sticky top-0 z-50"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <Link
            to="/"
            className="text-2xl font-bold text-primary flex items-center gap-1"
          >
            Second<span className="text-secondary">Hand</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative font-medium transition-colors duration-300 hover:text-primary after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-primary after:left-0 after:-bottom-1 hover:after:w-full after:transition-all ${
                    isActive
                      ? "text-primary font-bold after:w-full"
                      : "text-base-content"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            {/* Cart */}
            <Link
              to="/cart"
              className="relative hover:scale-110 transition-transform duration-200"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-error text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Theme Toggle */}
            <motion.button
              whileTap={{ rotate: 180, scale: 0.8 }}
              onClick={toggleTheme}
              className="transition-all duration-300"
            >
              {darkMode ? (
                <Moon className="w-5 h-5 text-yellow-400" />
              ) : (
                <Sun className="w-5 h-5 text-orange-500" />
              )}
            </motion.button>

            {/* Login */}
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center gap-3">
            <motion.button whileTap={{ rotate: 180 }} onClick={toggleTheme}>
              {darkMode ? (
                <Moon className="w-5 h-5 text-yellow-400" />
              ) : (
                <Sun className="w-5 h-5 text-orange-500" />
              )}
            </motion.button>

            <Link to="/cart" className="relative">
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-error text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobileMenu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden px-4 pb-4 bg-base-100 border-t"
          >
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block font-medium hover:text-primary transition ${
                      isActive
                        ? "text-primary font-bold"
                        : "text-base-content"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="btn btn-primary w-full"
              >
                Login
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
