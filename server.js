import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js'



const app = express();

const allowedOrigins = [
    "http://localhost:3000/",
    "https://timelessluxe.vercel.app/"
]


app.use(cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }))
  
app.use(express.json());

app.use("/api/products", productRoutes);


connectDB();

const PORT = process.env.PORT 

app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`)
})