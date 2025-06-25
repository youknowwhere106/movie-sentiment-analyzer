 const { GoogleGenerativeAI } = require('@google/generative-ai');

class GeminiService {
  constructor() {
    if (process.env.GEMINI_API_KEY) {
      this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      this.model = this.genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    }
  }

  async analyzeSentiment(text) {
    if (!this.model) {
      throw new Error('Gemini API key not configured');
    }

    const prompt = `
    Analyze the sentiment of this movie review and respond with ONLY a JSON object in this exact format:
    {
      "sentiment": "positive|negative|neutral",
      "confidence": 0.85,
      "explanation": "Brief explanation of the sentiment analysis"
    }

    Movie Review: "${text}"
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const responseText = response.text();
      
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const analysis = JSON.parse(jsonMatch[0]);
        return {
          sentiment: analysis.sentiment.toLowerCase(),
          confidence: Math.min(Math.max(analysis.confidence, 0), 1),
          explanation: analysis.explanation
        };
      }
      
      throw new Error('Invalid response format from Gemini');
    } catch (error) {
      console.error('Gemini API error:', error);
      throw new Error('Failed to analyze sentiment with Gemini API');
    }
  }
}

module.exports = GeminiService;

