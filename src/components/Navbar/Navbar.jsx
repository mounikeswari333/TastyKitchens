import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FiSun, FiMoon } from "react-icons/fi"; // ✅ CORRECT ICONS
import "./Navbar.css";
import { CartContext } from "../../context/CartContext";
import { ThemeContext } from "../../context/ThemeContext";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { cartData } = useContext(CartContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const cartCount = cartData.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/login", { replace: true });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img
            src="https://res.cloudinary.com/dttsqdjta/image/upload/v1770376319/Group_7420_og7n5a.png"
            alt="website logo"
            className="navbar-logo-image"
          />
          <h1 className="navbar-logo-text">Tasty Kitchens</h1>
        </Link>

        <button className="mobile-menu-icon" onClick={toggleMobileMenu}>
         <span></span>
        </button>

        <div className={`navbar-menu ${isMobileMenuOpen ? "active" : ""}`}>
          <Link
            to="/"
            className={`navbar-link ${
              location.pathname === "/" ? "active" : ""
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>

          <Link
            to="/favorites"
            className={`navbar-link ${
              location.pathname === "/favorites" ? "active" : ""
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Favorites
          </Link>

          <Link
            to="/cart"
            className={`navbar-link navbar-cart-link ${
              location.pathname === "/cart" ? "active" : ""
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Cart
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>

          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>

          <button
            type="button"
            className="theme-toggle-button"
            onClick={toggleTheme}
          >
            {theme === "dark" ? <FiSun /> : <FiMoon />}
            <span>{theme === "dark" ? "Light" : "Dark"}</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
