import express from 'express';
const router = express.Router();
import Word from '../models/word.js';

/**
 * @swagger
 * /words:
 *   get:
 *     summary: Get all words
 *     tags:
 *       - Words
 *     responses:
 *       200:
 *         description: List of words
 */
router.get('/', async (_req, res, _next) => {
  try {
    const words = await Word.find().sort({ name: 'asc' });
    res.json(words);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// this MUST come before the 'get' route below as 'random' satisfies as the ':id'
/**
 * @swagger
 * /words/random:
 *   get:
 *     summary: Get a random word
 *     tags:
 *       - Words
 *     responses:
 *       200:
 *         description: A random word
 */
router.get('/random', async (_, res) => {
  try {
    const count = await Word.countDocuments();
    const random = Math.floor(Math.random() * count);
    const result = await Word.findOne().skip(random);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /words/{id}:
 *   get:
 *     summary: Get a word by ID
 *     tags:
 *       - Words
 *     responses:
 *       200:
 *         description: A word
 */
router.get('/:id', getWord, (req, res) => {
  res.json(res.word);
});

// Create one word
/**
 * @swagger
 * /words:
 *   post:
 *     summary: Create a word
 *     tags:
 *       - Words
 *     responses:
 *       200:
 *         description: A word
 */
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

/**
 * @swagger
 * /words/{id}:
 *   patch:
 *     summary: Update a word by ID
 *     tags:
 *       - Words
 *     responses:
 *       200:
 *         description: A word
 */
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

/**
 * @swagger
 * /words/{id}:
 *   delete:
 *     summary: Delete a word by ID
 *     tags:
 *       - Words
 *     responses:
 *       200:
 *         description: A word
 */
router.delete('/:id', getWord, async (req, res) => {
  try {
    await res.word.deleteOne();
    res.json({ message: `Deleted ${res.word.name}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware
async function getWord(req, res, next) {
  let word;
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
