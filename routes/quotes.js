const express = require('express');
const router = express.Router();
const Quote = require('../models/quote');

/* Get all quotes */
router.get('/', async (_req, res, _next) => {
  try {
    const quotes = await Quote.find();
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one quote
router.get('/:id', getQuote, (req, res) => {
  res.json(res.quote);
});

// Create one quote
router.post('/', async (req, res) => {
  const quote = new Quote({
    text: req.body.text,
    author: req.body.author,
  });

  try {
    const newQuote = await quote.save();
    res.status(201).json(newQuote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update one quote
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

// Delete one quote
router.delete('/:id', getQuote, async (req, res) => {
  try {
    await res.quote.remove();
    res.json({ message: `Deleted ${res.quote.name}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware
async function getQuote(req, res, next) {
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

module.exports = router;
