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

router.get('/', async (req, res) => {
  const randModel = models[Math.floor(Math.random() * models.length)];
  const randModelObj = randModel[0];
  const randModelName = randModel[1];

  try {
    const count = await randModelObj.countDocuments();
    const random = Math.floor(Math.random() * count);
    const result = await randModelObj.findOne().skip(random);
    res.json(Object.assign({}, result['_doc'], { type: randModelName }));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
