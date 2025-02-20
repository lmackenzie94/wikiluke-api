import mongoose from 'mongoose';

const learningSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'Text is required'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true
    }
  },
  { versionKey: false }
);

export default mongoose.model('Learning', learningSchema);
