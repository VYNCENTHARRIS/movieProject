require('dotenv').config(); // Load environment variables from .env file. NPM package 
const express = require('express'); // Import Express module
const { searchMovie, getSimilarMovies } = require('./tmdb'); // Imports functions from tmdb.js
const path = require('path');

const app = express(); // Creates the Express
const PORT = 3000;

app.use(express.json()); // Will parse JSON bodies
app.use(express.static(path.join(__dirname, 'public'))); // Serve the static files from the "public" directory html css js

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Serve the HTML file
});

app.get('/search/:movie', async (req, res) => {
    const movieName = req.params.movie; // Get movie name from URL parameter
    try {
        const movies = await searchMovie(movieName); // Call searchMovie function from tmdb.js file
        res.json(movies); // Send response with the list of movies
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch movie data' }); // Handle errors
    }
});

app.get('/similar/:movieId', async (req, res) => {
    const movieId = req.params.movieId; // Get movie ID from URL parameter
    try {
        const similarMovies = await getSimilarMovies(movieId); // Call getSimilarMovies function from tmdb.js
        res.json(similarMovies); // Send response with the list of similar movies
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch similar movies data' }); // Handle errors
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
