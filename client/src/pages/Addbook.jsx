
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './addbook.css';
import imageCompression from 'browser-image-compression';


const AddBook = () => {
  const storage = JSON.parse(localStorage.getItem("user"))
  const [form, setForm] = useState({ title: '', author: '', review: '',rating:1,image:'', createdBy : storage.name });
  const navigate = useNavigate();
  // setForm({...form, createdBy: storage.name})

//   const handleImageChange = (e) => {
//   const file = e.target.files[0];
//   const reader = new FileReader();
//   reader.readAsDataURL(file);
//   reader.onloadend = () => {
//     setForm({ ...form, image: reader.result });
//   };
// };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value },);
//   const handleImageChange = (e) => {
//   const file = e.target.files[0];
//   const reader = new FileReader();
//   reader.onloadend = () => {
//     setForm((prev) => ({ ...prev, image: reader.result }));
//   };
//   if (file) {
//     reader.readAsDataURL(file); // convert image to base64
//   }
// };



//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     await axios.post('http://localhost:5000/api/books', form);
//     alert('Book added!');
//     navigate('/');
//   } catch (err) {
//     console.error('Error:', err);
//     alert('Failed to add book.');
//   }
// };

const handleSubmit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem('token'); 

  try {
    await axios.post('https://book-review-platform-sable.vercel.app/api/books', form, {
      headers: {
        Authorization: token,
      },
    });
    navigate('/');
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to add book.');
  }
};


const handleImageChange = async (e) => {
  const imageFile = e.target.files[0];
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 800,
    useWebWorker: true
  };

  try {
    const compressedFile = await imageCompression(imageFile, options);
    const base64 = await imageCompression.getDataUrlFromFile(compressedFile);
    setForm({ ...form, image: base64 }); // Assuming you're storing it in form.image
  } catch (error) {
    console.error('Image compression error:', error);
  }
};

  return (
    <div className="container">
      <h1>Add a New Book</h1>
      <form className="book-form" onSubmit={handleSubmit}>
        <input
          className="input-field"
          name="title"
          placeholder="Title"
          onChange={handleChange}
          required
        />
        <input
          className="input-field"
          name="author"
          placeholder="Author"
          onChange={handleChange}
          required
        />
        <textarea
          className="textarea-field"
          name="review"
          placeholder="Review"
          onChange={handleChange}
          required
        />

        <select
          name="rating"
          value={form.rating}
          onChange={handleChange}
          className="input-field"
          required
        >
        <option value="" disabled hidden>Select Rating</option>
          {[1, 2, 3, 4, 5].map((val) => (
          <option key={val} value={val}>{val}</option>
        ))}
        </select>

        <input type="file" accept="image/*" onChange={handleImageChange} />

        <button className="submit-btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddBook;

