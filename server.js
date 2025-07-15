import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { config } from "dotenv";
import { OpenAI } from "openai";
import fetch from "node-fetch";

config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  const chatCompletion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You’re a friendly bike expert who helps users find the perfect mountain bike." },
      { role: "user", content: userMessage }
    ],
    model: "gpt-4o"
  });

  const reply = chatCompletion.choices[0].message.content;
  res.json({ reply });
});

app.post("/lead", async (req, res) => {
  const { name, email } = req.body;
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email })
    });

    if (response.ok) {
      res.json({ success: true });
    } else {
      res.status(500).json({ error: "Failed to send to webhook" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
