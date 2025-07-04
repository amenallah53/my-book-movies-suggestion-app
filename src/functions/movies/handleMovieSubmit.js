import moviesGetImageUrls from "./getMovieImages";

// Accept all required props as arguments
const handleSubmit = async (
  e,
  {
    listGenre,
    language,
    director,
    fromYear,
    toYear,
    recognition,
    extraDescription,
    setIsLoading,
    navigate
  }
) => {
  e.preventDefault();
  setIsLoading(true);
  console.log("Form submitted.");

  const selectedGenres = listGenre
    .filter((g) => g.clicked)
    .map((g) => g.genre)
    .join(", ");

  try {
    const response = await fetch("http://localhost:5000/api/recommend/movies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        selectedGenres,
        language,
        director,
        fromYear,
        toYear,
        recognition,
        extraDescription,
      }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    const recommendations = data.recommendations;

    const image_urls = await Promise.all(
      recommendations.map(async (recommendation) => {
        return await moviesGetImageUrls(recommendation);
      })
    );

    navigate('/movies-recommendations/results', { 
      state: { recommendations, image_urls } 
    });
  } catch (err) {
    console.error("Error submitting form:", err);
    alert("Failed to get recommendations from backend.");
  } finally {
    setIsLoading(false);
  }
};

export default handleSubmit;