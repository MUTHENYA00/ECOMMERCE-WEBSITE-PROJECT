document.addEventListener("DOMContentLoaded", () => {

    
    // ADD TO CART (basic redirect)
    
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            window.location.href = "cart.html";
        });
    });

});



// OPEN BUY NOW MODAL
function openBuyNow(button){

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

function closeBuyNow(){

    let modal = document.getElementById("buyNowModal");

    if (modal) {
        modal.style.display = "none";
    }
}


// CONFIRM PURCHASE

function confirmPurchase(){

    alert("Purchase Confirmed!");

    closeBuyNow();
}