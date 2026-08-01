async function renderLatest() {

    const grid = document.getElementById("movie-grid");

    if (!grid) return;

    grid.innerHTML = "<h2>Loading...</h2>";

    try {

        const result = await API.getMovies(1);

        if (!result.success) {
            throw new Error("Unable to load latest movies");
        }

        renderMovieGrid(grid, result.movies);

    } catch (err) {

        console.error(err);

        grid.innerHTML = "<h2>Unable to load latest movies.</h2>";

    }

}