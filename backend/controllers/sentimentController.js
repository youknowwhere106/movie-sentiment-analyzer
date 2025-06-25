 const Review = require('../models/Review');
const RuleBasedSentiment = require('../services/ruleBased');
const GeminiService = require('../services/geminiService');

const ruleBasedAnalyzer = new RuleBasedSentiment();
const geminiService = new GeminiService();

const analyzeSentiment = async (req, res) => {
  try {
    const { reviewText, useGemini = false } = req.body;

    if (!reviewText || reviewText.trim().length === 0) {
      return res.status(400).json({ error: 'Review text is required' });
    }

    if (reviewText.length > 5000) {
      return res.status(400).json({ error: 'Review text too long (max 5000 characters)' });
    }

    let analysis;
    let analysisMethod = 'rule-based';

    if (useGemini && process.env.GEMINI_API_KEY) {
      try {
        analysis = await geminiService.analyzeSentiment(reviewText);
        analysisMethod = 'gemini';
      } catch (geminiError) {
        console.error('Gemini analysis failed, falling back to rule-based:', geminiError);
        analysis = ruleBasedAnalyzer.analyze(reviewText);
      }
    } else {
      analysis = ruleBasedAnalyzer.analyze(reviewText);
    }

    const savedReview = await Review.create({
      reviewText: reviewText.trim(),
      sentiment: analysis.sentiment,
      confidence: analysis.confidence,
      explanation: analysis.explanation,
      analysisMethod
    });

    res.json({
      id: savedReview.id,
      sentiment: analysis.sentiment,
      confidence: analysis.confidence,
      explanation: analysis.explanation,
      analysisMethod,
      timestamp: savedReview.created_at
    });

  } catch (error) {
    console.error('Sentiment analysis error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getReviews = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const reviews = await Review.getAll(limit);
    res.json(reviews);
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};

module.exports = {
  analyzeSentiment,
  getReviews
};

