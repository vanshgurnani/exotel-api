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

    // Payload for the API request (received from frontend)
    const payload = req.body; // Assuming the payload is sent in the request body

    // Validate the presence of required fields in the payload
    if (!payload || !payload.From || !payload.To || !payload.CallerId) {
      return res.status(400).json({ error: 'Bad Request: Missing required fields in payload' });
    }

    // Update the API endpoint with actual values
    const apiUrl = `https://${apiKey}:${apiToken}${subdomain}/v1/Accounts/${sid}/Calls/connect`;

    // Convert payload to a query string
    const dataString = `From=${payload.From}&To=${payload.To}&CallerId=${payload.CallerId}`;

    const options = {
      url: apiUrl,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: dataString,
    };

    // Make the Exotel API request using axios
    const response = await axios(options);

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
