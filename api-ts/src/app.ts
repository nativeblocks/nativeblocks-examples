import express from "express";
import getPaywallFrame from "./paywall";

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello Nativeblocks!');
});

app.get('/paywall', async (req, res) => {
  try {
    const frame = await getPaywallFrame();
    res.json(frame);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
