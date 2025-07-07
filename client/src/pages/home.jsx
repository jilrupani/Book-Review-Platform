
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import './home.css';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Home = () => {
//   const [books, setBooks] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [user, setUser] = useState(null);
//   const [commentInput, setCommentInput] = useState({});
//   const [openCommentForm, setOpenCommentForm] = useState({});
//   const navigate = useNavigate();

//   const handleCommentSubmit = async (e, bookId) => {
//     e.preventDefault();
//     try {
//       await axios.post(`http://localhost:5000/api/books/${bookId}/comment`, {
//         text: commentInput[bookId],
//         author: user.name,
//       });
//       fetchBooks();
//       setCommentInput({ ...commentInput, [bookId]: '' });
//       setOpenCommentForm({ ...openCommentForm, [bookId]: false });
//     } catch (err) {
//       console.error('Error posting comment:', err);
//       toast.error("Failed to post comment");
//     }
//   };

//   const toggleCommentForm = (bookId) => {
//     setOpenCommentForm((prev) => ({
//       ...prev,
//       [bookId]: !prev[bookId],
//     }));
//   };

//   useEffect(() => {
//     fetchBooks();

//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }

//     const savedTheme = localStorage.getItem('theme');
//     if (savedTheme === 'dark') {
//       document.body.classList.add('dark-mode');
//     }
//   }, []);

//   const fetchBooks = () => {
//     axios.get('http://localhost:5000/api/books')
//       .then((res) => setBooks(res.data))
//       .catch((err) => console.error('Error fetching books:', err));
//   };

//   const filteredBooks = books.filter((book) =>
//     book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     book.author.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const renderStars = (rating) => {
//     const totalStars = 5;
//     return [...Array(totalStars)].map((_, i) => (
//       <span key={i} className={i < rating ? 'star filled' : 'star'}>★</span>
//     ));
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/books/${id}`);
//       fetchBooks();
//     } catch (err) {
//       console.error('Error deleting book:', err);
//       alert('Failed to delete book. Please try again.');
//     }
//   };

//   const handleUpdate = (id) => {
//     navigate(`/edit/${id}`);
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     toast.success('Logged out successfully!', {
//       position: "top-center",
//       autoClose: 2000,
//       onClose: () => window.location.reload(),
//     });
//   };

//   const toggleTheme = () => {
//     const isDark = document.body.classList.toggle('dark-mode');
//     localStorage.setItem('theme', isDark ? 'dark' : 'light');
//   };

//   const handleCommentDelete = async (bookId, commentId) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/books/${bookId}/comment/${commentId}`);
//       fetchBooks(); 
//     } catch (err) {
//       console.error('Error deleting comment:', err);
//       toast.error('Failed to delete comment');
//     }
//   };


//   return (
//     <>
//       <header className="header">
//         <div className="logo-container">
//           <img src="/book.jpg" className="logo" alt="Book Logo" />
//           <h1 className="header-title">Book Review</h1>
//         </div>

//         <div className="search-wrapper">
//           <input
//             type="text"
//             placeholder="Search by title or author..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="search-input"
//           />
//           {user ? (
//             <div className="user-info">
//               <span className="welcome-text">Welcome, {user.name}</span>
//               <button onClick={handleLogout} className="logout-button">Logout</button>
//               <button onClick={toggleTheme} className="theme-toggle">🌓</button>
//             </div>
//           ) : (
//             <>
//               <Link to="/signin" className="signin-button">Sign In</Link>
//               <button onClick={toggleTheme} className="theme-toggle">🌓</button>
//             </>
//           )}
//         </div>
//       </header>

//       <main className="container">
//         {user ? (
//           <>
//             <h1>Books</h1>
//             <div className="button-wrapper">
//               <Link to="/add" className="add-link">+ Add New</Link>
//             </div>
//           </>
//         ) : (
//           <div className="signin-prompt">
//             <h2>Please sign in to add books</h2>
//           </div>
//         )}

//         {filteredBooks.map((book) => (
//           <div key={book._id} className="book">
//             {book.image && (
//               <img src={book.image} alt={book.title} className="book-image" />
//             )}
//             <h2>{book.title}</h2>
//             <h3>{book.author}</h3>
//             <p>{book.review}</p>
//             <div className="stars">{renderStars(book.rating)}</div>
//             {book.createdBy && (
//               <p className="review-author">This review is created by <strong>{book.createdBy}</strong>.</p>
//             )}
//             {user && user.name === book.createdBy && (
//               <div className="book-actions">
//                 <button onClick={() => handleUpdate(book._id)} className="update-btn">Update</button>
//                 <button onClick={() => handleDelete(book._id)} className="delete-btn">Delete</button>
//               </div>
//             )}

//             <hr className="action-separator" />

