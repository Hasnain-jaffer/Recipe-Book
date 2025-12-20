import { useRouteError } from 'react-router-dom'
import React from "react";
import "./ErrorPage.css";

const ErrorPage = () => {
    const error = useRouteError();
  return (
    <div className="error-container">
      <h1 className="error-code">404</h1>
      <h2 className="error-message">Page Not Found</h2>
      <p className="error-description">
        Sorry, the page you are looking for does not exist.
      </p>
      <a href="/" className="home-button">Go to Homepage</a>
    </div>
     
  );
};

export default ErrorPage;
