 const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER || ,
  host: process.env.DB_HOST || ,
  database: process.env.DB_NAME || ,
  password: process.env.DB_PASSWORD || ,
  port: process.env.DB_PORT || ,
});

const initDatabase = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS reviews (
        id SERIAL PRIMARY KEY,
        review_text TEXT NOT NULL,
        sentiment VARCHAR(20) NOT NULL,
        confidence DECIMAL(3,2),
        explanation TEXT,
        analysis_method VARCHAR(20) DEFAULT 'rule-based',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
};

module.exports = { pool, initDatabase };

