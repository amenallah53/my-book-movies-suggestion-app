// Corrected export syntax
const moviesGetImageUrls = async (recommendation) => {
  try {
    const response = await fetch("http://localhost:5000/api/get-image/movies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: recommendation.title,
        director: recommendation.director,
      }),
    });

    if (!response.ok) {
      console.warn(`Image not found for: ${recommendation.title}`);
      return null;
    }

    const data = await response.json();
    return data.movie_poster_backgound;
  } catch (err) {
    console.error("Error fetching image:", err);
    return null;
  }
};

export default moviesGetImageUrls; // Fixed export