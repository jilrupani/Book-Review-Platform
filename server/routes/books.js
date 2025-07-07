import express from 'express';
import Book from '../models/book.js';
import verifyToken from '../middleware/authMiddleware.js';



const router = express.Router();

router.get('/', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

router.post('/', async (req, res) => {
  const newBook = new Book(req.body);
  await newBook.save();
  res.status(201).json(newBook);
});

router.get('/', async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching books' });
  }
});

// Add a new book
router.post('/', async (req, res) => {
  const { title, author, review, creator, rating,image, createdBy} = req.body;

  // Validate input
  if (!title || !author || !review || !rating ) {
    return res.status(400).json({ message: 'All fields including rating are required' });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Rating must be between 1 and 5' });
  }

  try {
    const newBook = new Book({ title, author, review, creator, rating,image,createdBy: createdBy});
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create book' });
  }
});



 // GET book by ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT: Update book by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // returns the updated document
    );

    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json(updatedBook);
  } catch (err) {
    console.error('Error updating book:', err);
    res.status(500).json({ message: 'Server error' });
  }
});



router.delete('/:id', async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// router.post('/', async (req, res) => {
//   try {
//     const { title, author, review, rating, image } = req.body;
//     const newBook = new Book({ title, author, review, rating, image });
//     const saved = await newBook.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to add book' });
//   }
// });

// In your book controller or route handler
router.put('/api/books/:id', async (req, res) => {
  try {
    const { title, author, review, rating, image } = req.body;

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, review, rating, image },
      { new: true }
    );

    res.json(updatedBook);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update book' });
  }
});

// POST comment to a book
router.post('/:id/comments', async (req, res) => {
  try {
    const { text, author } = req.body;
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).send("Book not found");

    book.comments.push({ text, author });
    await book.save();

    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

// DELETE a specific comment from a book
router.delete('/:bookId/comments/:commentId', async (req, res) => {
  try {
    const { bookId, commentId } = req.params;
    const book = await Book.findById(bookId);

    if (!book) return res.status(404).json({ message: 'Book not found' });

    book.comments = book.comments.filter(comment => comment._id.toString() !== commentId);
    await book.save();

    res.status(200).json({ message: 'Comment deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


export default router;


