import express from 'express';
const router = express.Router();
import Learning from '../models/learning.js';

/**
 * @swagger
 * /learnings:
 *   get:
 *     summary: Get all learnings
 *     tags:
 *       - Learnings
 *     responses:
 *       200:
 *         description: An array of learnings
 */
router.get('/', async (_req, res, _next) => {
  try {
    const learnings = await Learning.find();
    res.json(learnings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /learnings/{id}:
 *   get:
 *     summary: Get a learning by ID
 *     tags:
 *       - Learnings
 *     responses:
 *       200:
 *         description: A learning
 */
router.get('/:id', getLearning, (req, res) => {
  res.json(res.learning);
});

/**
 * @swagger
 * /learnings:
 *   post:
 *     summary: Create a learning
 *     tags:
 *       - Learnings
 *     responses:
 *       200:
 *         description: A learning
 */
router.post('/', async (req, res) => {
  const learning = new Learning({
    text: req.body.text,
    category: req.body.category
  });

  try {
    const newLearning = await learning.save();
    res.status(201).json(newLearning);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /learnings/{id}:
 *   patch:
 *     summary: Update a learning by ID
 *     tags:
 *       - Learnings
 *     responses:
 *       200:
 *         description: A learning
 */
router.patch('/:id', getLearning, async (req, res) => {
  if (req.body.text != null) {
    res.learning.text = req.body.text;
  }

  if (req.body.category != null) {
    res.learning.category = req.body.category;
  }
  try {
    const updatedLearning = await res.learning.save();
    res.json(updatedLearning);
  } catch {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /learnings/{id}:
 *   delete:
 *     summary: Delete a learning by ID
 *     tags:
 *       - Learnings
 *     responses:
 *       200:
 *         description: A learning
 */
router.delete('/:id', getLearning, async (req, res) => {
  try {
    await res.learning.deleteOne();
    res.json({ message: `Successfully unlearned` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware
async function getLearning(req, res, next) {
  let learning;
  try {
    learning = await Learning.findById(req.params.id);
    if (learning == null) {
      return res.status(404).json({ message: 'Cant find learning' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  // setting 'learning' as a variable on the res object
  res.learning = learning;
  next();
}

export default router;
