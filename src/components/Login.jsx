import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    if (errors.general) setErrors(prev => ({ ...prev, general: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === formData.email && u.password === formData.password);

    if (user) {
      if (rememberMe) {
        localStorage.setItem('currentUser', JSON.stringify(user));
      } else {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
      }

      // Dispatch custom event to update Navbar immediately
      window.dispatchEvent(new Event('userUpdated'));

      alert('Login successful!');
      navigate('/');
    } else {
      setErrors({ general: 'Invalid email or password' });
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-image">
          <div className="image-overlay">
            <h2>Welcome Back!</h2>
            <p>Login to continue your culinary journey</p>
            <ul className="features-list">
              <li>🍽️ Access your saved recipes</li>
              <li>📖 View cooking history</li>
              <li>⭐ Rate and review meals</li>
              <li>👥 Connect with food lovers</li>
            </ul>
          </div>
        </div>

        <div className="login-card">
          <div className="login-header">
            <h1>Login</h1>
            <p>Enter your credentials to access your account</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {errors.general && <span className="error-message general">{errors.general}</span>}

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
                  placeholder="Enter your password"
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

            <div className="form-options">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me</span>
              </label>
              <NavLink to="/forgot-password" className="forgot-password">
                Forgot Password?
              </NavLink>
            </div>

            <button type="submit" className="login-btn">
              <span>Login</span>
            </button>
          </form>

          <div className="login-footer">
            <p>Don't have an account? <NavLink to="/signup">Sign up here</NavLink></p>
          </div>

          <div className="divider"><span>OR</span></div>

          <div className="social-login">
            <button className="social-btn google"><span>Continue with Google</span></button>
            <button className="social-btn facebook"><span>Continue with Facebook</span></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;