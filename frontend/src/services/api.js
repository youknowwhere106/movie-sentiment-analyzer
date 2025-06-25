 import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const analyzeSentiment = async (reviewText, useGemini = false) => {
  try {
    const response = await api.post('/sentiment/analyze', {
      reviewText,
      useGemini
    });
    return response.data;
  } catch (error) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error('Failed to analyze sentiment');
  }
};

export const getReviewById = async (id) => {
  try {
    const response = await api.get(`/sentiment/reviews`);
    const review = response.data.find(r => r.id === parseInt(id));
    if (!review) {
      throw new Error('Review not found');
    }
    return review;
  } catch (error) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error('Failed to fetch review');
  }
};

export const getAllReviews = async (limit = 50) => {
  try {
    const response = await api.get(`/sentiment/reviews?limit=${limit}`);
    return response.data;
  } catch (error) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error('Failed to fetch reviews');
  }
};

