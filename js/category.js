async function renderCategory(cat){


    const app=document.getElementById("app");


    app.innerHTML="Loading category...";



    const response = await apiGet(
        "/api/category/" + cat
    );



    if(!response || !response.movies){

        app.innerHTML="No movies";

        return;

    }



    let html="";



    response.movies.forEach(movie=>{


        html += `


        <div class="movie">


        <a href="?p=movie&slug=${encodeURIComponent(movie.slug)}">


        <img src="${movie.cover_url}">


        <h3>
        ${movie.title}
        </h3>


        </a>


        </div>


        `;


    });



    app.innerHTML=html;


}