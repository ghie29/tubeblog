console.log("HOME VIEW LOADED");


async function renderHome() {

    console.log("renderHome START");


    const app = document.getElementById("app");


    if (!app) {

        console.log("app not found");

        return;

    }


    app.innerHTML = `
        <h2>Loading movies...</h2>
    `;


    try {


        console.log("CALLING API");


        const result = await API.getMovies();



        console.log(
            "API RESULT:",
            result
        );



        if (!result.success) {

            throw new Error(
                "API failed"
            );

        }



        app.innerHTML = `

            <h1>
                Latest Movies
            </h1>


            <div
                id="movie-grid"
                class="movie-grid">
            </div>

        `;



        const grid =
            document.getElementById(
                "movie-grid"
            );



        renderMovieGrid(
            grid,
            result.movies
        );



        console.log(
            "MOVIES RENDERED"
        );


    }

    catch(err) {


        console.error(
            "HOME ERROR:",
            err
        );


        app.innerHTML = `

            <h2>
                Unable to load videos.
            </h2>

        `;


    }


}