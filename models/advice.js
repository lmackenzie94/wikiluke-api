import mongoose from 'mongoose';

const adviceSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  }
});

export default mongoose.model('Advice', adviceSchema);
