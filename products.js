document.addEventListener("DOMContentLoaded", () => {

    
    // ADD TO CART (GLOBAL FIX)
   
    document.addEventListener("click", function (e) {

        if (e.target.classList.contains("add-to-cart")) {
            window.location.href = "cart.html";
        }

    });

});


// OPEN BUY NOW MODAL

function openBuyNow(button) {

    let product = button.closest(".Product-Card");

    if (!product) {
        console.error("Product card not found");
        return;
    }

    let name = product.getAttribute("data-name") || "";
    let price = product.getAttribute("data-price") || "";
    let image = product.getAttribute("data-image") || "";

    let modalName = document.getElementById("modalName");
    let modalPrice = document.getElementById("modalPrice");
    let modalImage = document.getElementById("modalImage");
    let modal = document.getElementById("buyNowModal");

    if (modalName) modalName.innerText = name;
    if (modalPrice) modalPrice.innerText = price;
    if (modalImage) modalImage.src = image;

    if (modal) {
        modal.style.display = "flex";
    }
}


// CLOSE MODAL

function closeBuyNow() {

    let modal = document.getElementById("buyNowModal");

    if (modal) {
        modal.style.display = "none";
    }
}



// CONFIRM PURCHASE

function confirmPurchase() {

    closeBuyNow();

    window.location.href = "signin.html";
}

//PRODUCTS RENDERING
const fashionProducts = [
    {
        name: "DaggerWave Hoodie",
        price: "Ksh 2000",
        image: "assets/Collection_Products/fashion trends/daggerwaveHoddie.png"
    },
    {
        name: "Cargo Sweatpant",
        price: "Ksh 2000",
        image: "assets/Collection_Products/fashion trends/cargo 1.jpg"
    },
    {
        name: "Adenorah Hoodie",
        price: "Ksh 800",
        image: "assets/Collection_Products/fashion trends/adenorah_result.png"
    }
];


function renderProducts(containerId, products) {

    const container = document.getElementById(containerId);

    if (!container) return;

    products.forEach(product => {

        container.innerHTML += `
            <div class="Product-Card"
                 data-name="${product.name}"
                 data-price="${product.price}"
                 data-image="${product.image}">

                <img src="${product.image}" width="200">

                <h3>${product.name}</h3>

                <p class="Price-Fashion">${product.price}</p>

                <button class="buy-now" onclick="openBuyNow(this)">
                    Buy Now
                </button>

                <button class="add-to-cart">
                    Add to Cart
                </button>

            </div>
        `;
    });
}

document.addEventListener("DOMContentLoaded", () => {

    renderProducts("fashion-packages", fashionProducts);

});