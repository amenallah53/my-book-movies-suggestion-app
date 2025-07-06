import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
  year_of_publish: Number,
  genre: String,
  mood: String,
  languages_of_book: String,
  image: String
});

const BookModel = mongoose.model("books", bookSchema);
export default BookModel;
