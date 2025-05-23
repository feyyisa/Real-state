const { getGeminiResponse } = require('../models/geminiapi');
const Property = require('../models/Property');

const extractPropertyId = (query) => {
  // Dummy example: extract a MongoDB ObjectId from the query text
  // You can improve this logic depending on your query format
  const match = query.match(/[0-9a-fA-F]{24}/);
  return match ? match[0] : null;
};

const handleRealEstateQuery = async (req, res) => {
  const { query } = req.body;

  try {
    // Try to extract a property ID from query
    const propertyId = extractPropertyId(query);

    let property = null;

    if (propertyId) {
      property = await Property.findById(propertyId);
    } else {
      // Optional: Try to match by property title keyword (simple example)
      // Lowercase query for case-insensitive search
      const keyword = query.toLowerCase();

      property = await Property.findOne({
        title: { $regex: keyword, $options: 'i' }
      });
    }

    if (property) {
      // Build a safe summary without sensitive info
      const status = property.isSold ? 'This property has been sold.' : 'This property is currently available.';
      const overview = `
        Property Title: ${property.title}
        Location: ${property.location}
        Price: $${property.price}
        Overview: ${property.description}
        Status: ${status}
      `;

      // Ask Gemini API to reply naturally using this info as context
      const geminiResponse = await getGeminiResponse(`${query}\nProperty Info:\n${overview}`);

      return res.json({ answer: geminiResponse });
    }

    // No matching property found, just send query to Gemini API normally
    const response = await getGeminiResponse(query);

    res.json({ answer: response });
  } catch (error) {
    console.error('Error in handleRealEstateQuery:', error);
    res.status(500).json({ error: 'Failed to fetch from Gemini API' });
  }
};

module.exports = { handleRealEstateQuery };
