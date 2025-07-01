import express from "express";
import fetch from "node-fetch";

const router = express.Router()

// POST endpoint to get book cover image id
router.post("/books", async (req, res) => {
  const { title, author } = req.body;

  try {
    // Encode both title and author
    const query = `title=${encodeURIComponent(title)}`;
    const response = await fetch(`https://openlibrary.org/search.json?${query}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.docs.length === 0) {
      return res.status(404).json({ error: "No results found." });
    }

    const image_id = data.docs[0].cover_i;
    res.json({ image_id });

  } catch (error) {
    console.error("Error fetching OpenLibrary data:", error);
    res.status(500).json({ error: "Failed to fetch book cover." });
  }
});

// POST endpoint to get movie cover image id
router.post("/movies", async (req, res) => {
  const { title, director } = req.body;

  try {
    // Encode both title
    const query = `t=${encodeURIComponent(title)}`;
    //fetch for movie imdb id
    const response1 = await fetch(`https://www.omdbapi.com/?${query}&apikey=${process.env.OMDB_API_KEY}`);

    if (!response1.ok) {
      throw new Error(`HTTP error! status: ${response1.status}`);
    }

    const data1 = await response1.json();

    if (data1.Response === "False") {
      return res.status(404).json({ error: data1.Error })
    }
    const imdb_id = data1.imdbID;

    //fetch for movie cover and background
    const response2 = await fetch(`https://webservice.fanart.tv/v3/movies/${imdb_id}?api_key=${process.env.FANART_API_KEY}`);

    if (!response2.ok) {
      throw new Error(`HTTP error! status: ${response2.status}`);
    }

    const data2 = await response2.json();

    if (data1.Response === "False") { 
      return res.status(404).json({ error: data1.Error })
    }
     
    const movie_poster_backgound = [data2.movieposter[0].url,data2.moviebackground[0].url]

    res.json({ movie_poster_backgound });

  } catch (error) {
    console.error("Error fetching Fanart.tv data:", error);
    res.status(500).json({ error: "Failed to fetch movie cover." });
  }
});

export default router;