import mongoose from 'mongoose';

const wordSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  definition: {
    type: String,
    required: true
  }
});

export default mongoose.model('Word', wordSchema);
