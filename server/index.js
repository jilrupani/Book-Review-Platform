import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/users.js';
// import authRoutes from './routes/auth.js';
import bookRoutes from './routes/books.js'
const app = express();
// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb' })); // This is important!
app.use(express.urlencoded({ extended: true, limit: '50mb' }));



// const app = express();

dotenv.config();


app.use(express.json());
app.use(cors());
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);

// const PORT = process.env.PORT || 5000;
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
//   .catch((err) => console.log(err));

  
const PORT = process.env.PORT || 5000;
app.get('/',(req,res)=>{
    res.send('Hello to Books API.');
})
// mongoose.connect(CONNECTION_URL)
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error(err));

// app.use('/user',userRoutes);

mongoose.connect(process.env.MONGO_URI,{useNewURLParser : true, useUnifiedTopology: true})
    .then(() => { app.listen(PORT, () => console.log(`server running on port : ${PORT}`))   })
    .catch((err)=>{ console.log(err);   
})
