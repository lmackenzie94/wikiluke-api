const mongoose = require('mongoose');

const adviceSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Advice', adviceSchema);
