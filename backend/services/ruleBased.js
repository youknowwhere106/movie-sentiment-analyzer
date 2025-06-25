 class RuleBasedSentiment {
  constructor() {
    this.positiveWords = [
      'amazing', 'excellent', 'fantastic', 'great', 'wonderful', 'brilliant',
      'outstanding', 'superb', 'magnificent', 'incredible', 'awesome', 'perfect',
      'love', 'loved', 'beautiful', 'good', 'best', 'better', 'enjoy', 'enjoyed',
      'impressive', 'remarkable', 'extraordinary', 'phenomenal', 'spectacular'
    ];

    this.negativeWords = [
      'terrible', 'awful', 'horrible', 'bad', 'worst', 'hate', 'hated',
      'disappointing', 'boring', 'dull', 'poor', 'weak', 'pathetic',
      'disgusting', 'annoying', 'frustrating', 'useless', 'worthless',
      'ridiculous', 'stupid', 'waste', 'failed', 'failure', 'sucks'
    ];

    this.negations = ['not', 'no', 'never', 'none', 'nobody', 'nothing', 'neither', 'nowhere', 'hardly'];
  }

  analyze(text) {
    const words = text.toLowerCase().split(/\W+/);
    let positiveScore = 0;
    let negativeScore = 0;
    let negationFlag = false;

    for (let i = 0; i < words.length; i++) {
      const word = words[i];

      if (this.negations.includes(word)) {
        negationFlag = true;
        continue;
      }

      if (this.positiveWords.includes(word)) {
        if (negationFlag) {
          negativeScore += 1;
          negationFlag = false;
        } else {
          positiveScore += 1;
        }
      } else if (this.negativeWords.includes(word)) {
        if (negationFlag) {
          positiveScore += 1;
          negationFlag = false;
        } else {
          negativeScore += 1;
        }
      } else {
        negationFlag = false;
      }
    }

    const totalScore = positiveScore + negativeScore;
    let sentiment = 'neutral';
    let confidence = 0.5;
    let explanation = 'No strong sentiment indicators found.';

    if (totalScore > 0) {
      const positiveRatio = positiveScore / totalScore;
      confidence = Math.abs(positiveRatio - 0.5) * 2;

      if (positiveRatio > 0.6) {
        sentiment = 'positive';
        explanation = `Found ${positiveScore} positive and ${negativeScore} negative indicators.`;
      } else if (positiveRatio < 0.4) {
        sentiment = 'negative';
        explanation = `Found ${negativeScore} negative and ${positiveScore} positive indicators.`;
      } else {
        sentiment = 'neutral';
        explanation = `Balanced sentiment with ${positiveScore} positive and ${negativeScore} negative indicators.`;
      }
    }

    return {
      sentiment,
      confidence: Math.round(confidence * 100) / 100,
      explanation,
      scores: { positive: positiveScore, negative: negativeScore }
    };
  }
}

module.exports = RuleBasedSentiment;

