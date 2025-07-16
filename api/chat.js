import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Missing message in request body' });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: message }],
    });

    const reply = completion.choices[0]?.message?.content || 'No reply from model.';
    return res.status(200).json({ reply });
  } catch (error) {
    console.error('API error:', error); // This will show in Vercel logs
    return res.status(500).json({ error: 'Failed to fetch response from OpenAI.' });
  }
}
