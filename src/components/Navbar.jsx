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
    <nav className="navbar">
      <div className="nav-container">
        <NavLink to="/" className="logo" onClick={() => setMenuOpen(false)}>
          <span className="logo-dot"></span>
          <h3>Paletta</h3>
        </NavLink>

        {/* Desktop links */}
        <ul className="nav-links">
          <li><NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink></li>
          <li><NavLink to="/Category" className={({ isActive }) => (isActive ? 'active' : '')}>Category</NavLink></li>
          <li><NavLink to="/Meal" className={({ isActive }) => (isActive ? 'active' : '')}>Meal</NavLink></li>
        </ul>

        {/* Desktop auth button */}
        <div className="nav-actions">
          {!currentUser && (
            <NavLink to="/Signup" className="btn-primary">Sign Up</NavLink>
          )}
          {currentUser && (
            <button onClick={handleLogout} className="btn-outline">Logout</button>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className={`hamburger ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span><span></span><span></span>
        </button>
      </div>

      {/* Mobile floating dropdown */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')} onClick={() => setMenuOpen(false)}>Home</NavLink>
        <NavLink to="/Category" className={({ isActive }) => (isActive ? 'active' : '')} onClick={() => setMenuOpen(false)}>Category</NavLink>
        <NavLink to="/Meal" className={({ isActive }) => (isActive ? 'active' : '')} onClick={() => setMenuOpen(false)}>Meal</NavLink>
        {!currentUser && (
          <NavLink to="/Signup" className="btn-primary mobile-btn" onClick={() => setMenuOpen(false)}>Sign Up</NavLink>
        )}
        {currentUser && (
          <button onClick={handleLogout} className="btn-outline mobile-btn">Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;