 import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🎬 Movie Sentiment Analyzer
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

