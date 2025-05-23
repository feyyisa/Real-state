// geminiApi.js
const axios = require('axios');

const getGeminiResponse = async (prompt) => {
  const apiKey = process.env.GEMINI_API_KEY;
  const url = 'https://generativelanguage.googleapis.com/v1beta/chat/completions';

  try {
    const response = await axios.post(url, {
      model: 'gemini-1.5-flash',
      messages: [
        { role: 'system', content: 'You are a helpful real estate assistant.' },
        { role: 'user', content: prompt }
      ]
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error fetching from Gemini API:', error);
    throw error;
  }
};

module.exports = { getGeminiResponse };
