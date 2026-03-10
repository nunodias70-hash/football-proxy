const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/api', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: 'Missing url' });
  
  try {
    const response = await fetch(url, {
      headers: {
        'X-RapidAPI-Key': '504070e6f7mshdeb6e962eff9fccp1e71b6jsn2eb2b7a7e9c7',
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(process.env.PORT || 3000);
