const grid =
document.getElementById("movie-grid");


loadLatest();



async function loadLatest(){


    grid.innerHTML = `
        <h2>Loading...</h2>
    `;



    try{


        const result =
        await fetch(
            "https://movie-api.babeleoghie.workers.dev/api/latest"
        )
        .then(res => res.json());



        if(!result.success){

            throw new Error(
                "API Error"
            );

        }



        renderMovieGrid(
    grid,
    result.movies
);


    }


    catch(error){


        console.error(error);


        grid.innerHTML = `
            <h2>
            Unable to load latest movies.
            </h2>
        `;


    }


}




