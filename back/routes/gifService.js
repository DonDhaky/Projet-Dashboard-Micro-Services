var express = require('express');
var router = express.Router();
var cors = require('cors')
require('dotenv').config(); // INSTALLER DOTENV = npm install dotenv
const querystring = require('querystring'); // A IMPORTER POUR LES FONCTIONS DES ROUTES
var app = express();
const bodyParser = require('body-parser');
const fetch = require('node-fetch'); // MODULE DE REQUETES HTTP
app.use(express.urlencoded({ extended: true })); // GESTION DES REQUETES EN URLENCODED
router.use(cors())


router.get('/random', async (req, res) => {
    const giphyApiKey = process.env.GIPHY_API_KEY;
    const tag = req.query.tag || '';
    const giphyApiUrl = `https://api.giphy.com/v1/gifs/random?api_key=${giphyApiKey}&tag=${tag}&rating=g`;

    try {
        const response = await fetch(giphyApiUrl); 
        if (!response.ok) {
             throw new Error(`Error while trying to fetch the GIF : ${response.statusText}`);
        }

        const gifData = await response.json(); // ENSEMBLE DES DONNEES DU GIF
        const gifUrl = gifData.data.images.fixed_height.url; // JE RECUPERE L'URL DU GIF

        const gifResponse = await fetch(gifUrl); // Obtenir le contenu du GIF
        if (!gifResponse.ok) {
            throw new Error(`Error while trying to fetch the GIF : ${gifResponse.statusText}`);
        }

        const arrayBuffer = await gifResponse.arrayBuffer(); // Obtenir les données brutes
        const buffer = Buffer.from(arrayBuffer)

        res.set('Content-Type', 'image/gif'); 
        res.send(buffer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;