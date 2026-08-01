/**
 * Escape HTML to prevent broken markup
 */
function escapeHtml(text = "") {
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/**
 * Single Movie Card
 */
function renderMovieCard(movie) {

    return `

    <div class="movie-card">

        <img
            src="${movie.cover_url}"
            alt="${escapeHtml(movie.title)}"
            loading="lazy">

        <div class="movie-info">

            <div class="movie-title">

                ${escapeHtml(movie.title)}

            </div>

            <div class="movie-category">

                ${escapeHtml(movie.categories)}

            </div>

            <a
                class="watch-btn"
                href="watch.html?slug=${encodeURIComponent(movie.slug)}">

                ▶ Watch

            </a>

        </div>

    </div>

    `;

}


/**
 * Render Grid
 */
function renderMovieGrid(container, movies) {

    if (!container) return;

    if (!movies || movies.length === 0) {

        container.innerHTML = `
            <p class="empty-message">
                No movies found.
            </p>
        `;

        return;

    }

    container.innerHTML = movies
        .map(renderMovieCard)
        .join("");

}