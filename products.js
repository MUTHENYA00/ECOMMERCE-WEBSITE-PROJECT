console.log("JS is connected");

document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", function () {
        window.location.href = "cart.html";
    });
});


function openBuyNow(button){
    let product = button.closest(".Product-Card");

    if (!product) {
        console.error("Product card not found");
        return;
    }

    let name = product.getAttribute("data-name");
    let price = product.getAttribute("data-price");
    let image = product.getAttribute("data-image");

    document.getElementById("modalName").innerText = name || "";
    document.getElementById("modalPrice").innerText = price || "";
    document.getElementById("modalImage").src = image || "";

    document.getElementById("buyNowModal").style.display = "block";
}

function closeBuyNow(){
    let modal = document.getElementById("buyNowModal");

    if (modal) {
        modal.style.display = "none";
    }
}