const API_BASE = "https://movie-api.babeleoghie.workers.dev";


const API = {


    // GET /api/movies?page=1
    async getMovies(page = 1) {

        const response = await fetch(
            `${API_BASE}/api/movies?page=${page}`
        );


        if (!response.ok) {
            throw new Error("Unable to load movies");
        }


        return await response.json();

    },



    // GET /api/movie/:slug
    async getMovie(slug) {

        const response = await fetch(
            `${API_BASE}/api/movie/${encodeURIComponent(slug)}`
        );


        if (!response.ok) {
            throw new Error("Movie not found");
        }


        return await response.json();

    },



    // GET /api/category/:category?page=1
    async getCategory(category, page = 1) {

        const response = await fetch(
            `${API_BASE}/api/category/${encodeURIComponent(category)}?page=${page}`
        );


        if (!response.ok) {
            throw new Error("Category not found");
        }


        return await response.json();

    },



    // GET /api/latest
    async getLatest() {

        const response = await fetch(
            `${API_BASE}/api/latest`
        );


        if (!response.ok) {
            throw new Error("Unable to load latest movies");
        }


        return await response.json();

    },



    // GET /api/search?q=keyword&page=1
    async search(keyword, page = 1) {

        const response = await fetch(
            `${API_BASE}/api/search?q=${encodeURIComponent(keyword)}&page=${page}`
        );


        if (!response.ok) {
            throw new Error("Search failed");
        }


        return await response.json();

    }


};