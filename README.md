# Chatbot 2025 - Bike Expert

A custom GPT-4o-powered chatbot to help users find the perfect mountain bike and capture leads via Google Sheets.

## Features

- GPT-4o chatbot with a friendly expert tone
- Lead capture form triggers on interest
- Sends name and email to Google Sheets via Apps Script webhook
- Embeddable with `<iframe>` into WordPress

## Setup

1. Copy `.env.example` to `.env` and add your API key + webhook URL
2. Install dependencies:

```bash
npm install express body-parser cors dotenv openai node-fetch
```

3. Start the server:

```bash
node server.js
```

## Deployment

Deploy to Vercel, Render, or your own Node server. Embed on WordPress via:

```html
<iframe src="https://your-app-url" width="100%" height="600px" style="border:none;"></iframe>
```
