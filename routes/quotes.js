import express from 'express';
const router = express.Router();
import Quote from '../models/quote.js';

/**
 * @swagger
 * /quotes:
 *   get:
 *     summary: Get all quotes
 *     tags:
 *       - Quotes
 *     responses:
 *       200:
 *         description: An array of quotes
 */
router.get('/', async (_req, res, _next) => {
  try {
    const quotes = await Quote.find();
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /quotes/{id}:
 *   get:
 *     summary: Get a quote by ID
 *     tags:
 *       - Quotes
 *     responses:
 *       200:
 *         description: A quote
 */
router.get('/:id', getQuote, (req, res) => {
  res.json(res.quote);
});

/**
 * @swagger
 * /quotes:
 *   post:
 *     summary: Create a quote
 *     tags:
 *       - Quotes
 *     responses:
 *       200:
 *         description: A quote
 */
router.post('/', async (req, res) => {
  const quote = new Quote({
    text: req.body.text,
    author: req.body.author
  });

  try {
    const newQuote = await quote.save();
    res.status(201).json(newQuote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /quotes/{id}:
 *   patch:
 *     summary: Update a quote by ID
 *     tags:
 *       - Quotes
 *     responses:
 *       200:
 *         description: A quote
 */
router.patch('/:id', getQuote, async (req, res) => {
  if (req.body.text != null) {
    res.quote.text = req.body.text;
  }

  if (req.body.author != null) {
    res.quote.author = req.body.author;
  }
  try {
    const updatedQuote = await res.quote.save();
    res.json(updatedQuote);
  } catch {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /quotes/{id}:
 *   delete:
 *     summary: Delete a quote by ID
 *     tags:
 *       - Quotes
 *     responses:
 *       200:
 *         description: A quote
 */
router.delete('/:id', getQuote, async (req, res) => {
  try {
    await res.quote.deleteOne();
    res.json({ message: `Deleted ${res.quote.text}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware
async function getQuote(req, res, next) {
  let quote;
  try {
    quote = await Quote.findById(req.params.id);
    if (quote == null) {
      return res.status(404).json({ message: 'Cant find quote' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  // setting 'quote' as a variable on the res object
  res.quote = quote;
  next();
}

export default router;
