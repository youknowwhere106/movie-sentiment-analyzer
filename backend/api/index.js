const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const sentimentRoutes = require('../routes/sentiment');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Movie Sentiment Analyzer API',
    status: 'running',
    timestamp: new Date().toISOString()
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api/sentiment', sentimentRoutes);

// Handle favicon
app.get('/favicon.ico', (req, res) => {
  res.status(204).end();
});

// Export for Vercel
module.exports = app;
