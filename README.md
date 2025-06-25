# 🎬 Movie Sentiment Analyzer

## 🔹 Why AI-Powered Sentiment Analysis?

Unlike basic keyword matching, this system combines multiple approaches for accurate sentiment detection:

- 🔹 **Rule-based analysis** with negation handling for reliable baseline results  
- 🔹 **AI enhancement** using Google's Gemini API for nuanced understanding  
- 🔹 **Confidence scoring** to indicate prediction reliability  
- 🔹 **Real-time processing** with persistent data storage  

---

## 🔹 Sentiment Analysis Pipeline Implementation

### 🔹 Type of Data/Input

- Accepts **movie review text** as input from users  
- Reviews can be of any length (up to **5000 characters**)  
- Supports various review formats from casual user opinions to professional critiques  

### 🔹 Analysis Components

#### 🔸 Rule-Based Analyzer

- Uses curated dictionaries of positive and negative sentiment words  
- Handles **negations** like "not good" by flipping sentiment context  
- Calculates **confidence** based on word frequency and sentiment strength  

#### 🔸 AI Enhancement (Gemini)

- Leverages **Google Gemini 2.0 Flash** for advanced natural language understanding  
- Provides nuanced analysis of **context, sarcasm, and complex expressions**  
- Falls back to rule-based analysis if AI service is unavailable  

### 🔹 Data Storage & Retrieval

- Uses **PostgreSQL** database to store all analysis results with metadata  
- Tracks **analysis method, confidence scores, timestamps**  
- Enables **historical analysis** and performance monitoring  

---

## 🔹 Tools, Libraries, and Frameworks

### 🔹 Backend Technologies

- **Node.js & Express.js** – RESTful API server architecture  
- **PostgreSQL** – Relational database for persistent data storage  
- **Google Generative AI (Gemini)** – Advanced sentiment analysis  
- **Helmet** – Security middleware for HTTP headers  
- **CORS** – Cross-origin resource sharing configuration  

### 🔹 Frontend Technologies

- **React.js** – Modern component-based UI framework  
- **React Router** – Client-side routing for single-page app  
- **Axios** – HTTP client for API communication  
- **CSS3** – Responsive design with gradient backgrounds and animations  

### 🔹 Database Schema

- **Reviews Table** – Stores review text, sentiment, confidence, explanation, analysis method, and timestamps  
- **Indexed queries** – Optimized for sentiment filtering and chronological sorting  

### 🔹 AI Models

- **Gemini 2.0 Flash** – Fast and cost-effective model for sentiment classification  
- **Custom Rule Engine** – Handcrafted sentiment lexicon with negation handling  

---

## 🔹 Setup Instructions

### 🔹 Prerequisites

- Node.js (v16 or higher)  
- PostgreSQL database server  
- Google Gemini API key *(optional for AI enhancement)*  

---

### 🔹 Database Setup

```bash
# Create database
createdb sentiment_db

# Initialize schema
psql -d sentiment_db -f database/init.sql
```

### 🔹 Backend Setup
```bash

# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Add your database credentials and Gemini API key

# Start development server
npm run dev

```

### 🔹 Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```
