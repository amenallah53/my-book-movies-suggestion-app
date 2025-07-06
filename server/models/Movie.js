import mongoose from "mongoose"

const movieSchema = new mongoose.Schema({
      title: String,
      director: String,
      description: String,
      year_of_release: Number,
      genre: String,
      mood: String,
      language_of_movie: String,
      awards: String,
      imdb_rating: Number,
      images_urls: Array
})

const MovieModel = mongoose.model("movies",movieSchema)
export default MovieModel;