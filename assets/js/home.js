const grid = document.getElementById("movie-grid");

loadMovies();

async function loadMovies() {

    grid.innerHTML = "<h2>Loading...</h2>";

    try {

        const result = await API.getMovies();

        if (!result.success) {
            throw new Error("API returned an error");
        }

        renderMovies(result.movies);

    } catch (err) {

        console.error(err);

        grid.innerHTML = `
            <h2>Unable to load videos.</h2>
        `;

    }

}

function renderMovies(movies) {

    grid.innerHTML = "";

    renderMovieGrid(grid, result.movies);

}