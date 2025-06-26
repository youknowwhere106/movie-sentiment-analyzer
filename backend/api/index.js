const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const sentimentRoutes = require('./routes/sentiment');
const { initDatabase } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.get('/', (req, res) => {
  res.json({ 
    message: 'Movie Sentiment Analyzer API',
    status: 'running',
    timestamp: new Date().toISOString()
  });
});

app.use('/sentiment', sentimentRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.get('/favicon.ico', (req, res) => {
  res.status(204).end();
});
const startServer = async () => {
  try {
    if (process.env.NODE_ENV !== 'production') {
      await initDatabase();
    }
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};
module.exports = app;
startServer();

