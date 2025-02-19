import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Text is required'],
    trim: true
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true
  }
});

export default mongoose.model('Quote', quoteSchema);
