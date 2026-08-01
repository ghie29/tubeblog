async function renderHome() {

    const app = document.getElementById("app");

    app.innerHTML = `
        <h2>Loading...</h2>
    `;

    try {

        const result = await API.getMovies();

        if (!result.success)
            throw new Error();

        app.innerHTML = `

            <h2>Latest Movies</h2>

            <div
                id="movie-grid"
                class="movie-grid">
            </div>

        `;

        renderMovieGrid(

            document.getElementById("movie-grid"),

            result.movies

        );

    }

    catch (err) {

        app.innerHTML = `
            <h2>Unable to load videos.</h2>
        `;

    }

}