const params = new URLSearchParams(
    window.location.search
);


const category = params.get("cat");


const grid = document.getElementById("movie-grid");

const title =
document.getElementById("category-title");


loadCategory();



async function loadCategory(){


    if(!category){

        title.textContent =
        "Category not found";

        return;

    }



    try{


        const result =
        await API.getCategory(category);



        if(!result.success){

            throw new Error(
                "Category error"
            );

        }



        title.textContent =
        capitalize(category);



        renderMovies(
            result.movies
        );



    }

    catch(err){


        console.error(err);


        title.textContent =
        "Unable to load category";


    }


}



function renderMovies(movies){

    renderMovieGrid(
        grid,
        movies
    );

}



function capitalize(text){

    return text.charAt(0).toUpperCase()
    + text.slice(1);

}