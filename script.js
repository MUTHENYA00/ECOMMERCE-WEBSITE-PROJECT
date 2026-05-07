let currentIndex = 0;

function initSlider() {
    const images = document.querySelectorAll(".header-img");

    function showImage(index) {
        images.forEach(img => img.classList.remove("active"));
        images[index].classList.add("active");
    }

    // make functions global so HTML onclick can access them
    window.nextImage = function () {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    };

    window.prevImage = function () {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    };

    // auto slide
    setInterval(function () {
        window.nextImage();
    }, 3000);
}

// run after page loads
document.addEventListener("DOMContentLoaded", initSlider);