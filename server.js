import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post('/api/proxy', async (req, res) => {
  const { url, method, body } = req.body;

  try {
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: method !== 'GET' ? JSON.stringify(body) : undefined,
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});