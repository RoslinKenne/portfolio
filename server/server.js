const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.GOOGLE_API_KEY;

if (!API_KEY) {
  console.warn('Warning: GOOGLE_API_KEY is not set. The /api/chat endpoint will return 500 until it is provided.');
}

app.post('/api/chat', async (req, res) => {
  if (!API_KEY) return res.status(500).json({ error: 'Server missing GOOGLE_API_KEY' });
  const { text, context } = req.body || {};
  if (!text) return res.status(400).json({ error: 'Missing text in request body' });

  const prompt = `${context || ''}\nUtilisateur: ${text}`;

  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
    const body = {
      "contents": [ { "parts": [ { "text": prompt } ] } ]
    };

    const r = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!r.ok) {
      const textErr = await r.text();
      return res.status(502).json({ error: 'Upstream error', details: textErr });
    }

    const data = await r.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!reply) return res.status(502).json({ error: 'No reply from model', raw: data });

    return res.json({ reply });
  } catch (err) {
    console.error('Proxy error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use(express.static('public'));

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
