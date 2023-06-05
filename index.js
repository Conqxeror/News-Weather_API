const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv").config();
const path = require("path");
const cors = require("cors");



const app = express();
const PORT = 3000; // Change the port number if needed
const API_KEY = "YOUR_API_KEY_HERE";

app.use(cors());

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("News");
});

app.get("/weather", (req, res) => {
  const city = req.query.city; // Get the city from the query parameters
  const weatherData = {}; // Store weather data here

  // Make a request to the weather API using the city name
  axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
    .then((response) => {
      // Extract the relevant data from the API response
      weatherData.temperature = response.data.main.temp;
      weatherData.weatherDescription = response.data.weather[0].description;
      weatherData.location = `${response.data.name}, ${response.data.sys.country}`;

      // Render the weather.ejs template and pass the weather data
      res.render("Weather", { weatherData });
    })
    .catch((error) => {
      console.error(error);
      res.render("Weather", { weatherData: null }); // Render with null data if an error occurs
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
