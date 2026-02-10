
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js'



const app = express();


app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);


connectDB();

const PORT = process.env.PORT 

app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`)
})