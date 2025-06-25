 import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getReviewById } from '../services/api';

const ResultsPage = () => {
  const { id } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const data = await getReviewById(id);
        setResult(data);
      } catch (err) {
        setError('Failed to load results');
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [id]);

  if (loading) {
    return (
      <div className="results-container">
        <div className="loading">Loading results...</div>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="results-container">
        <div className="error-message">{error || 'Results not found'}</div>
        <Link to="/" className="back-btn">Back to Home</Link>
      </div>
    );
  }

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive': return '#4CAF50';
      case 'negative': return '#f44336';
      default: return '#FF9800';
    }
  };

  const getSentimentEmoji = (sentiment) => {
    switch (sentiment) {
      case 'positive': return '😊';
      case 'negative': return '😞';
      default: return '😐';
    }
  };

  return (
    <div className="results-container">
      <div className="results-header">
        <h1>Sentiment Analysis Results</h1>
        <Link to="/" className="back-btn">Analyze Another Review</Link>
      </div>

      <div className="results-content">
        <div className="review-text-section">
          <h2>Original Review</h2>
          <div className="review-text">
            {result.review_text}
          </div>
        </div>

        <div className="sentiment-results">
          <div className="sentiment-card">
            <div 
              className="sentiment-indicator"
              style={{ backgroundColor: getSentimentColor(result.sentiment) }}
            >
              <span className="sentiment-emoji">
                {getSentimentEmoji(result.sentiment)}
              </span>
              <span className="sentiment-label">
                {result.sentiment.toUpperCase()}
              </span>
            </div>
            
            <div className="confidence-section">
              <h3>Confidence Score</h3>
              <div className="confidence-bar">
                <div 
                  className="confidence-fill"
                  style={{ 
                    width: `${(result.confidence || 0.5) * 100}%`,
                    backgroundColor: getSentimentColor(result.sentiment)
                  }}
                />
              </div>
              <span className="confidence-text">
                {Math.round((result.confidence || 0.5) * 100)}%
              </span>
            </div>

            <div className="explanation-section">
              <h3>Analysis Explanation</h3>
              <p>{result.explanation}</p>
            </div>

            <div className="metadata-section">
              <div className="metadata-item">
                <strong>Analysis Method:</strong> {result.analysis_method}
              </div>
              <div className="metadata-item">
                <strong>Analyzed:</strong> {new Date(result.created_at).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;

