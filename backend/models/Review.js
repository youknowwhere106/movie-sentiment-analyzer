 const { pool } = require('../config/database');

class Review {
  static async create(reviewData) {
    const { reviewText, sentiment, confidence, explanation, analysisMethod } = reviewData;
    
    const query = `
      INSERT INTO reviews (review_text, sentiment, confidence, explanation, analysis_method)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    
    const values = [reviewText, sentiment, confidence, explanation, analysisMethod];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async getAll(limit = 100) {
    const query = `
      SELECT * FROM reviews 
      ORDER BY created_at DESC 
      LIMIT $1
    `;
    const result = await pool.query(query, [limit]);
    return result.rows;
  }

  static async getById(id) {
    const query = 'SELECT * FROM reviews WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
}

module.exports = Review;

