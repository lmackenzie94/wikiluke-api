import express from 'express';
const router = express.Router();
import Word from '../models/word.js';
import Advice from '../models/advice.js';
import Learning from '../models/learning.js';
import Quote from '../models/quote.js';

const models = [
  [Word, 'Word'],
  [Advice, 'Advice'],
  [Learning, 'Learning'],
  [Quote, 'Quote']
];

/**
 * @swagger
 * /random:
 *   get:
 *     summary: Get a random Word, Advice, Learning, or Quote
 *     tags:
 *       - Random
 *     responses:
 *       200:
 *         description: A random Word, Advice, Learning, or Quote
 */
router.get('/', async (req, res) => {
  try {
    const [result, randModelName] = await getRandomModel();
    res.json(Object.assign({}, result, { type: randModelName }));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getRandomModel() {
  // Shuffle models array to avoid potential bias
  const shuffledModels = [...models].sort(() => Math.random() - 0.5);

  // Try each model until we find one with documents
  for (const [Model, modelName] of shuffledModels) {
    const result = await Model.aggregate([
      { $match: {} }, // Ensure we only get valid documents
      { $sample: { size: 1 } } // Get one random document
    ]).exec(); // Execute the aggregation

    if (result.length > 0) {
      return [result[0], modelName];
    }
  }

  // If no documents found in any collection
  throw new Error('No documents found in any collection');
}

export default router;
