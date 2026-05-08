//Tracking
const track = document.querySelector(".slide-track");
const slides = document.querySelectorAll(".header-img");

const prevBtn = document.querySelector(".arrow.left");
const nextBtn = document.querySelector(".arrow.right");

let index = 0;

//Move Function
function updateSlide() {
    track.style.transform = `translateX(-${index * 100}%)`;
}
//Prev Button
prevBtn.addEventListener("click", () => {
    if (index > 0) {
        index--;
    } else {
        index = slides.length - 1; // loop back
    }
    updateSlide();
});
//Next Button

nextBtn.addEventListener("click", () => {
    if (index < slides.length - 1) {
        index++;
    } else {
        index = 0; // loop back to start
    }
    updateSlide();
});
