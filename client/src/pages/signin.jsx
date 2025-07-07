


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './signin.css'; 
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', form);
      
      localStorage.setItem('user', JSON.stringify(res.data.result));
      
      toast.success('Sign in successful!', {
        position: "top-center",
        autoClose: 2000,
        onClose: () => navigate('/')
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid credentials. Please try again.', {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} className="signin-form">
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
        <button type="submit">Sign In</button>
      </form>
      <p className="register-link">
        Don't have an account? <Link to="/signup">Register here</Link>
      </p>

      {/* Toast container */}
      <ToastContainer />
    </div>
  );
};

export default SignIn;
