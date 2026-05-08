document.addEventListener("DOMContentLoaded", () => {

    const track = document.querySelector(".slide-track");
    const slides = document.querySelectorAll(".header-img");

    const prevBtn = document.querySelector(".arrow.left");
    const nextBtn = document.querySelector(".arrow.right");

    let index = 0;

    function updateSlide() {
        if (track) {
            track.style.transform = `translateX(-${index * 100}%)`;
        }
    }

    if (prevBtn && nextBtn) {

        prevBtn.addEventListener("click", () => {
            index = (index > 0) ? index - 1 : slides.length - 1;
            updateSlide();
        });

        nextBtn.addEventListener("click", () => {
            index = (index < slides.length - 1) ? index + 1 : 0;
            updateSlide();
        });

    } else {
        console.error("Arrow buttons not found in HTML");
    }

});