const express = require('express');
const router = express.Router();
const Word = require('../models/word');
const Advice = require('../models/advice');
const Learning = require('../models/learning');
const Quote = require('../models/quote');

const models = [[Word, 'Word'], [Advice, 'Advice'], [Learning, 'Learning'], [Quote, 'Quote']];

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
      randModelObj.findOne()
        .skip(random)
        .exec((err, result) => {
          if (err) {
            throw new Error(err);
          }
          res.json(Object.assign({}, result["_doc"], {type: randModelName}));
        });
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
