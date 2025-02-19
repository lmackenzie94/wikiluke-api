import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  author: {
    type: String
  }
});

export default mongoose.model('Quote', quoteSchema);
