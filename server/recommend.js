import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import { jsonrepair } from "jsonrepair";
import dotenv from "dotenv";
import { Groq } from 'groq-sdk';

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

  const prompt = `Give me a book recommendation as a valid strict JSON array.
    Each JSON object must include:
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
    - genre: ${selectedGenres}
    - language: ${language}
    - author(s): ${authors}
    - years of publish: ${fromYear} to ${toYear}
    - length: ${bookLength}
    - extra details: ${extraDescription}

    Respond ONLY with the JSON array. No explanations, no markdown, no extra text.

    Notes:
    - "languages_of_book" must be full language names (e.g. "english,french" not "en,fr").
    - If any other language than english, the title and author displayed in native script.
    - "year_of_publish" must be a numeric year.
    - "description" should be 2-3 lines.`;

  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama3-70b-8192",
      temperature: 1,
      max_completion_tokens: 2048,
      top_p: 1,
      stream: false,
    });

    let recommendations = chatCompletion.choices[0].message.content;

    // Optionally repair JSON if slightly malformed
    try {
      recommendations = jsonrepair(recommendations);
      recommendations = JSON.parse(recommendations);
    } catch (err) {
      console.warn("JSON repair failed, sending raw response.");
      return res.status(500).json({ error: "Failed to parse recommendations." });
    }
    res.json({ recommendations });
  } catch (error) {
    console.error("Groq API error:", error);
    res.status(500).json({ error: "Failed to get recommendations." });
  }
});

// POST endpoint to handle recommendations
app.post("/api/recommend-movie", async (req, res) => {
  const {
    selectedGenres,
    language,
    director,
    fromYear,
    toYear,
    recognition,
    extraDescription,
  } = req.body;

  const prompt = `Give me a movie recommendation as a valid strict JSON array.
    Each JSON object must include:
    {
      "title": "",
      "director": "",
      "description": "",
      "year_of_release": "",
      "genre": "",
      "mood": "",
      "language_of_movie": ""
      "awards": "",
      "imdb_rating": ""
    }

    Preferences:
    - genre: ${selectedGenres}
    - language: ${language}
    - director: ${director}
    - years of release: ${fromYear} to ${toYear}
    - recognition: ${recognition}
    - extra details: ${extraDescription}

    Respond ONLY with the JSON array. No explanations, no markdown, no extra text.

    Notes:
    - "language_of_movie" must be full language names (e.g. "english,french" not "en,fr").
    - If any other language than english, the title displayed in native script.
    - "description" should be 3-5 lines.`;

  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama3-70b-8192",
      temperature: 1,
      max_completion_tokens: 2048,
      top_p: 1,
      stream: false,
    });

    let recommendations = chatCompletion.choices[0].message.content;

    // Optionally repair JSON if slightly malformed
    try {
      recommendations = jsonrepair(recommendations);
      recommendations = JSON.parse(recommendations);
    } catch (err) {
      console.warn("JSON repair failed, sending raw response.");
      return res.status(500).json({ error: "Failed to parse recommendations." });
    }
    res.json({ recommendations });
  } catch (error) {
    console.error("Groq API error:", error);
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


/*
  try {
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "phi3",
        prompt: prompt,
        stream: false,
        options: { temperature: 0.3, stop: ["]"] },
      }),
    });

    const data = await response.json();
    let responseText = data.response.trim();
    const fixedJsonString = jsonrepair(responseText);
    const recommendations = JSON.parse(fixedJsonString);
    res.json({ recommendations });

  } catch (error) {
    console.error("Failed to fetch or parse AI response:", error);
    res.status(500).json({ error: "Failed to get recommendations." });
  }
  */