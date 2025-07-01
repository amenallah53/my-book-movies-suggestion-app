import express from "express";
import { jsonrepair } from "jsonrepair";
import { Groq } from 'groq-sdk';

const router = express.Router()

// POST endpoint to handle recommendations
router.post("/books", async (req, res) => {
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
router.post("/movies", async (req, res) => {
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

export default router;