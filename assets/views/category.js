async function renderCategory() {

    const params = new URLSearchParams(location.search);

    const category = params.get("cat");

    const grid = document.getElementById("movie-grid");

    const title = document.getElementById("category-title");

    if (!grid || !title) return;

    if (!category) {

        title.textContent = "Category not found";

        return;

    }

    title.textContent = category;

    grid.innerHTML = "<h2>Loading...</h2>";

    try {

        const result = await API.getCategory(category);

        if (!result.success) {
            throw new Error("Unable to load category");
        }

        renderMovieGrid(
            grid,
            result.movies
        );

    }

    catch (err) {

        console.error(err);

        grid.innerHTML = "<h2>Unable to load category.</h2>";

    }

}