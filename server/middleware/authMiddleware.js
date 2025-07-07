// import jwt from 'jsonwebtoken';

// const verifyToken = (req, res, next) => {
//   const token = req.headers['authorization'];
  
//   if (!token) return res.status(401).json({ message: 'Access Denied. No token provided.' });

//   try {
//     const decoded = jwt.verify(token, 'your_jwt_secret');
//     req.user = decoded;
//     next();
//   } catch (err) {
//     return res.status(403).json({ message: 'Invalid Token' });
//   }
// };


// export default verifyToken;


import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No token provided.' });
  }

  try {
    // ✅ Decode token and attach user info
    const decoded = jwt.verify(token, 'your_jwt_secret'); // Replace with process.env.JWT_SECRET in production
    req.user = {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email
    };
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid Token' });
  }
};

export default verifyToken;
