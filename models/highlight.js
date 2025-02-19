import mongoose from 'mongoose';

const highlightSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  url: {
    type: String,
    required: [true, 'URL is required'],
    trim: true
  },
  text: {
    type: String,
    required: [true, 'Text is required'],
    trim: true
  }
});

export default mongoose.model('Highlight', highlightSchema);
