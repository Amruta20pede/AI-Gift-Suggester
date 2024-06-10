import express from 'express';
import get_product_list from './GiftSuggesterRoute.js';
import get_product from './serapiRoute.js';
const router = express.Router();

// Middleware function to log incoming requests
router.use((req, res, next) => {
  console.log(`Received a ${req.method} request to ${req.url}`);
  next(); // Pass control to the next middleware or route handler
});

// Route handler to respond to GET requests at the root path
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello from Personalized Gift Suggester Route!!!!!' });
});

// Middleware function to process POST requests
router.post('/', async (req, res, next) => {
  try {
    const { relationship, age, occasion, interests, budget } = req.body;
    const keywords = get_product_list(relationship, age, occasion, interests, budget);
    console.log(keywords);

    const gifts = [];
    for (const keyword of keywords) {
      const serpapiResults =  get_product(keyword);
      for (const result of serpapiResults) {
        const gift = {
          idea: keyword,
          title: result.title || 'N/A',
          link:  `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`,
          price: result.price || 'N/A',
          old_price: result.old_price || 'N/A',
          second_hand_condition: result.second_hand_condition || 'N/A',
          rating: result.rating || 'N/A',
          reviews: result.reviews || 'N/A',
          store_rating: result.store_rating || 'N/A',
          store_reviews: result.store_reviews || 'N/A',
          number_of_comparisons: result.number_of_comparisons || 'N/A',
          snippet: result.snippet || 'N/A',
          thumbnail: result.thumbnail || 'N/A',
        };
        gifts.push(gift);
      }

    }

    // The response is sent after all keywords have been processed and next() has been called
    res.status(200).json({ gifts });
    console.log(gifts);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;