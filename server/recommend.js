import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import { jsonrepair } from "jsonrepair";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// POST endpoint to handle recommendations
app.post("/api/recommend", async (req, res) => {
  const {
    selectedGenres,
    language,
    authors,
    fromYear,
    toYear,
    bookLength,
    extraDescription,
  } = req.body;

  const prompt = `Give me a book recommendation as valid strict JSON object, exactly like this:
    {
      "title": "",
      "author": "",
      "description": "",
      "year_of_publish": "",
      "genre": "",
      "mood": "",
      "languages_of_book": ""
    }
    Preferences:
    genre: ${selectedGenres}
    language of the book: ${language}
    author(s): ${authors}
    years of publish from: ${fromYear} to: ${toYear}
    length: ${bookLength}
    extra details : ${extraDescription}
    don't mind empty preferences and Respond ONLY with JSON array. 
    No markdown, no explanation, no extra text, 
    in the JSON array "languages_of_book" value better be the name of the language not an acronym
    example "languages_of_book" : "english,french" not "en,fr"
    year of publish always numeric and description better be a bit detailed of 2 or 3 lines.`;

  try {
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "phi3",
        prompt: prompt,
        stream: true,
        options: { temperature: 0.2, stop: ["]"] },
      }),
    });

    const data = await response.json();
    let responseText = data.response.trim();

    if (!responseText.endsWith("]")) {
      responseText += "]";
    }

    const fixedJsonString = jsonrepair(responseText);
    const recommendations = JSON.parse(fixedJsonString);

    res.json({ recommendations });
  } catch (error) {
    console.error("Failed to fetch or parse AI response:", error);
    res.status(500).json({ error: "Failed to get recommendations." });
  }
});


// POST endpoint to get book cover image id
app.post("/api/getImage", async (req, res) => {
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

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
