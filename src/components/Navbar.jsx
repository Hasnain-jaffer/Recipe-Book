import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const updateUser = () => {
    const user = JSON.parse(localStorage.getItem('currentUser')) ||
                 JSON.parse(sessionStorage.getItem('currentUser'));
    setCurrentUser(user);
  };

  useEffect(() => {
    updateUser();
    window.addEventListener('storage', updateUser);
    window.addEventListener('userUpdated', updateUser);
    return () => {
      window.removeEventListener('storage', updateUser);
      window.removeEventListener('userUpdated', updateUser);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener('userUpdated', close);
    return () => window.removeEventListener('userUpdated', close);
  }, []);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('currentUser');
      sessionStorage.removeItem('currentUser');
      setCurrentUser(null);
      setMenuOpen(false);
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new Event('userUpdated'));
      navigate('/login');
    }
  };

  return (
    <nav className={`navbar ${menuOpen ? 'nav-open' : ''}`}>
      <div className="nav-container">
        <NavLink to="/" className="logo" onClick={() => setMenuOpen(false)}>
          <h3>Paletta</h3>
        </NavLink>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')} onClick={() => setMenuOpen(false)}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/Category" className={({ isActive }) => (isActive ? 'active' : '')} onClick={() => setMenuOpen(false)}>
              Category
            </NavLink>
          </li>
          <li>
            <NavLink to="/Meal" className={({ isActive }) => (isActive ? 'active' : '')} onClick={() => setMenuOpen(false)}>
              Meal
            </NavLink>
          </li>

          {!currentUser && (
            <li>
              <NavLink to="/Signup" onClick={() => setMenuOpen(false)}>
                <button className="signup-btn">Sign Up</button>
              </NavLink>
            </li>
          )}

          {currentUser && (
            <li>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </li>
          )}
        </ul>

        <button
          className={`hamburger ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;