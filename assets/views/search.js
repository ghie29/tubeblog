async function renderSearch() {

    const app = document.getElementById("app");

    if (!app) return;


    const params = new URLSearchParams(location.search);

    const keyword = params.get("q") || "";


    app.innerHTML = `

        <h1>Search</h1>

        <form id="search-form">

            <input
                id="search-input"
                type="text"
                placeholder="Search movies..."
                value="${keyword}"
            >

            <button type="submit">
                Search
            </button>

        </form>


        <div
            id="movie-grid"
            class="movie-grid">

        </div>

    `;


    const grid = document.getElementById("movie-grid");


    if (!keyword) {

        grid.innerHTML = `
            <p>Enter a search keyword.</p>
        `;

    } else {

        await loadSearchResults(keyword, grid);

    }


    document
    .getElementById("search-form")
    .addEventListener("submit", function(e){

        e.preventDefault();


        const value =
            document.getElementById("search-input").value.trim();


        if(value){

            location.href =
            `?view=search&q=${encodeURIComponent(value)}`;

        }

    });


}



async function loadSearchResults(keyword, grid) {


    grid.innerHTML = `
        <h2>Searching...</h2>
    `;


    try {


        const result =
            await API.search(keyword);


        if(!result.success){

            throw new Error(
                "Search failed"
            );

        }


        renderMovieGrid(
            grid,
            result.movies
        );


    }

    catch(err){


        console.error(err);


        grid.innerHTML = `
            <h2>
            Unable to search movies.
            </h2>
        `;


    }

}