import express from 'express';
const router = express.Router();
import Advice from '../models/advice.js';

/**
 * @swagger
 * /advice:
 *   get:
 *     summary: Get all advice
 *     tags:
 *       - Advice
 *     responses:
 *       200:
 *         description: An array of advice
 */
router.get('/', async (_req, res, _next) => {
  try {
    const advice = await Advice.find();
    res.json(advice);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /advice/{id}:
 *   get:
 *     summary: Get one advice
 *     tags:
 *       - Advice
 *     responses:
 *       200:
 *         description: A advice
 */
router.get('/:id', getAdvice, (req, res) => {
  res.json(res.advice);
});

/**
 * @swagger
 * /advice:
 *   post:
 *     summary: Create one advice
 *     tags:
 *       - Advice
 *     responses:
 *       200:
 *         description: A advice
 */
router.post('/', async (req, res) => {
  const advice = new Advice({
    text: req.body.text
  });

  try {
    const newAdvice = await advice.save();
    res.status(201).json(newAdvice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /advice/{id}:
 *   patch:
 *     summary: Update one advice
 *     tags:
 *       - Advice
 *     responses:
 *       200:
 *         description: A advice
 */
router.patch('/:id', getAdvice, async (req, res) => {
  if (req.body.text != null) {
    res.advice.text = req.body.text;
  }
  try {
    const updatedAdvice = await res.advice.save();
    res.json(updatedAdvice);
  } catch {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /advice/{id}:
 *   delete:
 *     summary: Delete one advice
 *     tags:
 *       - Advice
 *     responses:
 *       200:
 *         description: A advice
 */
router.delete('/:id', getAdvice, async (req, res) => {
  try {
    await res.advice.deleteOne();
    res.json({ message: `Deleted ${res.advice.text}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware
async function getAdvice(req, res, next) {
  let advice;
  try {
    advice = await Advice.findById(req.params.id);
    if (advice == null) {
      return res.status(404).json({ message: 'Cant find advice' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  // setting 'advice' as a variable on the res object
  res.advice = advice;
  next();
}

export default router;
