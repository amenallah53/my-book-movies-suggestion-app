import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import recommendRouter from './routes/recommend.js';
import getImageRouter from './routes/get-image.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

//router for recommendations
app.use('/api/recommend',recommendRouter)

//router for getting poster and background images
app.use('/api/get-image',getImageRouter)


// Server listen
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});























//ollama phi3 
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