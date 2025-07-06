import express from "express";
import MovieModel from "../models/Movie.js";

const router = express.Router();

// POST — Add a movie
router.post("/add-movie", async (req, res) => {
  try {
    const movie = await MovieModel.create(req.body);
    res.status(201).json({ message: "Movie added successfully", movie });
  } catch (error) {
    res.status(500).json({ message: "Failed to add movie", error });
  }
});

//GET — Get movie by title
router.get("/get-movie/:title", async (req, res) => {
  try {
    const movie = await MovieModel.findOne({
      title: req.params.title
    });

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: "Error finding movie", error });
  }
});

// GET — Get all movies
router.get("/get-movies", async (req, res) => {
  try {
    const movies = await MovieModel.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: "Failed to get movies", error });
  }
});

// DELETE — Delete a movie by movie
router.delete("/delete-movie/:title", async (req, res) => {
  try {
    const deletedMovie = await MovieModel.findOneAndDelete({ title: req.params.title });

    if (!deletedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json({ message: "Movie deleted successfully", deletedMovie });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete movie", error });
  }
});


export default router;
