 const { Pool } = require('pg');

const pool = new Pool({
   connectionString: process.env.DATABASE_URL || process.env.POSTGRES_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
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

