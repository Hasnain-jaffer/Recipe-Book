import React, { useEffect, useState } from "react";
import "./Herosection.css";
import { NavLink } from "react-router-dom"; 
import { FaArrowRightToBracket } from "react-icons/fa6";

const Herosection = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser')) || 
                 JSON.parse(sessionStorage.getItem('currentUser'));
    if (user) setCurrentUser(user);
  }, []);

  return (
    <div className="hero-section">
      <div className="hero-content">
        {currentUser ? (
<div style={{
      width: "100%",
      backgroundColor: "#2d2d2d",
      color: "white",
      marginBottom: "40px",
      borderRadius: "8px",
      padding: "20px 50px",
      fontFamily: "'Poppins', sans-serif",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
    }}>
      <h3 style={{ 
        margin: 0, 
        fontSize: "1.2rem",
        fontWeight: "500",
        letterSpacing: "0.3px"
      }}>
        Welcome,  {currentUser.name} 👋
      </h3>
    </div>   ) : null}

        <h1>Discover Delicious Meals with Meal Recipe App</h1>
        <p>
          Explore delicious recipes, learn unique cooking styles, and find your next favorite meal — all in one place.
        </p>

        <NavLink to="/Meal" className="hero-btn">
          <span className="btn-text">Start Exploring</span>
          <FaArrowRightToBracket className="btn-icon" />
        </NavLink>
      </div>
      <div className="hero-image">
        <img src="./hero.jpg" alt="Travel Destination" />
      </div>
    </div>
  );
};

export default Herosection;
