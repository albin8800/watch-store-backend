import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';


dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());

connectDB();

const PORT = process.env.PORT 

app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`)
})