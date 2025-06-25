 import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyzeSentiment } from '../services/api';

const HomePage = () => {
  const [reviewText, setReviewText] = useState('');
  const [useGemini, setUseGemini] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!reviewText.trim()) {
      setError('Please enter a movie review');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await analyzeSentiment(reviewText, useGemini);
      navigate(`/results/${result.id}`);
    } catch (err) {
      setError(err.message || 'Failed to analyze sentiment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>AI-Powered Movie Review Sentiment Analysis</h1>
        <p>Discover the sentiment behind movie reviews using advanced AI technology</p>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="sentiment-form">
          <div className="form-group">
            <label htmlFor="reviewText">Enter Movie Review:</label>
            <textarea
              id="reviewText"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your movie review here... (e.g., 'This movie was absolutely fantastic! The acting was superb and the plot kept me engaged throughout.')"
              rows="6"
              maxLength="5000"
              disabled={loading}
            />
            <div className="char-count">
              {reviewText.length}/5000 characters
            </div>
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={useGemini}
                onChange={(e) => setUseGemini(e.target.checked)}
                disabled={loading}
              />
              Use Gemini AI for enhanced analysis
            </label>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            type="submit" 
            className="analyze-btn"
            disabled={loading || !reviewText.trim()}
          >
            {loading ? 'Analyzing...' : 'Analyze Sentiment'}
          </button>
        </form>
      </div>

      <div className="features-section">
        <h2>Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3> Accurate Analysis</h3>
            <p>Advanced sentiment analysis using rule-based algorithms and optional AI enhancement</p>
          </div>
          <div className="feature-card">
            <h3> Real-time Results</h3>
            <p>Get instant sentiment classification with confidence scores and explanations</p>
          </div>
          <div className="feature-card">
            <h3> AI-Powered</h3>
            <p>Optional integration with Google's Gemini AI for enhanced accuracy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

