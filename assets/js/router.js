/*
=========================================
TubeBlog Router
=========================================
*/

console.log("ROUTER LOADED");


window.addEventListener("DOMContentLoaded", () => {

    console.log("DOM READY");


    const path = location.pathname.toLowerCase();

    console.log("CURRENT PATH:", path);



    // HOME
    if (
        path === "/" ||
        path.endsWith("/index.html")
    ) {

        console.log("HOME ROUTE");


        if (typeof renderHome === "function") {

            console.log("CALLING renderHome()");

            renderHome();

        } else {

            console.log("renderHome() not found");

        }


        return;

    }




    // LATEST
    if (path.endsWith("/latest.html")) {

        console.log("LATEST ROUTE");


        if (typeof renderLatest === "function") {

            renderLatest();

        }


        return;

    }





    // CATEGORIES
    if (path.endsWith("/categories.html")) {

        console.log("CATEGORIES ROUTE");


        if (typeof renderCategories === "function") {

            renderCategories();

        }


        return;

    }





    // CATEGORY
    if (path.endsWith("/category.html")) {

        console.log("CATEGORY ROUTE");


        if (typeof renderCategory === "function") {

            renderCategory();

        }


        return;

    }





    // SEARCH
    if (path.endsWith("/search.html")) {

        console.log("SEARCH ROUTE");


        if (typeof renderSearch === "function") {

            renderSearch();

        }


        return;

    }





    // WATCH
    if (path.endsWith("/watch.html")) {

        console.log("WATCH ROUTE");


        if (typeof renderWatch === "function") {

            renderWatch();

        }


        return;

    }





    console.log(
        "NO ROUTE MATCH:",
        path
    );


});