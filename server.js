import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';



const app = express();

const allowedOrigins = [
    "http://localhost:3000/",
    "https://timelessluxe.vercel.app/"
]


app.use(cors())
  
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes)


connectDB();

const PORT = process.env.PORT 

app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`)
})