//             <div className="comment-section">
//               <h4>Comments:</h4>
//               {book.comments && book.comments.length > 0 ? (
//                 <ul className="comment-list">
//                   {book.comments.map((comment, index) => (
//                     <li key={index} className="comment-item">
//                       {/* Only show delete icon if the user is the author */}
//                       {user && user.name === comment.author && (
//                         <button
//                           className="comment-delete-btn"
//                           title="Delete Comment"
//                           onClick={() => handleCommentDelete(book._id, comment._id)}
//                         >
//                           🗑️
//                         </button>
//                       )}
//                       <strong>{comment.author}</strong>: {comment.text}
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p>No comments yet.</p>
//               )}


//               {user && (
//                 <>
//                   <button
//                     onClick={() => toggleCommentForm(book._id)}
//                     className="comment-toggle-btn"
//                   >
//                     {openCommentForm[book._id] ? 'Cancel' : 'Add Comment'}
//                   </button>

//                   {openCommentForm[book._id] && (
//                     <form onSubmit={(e) => handleCommentSubmit(e, book._id)} className="comment-form">
//                       <input
//                         type="text"
//                         value={commentInput[book._id] || ''}
//                         onChange={(e) =>
//                           setCommentInput({ ...commentInput, [book._id]: e.target.value })
//                         }
//                         placeholder="Write a comment..."
//                         className="comment-input"
//                         required
//                       />
//                       <button type="submit" className="comment-submit-btn">Post</button>
//                     </form>
//                   )}
//                 </>
//               )}
//             </div>
//           </div>
//         ))}
//       </main>

//       <footer className="footer">
//         <p>Jil Rupani</p>
//         <p>"Read, review, and rediscover."</p>
//         <p>&copy; {new Date().getFullYear()} Book Review Platform</p>
//       </footer>
//       <ToastContainer />
//     </>
//   );
// };

