import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import recommendRouter from './routes/recommend.js';
import getImageRouter from './routes/get-image.js';
import booksRouter from './routes/books.js';
import moviesRouter from './routes/movies.js';

dotenv.config();
console.log("MONGO_URL:", process.env.MONGO_URL);

const app = express();
app.use(cors());
app.use(express.json());

const MONGOURL = process.env.MONGO_URL;

mongoose.connect(MONGOURL)
  .then(() => console.log("Database connection succeeded!"))
  .catch(error => console.error("Database connection error:", error));

app.use('/api/recommend', recommendRouter);
app.use('/api/get-image', getImageRouter);
app.use('/books',booksRouter);
app.use('/movies',moviesRouter);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
