const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const sentimentRoutes = require('../routes/sentiment');
const { initDatabase } = require('../config/database');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Initialize DB
initDatabase()
  .then(() => console.log('✅ Database initialized'))
  .catch((err) => console.error('❌ Database init failed', err));

// Health and root endpoints
app.get('/', (req, res) => {
  res.json({ 
    message: 'Movie Sentiment Analyzer API',
    status: 'running',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use('/sentiment', sentimentRoutes);

app.get('/favicon.ico', (req, res) => {
  res.status(204).end();
});

module.exports = app;
