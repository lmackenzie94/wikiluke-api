import mongoose from 'mongoose';

const wordSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Word is required'],
      trim: true
    },
    definition: {
      type: String,
      required: [true, 'Definition is required'],
      trim: true
    }
  },
  { versionKey: false }
);

export default mongoose.model('Word', wordSchema);
