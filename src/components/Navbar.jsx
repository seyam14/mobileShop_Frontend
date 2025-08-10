import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Sun, Moon, ShoppingCart, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0); // Update from CartContext if you want
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);
  const handleLogin = () => navigate("/login");
  const handleLogout = () => {
    logout();
    navigate("/");
  };

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
          <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-1">
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
                    isActive ? "text-primary font-bold after:w-full" : "text-base-content"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            {/* Cart */}
            <Link to="/cart" className="relative hover:scale-110 transition-transform duration-200">
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
              {darkMode ? <Moon className="w-5 h-5 text-yellow-400" /> : <Sun className="w-5 h-5 text-orange-500" />}
            </motion.button>

            {/* User Info or Login/Logout */}
            {user ? (
              <div className="flex items-center gap-3">
                {/* Show avatar if available */}
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name || "User Avatar"}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white uppercase font-bold">
                    {user.name ? user.name.charAt(0) : "U"}
                  </div>
                )}

                {/* Show name */}
                <span className="font-medium">{user.name}</span>

                {/* Logout button */}
                <button onClick={handleLogout} className="btn btn-secondary">
                  Logout
                </button>
              </div>
            ) : (
              <button onClick={handleLogin} className="btn btn-primary">
                Login
              </button>
            )}
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center gap-3">
            <motion.button whileTap={{ rotate: 180 }} onClick={toggleTheme}>
              {darkMode ? <Moon className="w-5 h-5 text-yellow-400" /> : <Sun className="w-5 h-5 text-orange-500" />}
            </motion.button>

            <Link to="/cart" className="relative">
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-error text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setMenuOpen(!menuOpen)}>
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
                      isActive ? "text-primary font-bold" : "text-base-content"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              {user ? (
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    handleLogout();
                  }}
                  className="btn btn-secondary w-full"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    handleLogin();
                  }}
                  className="btn btn-primary w-full"
                >
                  Login
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
