async function renderMovie(slug){


    const app=document.getElementById("app");


    app.innerHTML="Loading movie...";



    const movie = await apiGet(
        "/api/movie/" + encodeURIComponent(slug)
    );



    if(!movie){

        app.innerHTML="Movie not found";

        return;

    }



    app.innerHTML = `


    <div class="single-movie">


        <h1>
        ${movie.title}
        </h1>


        <img 
        src="${movie.cover_url}"
        class="poster"
        >



        <video 
        controls
        playsinline
        width="100%"
        >


        <source 
        src="${movie.iframe_url}"
        type="application/x-mpegURL">


        </video>



        <p>
        Category:
        ${movie.categories}
        </p>



    </div>


    `;


}