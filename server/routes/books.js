import express from "express";
import BookModel from "../models/Book.js";

const router = express.Router();

// POST — Add a book
router.post("/add-book", async (req, res) => {
  try {
    const book = await BookModel.create(req.body);
    res.status(201).json({ message: "Book added successfully", book });
  } catch (error) {
    res.status(500).json({ message: "Failed to add book", error });
  }
});

// GET — Get all books
router.get("/get-books", async (req, res) => {
  try {
    const books = await BookModel.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Failed to get books", error });
  }
});

router.get("/get-book/:title", async (req, res) => {
  try {
    const book = await BookModel.findOne({
      title: req.params.title
    });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: "Error finding book", error });
  }
});


// DELETE — Delete a book by title
router.delete("/delete-book/:title", async (req, res) => {
  try {
    const deletedBook = await BookModel.findOneAndDelete({ title: req.params.title });

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully", deletedBook });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete book", error });
  }
});

export default router;
