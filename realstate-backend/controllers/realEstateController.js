const { getGeminiResponse } = require('../models/geminiapi');
const Property = require('../models/Property');
const Message = require('../models/messageModel');
const extractFiltersFromQuery = (query) => {
  query = query.toLowerCase();
  const filters = { status: 'available' };
  // Listing type
  if (query.includes('rent')) filters.listingType = 'rent';
  else if (query.includes('buy') || query.includes('purchase') || query.includes('sell')) filters.listingType = 'sell';

  // Bedrooms
  const bedroomMatch = query.match(/(\d+)\s*bed(room)?s?/);
  if (bedroomMatch) filters.bedrooms = Number(bedroomMatch[1]);

  // Regions
  const regions = ['addis ababa', 'oromia', 'amhara', 'tigray', 'snnpr', 'dire dawa'];
  for (const region of regions) {
    if (query.includes(region)) {
      filters['location.region'] = new RegExp(region, 'i');
      break;
    }
  }

  // Price ranges
  const priceRangeMatch = query.match(/(?:under|below)\s*(\d+)/);
  if (priceRangeMatch) filters.price = { $lte: Number(priceRangeMatch[1]) };
  else {
    const betweenMatch = query.match(/between\s*(\d+)\s*and\s*(\d+)/);
    if (betweenMatch) {
      filters.price = {
        $gte: Number(betweenMatch[1]),
        $lte: Number(betweenMatch[2]),
      };
    }
  }

  return filters;
};

const userPrompt = `Please enter your real estate request clearly and briefly. Example: "2 bedroom apartment for rent in Addis Ababa under 50000 ETB".`;

const handleRealEstateQuery = async (req, res) => {
  const { query, contactMessage, propertyId, userContactInfo } = req.body;

  try {
    if (contactMessage && propertyId) {
      const message = new Message({
        property: propertyId,
        message: contactMessage,
        userContactInfo,
        createdAt: new Date(),
      });
      await message.save();
      return res.json({ answer: 'Your message has been sent to the property owner/agent.' });
    }

    const introMessage = `Welcome to our Real Estate Assistant! You can buy or rent verified properties legally with us. Use your national ID and pay securely via Chapa.`;

    if (!query || query.trim().length === 0) {
      return res.json({ answer: userPrompt });
    }

    const cleanedQuery = query.trim().toLowerCase();

    // Greetings
    const greetings = ['hi', 'hello', 'hey', 'greetings'];
    if (greetings.includes(cleanedQuery)) {
      return res.json({ answer: 'Hello! How can I help with your real estate needs today? Please be specific.' });
    }

    // If user says "just tell me one"
    if (cleanedQuery.includes('just tell me one')) {
      const one = await Property.findOne({ status: 'available' }).lean();
      if (one) {
        return res.json({ answer: formatPropertySummary(one) });
      }
      return res.json({ answer: "Sorry, I couldn't find any available properties right now." });
    }

    // Extract filters but if none (other than status), fetch all available
    const filters = extractFiltersFromQuery(query);
    const hasFilters = Object.keys(filters).length > 1; // more than just status

    // Special handling: If user asks about houses in Addis Ababa, provide min/max/avg price
    if (cleanedQuery.includes('house') && cleanedQuery.includes('addis')) {
      const houseFilter = {
        ...filters,
        status: 'available',
        listingType: filters.listingType || undefined,
        'location.region': /addis ababa/i,
      };

      // Remove undefined keys
      Object.keys(houseFilter).forEach(key => houseFilter[key] === undefined && delete houseFilter[key]);

      const houses = await Property.find(houseFilter).lean();

      if (houses.length === 0) {
        return res.json({ answer: 'No houses available currently in Addis Ababa.' });
      }

      const prices = houses.map(p => p.price).filter(Boolean);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      const avgPrice = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);

      return res.json({
        answer: `Currently, there are ${houses.length} houses available in Addis Ababa.\n` +
          `Price range: ${minPrice.toLocaleString()} ETB to ${maxPrice.toLocaleString()} ETB.\n` +
          `Average price: ${avgPrice.toLocaleString()} ETB.\n` +
          `If you want details of some listings, please specify further (e.g., number of bedrooms, budget).`
      });
    }

    // If no filters except status, fetch all available properties
    const searchFilters = hasFilters ? filters : { status: 'available' };

    const properties = await Property.find(searchFilters).limit(10).lean();

    if (properties.length === 0) {
      const fallback = await getGeminiResponse(`${introMessage}\nUser query: ${query}`);
      return res.json({ answer: fallback });
    }

    const formatted = properties.map(formatPropertySummary).join('\n---\n');

    const fullMessage = `${introMessage}\n\nHere are some matching properties:\n\n${formatted}\n\nFor more info or to contact an owner, reply with the Property ID.`;

    return res.json({ answer: fullMessage });

  } catch (error) {
    console.error('Error handling query:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

function formatPropertySummary(p) {
  const amenities = [];
  if (p.amenities?.parking) amenities.push('Parking');
  if (p.amenities?.swimmingPool) amenities.push('Swimming Pool');
  if (p.amenities?.gym) amenities.push('Gym');
  if (p.amenities?.wifi) amenities.push('WiFi');
  if (p.amenities?.security) amenities.push('Security');

  return `
🏠 **${p.title}**
📍 ${p.location.city}, ${p.location.region}${p.location.kifleKetemaOrKebelle ? ' (' + p.location.kifleKetemaOrKebelle + ')' : ''}
💰 ${p.price.toLocaleString()} ETB (${p.listingType === 'rent' ? 'Rent' : 'Sale'})
🛏️ Bedrooms: ${p.bedrooms} | 🛁 Bathrooms: ${p.bathrooms}
📐 Size: ${p.size || 'N/A'} sqm | 🗓️ Available: ${p.availableFrom ? new Date(p.availableFrom).toLocaleDateString() : 'Now'}
⭐ Status: ${p.status}
🎯 Features: ${amenities.length ? amenities.join(', ') : 'None'}
📝 ${p.description || 'No additional description'}
  `;
}
module.exports = { handleRealEstateQuery };