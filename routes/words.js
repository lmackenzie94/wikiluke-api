const express = require('express');
const router = express.Router();
const Word = require('../models/word');

/* Get all words */
router.get('/', async (_req, res, _next) => {
  try {
    const words = await Word.find().sort({ name: 'asc' });
    res.json(words);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one word
router.get('/:id', getWord, (req, res) => {
  res.json(res.word);
});

// Create one word
router.post('/', async (req, res) => {
  const word = new Word({
    name: req.body.name,
    definition: req.body.definition,
  });

  try {
    const newWord = await word.save();
    res.status(201).json(newWord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update one word
router.patch('/:id', getWord, async (req, res) => {
  if (req.body.name != null) {
    res.word.name = req.body.name;
  }

  if (req.body.definition != null) {
    res.word.definition = req.body.definition;
  }
  try {
    const updatedWord = await res.word.save();
    res.json(updatedWord);
  } catch {
    res.status(400).json({ message: err.message });
  }
});

// Delete one word
router.delete('/:id', getWord, async (req, res) => {
  try {
    await res.word.remove();
    res.json({ message: `Deleted ${res.word.name}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware
async function getWord(req, res, next) {
  try {
    word = await Word.findById(req.params.id);
    if (word == null) {
      return res.status(404).json({ message: 'Cant find word' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  // setting 'word' as a variable on the res object
  res.word = word;
  next();
}

module.exports = router;
