import React from 'react';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Home from './pages/home.jsx';
import Addbook from './pages/Addbook.jsx';
import Edit from './pages/edit.jsx';
import SignIn from './pages/signin.jsx';
import SignUp from './pages/signup.jsx';

const App = () => (
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/add" element={<Addbook />} />
    <Route path="/edit/:id" element={<Edit />} />
    <Route path="/signin" element={<SignIn />} />
    <Route path="/signup" element={<SignUp />} />
  </Routes>
  </BrowserRouter>
);

export default App;


