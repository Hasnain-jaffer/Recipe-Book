import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (errors.general) {
      setErrors(prev => ({ ...prev, general: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Get existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Check for duplicate email
    const userExists = existingUsers.some(user => user.email === formData.email);
    if (userExists) {
      setErrors({ general: 'Email already registered' });
      return;
    }

    // Save new user
    const newUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password
    };
    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    alert('Account created successfully!');
    navigate('/login');
  };

  return (
    <div className="signup-container">
      <div className="signup-wrapper">
        <div className="signup-card">
          <div className="signup-header">
            <h1>Create Account</h1>
            <p>Join us and discover amazing recipes!</p>
          </div>

          <form onSubmit={handleSubmit} className="signup-form">
            {errors.general && <span className="error-message general">{errors.general}</span>}

            {/* Name Field */}
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <div className="input-wrapper">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={errors.name ? 'error' : ''}
                />
              </div>
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={errors.email ? 'error' : ''}
                />
              </div>
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <FaLock className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className={errors.password ? 'error' : ''}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            {/* Confirm Password Field */}
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-wrapper">
                <FaLock className="input-icon" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className={errors.confirmPassword ? 'error' : ''}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>

            <button type="submit" className="signup-btn">
              <span>Create Account</span>
            </button>
          </form>

          <div className="signup-footer">
            <p>Already have an account? <NavLink to="/login">Login here</NavLink></p>
          </div>
        </div>

        <div className="signup-image">
          <div className="image-overlay">
            <h2>Welcome to Meal Recipe App</h2>
            <p>Discover thousands of delicious recipes from around the world</p>
            <ul className="features-list">
              <li>✨ Explore diverse cuisines</li>
              <li>🍳 Step-by-step instructions</li>
              <li>❤️ Save your favorites</li>
              <li>👨‍🍳 Share with community</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
