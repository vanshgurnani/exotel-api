// // CallButton.js

// import React from 'react';
// import axios from 'axios';

// const CallButton = () => {
//   const handleCall = async () => {
//     try {
//       // Update with your server endpoint
//       const serverEndpoint = 'http://localhost:5000/makeCall';

//       // Payload for the API request
//       const payload = {
//         From: '+917821817966',
//         To: '+918003741348',
//         CallerId: '09513886363',
//       };

//       // Make a request to the server-side proxy using axios
//       const response = await axios.post(serverEndpoint, payload);

//       console.log('Call connected successfully:', response.data);
//     } catch (error) {
//       console.error('Error connecting call:', error.message);
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleCall}>Connect Call</button>
//     </div>
//   );
// };

// export default CallButton;




import React, { useState, useEffect } from 'react';
import CrossfadeImage from 'react-crossfade-image';

const images = [
  'https://ik.imagekit.io/dfh1m6dw7/Ship/img_1_n77XNNU-m0.png?updatedAt=1698478215585',
  'https://ik.imagekit.io/dfh1m6dw7/Ship/img-1%20(1)_HIi_71daD8.png?updatedAt=1698831466617',
  'https://ik.imagekit.io/athxbsw68/1%20(8).png?updatedAt=1707201389074'
];

const App = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const normalizedScroll = scrollPosition / maxScroll;
      const newIndex = Math.floor(normalizedScroll * images.length);
      setCurrentImageIndex(newIndex);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const imageSrc = images[currentImageIndex];

  return (
    <div style={{ position: 'fixed', width: '100%', height: '100%' }}>
      <CrossfadeImage
        src={imageSrc}
        style={{
          position: 'relative',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'opacity 1s ease-in-out',
          opacity: 1 - Math.abs(currentImageIndex - images.length / 2) / (images.length / 2)
        }}
      />
    </div>
  );
};

export default App;

