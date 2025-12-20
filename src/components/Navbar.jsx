import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom"; 
import "./Navbar.css";

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const updateUser = () => {
    const user = JSON.parse(localStorage.getItem('currentUser')) || 
                 JSON.parse(sessionStorage.getItem('currentUser'));
    setCurrentUser(user);
  };

  useEffect(() => {
    updateUser();

    // Listen for storage changes (login/logout from other tabs/components)
    window.addEventListener('storage', updateUser);
    
    // Listen for custom user update event (for same-page updates)
    window.addEventListener('userUpdated', updateUser);
    
    return () => {
      window.removeEventListener('storage', updateUser);
      window.removeEventListener('userUpdated', updateUser);
    };
  }, []);

  const handleLogout = () => {
    // Confirmation dialog before logout
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    
    if (confirmLogout) {
      localStorage.removeItem('currentUser');
      sessionStorage.removeItem('currentUser');
      setCurrentUser(null);

      // Trigger both events to update Navbar everywhere
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new Event('userUpdated'));

      navigate('/login');
    }
  };

  return (
    <nav className="navbar">
      <div className="heading">
        <NavLink to="/" className="logo"><h3>Paletta</h3></NavLink>
      </div>
      <div className="links">
        <ul>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}><li>Home</li></NavLink>
          <NavLink to="/Category" className={({ isActive }) => (isActive ? 'active' : '')}><li>Category</li></NavLink>
          <NavLink to="/Meal" className={({ isActive }) => (isActive ? 'active' : '')}><li>Meal</li></NavLink>

          {!currentUser && (
            <NavLink to="/Signup" className={({ isActive }) => (isActive ? 'active' : '')}>
              <button>Sign Up</button>
            </NavLink>
          )}

          {currentUser && (
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;