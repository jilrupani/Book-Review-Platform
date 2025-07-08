import express from 'express';
import bodyParset from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();
dotenv.config();
app.use(cors());


app.use(bodyParset.json({ limit:"30mb",extended: true}));
app.use(bodyParset.urlencoded({ limit:"30mb",extended: true}));
app.use(express.json());
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
// const  CONNECTION_URL = "mongodb+srv://jilrupani04:jilrupani04@cluster0.7a7wjpb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const PORT = process.env.PORT || 5000;
app.get('/',(req,res)=>{
    res.send('Hello to Memories API.');
})
mongoose.connect(process.env.CONNECTION_URL,{useNewURLParser : true, useUnifiedTopology: true})
    .then(() => { app.listen(PORT, () => console.log(`server running on port : ${PORT}`))   })
    .catch((err)=>{ console.log(err);
})

// mongoose.set('useFindAndModify', false);
