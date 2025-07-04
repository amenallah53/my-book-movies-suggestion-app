import booksGetImageUrls from "./getBookImages";

const handleSubmit = async (
  e,
  {
    setIsLoading,
    navigate,
    listGenre,
    language,
    authors,
    fromYear,
    toYear,
    bookLength,
    extraDescription
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
    const response = await fetch("http://localhost:5000/api/recommend/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        selectedGenres,
        language,
        authors,
        fromYear,
        toYear,
        bookLength,
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
        return await booksGetImageUrls(recommendation);
      })
    );

    navigate('/books-recommendations/results', { 
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