import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './signup.css'; // Create this CSS file

const SignUp = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' ,confirmPassword:''});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await axios.post('http://localhost:5000/api/users/signup', form);
  //     alert('Account created successfully! Please sign in.');
  //     navigate('/signin');
  //   } catch (error) {
  //     alert('Failed to register. Email might be already in use.');
  //   }
  // };


  const handleSubmit = async (e) => {
  e.preventDefault();

  if (form.password !== form.confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const res = await axios.post('https://book-review-platform-sable.vercel.app/api/users/signup', form);
    // alert('Account created successfully! Please sign in.');
    console.log(res);
    
    navigate('/signin');
  } catch (error) {
    console.log(error);
    
    // alert('Failed to register. Email might be already in use.');
  }
};

  

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword || ''}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default SignUp;
