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

router.get('/', (req, res) => {
  const randModel = models[Math.floor(Math.random() * models.length)];
  const randModelObj = randModel[0];
  const randModelName = randModel[1];

  try {
    randModelObj.countDocuments().exec((err, count) => {
      if (err) {
        throw new Error(err);
      }
      const random = Math.floor(Math.random() * count);
      randModelObj
        .findOne()
        .skip(random)
        .exec((err, result) => {
          if (err) {
            throw new Error(err);
          }
          res.json(Object.assign({}, result['_doc'], { type: randModelName }));
        });
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
