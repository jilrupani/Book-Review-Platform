import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './edit.css';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    author: '',
    review: '',
    rating: 1,
  });

  // Fetch book data
  useEffect(() => {
    axios.get(`http://localhost:5000/api/books/${id}`)
      .then(res => setForm(res.data))
      .catch(err => console.error('Failed to fetch book', err));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/books/${id}`, form);
      alert('Book updated successfully');
      navigate('/');
    } catch (err) {
      console.error('Error updating book:', err);
      alert('Failed to update book');
    }
  };

  const handleImageChange = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onloadend = () => {
    setForm({ ...form, image: reader.result });
  };
  if (file) {
    reader.readAsDataURL(file);
  }
};


  return (
    <div className="edit-container">
      <h2>Update Book</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
          required
        />
        <textarea
          name="review"
          placeholder="Review"
          value={form.review}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="rating"
          placeholder="Rating (1-5)"
          min="1"
          max="5"
          value={form.rating}
          onChange={handleChange}
          required
        />

          <input type="file" accept="image/*" onChange={handleImageChange} />
          {/* {form.image && <img src={form.image} alt="Preview" style={{ maxWidth: '150px', marginTop: '10px' }} 
          />} */}

        <button type="submit">Update Book</button>
      </form>
    </div>
  );
};

export default Edit;
