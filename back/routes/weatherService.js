// Import required modules
const express = require('express');
const router = express.Router();
const cors = require('cors');
require('dotenv').config(); // INSTALL DOTENV: npm install dotenv
const fetch = require('node-fetch');

// Create Express app
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
router.use(cors());

// Define route to get weather data
router.get('/weather', async (req, res) => {
    try {
        const apiKey = process.env.WEATHER_API_KEY; // Weather API Key (env)
        const city = req.query.city; // City name

        // API URL
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        // Fetch 
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Error while trying to fetch weather data: ${response.statusText}`);
        }

        const weatherData = await response.json(); // ->JSON

        // Check if weather data contains error message
        if (weatherData.cod !== 200) {
            throw new Error(`Error: ${weatherData.message}`);
        }

        // Weather information
        const { name: cityName, main: { temp: temperature } } = weatherData;

        // Send weather information as JSON response
        res.json({ city: cityName, temperature: temperature });
    } catch (error) {
        
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
