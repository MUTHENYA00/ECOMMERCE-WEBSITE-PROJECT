document.addEventListener("DOMContentLoaded", async () => {

    // ================= ADD TO CART =================
    document.addEventListener("click", function (e) {
        if (e.target.classList.contains("add-to-cart")) {
            window.location.href = "cart.html";
        }
    });

    // ================= FETCH JSON DATA =================
    let categoryMap = {};

    try {
        const response = await fetch("products.json");
        categoryMap = await response.json();
    } catch (error) {
        console.error("Failed to load products.json", error);
    }

    // ================= RENDER ENGINE =================
    function renderProducts(container, products, categoryName) {

        if (!container) return;

        // HARD RESET (prevents ghost DOM + duplicates)
        container.replaceChildren();

        if (!products || products.length === 0) {

            container.innerHTML = `
                <div style="
                    padding:30px;
                    text-align:center;
                    width:100%;
                    font-size:18px;
                    color:#444;
                ">
                    <h3>${categoryName.replace(/-/g, " ")}</h3>
                    <p>No products available yet in this category.</p>
                </div>
            `;
            return;
        }

        const fragment = document.createDocumentFragment();

        products.forEach(product => {

            const card = document.createElement("div");
            card.className = "Product-Card";

            card.dataset.name = product.name;
            card.dataset.price = product.price;
            card.dataset.image = product.image;

            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.desc}</p>
                <p class="price">${product.price}</p>

                <button class="buy-now" onclick="openBuyNow(this)">
                    Buy Now
                </button>

                <button class="add-to-cart">
                    Add to Cart
                </button>
            `;

            fragment.appendChild(card);
        });

        container.appendChild(fragment);
    }

    // ================= ROUTING SYSTEM =================
    function route() {

        const hash = window.location.hash.replace("#", "");
         console.log("HASH:", hash);
    console.log("AVAILABLE KEYS:", Object.keys(categoryMap));


        // ================= SECTIONS =================
        const sections = {
            "toys": document.getElementById("toys-section"),
            "fashion-packages": document.getElementById("fashion-section"),
            "devices": document.getElementById("devices-section"),
             "deodorants-packages": document.getElementById("deodorants-perfumes-section"),
            "grooming": document.getElementById("grooming-section"),
            
            "school": document.getElementById("school-section"),
            "books": document.getElementById("books-section"),
            "pc": document.getElementById("pc-section")
        };

        // ================= CONTAINERS =================
        const containers = {
            "toys": document.getElementById("toys"),
            "fashion-packages": document.getElementById("fashion-packages"),
            "devices": document.getElementById("devices"),
            "grooming": document.getElementById("grooming"),
            "deodorants-packages": document.getElementById("deodorants-packages"),
            "school": document.getElementById("school"),
            "books": document.getElementById("books"),
            "pc": document.getElementById("pc")
        };

        // ================= SAFE ACCESS =================
        const getProducts = (key) => categoryMap?.[key] || [];

        // ================= SHOW / HIDE =================
        function setVisibility(activeCategory = null) {

            Object.keys(sections).forEach(cat => {

                if (!sections[cat]) return;

                sections[cat].style.display =
                    !activeCategory || cat === activeCategory
                        ? "block"
                        : "none";
            });
        }

        // ================= RENDER ALL =================
        function renderAllCategories() {

            Object.keys(containers).forEach(cat => {

                if (containers[cat]) {
                    renderProducts(
                        containers[cat],
                        getProducts(cat),
                        cat
                    );
                }
            });
        }

        // ================= DEFAULT VIEW =================
        if (!hash) {

            setVisibility(null);
            renderAllCategories();
            return;
        }

        // ================= SINGLE CATEGORY =================
        if (hash in categoryMap) {

            setVisibility(hash);

            renderProducts(
                containers[hash],
                getProducts(hash),
                hash
            );

            return;
        }

        // ================= FALLBACK =================
        setVisibility(null);
        renderAllCategories();
    }

    // ================= EVENTS =================
    window.addEventListener("hashchange", route);

    // ================= INIT =================
    route();
});


// ================= MODAL =================
function openBuyNow(button) {

    const product = button.closest(".Product-Card");

    document.getElementById("modalName").innerText =
        product.dataset.name;

    document.getElementById("modalPrice").innerText =
        product.dataset.price;

    document.getElementById("modalImage").src =
        product.dataset.image;

    document.getElementById("buyNowModal").style.display = "flex";
}

function closeBuyNow() {
    document.getElementById("buyNowModal").style.display = "none";
}

function confirmPurchase() {
    closeBuyNow();
    window.location.href = "signin.html";
}