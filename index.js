const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/api', async (req, res) => {
  const url = req.query.url;
  const token = req.query.token;
  if (!url) return res.status(400).json({ error: 'Missing url' });
  try {
    const headers = {};
    if (token) headers['X-Auth-Token'] = token;
    const response = await fetch(url, { headers });
    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(process.env.PORT || 3000);
