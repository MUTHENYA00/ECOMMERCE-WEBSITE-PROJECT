
let currentIndex = 0;
const images = document.querySelectorAll(".header-img");

function showNextImage() {
    // remove active from current image
    images[currentIndex].classList.remove("active");

    // move to next image
    currentIndex = (currentIndex + 1) % images.length;

    // show next image
    images[currentIndex].classList.add("active");
}

// change image every 3 seconds
setInterval(showNextImage, 3000);
