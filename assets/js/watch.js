console.log(window.location.href);
console.log(window.location.search);

let hls = null;
let player = null;

const slug = new URLSearchParams(window.location.search).get("slug");

document.addEventListener("DOMContentLoaded", () => {
    loadMovie();
});

async function loadMovie() {

    if (!slug) {
        alert("Movie slug is missing.");
        return;
    }

    try {

        const result = await API.getMovie(slug);

        if (!result.success) {
            throw new Error("Movie not found");
        }

        // Supports both:
        // { success:true, movie:{...} }
        // { success:true, id:..., title:... }

        const movie = result.movie || result;

        document.title = movie.title + " - TubeBlog";

        document.getElementById("title").textContent = movie.title;

        document.getElementById("category").textContent =
            movie.categories || "-";

        document.getElementById("actors").textContent =
            movie.actors || "-";

        document.getElementById("tags").textContent =
            movie.tags || "-";

        initPlayer(movie.iframe_url);

        loadRelated(movie.categories, movie.slug);

    } catch (err) {

        console.error(err);

        document.querySelector("main").innerHTML = `
            <h2>Movie not found.</h2>
        `;

    }

}

function initPlayer(url) {

    const video = document.getElementById("player");

    if (hls) {
        hls.destroy();
        hls = null;
    }

    if (player) {
        player.destroy();
        player = null;
    }

    if (Hls.isSupported()) {

        hls = new Hls();

        hls.loadSource(url);

        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, function () {

            player = new Plyr(video);

        });

    }

    else if (video.canPlayType("application/vnd.apple.mpegurl")) {

        video.src = url;

        player = new Plyr(video);

    }

}

async function loadRelated(category, currentSlug) {

    try {

        const result = await API.getCategory(category);

        if (!result.success) return;

        const grid = document.getElementById("related-grid");

        grid.innerHTML = "";

        result.movies
            .filter(movie => movie.slug !== currentSlug)
            .slice(0, 8)
            .forEach(movie => {

                grid.innerHTML += `
                    <div class="movie-card">

                        <img
                            src="${movie.cover_url}"
                            loading="lazy"
                            alt="${escapeHtml(movie.title)}">

                        <div class="movie-info">

                            <div class="movie-title">

                                ${escapeHtml(movie.title)}

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

    catch (e) {

        console.error(e);

    }

}

function escapeHtml(text) {

    return String(text).replace(/[&<>"']/g, function (m) {

        return ({
            "&":"&amp;",
            "<":"&lt;",
            ">":"&gt;",
            '"':"&quot;",
            "'":"&#039;"
        })[m];

    });

}