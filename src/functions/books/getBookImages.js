const booksGetImageUrls = async (recommendation) => {
  try {
    const response = await fetch("http://localhost:5000/api/get-image/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: recommendation.title,
        author: recommendation.author,
      }),
    });

    if (!response.ok) {
      console.warn(`Image not found for: ${recommendation.title}`);
      return null;
    }

    const data = await response.json();
    return data.image_id 
      ? `https://covers.openlibrary.org/b/id/${data.image_id}-L.jpg`
      : null;
  } catch (err) {
    console.error("Error fetching image:", err);
    return null;
  }
};

export default booksGetImageUrls;  // Fixed export