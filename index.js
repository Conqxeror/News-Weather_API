const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000; // Change the port number if needed
const API_KEY = '344cb3455ba1f4b98908ed7665d1494a'; // Replace with your OpenWeatherMap API key

app.use(express.static('client'));

app.get('/weather', (req, res) => {
  const city = req.query.city;
  
  if (!city) {
    return res.send({ error: 'Please provide a city name.' });
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

  axios.get(apiUrl)
    .then(response => {
      const weatherData = response.data;
      const weatherDetails = {
        city: weatherData.name,
        description: weatherData.weather[0].description,
        temperature: weatherData.main.temp
      };

      res.send(weatherDetails);
    })
    .catch(error => {
      res.send({ error: 'Unable to fetch weather data.' });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
