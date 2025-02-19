import express from 'express';
const router = express.Router();
import Word from '../models/word.js';

/* Get all words */
router.get('/', async (_req, res, _next) => {
  try {
    const words = await Word.find().sort({ name: 'asc' });
    res.json(words);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one RANDOM word (this MUST come before the 'get' route below as 'random' satisfies as the ':id')
router.get('/random', (req, res) => {
  try {
    Word.countDocuments().exec((err, count) => {
      if (err) {
        throw new Error(err);
      }
      const random = Math.floor(Math.random() * count);
      Word.findOne()
        .skip(random)
        .exec((err, result) => {
          if (err) {
            throw new Error(err);
          }
          res.json(result);
        });
    });
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
  try {
    const wordExists = await Word.find({ name: req.body.name });

    if (wordExists.length) {
      return res
        .status(409)
        .json({ message: `You've already saved ${req.body.name}` });
    }

    const word = new Word({
      name: req.body.name,
      definition: req.body.definition
    });

    try {
      const newWord = await word.save();
      res.status(201).json(newWord);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
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

export default router;
