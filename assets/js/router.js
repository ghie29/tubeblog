/*
=========================================
TubeBlog Router
=========================================
*/

window.addEventListener("DOMContentLoaded", () => {

    const path = location.pathname.toLowerCase();

    // Home
    if (
        path === "/" ||
        path.endsWith("/index.html") ||
        path === ""
    ) {

        if (typeof renderHome === "function") {
            renderHome();
        }

        return;
    }

    // Latest
    if (path.endsWith("/latest.html")) {

        if (typeof renderLatest === "function") {
            renderLatest();
        }

        return;
    }

    // Categories
    if (path.endsWith("/categories.html")) {

        if (typeof renderCategories === "function") {
            renderCategories();
        }

        return;
    }

    // Single Category
    if (path.endsWith("/category.html")) {

        if (typeof renderCategory === "function") {
            renderCategory();
        }

        return;
    }

    // Watch
    if (path.endsWith("/watch.html")) {

        if (typeof renderWatch === "function") {
            renderWatch();
        }

        return;
    }

    // Search
    if (path.endsWith("/search.html")) {

        if (typeof renderSearch === "function") {
            renderSearch();
        }

        return;
    }

    console.log("No matching route:", path);

});