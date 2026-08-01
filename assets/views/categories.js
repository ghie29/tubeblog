async function renderCategories() {

    const app = document.getElementById("app");

    if (!app) return;


    app.innerHTML = `
        <h1>Categories</h1>

        <div id="category-grid" class="category-grid">
            Loading...
        </div>
    `;


    const grid = document.getElementById("category-grid");


    try {

        const result = await API.getStats();


        if (!result.success) {
            throw new Error("Unable to load categories");
        }


        const categories = result.categories;


        if (!categories || categories.length === 0) {

            grid.innerHTML = `
                <p>No categories found.</p>
            `;

            return;

        }


        grid.innerHTML = categories.map(cat => `

            <a class="category-card"
               href="?view=category&cat=${encodeURIComponent(cat.name)}">

                ${cat.name}

            </a>

        `).join("");


    } catch(err) {

        console.error(err);

        grid.innerHTML = `
            <p>Unable to load categories.</p>
        `;

    }

}