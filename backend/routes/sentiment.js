 const express = require('express');
const { analyzeSentiment, getReviews } = require('../controllers/sentimentController');

const router = express.Router();

router.post('/analyze', analyzeSentiment);
router.get('/reviews', getReviews);

module.exports = router;

