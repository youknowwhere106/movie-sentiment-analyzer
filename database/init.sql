 CREATE DATABASE sentiment_db;

\c sentiment_db;

CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    review_text TEXT NOT NULL,
    sentiment VARCHAR(20) NOT NULL CHECK (sentiment IN ('positive', 'negative', 'neutral')),
    confidence DECIMAL(3,2) CHECK (confidence >= 0 AND confidence <= 1),
    explanation TEXT,
    analysis_method VARCHAR(20) DEFAULT 'rule-based' CHECK (analysis_method IN ('rule-based', 'gemini')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_reviews_sentiment ON reviews(sentiment);
CREATE INDEX idx_reviews_created_at ON reviews(created_at DESC);
CREATE INDEX idx_reviews_analysis_method ON reviews(analysis_method);

