import express from 'express';
const router = express.Router();
import Highlight from '../models/highlight.js';

/**
 * @swagger
 * /highlights:
 *   get:
 *     summary: Get all highlights
 *     tags:
 *       - Highlights
 *     responses:
 *       200:
 *         description: An array of highlights
 */
router.get('/', async (_req, res, _next) => {
  try {
    const highlights = await Highlight.find();
    res.json(highlights);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /highlights/{id}:
 *   get:
 *     summary: Get a highlight by ID
 *     tags:
 *       - Highlights
 *     responses:
 *       200:
 *         description: A highlight
 */
router.get('/:id', getHighlight, (req, res) => {
  res.json(res.highlight);
});

/**
 * @swagger
 * /highlights:
 *   post:
 *     summary: Create a highlight
 *     tags:
 *       - Highlights
 *     responses:
 *       200:
 *         description: A highlight
 */
router.post('/', async (req, res) => {
  const highlight = new Highlight({
    title: req.body.title,
    url: req.body.url,
    text: req.body.text
  });

  try {
    const newHighlight = await highlight.save();
    res.status(201).json(newHighlight);
  } catch (err) {
    const missingFields = [];
    if (!req.body.title) missingFields.push('title');
    if (!req.body.url) missingFields.push('url');
    if (!req.body.text) missingFields.push('text');
    res.status(400).json({
      message: !missingFields.length
        ? err.message
        : `Hey man, don't forget to provide the ${missingFields.join(' and ')}`
    });
  }
});

/**
 * @swagger
 * /highlights/{id}:
 *   patch:
 *     summary: Update a highlight by ID
 *     tags:
 *       - Highlights
 *     responses:
 *       200:
 *         description: A highlight
 */
router.patch('/:id', getHighlight, async (req, res) => {
  if (req.body.title != null) {
    res.highlight.title = req.body.title;
  }

  if (req.body.url != null) {
    res.highlight.url = req.body.url;
  }

  if (req.body.text != null) {
    res.highlight.text = req.body.text;
  }
  try {
    const updatedHighlight = await res.highlight.save();
    res.json(updatedHighlight);
  } catch {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /highlights/{id}:
 *   delete:
 *     summary: Delete a highlight by ID
 *     tags:
 *       - Highlights
 *     responses:
 *       200:
 *         description: A highlight
 */
router.delete('/:id', getHighlight, async (req, res) => {
  try {
    await res.highlight.deleteOne();
    res.json({ message: `Deleted highlight` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware
async function getHighlight(req, res, next) {
  let highlight;
  try {
    highlight = await Highlight.findById(req.params.id);
    if (highlight == null) {
      return res.status(404).json({ message: 'Cant find highlight' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  // setting 'highlight' as a variable on the res object
  res.highlight = highlight;
  next();
}

export default router;
