import mongoose from 'mongoose';

const learningSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  }
});

export default mongoose.model('Learning', learningSchema);
