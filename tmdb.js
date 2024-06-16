const axios = require('axios'); // Import the axios module

const API_KEY = process.env.TMDB_API_KEY; // Get API key from environment variables
const ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN; // Get access token from environment variables
const BASE_URL = 'https://api.themoviedb.org/3';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`
    }
});

// Function to search for movies by name
const searchMovie = async (movieName) => {
    const response = await axiosInstance.get('/search/movie', {
        params: {
            api_key: API_KEY,
            query: movieName
        }
    });
    return response.data.results;
};

// Function to get similar movies by movie ID
const getSimilarMovies = async (movieId) => {
    const response = await axiosInstance.get(`/movie/${movieId}/similar`, {
        params: {
            api_key: API_KEY
        }
    });
    return response.data.results;
};

module.exports = { searchMovie, getSimilarMovies }; // Access these in other files
