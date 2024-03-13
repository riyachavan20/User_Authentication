import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css'; // Import your CSS file for styling

const DashError = () => {
  return (
    <div className="dash-error-container">
      <h2 className="error-heading">You are not authenticated</h2>
      <p className="error-message">
        Please login to access the dashboard.
      </p>
      <Link to="/" className="error-link">Login</Link>
    </div>
  );
}

export default DashError;
