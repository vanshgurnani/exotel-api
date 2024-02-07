const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors({
  methods: ['POST']
}));

app.post('/makeCall', async (req, res) => {
  try {
    // Your Exotel API key, token, and other details
    const apiKey = 'e3a18f7d7230fe0499dfb3271eb3836ba58659406583c64e';
    const apiToken = 'bc53c4c209a46fa9a3ede68805af9373fce9475eac4ad858';
    const subdomain = '@api.exotel.com';
    const sid = 'blackcheriemedia1';

    console.log('Received payload:', req.body);

    // Extract payload from req.body
    const { From, To, CallerId } = req.body;

    // Update the API endpoint with actual values
    const apiUrl = `https://${apiKey}:${apiToken}${subdomain}/v1/Accounts/${sid}/Calls`;

    const response = await axios.post(apiUrl, {
      From,
      To,
      CallerId,
    });

    console.log('Exotel API Response:', response.data);

    res.json(response.data);
  } catch (error) {
    console.error('Error connecting call:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
