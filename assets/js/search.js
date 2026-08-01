let keyword = "";

let page = 1;


const grid =
document.getElementById("movie-grid");


const input =
document.getElementById("search-input");


const btn =
document.getElementById("search-btn");


const title =
document.getElementById("search-title");


const pageInfo =
document.getElementById("page-info");


const prev =
document.getElementById("prev-btn");


const next =
document.getElementById("next-btn");



btn.onclick = () => {

    keyword = input.value.trim();

    page = 1;

    if(keyword){

        loadSearch();

    }

};





async function loadSearch(){


try{


const result =
await API.search(
    keyword,
    page
);



if(!result.success){

throw new Error(
"Search error"
);

}



title.textContent =
`Results for "${result.keyword}"`;



renderMovieGrid(
    grid,
    result.movies
);



pageInfo.textContent =
`Page ${result.page} of ${result.totalPages}`;



prev.disabled =
result.page <= 1;



next.disabled =
result.page >= result.totalPages;



}

catch(err){

console.error(err);


grid.innerHTML =
`
<h2>
No results found
</h2>
`;


}

}





prev.onclick = ()=>{

if(page > 1){

page--;

loadSearch();

}

};





next.onclick = ()=>{


page++;

loadSearch();


};





function renderMovies(movies){


grid.innerHTML="";



movies.forEach(movie=>{


grid.innerHTML += `


<div class="movie-card">


<img

loading="lazy"

src="${movie.cover_url}"

alt="${movie.title}">



<div class="movie-info">


<div class="movie-title">

${movie.title}

</div>


<div class="category">

${movie.categories}

</div>



<a class="watch-btn"

href="watch.html?slug=${encodeURIComponent(movie.slug)}">

▶ Watch

</a>



</div>


</div>


`;


});


}