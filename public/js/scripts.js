// Add event listener for form submission
document.getElementById('search-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the default form submission behavior
    const movieInput = document.getElementById('movie-input').value; // Get the value entered in the input field
    const resultsDiv = document.getElementById('results'); // Get the div to display search results
    const similarMoviesDiv = document.getElementById('similar-movies'); // Get the div to display similar movies

    // Clears previous results
    resultsDiv.innerHTML = ''; // Clear any previous search results
    similarMoviesDiv.innerHTML = ''; // Clear any previous similar movies

    // Check for input field
    if (movieInput.trim() === '') {
        alert('Please enter a movie name.'); // Alert/pop-up the user if the input is empty
        return; // Exit the function if no movie name is entered
    }

    // Fetch movies matching the search query
    try {
        const response = await fetch(`/search/${encodeURIComponent(movieInput)}`); // Make a GET request to the search endpoint with the movie name
        const movies = await response.json(); // Parse the response as JSON

        // Check if no movies were found
        if (movies.length === 0) {
            resultsDiv.innerHTML = 'Sorry no movies found.'; // Display a message 
            return; // Exit the function if no movies were found
        }

        // Loop through the movies and display them
        movies.forEach(movie => {
            const movieDiv = document.createElement('div'); // Create a div for each movie
            movieDiv.classList.add('movie'); // Add a 'movie' class to the div for styling
            movieDiv.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">`; // Add the movie poster image from documentatiom
            movieDiv.addEventListener('click', () => fetchSimilarMovies(movie.id)); // Add a click event listener to fetch and display similar movies
            resultsDiv.appendChild(movieDiv); // Append the movie div to the results div
        });
    } catch (error) {
        console.error('Sorry, error fetching movies:', error); // Log errors to the console
        resultsDiv.innerHTML = 'Error fetching movies.'; // Display an error message
    }
});

// Function to fetch and display similar movies
async function fetchSimilarMovies(movieId) {
    const similarMoviesDiv = document.getElementById('similar-movies'); // Get the div to display similar movies

    // Clear previous similar movies
    similarMoviesDiv.innerHTML = ''; // Clear any previous similar movies

    // Fetch similar movies
    try {
        const response = await fetch(`/similar/${movieId}`); // Make a GET request to fetch similar movies by movie ID
        const similarMovies = await response.json(); // Parse the response as JSON

        // Check if no similar movies were found
        if (similarMovies.length === 0) {
            similarMoviesDiv.innerHTML = 'No similar movies found.'; // Display a message if no similar movies were found
            return; // Exit the function if no similar movies were found
        }

        // Loop through the similar movies and display them
        similarMovies.forEach(movie => {  // Method easier than using a for Loop; Iterate over elements in an array 
            const movieDiv = document.createElement('div'); // Create a div for each similar movie
            movieDiv.classList.add('movie'); // Add a 'movie' class to the div for styling
            movieDiv.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">`; // Add the similar movie poster image Look at the JSON response I pulled what I wanted from it by the property
            similarMoviesDiv.appendChild(movieDiv); // Append the similar movie div to the similar movies div (organizes them)
        });
        // Inner HTML = A property of an HTML element that allows you to get or set the HTML content inside the element as a string. When set, it will parse the string as HTML and updates the content of the element
    } catch (error) {
        console.error('Error fetching similar movies:', error); // Log any errors to the console
        similarMoviesDiv.innerHTML = 'Error fetching similar movies.'; // Display an error message
    }
}