// export default Home;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './home.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null);
  const [commentInput, setCommentInput] = useState({});
  const [openCommentForm, setOpenCommentForm] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [viewMode, setViewMode] = useState('all');
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setUser(storedUser);

    fetchBooks();
    fetchFavorites(storedUser);

    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark-mode');
    }
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get('https://book-review-platform-sable.vercel.app/api/books');
      setBooks(res.data);
    } catch {
      console.error('Error fetching books');
    }
  };

  const fetchFavorites = (currentUser) => {
    if (!currentUser) return;
    const allFavs = JSON.parse(localStorage.getItem('favoritesByUser') || '{}');
    const userFavs = allFavs[currentUser.name] || [];
    setFavorites(userFavs);
  };

  const updateFavoritesInStorage = (updated) => {
    const allFavs = JSON.parse(localStorage.getItem('favoritesByUser') || '{}');
    allFavs[user?.name] = updated;
    localStorage.setItem('favoritesByUser', JSON.stringify(allFavs));
  };

  const toggleFavorite = (bookId) => {
    const updated = favorites.includes(bookId)
      ? favorites.filter(id => id !== bookId)
      : [...favorites, bookId];

    setFavorites(updated);
    updateFavoritesInStorage(updated);
    toast.success(
      favorites.includes(bookId)
        ? 'Removed from favorites'
        : 'Your favorite book added'
    );
  };

  const handleDeleteFavorite = (bookId) => {
    const updated = favorites.filter(id => id !== bookId);
    setFavorites(updated);
    updateFavoritesInStorage(updated);
    toast.success('Removed from favorites');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast.info('Logged out');
    setTimeout(() => window.location.reload(), 500);
  };

  const toggleTheme = () => {
    const dark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={i < rating ? 'star filled' : 'star'}>★</span>
    ));
  };

  const toggleCommentForm = (bookId) => {
    setOpenCommentForm((prev) => ({ ...prev, [bookId]: !prev[bookId] }));
  };

  const handleCommentSubmit = async (e, bookId) => {
    e.preventDefault();
    if (!commentInput[bookId] || !user?.name) return;

    try {
      await axios.post(`https://book-review-platform-sable.vercel.app/api/books/${bookId}/comments`, {
        text: commentInput[bookId],
        author: user.name,
      });
      toast.success('Comment added');
      setCommentInput({ ...commentInput, [bookId]: '' });
      fetchBooks();
    } catch (err) {
      toast.error('Error adding comment');
    }
  };

  const handleCommentDelete = async (bookId, commentId) => {
    try {
      await axios.delete(`https://book-review-platform-sable.vercel.app/api/books/${bookId}/comments/${commentId}`);
      toast.success('Comment deleted');
      fetchBooks();
    } catch (err) {
      toast.error('Error deleting comment');
    }
  };

  const handleUpdate = (bookId) => {
    navigate(`/edit/${bookId}`);
  };

  const handleDelete = async (bookId) => {
    try {
      await axios.delete(`https://book-review-platform-sable.vercel.app/api/books/${bookId}`);
      toast.success('Book deleted');
      fetchBooks();
    } catch (err) {
      toast.error('Error deleting book');
    }
  };

  const filteredBooks = books.filter(b => {
    const matchesSearch =
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (viewMode === 'reviews') return b.createdBy === user?.name;
    if (viewMode === 'favorites') return favorites.includes(b._id);
    return true;
  });

  return (
    <>
      <header className="header">
        <div className="logo-container">
          <img src="/book.jpg" className="logo" alt="Book Logo" />
          <h1 className="header-title">Book Review</h1>
        </div>
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />

          {user ? (
            <div className="user-info">
              <span className="welcome-text">Welcome, {user.name}</span>
              <div className="profile-menu">
                <button onClick={() => setProfileOpen(!profileOpen)} className="profile-btn">
                  ☰
                </button>
                {profileOpen && (
                  <div className="profile-dropdown">
                    <button onClick={() => { setViewMode('all'); setProfileOpen(false); }}>All Books</button>
                    <button onClick={() => { setViewMode('reviews'); setProfileOpen(false); }}>My Review Books</button>
                    <button onClick={() => { setViewMode('favorites'); setProfileOpen(false); }}>My Favorite Books</button>
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
              <button onClick={toggleTheme} className="theme-toggle">🌓</button>
            </div>
          ) : (
            <>
              <Link to="/signin" className="signin-button">Sign In</Link>
              <button onClick={toggleTheme} className="theme-toggle">🌓</button>
            </>
          )}
        </div>
      </header>

      <main className="container">
        {user ? (
          <>
            <h1>
              {viewMode === 'all' && 'All Books'}
              {viewMode === 'reviews' && 'My Review Books'}
              {viewMode === 'favorites' && 'My Favorite Books'}
            </h1>

            {viewMode === 'all' && (
              <div className="button-wrapper">
                <Link to="/add" className="add-link">+ Add New</Link>
              </div>
            )}

            {filteredBooks.map((book) => (
              <div key={book._id} className="book">
                {book.image && <img src={book.image} alt={book.title} className="book-image" />}
                <h2>{book.title}</h2>
                <h3>{book.author}</h3>
                <p>{book.review}</p>
                <div className="stars">{renderStars(book.rating)}</div>

                {viewMode === 'favorites' ? (
                  <button
                    className="delete-fav-btn"
                    onClick={() => handleDeleteFavorite(book._id)}
                  >Remove</button>
                ) : (
                  <button
                    className={`favorite-btn ${favorites.includes(book._id) ? 'active' : ''}`}
                    onClick={() => toggleFavorite(book._id)}
                    title="Favorite"
                  >❤️</button>
                )}

                {book.createdBy && (
                  <p className="review-author">
                    This review is created by <strong>{book.createdBy}</strong>.
                  </p>
                )}

                {user.name === book.createdBy && (
                  <div className="book-actions">
                    <button onClick={() => handleUpdate(book._id)} className="update-btn">Update</button>
                    <button onClick={() => handleDelete(book._id)} className="delete-btn">Delete</button>
                  </div>
                )}

                <hr className="action-separator" />

                <div className="comment-section">
                  <h4>Comments:</h4>
                  {book.comments?.length > 0 ? (
                    <ul className="comment-list">
                      {book.comments.map((comm) => (
                        <li key={comm._id} className="comment-item">
                          {user.name === comm.author && (
                            <button
                              className="comment-delete-btn"
                              onClick={() => handleCommentDelete(book._id, comm._id)}
                              title="Delete Comment"
                            >🗑️</button>
                          )}
                          <strong>{comm.author}</strong>: {comm.text}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No comments yet.</p>
                  )}

                  <button
                    onClick={() => toggleCommentForm(book._id)}
                    className="comment-toggle-btn"
                  >
                    {openCommentForm[book._id] ? 'Cancel' : 'Add Comment'}
                  </button>

                  {openCommentForm[book._id] && (
                    <form onSubmit={(e) => handleCommentSubmit(e, book._id)} className="comment-form">
                      <input
                        type="text"
                        value={commentInput[book._id] || ''}
                        onChange={(e) =>
                          setCommentInput({ ...commentInput, [book._id]: e.target.value })
                        }
                        placeholder="Write a comment..."
                        className="comment-input"
                        required
                      />
                      <button type="submit" className="comment-submit-btn">Post</button>
                    </form>
                  )}
                </div>
              </div>
            ))}

          </>
        ) : (
          <div className="signin-prompt">
            <h2>Please sign in to view books</h2>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>Jil Rupani</p>
        <p>"Read, review, and rediscover."</p>
        <p>&copy; {new Date().getFullYear()} Book Review Platform</p>
      </footer>

      <ToastContainer />
    </>
  );
};

export default Home;

