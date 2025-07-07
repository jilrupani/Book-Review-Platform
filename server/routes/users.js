import express from 'express';
import { signup, signin } from './auth.js'
const router = express.Router();

// Dummy user login/signup route
router.post('/login', signin );

router.post('/signup', signup);

export default router;
