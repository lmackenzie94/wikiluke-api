import mongoose from 'mongoose';

const adviceSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'Advice text is required'],
      trim: true,
      maxLength: [1000, 'Advice text is too long']
    }
  },
  { versionKey: false } // Remove the __v field
);

export default mongoose.model('Advice', adviceSchema);
