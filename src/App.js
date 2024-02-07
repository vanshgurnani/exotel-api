// CallButton.js

import React from 'react';
import axios from 'axios';

const CallButton = () => {
  const handleCall = async () => {
    try {
      // Update with your server endpoint
      const serverEndpoint = 'http://localhost:5000/makeCall';

      // Payload for the API request
      const payload = {
        From: '+917821817966',
        To: '+918003741348',
        CallerId: '09513886363',
      };

      // Make a request to the server-side proxy using axios
      const response = await axios.post(serverEndpoint, payload);

      console.log('Call connected successfully:', response.data);
    } catch (error) {
      console.error('Error connecting call:', error.message);
    }
  };

  return (
    <div>
      <button onClick={handleCall}>Connect Call</button>
    </div>
  );
};

export default CallButton;




