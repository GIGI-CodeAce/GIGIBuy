import express from 'express';

const app = express();
const PORT = 4000;

app.get('/', (req, res) => {
  res.json({ message: 'Hello from port 4000 🚀' });
});

app.listen(PORT, () => {
  console.log(`✅ Listening on port ${PORT}`);
});
