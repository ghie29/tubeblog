async function renderWatch() {

    const app = document.getElementById("app");

    if (!app) return;


    const params = new URLSearchParams(location.search);

    const slug = params.get("slug");


    if (!slug) {

        app.innerHTML = `
            <h2>Movie slug is missing.</h2>
        `;

        return;

    }


    app.innerHTML = `

        <section class="player-section">

            <video
                id="player"
                controls
                playsinline
                class="plyr">
            </video>

        </section>


        <section class="movie-details">

            <h1 id="movie-title">
                Loading...
            </h1>


            <p>
                Category:
                <span id="movie-category">
                -
                </span>
            </p>


            <p>
                Actors:
                <span id="movie-actors">
                -
                </span>
            </p>


            <p>
                Tags:
                <span id="movie-tags">
                -
                </span>
            </p>

        </section>


        <hr>


        <h2>
            Related Videos
        </h2>


        <div
            id="related-grid"
            class="movie-grid">

        </div>

    `;


    try {


        const result =
            await API.getMovie(slug);


        if(!result.success){

            throw new Error(
                "Movie not found"
            );

        }


        const movie =
            result.movie;



        document.title =
            movie.title;



        document
        .getElementById("movie-title")
        .textContent =
            movie.title;



        document
        .getElementById("movie-category")
        .textContent =
            movie.categories;



        document
        .getElementById("movie-actors")
        .textContent =
            movie.actors || "-";



        document
        .getElementById("movie-tags")
        .textContent =
            movie.tags || "-";



        loadPlayer(
            movie.iframe_url
        );



        loadRelated(
            movie.categories,
            movie.slug
        );


    }

    catch(err){


        console.error(err);


        app.innerHTML = `
            <h2>
            Unable to load movie.
            </h2>
        `;


    }

}






function loadPlayer(url){


    const video =
        document.getElementById("player");


    if(!video)
        return;



    if(Hls.isSupported()){


        const hls =
            new Hls();


        hls.loadSource(url);


        hls.attachMedia(video);



    }

    else if(
        video.canPlayType(
        "application/vnd.apple.mpegurl")
    ){


        video.src = url;


    }



    new Plyr(video);


}






async function loadRelated(category,currentSlug){


    const grid =
        document.getElementById(
            "related-grid"
        );


    if(!grid)
        return;



    try{


        const result =
            await API.getCategory(
                category
            );



        if(!result.success)
            return;



        const movies =
            result.movies
            .filter(
                m => m.slug !== currentSlug
            )
            .slice(0,8);



        renderMovieGrid(
            grid,
            movies
        );



    }

    catch(err){

        console.error(err);

    }


}