import React from "react";
import "./Footer.css";
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import "./Footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-item">
          <FaPhoneAlt className="footer-icon" />
          <span>+92 300 3315867</span>
        </div>
        <div className="footer-item">
          <FaMapMarkerAlt className="footer-icon" />
          <span>Tando Allah Yar, Sindh, Pakistan</span>
        </div>
        <div className="footer-item">
          <FaEnvelope className="footer-icon" />
          <span>contact@Paletta.com</span>
        </div>
      </div>

      <div className="footer-bottom">
        <a href="/" className="footer-brand">
          © 2025 Place Finder. All rights reserved.
        </a>
      </div>
    </footer>
  );
};

export default Footer;
