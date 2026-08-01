console.log("APP START");


const app = document.getElementById("app");


function router(){


    const params = new URLSearchParams(
        window.location.search
    );


    const pageType = params.get("p");



    // Movie page

    if(pageType === "movie"){


        const slug = params.get("slug");


        if(slug){

            renderMovie(slug);

            return;

        }

    }




    // Category page

    if(pageType === "category"){


        const cat = params.get("cat");


        if(cat){

            renderCategory(cat);

            return;

        }

    }




    // Default homepage with pagination

    renderHome();



}



router();