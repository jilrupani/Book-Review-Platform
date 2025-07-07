import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, default: Date.now }
});


const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  review: String,
  creator: String,
  image: String,
  createdBy: String,
  comments: [commentSchema],
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});



export default mongoose.model('Book', bookSchema);
