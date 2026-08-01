console.log("HOME VIEW LOADED");


async function renderHome() {

    console.log("renderHome START");


    const grid = document.getElementById("movie-grid");


    console.log("GRID:", grid);



    if (!grid) {

        console.log("movie-grid not found");

        return;

    }


    grid.innerHTML = "<h2>Loading movies...</h2>";



    try {


        console.log("CALLING API");


        const result = await API.getMovies();



        console.log("API RESULT:", result);



        if (!result.success) {

            throw new Error(
                "API failed"
            );

        }



        renderMovieGrid(
            grid,
            result.movies
        );


        console.log("MOVIES RENDERED");


    }

    catch(err) {


        console.error(
            "HOME ERROR:",
            err
        );


        grid.innerHTML =
        "<h2>Unable to load videos.</h2>";


    }


}